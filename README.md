# express
这不是单独的一个项目,是项目大杂烩.前端项目以后都放在public/.

利用Vir.js, 模板的渲染也交给浏览器;大部分前端项目都可以独立运行;

各个项目的具体介绍都放在项目目录的README.md里;

# 2017 9 18
`node/` 文件夹: job.js与config.js生成项目;
>confg.js:
```js
var job = require("./job.js")
job.do([
    {
        mode: "gssi"
        , path: "F:/Proj/express/public/VirDemo/"
        , name: "gssi"
    }
])
//利用node命令行工具是code 打开 这些文件;[发]
```