[![Build Status](https://travis-ci.org/Automattic/_s.svg?branch=master)](https://travis-ci.org/Automattic/_s)

_s
===

Hi. I'm a starter theme called `_s`, or `underscores`, if you like. I'm a theme meant for hacking so don't use me as a Parent Theme. Instead try turning me into the next, most awesome, WordPress theme out there. That's what I'm here for.

My ultra-minimal CSS might make me look like theme tartare but that means less stuff to get in your way when you're designing your awesome theme. Here are some of the other more interesting things you'll find here:

* A modern workflow with a pre-made command-line interface to turn your project into a more pleasant experience.
* A just right amount of lean, well-commented, modern, HTML5 templates.
* A custom header implementation in `inc/custom-header.php`. Just add the code snippet found in the comments of `inc/custom-header.php` to your `header.php` template.
* Custom template tags in `inc/template-tags.php` that keep your templates clean and neat and prevent code duplication.
* Some small tweaks in `inc/template-functions.php` that can improve your theming experience.
* A script at `js/navigation.js` that makes your menu a toggled dropdown on small screens (like your phone), ready for CSS artistry. It's enqueued in `functions.php`.
* 2 sample layouts in `sass/layouts/` made using CSS Grid for a sidebar on either side of your content. Just uncomment the layout of your choice in `sass/style.scss`.
Note: `.no-sidebar` styles are automatically loaded.
* Smartly organized starter CSS in `style.css` that will help you to quickly get your design off the ground.
* Full support for `WooCommerce plugin` integration with hooks in `inc/woocommerce.php`, styling override woocommerce.css with product gallery features (zoom, swipe, lightbox) enabled.
* Licensed under GPLv2 or later. :) Use it to make something cool.


# Trailhead Theme Build System

This modernized build system is designed for the Trailhead WordPress Theme. It utilizes Foundation 6.9.0, Dart Sass, and ESM/ES6 modules bundled via Esbuild for lightning-fast performance.


---

## Requirements

Node.js: >= 18.0.0
Package Manager: npm or yarn
Gulp CLI: Installed globally (npm install -g gulp-cli)
  
  
  Directory Structure
  
  source/
  ├─ scss/
  │  ├─ style.scss         # Entry point (Imports Foundation + Theme)
  │  ├─ foundation-settings # Your Foundation variable overrides
  │  └─ partials/          # Theme components (header, footer, etc.)
  ├─ js/
  │  └─ app.js             # Theme JS entry point (ESM imports)
  dist/
  ├─ css/                  # Compiled CSS (versioned filenames)
  ├─ js/                   # Bundled JS (versioned filenames)
  └─ manifest.json         # JSON map for WordPress enqueuing

  
  
  # Gulp Tasks - Trailhead Theme Build System
  
  Task Name	Description
  gulp	Default: Runs a fast build and starts BrowserSync + Watch.
  gulp build	Production: Full clean, minification, autoprefixing, and version bumping.
  gulp styles	Compiles SCSS. Fast in dev mode; minified in prod mode.
  gulp scripts	Bundles JS using Esbuild.
  gulp clean	Deletes the dist/ folder using rimraf.
  gulp bumpWP	Updates Version: in root style.css to match package.json.


Task Name	Description
  gulp	Default: Runs a fast build and starts BrowserSync + Watch.
  gulp build	Production: Full clean, minification, autoprefixing, and version bumping.
  gulp styles	Compiles SCSS. Fast in dev mode; minified in prod mode.
  gulp scripts	Bundles JS using Esbuild.
  gulp clean	Deletes the dist/ folder using rimraf.
  gulp bumpWP	Updates Version: in root style.css to match package.json.