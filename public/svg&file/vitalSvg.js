/**
 * menu 
 * console command
 * drawboard
 */

Vir.config(["htmlString"])

var svgData = {
    halfFace : '<line x1="287" y1="216" x2="437" y2="142"></line><line x1="437" y1="142" x2="467" y2="81"></line><line x1="467" y1="81" x2="489" y2="131"></line><line x1="489" y1="131" x2="518" y2="164"></line><line x1="518" y1="164" x2="515" y2="187"></line><line x1="515" y1="187" x2="453" y2="212"></line><line x1="453" y1="212" x2="465" y2="220"></line><line x1="465" y1="220" x2="435" y2="225"></line><line x1="435" y1="225" x2="406" y2="234"></line><line x1="406" y1="234" x2="430" y2="235"></line><line x1="430" y1="235" x2="387" y2="243"></line><line x1="387" y1="243" x2="375" y2="250"></line><line x1="375" y1="250" x2="391" y2="254"></line><line x1="391" y1="254" x2="348" y2="259"></line><line x1="348" y1="259" x2="351" y2="268"></line><line x1="351" y1="268" x2="367" y2="266"></line><line x1="367" y1="266" x2="318" y2="288"></line><line x1="318" y1="288" x2="311" y2="332"></line><line x1="311" y1="332" x2="308" y2="378"></line><line x1="308" y1="378" x2="333" y2="383"></line><line x1="333" y1="383" x2="347" y2="415"></line><line x1="347" y1="415" x2="327" y2="406"></line><line x1="327" y1="406" x2="341" y2="444"></line><line x1="341" y1="444" x2="334" y2="469"></line><line x1="334" y1="469" x2="335" y2="499"></line><line x1="335" y1="499" x2="329" y2="524"></line><line x1="329" y1="524" x2="306" y2="476"></line><line x1="306" y1="476" x2="277" y2="441"></line><line x1="277" y1="441" x2="275" y2="406"></line><line x1="275" y1="406" x2="262" y2="325"></line><line x1="262" y1="325" x2="277" y2="263"></line><line x1="277" y1="263" x2="287" y2="216"></line><line x1="477" y1="212" x2="483" y2="277"></line><line x1="483" y1="277" x2="523" y2="307"></line><line x1="523" y1="307" x2="543" y2="321"></line><line x1="543" y1="321" x2="513" y2="341"></line><line x1="513" y1="341" x2="497" y2="358"></line><line x1="497" y1="358" x2="513" y2="383"></line><line x1="513" y1="383" x2="522" y2="388"></line><line x1="522" y1="388" x2="523" y2="396"></line><line x1="523" y1="396" x2="529" y2="409"></line><line x1="529" y1="409" x2="506" y2="463"></line><line x1="506" y1="463" x2="454" y2="484"></line><line x1="454" y1="484" x2="438" y2="511"></line><line x1="334" y1="469" x2="342" y2="532"></line><line x1="415" y1="289" x2="427" y2="277"></line><line x1="427" y1="277" x2="439" y2="269"></line><line x1="439" y1="269" x2="458" y2="263"></line><line x1="458" y1="263" x2="472" y2="258"></line><line x1="472" y1="258" x2="457" y2="254"></line><line x1="457" y1="254" x2="431" y2="261"></line><line x1="431" y1="261" x2="412" y2="273"></line><line x1="412" y1="273" x2="415" y2="289"></line><line x1="421" y1="322" x2="442" y2="304"></line><line x1="442" y1="304" x2="477" y2="286"></line><line x1="477" y1="286" x2="467" y2="275"></line><line x1="467" y1="275" x2="452" y2="275"></line><line x1="452" y1="275" x2="424" y2="286"></line><line x1="424" y1="286" x2="423" y2="298"></line><line x1="423" y1="298" x2="425" y2="312"></line><line x1="446" y1="299" x2="449" y2="286"></line><line x1="449" y1="286" x2="460" y2="284"></line><line x1="460" y1="284" x2="471" y2="286"></line><circle cx="459" cy="292" r="3"></circle><circle cx="335" cy="347" r="3"></circle><circle cx="343" cy="425" r="3"></circle><line x1="344" y1="475" x2="372" y2="498"></line><line x1="372" y1="498" x2="454" y2="484"></line><line x1="326" y1="338" x2="311" y2="332"></line><line x1="311" y1="332" x2="293" y2="335"></line><line x1="293" y1="335" x2="282" y2="369"></line><line x1="282" y1="369" x2="328" y2="427"></line><line x1="328" y1="427" x2="357" y2="431"></line><line x1="357" y1="431" x2="352" y2="402"></line><line x1="352" y1="402" x2="348" y2="363"></line><line x1="348" y1="363" x2="326" y2="338"></line>'
}

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

    /**
     * 使用数组args = [ ["cx",12] , ["cy",12]]
     */
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
    , setMode(str){
        switch(str){
            case "circle":
            case "rec":
            case "rect":
            case "point":
            case "line" :
            case "clear":
                dra.mode = str;
                return true;
        }
        return false;
    }
    , special: {
        none(e) { return; }
        , moving(e) { return; }
        , start(e) { return; }
        , end(e) { return; }
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
    , drawing: false
    , clickTimes: 1
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
                dra.clickTimes = 2;
                break;
            case "circle":
                dra.special.init({
                    start: "towClick"
                    , moving(e) {
                        var at = dra.crossAt;
                        var dx = at[0] - dra.startAt[0];
                        var dy = at[1] - dra.startAt[1];
                        var r = Math.sqrt(dx * dx + dy * dy);
                        doc.setAttribute("r", r);
                        circle.radius = r;
                    }
                    , end() {
                        dra.clickTimes && po.clearDirty();
                    }
                })
                var circle = po.create("circle", [...dra.startAt, 0])
                dra.hasDirty = true;
                dra.clickTimes = 2;
                break;
            case "line":
                dra.special.init({
                    start: "none"
                    , moving(e) {
                        var at = dra.crossAt;
                        doc.setAttribute("x2", at[0]);
                        doc.setAttribute("y2", at[1]);
                        line.to = at;
                    }
                    , end() {
                        console.log(dra.clickTimes);
                        dra.clickTimes && po.clearDirty();
                    }
                })
                var line = po.create("line", dra.startAt.concat(dra.crossAt))
                dra.hasDirty = true;
                dra.clickTimes = 2;
                break;
        }
    }
    , endDraw(e) {
        if (dra.clickTimes > 0) {
            dra.clickTimes--;
        }
        if (dra.clickTimes > 0) {
            return;
        } else {
            dra.clear();
            dra.special.end(e);
        }
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
        if (dra.clickTimes <= 0) {
            return;
        }
        dra.special.moving(e);
        po.checkInter(e);
    }
    //magnetism point end

    //history manager;
    //Dirty is something you think it is unnecessary
    , hasDirty: false
    , clearDirty(e) {
        try {
            if (dra.hasDirty && dra.active) {
                dra.special.clear();
                dra.svg.removeChild(dra.active);
                dra.hasDirty = false;
                dra.clear();
                dra.special.end(e);
            } else {
                console.log("don't have dirty")
            }
        } catch (e) {
            console.log("dirty clear failed(chinese english (~._.~)");
        }
    }
    , clear() {// 清除临时存储
        dra.special.clear();
        // dra.clickTimes = 0;
        //kill active one??
        dra.active = null;
        dra.drawing = false;
    }
    , clearAll(){
        dra.clear();
        po.clearAll();
        dra.svg.innerHTML = "";
        dra.crossX = dra.crossY = null;
    }
    //history manager end;

    // intersection adding;
    , intersection: {
        all: []
        , add(circlePoint) {
            this.all.push(circlePoint);
        }
        , render(arr = []) {
            this.clear();
            for (var v of arr) {
                var onep = dra.create("point", v[0], v[1]);
                onep.setAttribute("class", "intersection");
                dra.svg.appendChild(onep);
                this.add(onep);
            }
        }
        , clear() {
            try {
                this.all.forEach(function (onep) {
                    dra.svg.removeChild(onep)
                })
            }
            catch (e) {
                console.error(e);
            }
            this.all = [];
        }
    }
}

//几何处理器
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
        return geo.circleline({ circle: a, line: line });
    }
    , circleline(
        op = {
            circle: {
                type: "circle"
                , radius: 1
                , vpoint: [0, 0]
            }
            ,
            line: {
                type: "line"
                , abc: [1, 1, 0]
            }
        }
    ) {
        var [k, t, c] = [...op.line.abc];
        var der = c - k * op.circle.vpoint[0] - t * op.circle.vpoint[1];
        var rus;
        if (op.circle.radius == 0) { //不全为零;
            if (der == 0 && !(k || t || c)) {
                return op.circle.vpoint;
            }
            return [];
        } else {
            var p = der / op.circle.radius;
            var cos = geo.getCos(k, t, p);
            rus = cos.map(onep => {
                return onep.map((v, i) => {
                    return v * op.circle.radius + op.circle.vpoint[i];
                })
            })
            rus.type = "aa";
            return rus;
        }
    }
    , lineline(
        l1 = {
            abc: [1, 1, 1]
        }
        , l2 = {
            abc: [0.5, 2, 1]
        }
    ) {
        //@if old
        // var a1 = li.abc[0]
        // , b1 = li.abc[1]
        // , c1 =  li.abc[2]
        // , a2 = li.abc[0]
        // , b2 = liabc[1] 
        // , c2 = li.abc[2]
        //@else
        var [a1, b1, c1] = [...l1.abc];
        var [a2, b2, c2] = [...l2.abc];
        //@if end;

        var der = a2 * b1 - a1 * b2;
        if (Math.abs(der) > 1e-6) {
            return [(c2 * b1 - c1 * b2) / der, (c1 * a2 - c2 * a1) / der]
        } else {
            return []
        }
    }
    //k*cosx + t*sinx = p
    , getCos(k, t, p) {
        var ori = k * k + t * t;
        if (ori == 0) {
            return [];
        }
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
    , disturb(ob, stick) {
        var hashCode = ""
            , func
        if (ob.type != stick.type) {
            hashCode = [ob.type, stick.type].sort().join("");
            func = geo[hashCode];
            if (func) {
                return func({
                    [ob.type]: ob
                    , [stick.type]: stick
                });
            }
            return [];
        } else {
            hashCode = ob.type + stick.type;
            func = geo[hashCode];
            if (func) {
                return func(ob, stick);
            }
            return [];
        }
    }
}

//点的内部逻辑处理;
var poActive = null;
var po = {
    all: [
        {
            type: "type"
            , vpoint: [0, 0]
        }
    ]
    //显示数值的;
    , display: null
    //intersections;
    , clearAll (){
        po.all = [];
        po.active = null;
        dra.intersection.clear();
    }
    , clearDirty() {
        //清除内存
        po.all.pop();
        po.active = null;
        //清除绘图
        dra.intersection.clear();
    }

    //交点处理器
    , Xero: {
        all: []
        , add(obarr = []) {
            switch (obarr.type) {
                case "aa":// array of array;
                    this.all = this.all.concat(obarr);
                    break;
                default:
                    if (obarr.length > 0) {
                        this.all.push(obarr);
                        return true;
                    } else {
                        return false;
                    }
                    break;
            }
        }
        , render() {
            dra.intersection.render(this.all);
            this.all = [];
        }
        , configure(
            ob = {
                color: "red"
            }
        ) {
            this.cf = ob;
        }
        , cf: null
    }
    , set active(ob) {
        poActive = ob;
        if (ob === null) {
            return;
        }
        po.all.push(ob);
    }
    , get active() {
        return poActive;
    }
    , checkInter(e) {
        var active = po.active;
        if (!dra.drawing || active === null) {
            return;
        }
        for (var i of po.all) {
            if (i !== active) {
                po.Xero.add(geo.disturb(i, active));
            }
        }
        po.Xero.render();
    }

    //在内存中创建一个用于计算的对象,返回其引用,标记其为活跃对象;
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
            , "you can input cmd here :"
            , "> point  (default painting)"
        ]
    })
    , history: null
    , newOnep: null
    , run(str) {
        if (str === undefined) {
            str = cmd.dt.value.get();
        }
        if (dra.drawing) {
            console.error("can't run " + str  + " now");
            cmd.pushToHistory("Can't run " + str.span(".wrongCommand")  + " now!! Please finish current job first");
            return;
        }

        //specail code
        switch (str) {
            case "clear":
                dra.clearAll();
                break;
            default:
                if( !dra.setMode( str )){
                    cmd.pushToHistory("Can't find " + str.span(".wrongCommand"));
                    return ;
                }
        }

        switch (str) {
            case "rec":
                console.log("drawing the rect")
                break;
        }
        cmd.pushToHistory(str);
    }
    , pushToHistory(str) {
        cmd.dt.history.push(str)
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

var rwok = { //framework
    show(){
        
    }
}

var board = Vir([cmd, dra, po,rwok], {
    ".tr": {
        ".main ::main": {
            "svg .board ::svg": {
                // $: svgData.halfFace
                on: {
                    mousedown: dra.startDraw
                    , mouseup: dra.endDraw
                    , mousemove: dra.movingTo
                }
            }
        }
        , ".wrap": {
            ".console": {
                ".historyList ::history": For(cmd.dt.history, (onep) => {
                    return {
                        ".onep": onep.get()
                    }
                })
                , ".coding": {
                    $: "命令: "
                    , "input .consoleInput ::newOnep ": {
                        args: {
                            model: cmd.dt.value
                        }
                    }
                }
            }
            , ".tips": {
                "div": "小提示!", "ul > li": [
                    "line : 画直线"
                    , "circle:画圆"
                    , "rec : 画矩形"
                    , "可以实时显示交点"
                    , "point : 画空心点"
                ]
            }
            // , ".displaying ::display"(str = "liumiao") {
            //     return {
            //         $: str
            //     }
            // }
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

// dra.ready();

var Test = {
    drawTriangle() {
        cmd.run("line");
        dra.movingTo({
            offsetX: 10
            , offsetY: 10
        })
        dra.startDraw();

        dra.movingTo({
            offsetX: 100
            , offsetY: 10
        })
        dra.startDraw()

        dra.movingTo({
            offsetX: 55
            , offsetY: 40
        })
        dra.startDraw()

        dra.movingTo({
            offsetX: 10
            , offsetY: 10
        })
        dra.startDraw();

        dra.clearDirty();
    }
    , watchClickTimes() {
        js.Watch(dra, "clickTimes", function (val) {
            console.log(val, "change");
        })
    }
    , init() {
        tes.watch(dra, {
            "clickTimes"(v) {
                return -1;
            }
        });

        tes.list("js");
    }
}
//dom Element bind
window.addEventListener("keydown", function (e) {
    switch (e.keyCode) {
        case 13:
            cmd.run();
            break;
        case 27:
            dra.clearDirty(e);
            break;
        case 9: //"tab"
            work.show();
            brea;
        default:
            cmd.focus();
            break;
    }
})
Test.init();
// }
// vitalSvg();