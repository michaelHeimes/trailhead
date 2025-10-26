/**
 * Trailhead Theme Build System
 * Foundation 6.9.0 + Sass + ES6 Modules (compiled via Browserify + Babel)
 */

const gulp = require('gulp');
const dartSass = require('sass');
const gulpSass = require('gulp-sass')(dartSass);
const sourcemaps = require('gulp-sourcemaps');
const cleanCSS = require('gulp-clean-css');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const rename = require('gulp-rename');
const terser = require('gulp-terser');
const browserSync = require('browser-sync').create();
const del = require('del');
const browserify = require('browserify');
const babelify = require('babelify');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const fs = require('fs');

const packageJson = require('./package.json');
const version = packageJson.version; // e.g., "1.0.0"
const aliases = {
  suffix: 'min' // you can replace this with a hash for content-based cache-busting
};

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
  dist: 'dist'
};

/**
 * Clean dist folder
 */
function cleanDist() {
  return del([paths.dist]);
}

/**
 * Theme SCSS with versioned filename
 */
function stylesTheme() {
   const filename = `bundle.${aliases.suffix}.${version}.css`;
 
   return gulp.src(paths.scss.src)
	 .pipe(sourcemaps.init())
	 .pipe(gulpSass({
	   includePaths: ['node_modules', 'node_modules/foundation-sites/scss']
	 }).on('error', gulpSass.logError))
	 .pipe(postcss([autoprefixer()]))
	 .pipe(gulp.dest(paths.scss.dest)) // unminified
	 .pipe(cleanCSS())
	 .pipe(rename(filename)) // minified + versioned
	 .pipe(sourcemaps.write('.'))
	 .pipe(gulp.dest(paths.scss.dest))
	 .pipe(browserSync.stream());
 }

/**
 * Vendor SCSS (slow build)
 */
function stylesVendor() {
  return gulp.src('source/scss/vendor/vendor.scss')
	.pipe(sourcemaps.init())
	.pipe(gulpSass({ includePaths: ['node_modules'] }).on('error', gulpSass.logError))
	.pipe(postcss([autoprefixer()]))
	.pipe(rename('vendor.css'))
	.pipe(gulp.dest('source/scss/vendor'))
	.pipe(cleanCSS())
	.pipe(rename('vendor.min.css'))
	.pipe(sourcemaps.write('.'))
	.pipe(gulp.dest('source/scss/vendor'));
}

/**
 * JavaScript Task with versioned filename
 */
function scripts() {
   const filename = `bundle.${aliases.suffix}.${version}.js`;
 
   return browserify({ entries: [paths.js.src], debug: true, transform: [[babelify, { presets: ['@babel/preset-env'], sourceMaps: true, extensions: ['.js'] }]] })
	 .bundle()
	 .pipe(source('app.js'))
	 .pipe(buffer())
	 .pipe(gulp.dest(paths.js.dest)) // unminified
	 .pipe(rename(filename)) // minified + versioned
	 .pipe(terser())
	 .pipe(gulp.dest(paths.js.dest))
	 .pipe(browserSync.stream());
 }

/**
 * Generate manifest.json for PHP
 */
function manifest(cb) {
   const $manifest = {
	 js: `bundle.${aliases.suffix}.${version}.js`,
	 css: `bundle.${aliases.suffix}.${version}.css`,
	 adminJs: `admin.${aliases.suffix}.${version}.js`,
	 adminCss: `admin.${aliases.suffix}.${version}.css`,
   };
   fs.writeFileSync(`${paths.dist}/manifest.json`, JSON.stringify($manifest, null, 2));
   cb();
 }

/**
 * BrowserSync Live Reload
 */
function serve(done) {
  browserSync.init({
	proxy: 'http://trailhead.local',
	open: false,
	injectChanges: true,
  });
  done();
}

/**
 * Watch Files
 */
function watchFiles() {
  gulp.watch(['source/scss/**/*.scss', '!source/scss/vendor/**/*.scss'], stylesTheme);
  gulp.watch('source/scss/vendor/**/*.scss', stylesVendor);
  gulp.watch(paths.js.watch, scripts);
  gulp.watch(paths.php).on('change', browserSync.reload);
}

/**
 * Build Task
 */
const build = gulp.series(cleanDist, gulp.parallel(stylesTheme, stylesVendor, scripts), manifest);
const dev = gulp.series(build, watchFiles);

// Export tasks
exports.clean = cleanDist;
exports.stylesTheme = stylesTheme;
exports.stylesVendor = stylesVendor;
exports.scripts = scripts;
exports.manifest = manifest;
exports.watch = watchFiles;
exports.build = build;
exports.default = dev;