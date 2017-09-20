var fs = require("fs");
var Vir = require("../public/Vir/Vir.js");
const { spawn } = require('child_process');
Vir.config(["htmlString"]);
var id = {
    js: 0
}
// 获取参数;
// var args = process.argv.splice(2);

var template = {
    html(op = { js: [""], css: [""] }, cb) {
        var scripts = op.js
            .map(str => "".prop(`script #job${++id.js} [src = "${str}"]`))
            .join("\n    ");
        var css = op.css
            .map(str => "".prop(`link [href = "${str}" rel="stylesheet"]`))
            .join("\n    ");

        var str = `<!DOCTYPE html>
<html lang="ch">

<head>
    <meta charset="utf-8">
    ${css}
    <script src="../Vir/Vir.js"></script>
</head>

<body>
    ${scripts}
</body>

</html>`;
        cb(null, str);
    }
}

var async = {
    consoleOK(path) {
        return function (err, str) {
            console.log(path + " is ok");
        }
    }
    , writeByPath(path) {
        return function (err, str) {
            if (err) {
                console.log(err);
                return;
            }
            fs.writeFile(path, str || "", async.consoleOK(path));
        }
    }
}
var job = {
    init({ mode = "", path = "", name = "" }) { //describ
        console.log(mode, path);
        if (path) {
            var filePath = [
                path + name + ".js"
                , 'F:/Proj/express/public/sass/' + name + ".scss"
                , path + name + ".html"
            ]
            //检查是否存在;
            var i = -1,
                len = filePath.length;

            //异步输出
            function checkFile(exists) {
                i++;
                if (exists) {
                    console.log(">>exist>>" + filePath[i - 1])
                }
                //if end
                if (i >= len) {
                    return;
                }
                fs.exists(filePath[i], checkFile)
            }

            //同步检查以快速终止;
            var have = false;
            for (var x of filePath) {
                i++;
                if (fs.existsSync(x)) {
                    console.log("Some file is existed:")
                    checkFile(true);
                    have = true;
                    break;
                }
            }

            if (!have) {
                //创建文件
                fs.readFile(__dirname + "/template/" + mode + "_m.js", async.writeByPath(filePath[0]));
                async.writeByPath(filePath[1])(null, "");
                template.html(
                    {
                        js: [name + ".js"]
                        , css: ["../css/" + name + ".css"]
                    }
                    , async.writeByPath(filePath[2])
                );

                //打开文件
                spawn('cmd.exe', ['/c', 'code ' + filePath[0]]);
                spawn('cmd.exe', ['/c', 'code ' + filePath[1]]);
                spawn('cmd.exe', ['/c', 'code ' + filePath[2]]);
            }
        }
    }
    , do(
        op = [
            {
                mode: "gssi"
                , path: "F:/Proj/express/public/VirDemo/"
                , name: "gssi"
            }
        ]
    ) {
        for (var x of op) {
            job.init(x);
        }
    }
    , getArgs(args) {
        this.args = args;
    }
}
module.exports = job;