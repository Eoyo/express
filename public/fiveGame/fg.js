if (!nwjs) {
    var nwjs = {};
}
// nwjs.fiveGame = function () {
// var proj = new Data(srProj)

js.store({
    "myName": {
        //读取时调用
        get(value) {
            console.log(value);
        }

        //页面关闭时存储
        , set() {
            return "Storage Success!"
        }
    }
})

//事件回调
app.on({
    "checkName"(data) {
        if (data.check) {
            login.accept();
        } else {
            login.wrong();
        }
    }
    , "getPlayerList"(mes) {
    }
})

//icon
var icon = {
    close: "X"
}

//各个用于记录的对象
var args = {

    //标记刚刚下的棋子是哪个
    lastOne: {
        clearSet(ele, turn) {
            this.clear();
            this.ele = ele;
            this.keyClass = turn;
        }
        , clear() {
            if (this.ele) {
                this.ele.className = "qiwei " + this.keyClass;
            }
        }
        , set(ele) {
            this.ele = ele;
            this.keyClass = ele.classList[1]
            ele.className += " lastOne"
        }
        , init() {
            this.keyClass = ""
            this.ele = null
        }
        , keyClass: ""
        , ele: null
    }

    //轮到谁个了
    , turner: {
        all: ["bai", "hei"]
        , troggle: 0
        , cur: "bai"
        , getOldSetNew() {
            var old = this.all[this.troggle];
            this.troggle ^= 1;
            doa.shower.className = this.all[this.troggle];
            this.cur = this.all[this.troggle];
            return old;
        }
        , turnTo(type) {
            this.cur = "bai";
            doa.shower.className = "bai";
            switch (type) {
                case "bai":
                    this.troggle = 0;
                    return "先手";
                case "hei":
                    this.troggle = 0;
                    args.lock.lockAll = true;
                    return "后手";
            }
        }
        , getType() {
            return this.troggle + 1;
        }
    }

    //棋盘锁
    , lock: {
        arr: new Array(15 * 15).fill(0)
        , lockAll: false
        , won: false
        , has(k) {
            if (this.arr[k]) {
                return true;
            } else {
                return false;
            }
        }
        , add(k) {
            if (this.lockAll || this.won) {
                return false;
            }
            if (this.arr[k] > 0) {
                return false;
            } else {
                this.arr[k] = args.turner.getType();
                return true;
            }
        }
        , release(ele) {
            this.arr[ele.index] = 0;
            ele.className = "qiwei none";
        }
    }

    //棋子位置与下棋顺序
    , path: {
        getEle(k) {
            return doa.divs[k];
        }
        , arr: []
        , add(ele) {
            if (chess.check(ele.index)) {
                chess.victory();
            }
            this.arr.push(ele.index);
            var turn = args.turner.getOldSetNew()
            ele.className = "qiwei " + turn + " lastOne";
            args.lastOne.clearSet(ele, turn);
        }
        , addIndex(ind) {
            var ele = doa.divs[ind];
            this.add(ele);
        }
        , backOne() {
            if (args.lock.lockAll) {
                console.log("胜负已分,重来吧")
                return false;
            }


            var id = this.arr.pop()
            if (id == undefined) {
                return false;
            }
            var cur = this.arr[this.arr.length - 1]
            args.turner.getOldSetNew();
            args.lock.release(args.lastOne.ele);
            if (cur !== undefined) {
                args.lastOne.set(this.getEle(cur));
            } else {
                args.lastOne.init();
            }
            return true;
        }
        , clear(mod) {
            args.lock.won = false;
            args.lock.lockAll = false;
            chess.wonPlayer = "none";
            switch (mod) {
                case "fast":
                    while (this.backOne()) { }
                    break;
                case "animation":
                    var path = this;
                    var fh = 3;
                    var di = 0;
                    (function animation() {
                        di++;
                        if (di == fh && !path.backOne()) {
                            return;
                        }
                        di %= fh;
                        window.requestAnimationFrame(animation)
                    })();
                    break;
            }
        }
    }

    //是否联机
    , together: false
}

//登录的控制
var login = {
    input: null
    , setName: false
    , dt: new Data({
        class: ""
        , message: ""
        , show: false
    })
    , wrong() {
        var dt = this.dt;
        dt.class.set("wrong");
        dt.message.set("wrong!有人注册了")
    }
    , accept() {
        var dt = this.dt;
        dt.class.set("ok");
        dt.message.set("accept!")
    }
}

//下棋Ai处理
var chess = {
    arr: args.lock.arr
    ,wonPlayer:"none"
    , dt: new Data({
        mes: ""
    })
    , direc: [[-1, -1], [-1, 0], [-1, 1], [0, 1]]
    , check(ipoint) {
        var typen = args.turner.getType();
        var x = ipoint % 15;
        var y = (ipoint - x) / 15
            , num = 1
            , maxNum = 1
            , m = x
            , n = y
            , curtype = ""
        for (var dc = 0; dc < 4; dc++) {
            var i = this.direc[dc][0];
            var j = this.direc[dc][1];
            num = 1; m = x; n = y;
            do {
                num++;
                m += i;
                n += j;
                curtype = this.getAt(m, n);
            } while (curtype == typen);
            num--;
            m = x; n = y;
            do {
                num++;
                m -= i;
                n -= j;
                curtype = this.getAt(m, n);
            } while (curtype == typen);
            num--;

            if (num > maxNum) {
                maxNum = num;
            }
        }
        if (maxNum >= 5) {
            return true;
        } else {
            return false;
        }
    }
    , getAt(i, j) {
        if (i < 0 || i >= 15 || j < 0 || j >= 15) {
            return -1;
        } else {
            return this.arr[j * 15 + i]
        }
    }
    , victory() {
        console.log(args.turner.cur, "win");
        mes.show(args.turner.cur + " win")
        chess.wonPlayer = args.turner.cur;
        args.lock.won = true;
        args.lock.lockAll = true;
    }
}

//聊天栏
var chat = {
    sendMsg() {
        //添加element
        var doc = this
        var str = doc.value;
        Vir(doa.chats,chat.createOneDialog("Me",str));
        doc.value = "";

        //添加动画
        var chats = doa.chats;
        var hi = chats.scrollHeight;
        var aimtop = hi - 288;
        if (aimtop < 0) return;
        var temptop = chats.scrollTop;
        var dhi = (aimtop - chats.scrollTop) / 20;
        //之前的scrollto 没有停止,只是被新的scrollto的效果覆盖了
        //以人的速度最多按出scollto同时9个;
        /*
        (function scrollto() {
            temptop += dhi;
            if (Math.abs(aimtop - temptop) <= dhi) {
                chats.scrollTop = aimtop;
                console.log("onescrollToEnd")
                return;
            }
            chats.scrollTop = Math.round(temptop);
            window.requestAnimationFrame(scrollto);
        }());
        */

        //偷换函数的动画效果
        // 貌似有阻止你不停傻按的效果;
        (chat.scrollto = function (){
            temptop += dhi;
            if (Math.abs(aimtop - temptop) <= dhi) {
                chats.scrollTop = aimtop;
                console.log("onescrollToEnd")
                return;
            }
            chats.scrollTop = Math.round(temptop);
            window.requestAnimationFrame(chat.scrollto);
        })();
        //
    }
    , createOneDialog(littlename, str, from) {
        if (from == "he") {
            from = ".hesent";
        } else {
            from = ".mysent";
        }
        return {
            [from]: {
                ".head": {
                    $: littlename
                }
                , ".words": {
                    $: str
                }
            }
        }
    }
}

//message
var srMes = {
    show: true
    , value: ""
}
srMes = new Data(srMes);
var mes = {
    dt : srMes
    , troggle :0
    ,show(str) {
        this.troggle ^= 1;
        doa.mes.className = "active" + this.troggle;
        mes.dt.value.set(str)
    }
    , close(){
        doa.mes.className = "";
    }
}

//在线玩家列表 
var player = {
    dt: new Data({
        list :[
            {

            }
        ]
    })
}

//html dom
var doa = Vir({
    ".wap #bigwap": {
        ".gameboard": {
            "table #bigtable [border='1px' cellspacing = '0']": {
                "14*tr>14*td": {}
            }
            , "15*div.onelineQiwei > 15* div .qiwei.none ::divs": {
                on: {
                    create(ele, index) {
                        var left = index % 15;
                        ele.style.left = left * 39 - 15 + "px"
                        ele.style.top = "-15px";
                        ele.index = index;
                    }
                    , click() {
                        if (!args.lock.add(this.index)) {
                            if(args.lock.won){
                                mes.show("胜负已分,重来吧( "+ chess.wonPlayer +" win )")
                            }
                            return;
                        }
                        //联机时一次下一步
                        if (args.together) {
                            args.lock.lockAll = true;
                            me.chessAt(this.index);
                        }
                        args.path.add(this);
                    }
                }
            }
        }
    }
    , ".wap #msg": {
        "center": {
            "h1": {
                $: "FiveGame!"
            }
            , "#wturn ": {
                "span #whonow": {
                    $: "Now is You"
                }
                , "#wturnqi ::shower": {
                    args: {
                        class: args.turner.cur
                    }
                }
            }
            , ".mybt1": {
                "3*div": {
                    on: {
                        click() {
                            switch (this.innerHTML) {
                                case "back":
                                    args.path.backOne();
                                    break;
                                case "again":
                                    args.path.clear("animation")
                                    break;
                            }
                        }
                    }
                    , $: [
                        "back", "again", "peace"
                    ]
                }
            }
            , "#lishimsg": {
                ".mymsg": {
                    ".msgtouxiang": "Wo"
                    , ".msgs > .click": {
                        on: {
                            click(e) {
                                app.getPlayerList()
                            }
                        }
                    }
                }
                , "hr": {}
                , ".chat ::chats": {
                    ".hesent": {
                        ".head": {
                            $: "Sn"
                        }
                        , ".words": {
                            $: "let's go!"
                        }
                    }
                }
            }
            , "input #msgtosend [type = 'text']": {
                on: {
                    keydown: {
                        "enter": chat.sendMsg
                    }
                    // keydown:{
                    //     "enter"(){
                    //         console.log(keyCode);
                    //     }
                    // }
                }
            }
        }
    }
    , "#login": {
        args: {
            class: {
                active: login.dt.show
            }
        }
        , ".mask": {}
        , ".loginTent": {
            "h2": "取个用户名吧"
            , "input ::inputName": {
                args: {
                    placeholder: "nihao"
                    , className: login.dt.class
                }
                , on: {
                    input: Tool.initFunc("delay", {
                        func(e) {
                            var name = e.target.value;
                            console.log(name);
                            app.checkName(name);
                        }
                        , time: 100
                    })
                }
            }
            , ".message": {
                args: {
                    className: login.dt.class
                }
                , $: login.dt.message
            }
            , "button": {
                on: {
                    click(e) {
                        app.setName(doa.inputName.value)
                    }
                }
                , $: "comand"
            }
        }
    }
    , "#message ::mes": {
        ".close": {
            $: icon.close
            , on: {
                click() {
                    mes.close();
                }
            }
        }
        , ".content": {
            $: mes.dt.value
        }
    }
    , "#playerList":{
        ".content":{
            ".head":{

            }
            ,".list":For(player.dt.list,(onep) =>{
                return {

                }
            })
        }
    }
})
// var a = new Data({
//     good: "good"
// });
    // nwjs.fiveGame = fiveGame;
// }
// nwjs.fiveGame();

//js缓存浏览器样式表
    //利用chrome 写样式
//中转站控制流程顺序

//双电脑协作;
//alert 两窗口不能同时冒出;