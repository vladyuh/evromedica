"use strict";

import gulp from "gulp";

const requireDir = require("require-dir"),
    paths = {
        views: {
            src: [
                "./src/views/index.pug",
                "./src/views/pages/*.pug"
            ],
            dist: "./dist/",
            watch: [
                "./src/blocks/**/*.pug",
                "./src/views/**/*.pug"
            ]
        },
        styles: {
            src: [
                "./src/styles/*.{scss,sass}",
            ],
            dist: "./dist/styles/",
            watch: [
                "./src/blocks/**/*.{scss,sass}",
                "./src/styles/**/*.{scss,sass}"
            ]
        },
        scripts: {
            src: [
                "./src/js/*js",
                "./src/js/import/*js",
            ],
            dist: "./dist/js/",
            watch: [
                "./src/js/*.js",
                "./src/js/**/*.js"
            ]
        },
        pwa: {
            src: [
                "./pwa/**/*",
                "./pwa/*",
            ],
            dist: "./dist/",
            watch: [
                "./pwa/**/*",
                "./pwa/*",
            ]
        },
        images: {
            src: [
                "./src/img/**/*.{jpg,jpeg,png,gif,tiff,svg}",
                "!./src/img/responsive/**/*.{jpg,jpeg,png,gif,tiff}",
                "!./src/img/favicon/*.{jpg,jpeg,png,gif,tiff}"
            ],
            dist: "./dist/img/",
            watch: "./src/img/**/*.{jpg,jpeg,png,gif,svg}"
        },
        resize: {
            src: [
                "./dist/img/**/*-responsive.{jpg,jpeg,png,webp}",
                "!./src/img/favicon/*.{jpg,jpeg,png}"
            ],
            dist: "./dist/img/",
            watch: "./dist/img/**/*-responsive.{jpg,jpeg,png,webp}"
        },
        sprites: {
            src: "./src/img/svg/*.svg",
            dist: "./dist/img/sprites/",
            watch: "./src/img/svg/*.svg"
        },
        fonts: {
            src: "./src/fonts/**/*.{woff,woff2}",
            dist: "./dist/fonts/",
            watch: "./src/fonts/**/*.{woff,woff2}"
        },
        favicons: {
            src: "./src/img/favicon/*.{jpg,jpeg,png,gif,tiff}",
            dist: "./dist/img/favicons/",
        },
        gzip: {
            src: "./src/.htaccess",
            dist: "./dist/"
        }
    };

requireDir("./gulp-tasks/");

export { paths };

export const development = gulp.series("clean",
    gulp.parallel(["views", "styles", "scripts", "images", "webp", "sprites", "fonts", "favicons"]),
    gulp.parallel("resize"),
    gulp.parallel("pwa"),
    gulp.parallel("serve"));

export const prod = gulp.series("clean",
    gulp.parallel(["views", "styles", "scripts", "images", "webp", "sprites", "fonts", "favicons", "gzip"]),
    gulp.parallel("pwa"),
    gulp.parallel("resize"));

export default development;