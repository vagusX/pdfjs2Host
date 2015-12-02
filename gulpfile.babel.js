'use strict'

import gulp from 'gulp'
import uglify from 'gulp-uglify'
import cssMinify from 'gulp-minify-css'
import del from 'del'
import ejsmin from 'gulp-ejsmin'
import babel from 'gulp-babel'
import runSequence from 'run-sequence'

import pkg from './package.json'

const _distDir = `pdfjs-v${pkg.version}`

gulp.task('sample', () => {
  return gulp.src('sample/pdfreader.js')
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(gulp.dest('sample/js'))
})

gulp.task('clean', () => {
  return del([_distDir])
})

gulp.task('index', () => {
  return gulp.src('src/*.html')
    .pipe(ejsmin())
    .pipe(gulp.dest(`${_distDir}`))
})

gulp.task('cmaps', () => {
  return gulp.src('src/cmaps/**')
    .pipe(gulp.dest(`${_distDir}/cmaps`))
})

gulp.task('css', () => {
  return gulp.src('src/css/*.css')
    .pipe(cssMinify())
    .pipe(gulp.dest(`${_distDir}/css`))
})

gulp.task('images', () => {
  return gulp.src('src/images/**')
    .pipe(gulp.dest(`${_distDir}/images`))
})

gulp.task('locale', () => {
  return gulp.src('src/locale/**')
    .pipe(gulp.dest(`${_distDir}/locale`))
})

gulp.task('js', () => {
  return gulp.src('src/js/*.js')
    .pipe(uglify())
    .pipe(gulp.dest(`${_distDir}/js`))
})

gulp.task('default', (cb) => {
  runSequence('clean', 'cmaps', 'index', 'images', 'locale', 'css', 'js', cb)
})
