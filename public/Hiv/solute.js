function Router() {
    var dep = new Dep();
    function createAjax() {
        return new XMLHttpRequest()
        // if (window.XMLHttpRequest) {// code for IE7+, Firefox, Chrome, Opera, Safari
        //     return new XMLHttpRequest()
        // }
        // else {// code for IE6, IE5
        //     return new ActiveXObject("Microsoft.XMLHTTP")
        // }
    }
    var app = {
        get(tg) {
            for (let x in tg) {
                let tgx = tg[x];
                app[x] = function (...args) {
                    tgx.func.call(tgx, ...args)

                    var xhr = createAjax();
                    xhr.open("GET", tgx.url, true);
                    xhr.send();
                    xhr.onreadystatechange = function (e) {
                        if (xhr.readyState == 4 && xhr.status == 200) {
                            dep.emit(x, JSON.parse(xhr.response));
                        }
                    }
                }
            }
        }
        , post(tg) {
            for (let x in tg) {
                let tgx = tg[x];
                app[x] = function (...args) {
                    if (tgx.func) {
                        tgx.func.call(tgx, ...args)
                    }
                    $.ajax({
                        type: "post"
                        , dataType: "json"
                        , data: tgx.data
                        , url: tgx.url
                        , success(data) {
                            dep.emit(x, data);
                        }
                    })
                }
            }
        }
        , on(tg, cb) {
            if (tg && typeof tg == "object") {
                for (let x in tg) {
                    dep.addEvent(x, tg[x])
                }
            } else {
                dep.addEvent(tg, cb)
            }
        }
    }
    return app;
}
var app = Router();

app.post({
    "setStep": {
        func(data) {
            this.data = data;
        }
        , url: "/tstep"
        , data: "null"
    }
    , "loadFile": {
        func(data) {
            this.data = data;
        }
        , url: "/file-upload"
        , data: null
    }
    , "setName": {
        func(namestr) {
            this.data = {
                name: namestr
                , type: "set"
            }
        }
        , url: "/tname"
        , data: null
    }
    , "checkName": {
        url: "/tname"
        , func(namestr) {
            this.data = {
                name: namestr
                , type: "check"
            }
        }
        , data: null
    }
})

var fiveGame = {
    createPlayer(name) {
        var me = {
            ws: new WebSocket("ws://localhost:8181")
            , name: name
            , state: "answering"
            , partnerName : "null"
            , wantToPlayWith : ""
            , getMessage(e) {
                // console.log(e);
                var mes = JSON.parse(e.data);
                switch (mes.type) {
                    case "someOneAskYou":
                        if (confirm(mes.asker + " wants to play with you!")) {
                            me.send({
                                type: "confirm"
                                , value: true
                            })
                            me.wantToPlayWith = mes.asker;
                        } else {
                            me.send({
                                type: "confirm"
                                , value: false
                            })
                        }
                        break;
                    case "confirm":
                        if (mes.value) {
                            alert("Ta,答应了")
                            me.send({ type: "startChess" })
                        } else {
                            alert("Ta,拒绝了")
                        }
                        break;

                    case "startChess":
                        //清理现场
                        args.path.clear("animation");

                        args.together = true;
                        me.state = "chessing";
                        var message = args.turner.turnTo(mes.hand);
                        console.log("游戏开始! 你是" + message);
                        login.dt.show.set(false);
                        me.partnerName = me.wantToPlayWith ;
                        break;
                    //队友下了一个后
                    case "chess":
                        args.path.addIndex(mes.index);
                        args.lock.lockAll = false;
                }
            }
            , selectPartner(name){
                this.send ({
                    func:"selectPartner"
                    ,args:name
                })
                this.wantToPlayWith = name;
            }
            , do(funcStr = "", args) {
                this.ws.send(JSON.stringify({
                    func: funcStr
                    , args: args
                }))
            }
            , send(obj) {
                if (!js.isNotSimple(obj)) {
                    alert("You should send JSON to server");
                    console.error("JSON obj is expected");
                    return;
                }
                var str = JSON.stringify(obj);
                this.ws.send(str);
            }
            , startPlayer(name) {
                this.send({
                    name: name
                })
            }
            , chessAt(index) {
                if (me.state == "chessing" && args.together) {
                    me.send({
                        from: "me"
                        , type: "chess"
                        , index: index
                    })
                }
            }
        }
        me.ws.onopen = function (e) {
            console.log("connected!")
        }
        me.ws.onmessage = me.getMessage;
        return me;
    }
}
// var me = fiveGame.createPlayer();
// app.getName("data");