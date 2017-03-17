# connect-md
view markdow files in browser with connect.js in a specify url ext

> configs

- it very simple

|name  | description|default value|
|------|------------|------|
|baseDir|the basepath of your md files|'./md/'| 
|ext| you special url ext |'.md'|

to visit `/foler/README.md` just use `/folder`

#### test
just clone this and run `npm run test`

> useage

- with `connect.js`   
```
var connect = require('connect')
var connct_md = require('connect-md')
var opt = {
    baseDir: './doc/',
    ext: '.html'
};
connect.server({
    root: ['./doc'],
    port: 9400,
    livereload: false,
    middleware: function() {
        return [connct_md(opt)];
    }
});
```

- with `gulp-connect`
```
var gulp = require('gulp')
var connect = require('gulp-connect')
var connct_md = require('connect-md')
var opt = {
    baseDir: './doc/',
    ext: '.html'
};
gulp.task('previewMarkdown',()=>{
    return connect.server({
        root: ['./doc'],
        port: 9400,
        livereload: false,
        middleware: function() {
            return [connct_md(opt)];
        }
    });
})

```