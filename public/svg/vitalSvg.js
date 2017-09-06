/**
 * menu 
 * console command
 * drawboard
 */

// function vitalSvg(
var op = {
    menu: {}
    , draw: {}
}
// ) {
var draActive = null;
var dra = {
    //self configure

    set active(ele) {
        if (ele === null || ele === undefined) {
            draActive = null;
            return false;
        }
        dra.svg.appendChild(ele);
        draActive = ele;
        return true;
    }
    , get active() {
        return draActive;
    }
    , svg: null
    , width: 1000
    , height: 1000

    , setAttribute(doc, args = []) {
        for (var onep of args) {
            doc.setAttribute(onep[0], onep[1]);
        }
        return doc;
    }
    , create(one = "", x, y) {
        var doc;
        var args = [];
        switch (one) {
            case "point":
                return svg.circle([x, y, 3]);
            case "rec":
                one = "rect";
                args = [["x", x], ["y", y]];
                break;
            case "circle":
                args = [["cx", x], ["cy", y]];
                break;
            case "line":
                args = [["x1", x], ["y1", y], ["x2", x], ["y2", y]];
                break;
        }
        doc = document.createElementNS(svg.nameSpace, one)
        return dra.setAttribute(doc, args);
    }

    //for crossXY
    , crossX: null
    , crossY: null
    , crossAt: [0, 0]
    //移动对准轴
    , liveCross(x, y) {
        if (dra.crossX) {
            dra.crossX.x = x
        } else {
            dra.crossX = dra.createCross([x, 0], [x, dra.height])
        }

        if (dra.crossY) {
            dra.crossY.y = y
        } else {
            dra.crossY = dra.createCross([0, y], [dra.width, y]);
        }
    }
    , createCross(
        from = [0, 0]
        , to = [10, 10]
    ) {
        var cross = {
            set x(v) {
                cross.line.setAttribute("x1", v);
                cross.line.setAttribute("x2", v);
                return true;
            }
            , set y(v) {
                cross.line.setAttribute("y1", v);
                cross.line.setAttribute("y2", v);
                return true;
            }
            , line: svg.line(from.concat(to))
            , added: false
        }

        //append to svg
        dra.svg.appendChild(cross.line)
        cross.line.setAttribute("class", "crossLine");
        cross.added = true;
        return cross;
    }
    //crossXY end

    //magnetism point
    // refined the point that should be;
    , mgicPoint: {
        points: []
        , radius: 6
        , add(po = [10, 10]) {
            //有Array复制,请放心
            // var hashCode = po[0] + "," + po[0];
            // this.points[hashCode] = true;
            this.points.push([...po]);
        }
        , nearliest(nowAt = [10, 10], r = 4) {
            var points = this.points;
            var r2 = r * r;
            var minP = null;
            for (var x in points) {
                var dx = points[x][0] - nowAt[0];
                var dy = points[x][1] - nowAt[1];
                if (Math.abs(dx) <= r && Math.abs(dy) <= r) {
                    var dr = dx * dx + dy * dy;
                    if (dr < r2) {
                        r2 = dr;
                        minP = points[x];
                    }
                }
            }
            if (minP) {
                return [...minP];
            } else {
                return;
            }
        }
    }
    , mode: "point"
    , special: {
        none(e) { return; }
        , moving(e) { return; }
        , start(e) { return; }
        , clear(str = ["moving", "start"]) {
            str.forEach((v) => {
                this[v] = this.none;
            })
        }
        , tick(str) {
            dra.special.clear(str);
            return true;
        }
        , towClick(e) {
            return dra.special.tick();
        }
        , init(
            jsop = {
                start: "towClick"
                , moving(e) { }
            }
        ) {
            for (var x in jsop) {
                switch (x) {
                    case "start":
                        if (typeof jsop[x] == "string") {
                            this[x] = this[jsop[x]]
                        }
                        continue;
                }
                this[x] = jsop[x];
            }
        }
    }
    , startAt: [0, 0]
    , drawing : false
    , startDraw(e) {
        console.log(e);
        //add magic points
        dra.mgicPoint.add(dra.crossAt);
        dra.startAt = [...dra.crossAt];

        //wheather start the dra.mode
        //maybe you should write steps;
        if (dra.special.start(e)) {
            dra.drawing = false;
            return;
        }
        dra.drawing = true;

        //set to active will append to dra.svg
        var doc = dra.create(dra.mode, dra.crossAt[0], dra.crossAt[1]);
        dra.active = doc;
        //rewrite the function of dra.special
        switch (dra.mode) {
            case "rec":
            case "rect":
                dra.special.init({
                    start: "towClick"
                    , moving(e) {
                        //doc.x.baseVal.value; to get the value ;
                        //but I store the start point
                        var w = dra.crossAt[0] - dra.startAt[0];
                        var h = dra.crossAt[1] - dra.startAt[1];
                        if (w <= 0) {
                            doc.setAttribute("x", dra.crossAt[0]);
                            doc.setAttribute("width", -w);
                        } else {
                            doc.setAttribute("x", dra.startAt[0]);
                            doc.setAttribute("width", w);
                        }
                        if (h <= 0) {
                            doc.setAttribute("y", dra.crossAt[1]);
                            doc.setAttribute("height", -h);
                        } else {
                            doc.setAttribute("y", dra.startAt[1]);
                            doc.setAttribute("height", h);
                        }
                    }
                });
                break;
            case "circle":
                dra.special.init({
                    start: "towClick"
                    , moving(e) {
                        var dx = dra.crossAt[0] - dra.startAt[0];
                        var dy = dra.crossAt[1] - dra.startAt[1];
                        var r = Math.sqrt(dx * dx + dy * dy);
                        doc.setAttribute("r", r);
                    }
                })
                break;
            case "line":
                dra.special.init({
                    start: "none"
                    , moving(e) {
                        doc.setAttribute("x2", dra.crossAt[0]);
                        doc.setAttribute("y2", dra.crossAt[1]);
                        line.to = dra.crossAt;
                    }
                })
                var line = po.create("line",dra.startAt.concat(dra.crossAt))
                dra.hasDirty = true;
                break;
        }

    }
    , endDraw(e) {

    }
    , movingTo(e) {
        //处理磁力点
        var x = e.offsetX;
        var y = e.offsetY;
        var mgic = dra.mgicPoint.nearliest([x, y], dra.mgicPoint.radius);
        if (mgic) {
            x = mgic[0];
            y = mgic[1];
        }
        dra.liveCross(x, y);
        dra.crossAt = [x, y];
        dra.special.moving(e);
        po.checkInter(e);
    }
    //magnetism point end

    //history manager;
    //Dirty is something you think it is unnecessary
    , hasDirty: false
    , clearDirty() {
        if (dra.hasDirty) {
            dra.special.clear();
            dra.svg.removeChild(dra.active);
            dra.hasDirty = false;

            //kill active one??
            dra.active = null;
        }
    }
    //history manager end;
}

var geo = {
    mergeToLine(
        a = {
            type: "circle"
            , radius: 1
            , vpoint: [0, 0]
        }
        , b = {
            type: "circle"
            , radius: 1
            , vpoint: [1, 1]
        }
    ) {
        var A = 2 * (a.vpoint[0] - b.vpoint[0]);
        var B = 2 * (a.vpoint[1] - b.vpoint[1]);
        var C = b.radius * b.radius - a.radius * a.radius + a.vpoint[0] * a.vpoint[0] - b.vpoint[0] * b.vpoint[0] - b.vpoint[1] * b.vpoint[1] + a.vpoint[1] * a.vpoint[1]
        return {
            type: "line"
            , abc: [A, B, C]
        }
    }
    , circlecircle(
        a = {
            type: "circle"
            , radius: 1
            , vpoint: [0, 0]
        }
        , b = {
            type: "circle"
            , radius: 1
            , vpoint: [1, 1]
        }
    ) {
        var line = geo.mergeToLine(a, b);
        return geo.linecircle(line, a);
    }
    , circleline(
        l = {
            type: "line"
            , abc: [1, 1, 0]
        }
        , c = {
            type: "circle"
            , radius: 1
            , vpoint: [0, 0]
        }
    ) {
        var k = l.abc[0];
        var t = l.abc[1];
        var p = (l.abc[2] - k * c.vpoint[0] - t * c.vpoint[1]) / c.radius;

        var cos = geo.getCos(k, t, p);
        return cos.map(onep => {
            return onep.map((v, i) => {
                return v * c.radius + c.vpoint[i];
            })
        })
    }
    , lineline(
        l1 = {
            abc: [1, 1, 1]
        }
        , l2 = {
            abc: [0.5, 2, 1]
        }
    ) {
        var der = l1.abc[1] * l2.abc[0] - l1.abc[0] * l2.abc[1];
        if (Math.abs(der) > 1e-6) {
            return [(l1.abc[2] * l2.abc[1] - l1.abc[1] * l2.abc[2]) / der, (l1.abc[2] * l2.abc[0] - l1.abc[0] * l2.abc[2]) / der]
        } else {
            return []
        }
    }
    //k*cosx + t*sinx = p
    , getCos(k, t, p) {
        var ori = k * k + t * t;
        var der = ori - p * p;
        if (der > 0) {
            var ax = (p * k - Math.sqrt(der) * t) / ori
            var ay = (p * t + Math.sqrt(der) * k) / ori;
            var bx = (p * k + Math.sqrt(der) * t) / ori
            var by = (p * t - Math.sqrt(der) * k) / ori;
            return [[ax, ay], [bx, by]];
        } else if (der == 0) {
            return [[p * k / ori, p * t / ori]]
        } else {
            return [];
        }
    }
    //(x-x1)/(x1-x2) = (y-y1)/(y1-y2)
    , getabc(x1, y1, x2, y2) {
        return [y1 - y2, x2 - x1, y1 * x2 - y2 * x1];
    }
    // caculate tow points distance;
    , dist(from = [1, 0], to = [0, 1]) {
        var dx = from[0] - to[0];
        var dy = from[1] - to[1];
        if (typeof dx == "number" && typeof dy == "number") {
            return Math.sqrt(dx * dx + dy * dy);
        } else {
            console.error("po.dist() Error!")
            return 0;
        }
    }
    // whether it is a triangle; 
    , triangle(a = 3, b = 4, c = 5) {
        if (a + b >= c || a + c >= b || c + b >= a) {
            return false;
        }
        return true;
    }
    , disturb(ob,stick){
        var hashCode = "";
        if ( ob.type != stick.type){
            hashCode = [ob.type,stick.type].sort().join("");
        }else{
            hashCode = ob.type + stick.type;
        }
        var func = geo[hashCode];
        if(func){
            return func(ob,stick);
        }
        return [];
    }
}
var poActive = null;
var po = {
    all: [
        {
            type: "type"
            , vpoint: [0, 0]
        }
    ]
    , display :null
    //intersections;
    , Xero : {
        all :[]
        ,add(obarr = []){
            if(obarr.length > 0){
                this.all.push(obarr);
                return true;
            }else{
                return false;
            }
        }
        ,render(){
            po.display(this.all.join(","))
            this.all = [];
        }
        ,configure(
            ob={
                color : "red"
            }
        ){
            this.cf = ob;
        }
        ,cf:null
    }
    , set active(ob){
        poActive = ob;
        po.all.push(ob);
    }
    , get active(){
        return poActive;
    }
    , checkInter(e){
        var active = po.active;
        if(!dra.drawing  || active === null ){
            return ;
        }
        for(var i of po.all){
            if(i!==active){
                po.Xero.add ( geo.disturb(i,active));
            }
        }
        po.Xero.render();
    }
    , create(type = "circle", args = [0, 0, 3]) {
        var rus;
        switch (type) {
            case "circle":
                rus = {
                    type: "circle"
                    , center: [args[0], args[1]]
                    , radius: args[2]
                    , vpoint: [args[0], args[1]]
                }
                break;
            case "line":
                var _to = [args[2], args[3]];
                rus = {
                    type: "line"
                    , from: [args[0], args[1]]
                    , set to(poarr) {
                        _to = poarr;
                        this.vpoint = this.from.concat(_to);
                        this.abc = geo.getabc(...this.vpoint);
                    }
                    , get to() {
                        return _to;
                    }
                    , vpoint: [...args]
                    , abc: geo.getabc(...args)
                }
        }
        po.active = rus;
        return rus;
    }
    , riddleCircle(
        a = {
            type: "circle"
            , radius: 3
            , vpoint: [0, 0]
        }
        , b = {
            type: "circle"
            , radius: 3
            , vpoint: [2, 2]
        }
    ) {
        var dist = geo.dist(a.vpoint, b.vpoint);

        //has interection
        var is_hasX = geo.triangle(a.radius, b.radius, dist);
        if (is_hasX) {
            return {
                type: "line"
                ,
            }
        }
    }
}
var cmd = {
    dt: new Data({
        value: "rec"
        , history: [
            "welcome !"
            , "you can input cmd here"
        ]
    })
    , history: null
    , newOnep: null
    , run(str) {
        if (str === undefined) {
            str = cmd.dt.value.get();
        }
        dra.mode = str;
        switch (str) {
            case "rec":
                console.log("drawing the rect")
                break;
        }
        cmd.pushToHistory();
    }
    , pushToHistory() {
        cmd.dt.history.push(cmd.newOnep.value)
        cmd.dt.value.set("");
    }
    , focus() {
        if (document.activeElement == cmd.newOnep) {
            return;
        } else {
            cmd.newOnep.select();
        }
    }
}
var board = Vir([cmd, dra, po], {
    ".main ::main": {
        "svg .board ::svg": {
            "circle(10,10,20)": ""
            , on: {
                mousedown: dra.startDraw
                , mouseup: dra.endDraw
                , mousemove: dra.movingTo
            }
        }
    }
    , ".console": {
        ".historyList ::history": For(cmd.dt.history, (onep) => {
            return {
                ".onep": onep.get()
            }
        })
        , ".coding": {
            "input .onep ::newOnep ": {
                args: {
                    model: cmd.dt.value
                }
            }
        }
    }
    , ".displaying ::display"(str = "liumiao"){
        return {
            $:str
        }
    }
    /* 暂未实现
    , on :{
        "keydown"(e){
            switch(e.keyCode){
                case 13:
                    cmd.run();
                    break;
                default:
                    cmd.newOnep.focus();
            }
        }
    }
    */
})
var dt3 = {
    list:[
        "good"
        ,"nice"
    ]
    ,title:"welcome"
}
var dom3 = Vir({
    ".title":{
        $:dt3.title
    }
    , "ul": For(
        dt3.list
        , (listr) =>( { li : listr } )
        , {
            args : {
                className : "ulList"
            }
        }
    )// *新** 三参数For(),第三个参数相当于写在"ul"上; 这里生成了: "ul.ulList > li ..."
    // *新** For 也可以用普通的值为第一参数;,只是不能双向绑定了
    // ps: 想要 n参数的 For()??, 那样不好看了,算了;除非有必要;
    , "same as last one ul; ul":{
        li : dt3.list
        ,args : {
            className : "ulList"
        }
    }
})
//dom Element bind
window.addEventListener("keydown", function (e) {
    switch (e.keyCode) {
        case 13:
            cmd.run();
            break;
        case 27:
            dra.clearDirty();
            break;
        default:
            cmd.focus();
            break;
    }
})
// }
// vitalSvg();