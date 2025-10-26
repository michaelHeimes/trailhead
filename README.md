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

This build system is designed for the **Trailhead WordPress Theme**, using **Foundation 6.9.0**, **Sass**, and **ES6 modules** compiled via **Browserify + Babel**. It handles SCSS compilation, JavaScript bundling, live reload, and version bumping.

---

## Requirements

- Node.js >= 18
- npm or yarn
- Gulp CLI installed globally:  
  ```bash
  npm install -g gulp
  
  
  Directory Structure
  
  source/
  ├─ scss/
  │  ├─ style.scss         # Main theme SCSS (fast compile)
  │  ├─ vendor/
  │  │  └─ vendor.scss     # Vendor SCSS (slow compile, run manually)
  ├─ js/
  │  └─ app.js             # Theme JS entry point
  dist/
  ├─ css/                  # Compiled CSS output
  ├─ js/                   # Compiled JS output
  
  
  # Gulp Tasks - Trailhead Theme Build System
  
  | Task Name           | Description                                                                 |
  |--------------------|-----------------------------------------------------------------------------|
  | `gulp build`        | Cleans `dist/`, compiles theme SCSS, vendor SCSS, bundles JS, bumps version |
  | `gulp`              | Default task: runs `build`, then watches files with BrowserSync live reload |
  | `gulp stylesTheme`  | Compiles theme SCSS (fast build) with autoprefixing and minification        |
  | `gulp stylesVendor` | Compiles vendor SCSS (slow build) with autoprefixing and minification      |
  | `gulp scripts`      | Bundles JS using Browserify + Babel; outputs `app.js` and `app.min.js`     |
  | `gulp bumpVersion`  | Updates `style.css` version to match `package.json`                         |
  | `gulp clean`        | Deletes the `dist/` folder                                                  |
  | `gulp watch`        | Watches SCSS, JS, and PHP files and triggers live reload (BrowserSync)     |


					 ┌────────────┐
					   │  clean     │
					   │ (dist/)    │
					   └─────┬──────┘
							 │
			 ┌───────────────┴────────────────┐
			 │                                │
	 ┌───────────────┐                ┌───────────────┐
	 │ stylesTheme   │                │ stylesVendor  │
	 │ (fast SCSS)   │                │ (slow SCSS)   │
	 └───────────────┘                └───────────────┘
			 │                                │
			 └───────────────┬────────────────┘
							 │
					   ┌───────────────┐
					   │   scripts     │
					   │ (JS bundling) │
					   └───────────────┘
							 │
					   ┌───────────────┐
					   │ bumpVersion   │
					   └───────────────┘
							 │
					   ┌───────────────┐
					   │   build       │
					   │ (runs all)    │
					   └─────┬─────────┘
							 │
					   ┌───────────────┐
					   │   default     │
					   │ (build + watch)│
					   └─────┬─────────┘
							 │
					 ┌───────────────┐
					 │    watch      │
					 │ (live reload) │
					 └───────────────┘