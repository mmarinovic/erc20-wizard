'use strict';

const gulp = require('gulp');
const ts = require('gulp-typescript');
const del = require('del');
const mergeStream = require('merge-stream');

function clean() {
  return del(['./lib']);
}

function typescript() {
  const tsProject = ts.createProject('tsconfig.json');
  const compileStream = tsProject.src().pipe(tsProject());
  const sourceStream = compileStream.js.pipe(gulp.dest('lib'));
  const definitionStream = compileStream.dts.pipe(gulp.dest('lib'));
  return mergeStream(sourceStream, definitionStream);
}

function copyContracts() {
  const files = ['./src/Contracts/*'];
  return gulp.src(files).pipe(gulp.dest('./lib/Contracts/'));
}

const build = gulp.series(clean, typescript, copyContracts);

exports.default = build;
