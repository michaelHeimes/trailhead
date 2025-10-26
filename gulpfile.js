/**
 * Trailhead Theme Build System
 * Foundation 6.9.0 + Sass + ES6 Modules (compiled via Browserify + Babel)
 */

const gulp = require('gulp');
 const dartSass = require('sass');
const gulpSass = require('gulp-sass')(dartSass); // call once
const sass = gulpSass; // just assign it
const sourcemaps = require('gulp-sourcemaps');
const cleanCSS = require('gulp-clean-css');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const rename = require('gulp-rename');
const terser = require('gulp-terser');
const browserSync = require('browser-sync').create();
const del = require('del');
const replace = require('gulp-replace');
const browserify = require('browserify');
const babelify = require('babelify');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const fs = require('fs');

// Paths
const paths = {
  scss: {
	src: 'source/scss/style.scss',
	watch: 'source/scss/**/*.scss',
	dest: 'dist/css/',
  },
  js: {
	src: 'source/js/app.js',
	watch: 'source/js/**/*.js',
	dest: 'dist/js/',
  },
  php: '**/*.php',
};

/**
 * Clean dist folder
 */
function cleanDist() {
  return del(['dist']);
}

/**
 * Sass Task
 */
function styles() {
   return gulp.src('source/scss/style.scss')
	 .pipe(sourcemaps.init())
	 .pipe(gulpSass().on('error', gulpSass.logError))
	 .pipe(postcss([autoprefixer()]))
	 .pipe(gulp.dest('dist/css'))
	 .pipe(cleanCSS())
	 .pipe(rename({ suffix: '.min' }))
	 .pipe(sourcemaps.write('.'))
	 .pipe(gulp.dest('dist/css'))
	 .pipe(browserSync.stream());
 }

/**
 * JavaScript Task (Browserify + Babel)
 */
function scripts() {
  return browserify({
	entries: [paths.js.src],
	debug: true,
	transform: [
	  [
		babelify,
		{
		  presets: ['@babel/preset-env'],
		  sourceMaps: true,
		  extensions: ['.js'],
		},
	  ],
	],
  })
	.bundle()
	.pipe(source('app.js'))
	.pipe(buffer())
	.pipe(gulp.dest(paths.js.dest))
	.pipe(rename({ suffix: '.min' }))
	.pipe(terser())
	.pipe(gulp.dest(paths.js.dest))
	.pipe(browserSync.stream());
}

/**
 * Version bump in style.css
 */
function bumpVersion(done) {
  const styleFile = 'style.css';
  if (!fs.existsSync(styleFile)) return done();

  const pkg = JSON.parse(fs.readFileSync('package.json'));
  const version = pkg.version;

  gulp.src(styleFile)
	.pipe(replace(/Version:\s*[0-9.]+/, `Version: ${version}`))
	.pipe(gulp.dest('./'));

  done();
}

/**
 * BrowserSync Live Reload
 */
function serve(done) {
  browserSync.init({
	proxy: 'http://trailhead.local', // your local WP dev URL
	open: false,
	injectChanges: true,
  });
  done();
}

/**
 * Watch Files
 */
function watchFiles() {
  gulp.watch(paths.scss.watch, styles);
  gulp.watch(paths.js.watch, scripts);
  gulp.watch(paths.php).on('change', browserSync.reload);
}

/**
 * Build Task
 */
const build = gulp.series(cleanDist, gulp.parallel(styles, scripts), bumpVersion);
const dev = gulp.series(build, watchFiles);

// Export tasks
exports.clean = cleanDist;
exports.styles = styles;
exports.scripts = scripts;
exports.bumpVersion = bumpVersion;
// exports.serve = serve;
exports.watch = watchFiles;
exports.build = build;
exports.default = dev;