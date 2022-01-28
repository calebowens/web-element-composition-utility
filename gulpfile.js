const { watch, src, dest, series } = require('gulp')
const typescript = require('gulp-typescript')
const webpack = require('webpack-stream')
const webserver = require('gulp-webserver')
const babel = require('gulp-babel')

console.log(require('./tsconfig.json'))

function serve() {
    return src('./dist/')
        .pipe(webserver({
            livereload: true,
            open: true,
        }))
}

const project = typescript.createProject(require('./tsconfig.json').compilerOptions)

function compileTS() {
    return src(['./src/**/*.ts', './src/**/*.tsx'])
        .pipe(project())
        .pipe(babel(require('./.babelrc.json')))
        .pipe(dest('.build'))
}

function compileWebpack() {
    return src('./.build/**/*.js')
        .pipe(webpack({
            mode: 'development',
            target: ['web', 'es6']
        }))
        .pipe(dest('./dist/'))
}

function watchFiles() {
    watch(['./src/**/*.ts', './src/**/*.tsx'],
        series(compileTS, compileWebpack)
        )
}

exports.default = watchFiles
exports.watch = watchFiles
exports.serve = serve