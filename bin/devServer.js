#!/usr/bin/env node

'use strict';

var express = require('express');
var app = express();
var serveStatic = require('serve-static');
var gulp = require('gulp');
var vendorResourceList = require('../loader.json');
var gulpfile = require('../gulpfile');
var order = require('gulp-order');
var through = require('through');
var path = require('path');
var ROOT = path.resolve(gulpfile.SRC);
var less = require('gulp-less');
var sourcemaps = require('gulp-sourcemaps');
var tap = require('gulp-tap');
var merge = require('merge-stream');
var gutil = require('gulp-util');
var fs = require('fs');
var crypto = require('crypto');
var debug = require('debug');
var add = require('gulp-add-src').append;
var concat = require('gulp-concat');

var tapDebug = function (name, showContent) {
    var logger = debug(name);
    return tap(function (file) {
        if (showContent) {
            logger(file.path, file.contents.toString().substr(0, 1024));
        } else {
            logger(file.path);
        }
    });
};

app.get('/app.js', function (req, res) {
    res.set('Content-Type', 'text/javascript');

    merge(gulp.src(vendorResourceList.scripts, {
        read: false,
        base: gulpfile.BASE
    }), gulp.src([
        gulpfile.SRC + '**/*.js',
        '!' + gulpfile.SRC + 'node_modules/**/*.*',
        '!' + gulpfile.SRC + 'bin/**/*.*',
        '!' + gulpfile.SRC + '**/gulpfile.js',
        '!' + gulpfile.BUILD + '**/*.*',
    ], {
        base: gulpfile.BASE,
        read: false
    }))
    .pipe(order(vendorResourceList.scripts.concat([
        gulpfile.SRC + 'loader.js',
        gulpfile.SRC + '**/*.js'
    ]), {
        base: gulpfile.BASE
    }))
    .pipe(tapDebug('script'))
    .pipe((function () {
        var files = [];
        return through(function (file) {
            files.push(file.path.substr(ROOT.length).replace(/\\/g, '/'));
        }, function () {
            res.send(files.map(function (file) {
                return 'document.write(\'<script src="' + file + '"></script>\');';
            }).join('\n'));
        });
    }()));
});

app.get('/app.css', function (req, res) {
    res.set('Content-Type', 'text/css');

    gulp.src(gulpfile.SRC + 'loader.less')
        .pipe(sourcemaps.init())
        .pipe(less({
            lint: true,
            noIeCompat: true,
            relativeUrls: true
        }))
        .pipe(add(vendorResourceList.styles))
        .pipe(tapDebug('style'))
        .pipe(concat('app.css'))
        .pipe(sourcemaps.write())
        .pipe(tap(function (file) {
            res.send(file.contents);
        }));
});

app.use('/app.manifest', function (req, res, next) {
    fs.readFile(gulpfile.SRC + 'index.html', {
        encoding: 'utf-8'
    }, function (err, data) {
        if (err) {
            next(err);
            return;
        }

        var md5sum = crypto.createHash('md5');
        md5sum.update(data);
        var hash = md5sum.digest('hex');

        res.status(200).send('CACHE MANIFEST\n# ' + hash + '\nNETWORK:\n*');
    });
});

app.use(serveStatic(gulpfile.BASE, {
    index: ['index.html']
}));

app.listen(3000, function () {
    gutil.log('Development server listening on http://127.0.0.1:3000');
});
