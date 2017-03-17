var gulp = require('gulp')
var connect = require('gulp-connect')
var connct_md = require('../index.js')
var opt = {
    baseDir: './doc/',
    ext: '.md'
};
gulp.task('default',()=>{
    return connect.server({
        root: ['./doc'],
        port: 9400,
        livereload: false,
        middleware: function() {
            return [connct_md(opt)];
        }
    });
})