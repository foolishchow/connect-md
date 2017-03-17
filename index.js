var path = require('path');
var defaults = require('defaults');
var parseurl = require('parseurl');
var markdown = require('marked');
var fs = require('fs');

var wrapHtml = function(req, content) {
        var host = "http://" + req.headers.host;
        var header = `
<!doctype html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" />
    <meta name="apple-mobile-web-app-capable" content="yes" />
    <meta name="apple-mobile-web-app-status-bar-style" content="black" />
    <meta content="telephone=no" name="format-detection" />
    <link type="text/css" rel="stylesheet" href="${host}/node_cmd_style/highlight.css">
    <link type="text/css" rel="stylesheet" href="${host}/node_cmd_style/originalTheme.css">
    <title></title>
</head>
<body>
<div class="file">
<div class="blob instapaper_body">
<article class="markdown-body entry-content" itemprop="mainContentOfPage">
`;

        var footer = `
    </div></div>
    </article>
    </body>
    <script type="text/javascript" src="${host}/node_cmd_style/highlight.js "></script>
    <script type="text/javascript" src="${host}/node_cmd_style/jquery.js "></script>
    <script type="text/javascript" src="${host}/node_cmd_style/init.js "></script>
    </html>
`;

        return header + content + footer;
    }
    // markdown 文件查看插件
module.exports = function(opt) {
    opt = defaults(opt, {
        baseDir: './md/',
        ext: '.md'
    });

    // second parameter in indexOf tells it to skip ahead to the end of the string instead of checking the entire thing
    // http://stackoverflow.com/questions/280634/endswith-in-javascript
    function endsWith(str, suffix) {
        return str.indexOf(suffix, str.length - suffix.length) !== -1;
    }

    return function(req, res, next) {
        // This is for when we're mounted in a subdir in express, it strips the subdir from the file path.
        // For example:
        //
        //   app.use('/subdir', connectSSI({baseDir: __dirname + '/public'});
        //
        // Normally, a request for /subdir/index.shtml would try to load /public/subdir/index.shtml
        // With parseurl, it's correctly converted to /public/index.shtml.
        var url = parseurl(req).pathname;

        if ( /^\/node_cmd_style/.test(url)) {
            var p = url.replace(/^\/node_cmd_style/,'');
            p = path.resolve(__dirname,'themes','.'+p);

            try {
                var str = fs.readFileSync(p, 'utf-8');
                res.end(str);
            } catch (e) {
                res.end(e.toString());
            }
        } else {

            url = /\/$/.test(url) ? (url + 'README' + opt.ext) : url;

            if (!endsWith(url, opt.ext)) {
                return next();
            }

            var filePath = path.join(opt.baseDir, "." + url.replace(opt.ext, '.md'));
            var str;
            try{
                str = fs.readFileSync(filePath, 'utf-8');
            }catch(e){
                console.info(`read file ${filePath} failed !`)
                next();
            }
            try {
                var content = markdown(str);
                var html = wrapHtml(req, content)
                res.end(html);
            } catch (e) {
                res.end(e.toString());
            }
        }


    };
};
