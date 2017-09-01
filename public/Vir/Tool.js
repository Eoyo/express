"use strict";
var Er;
var Te;
var c;
var Tool = {
    TellMySelf: {
        message: "toolkits for you!"
    },
    init() {
        Er = "fsf";
        Te = "hehe";
    },
    Step(...stepArg) {
        var onearg = stepArg[0], len = stepArg.length, wrongfunc = function (e) {
            console.log(e);
        };
        function doList(i, ...arg) {
            if (i >= len)
                return;
            new Promise(function (resolve) {
                try {
                    stepArg[i](...arg, resolve);
                }
                catch (e) {
                    wrongfunc(e);
                }
            })
                .then(function (...arg) {
                doList(i + 1, ...arg);
            });
        }
        doList(1, onearg);
    },

    //return value array;
    pluck(o = {one :"lium"}, names = ["one"]) {
        return names.map(n => o[n]);
    },
    extend(first, second) {
        for (let id in second) {
            if (!first.hasOwnProperty(id)) {
                first[id] = second[id];
            }
        }
        return first;
    },
    union(first, second) {
        let result = {};
        for (let id in first) {
            result[id] = first[id];
        }
        for (let id in second) {
            if (!result.hasOwnProperty(id)) {
                result[id] = second[id];
            }
        }
        return result;
    },
    judge(op) {
        // if( !Te.c(op,'o') ) return ;
        switch (op.principle) {
            case "when there are combating":
            case "0":
            case 0:
                var oppose = false;
                for (var x of op.combat) {
                    oppose = oppose || x;
                }
                if (oppose) {
                    op.fail();
                }
                else {
                    op.success();
                }
                break;
        }
    },
    doNothingFunc() {
        return;
    },
    run(func) {
        if (typeof func === "function") {
            return func;
        }
        else {
            console.log(func, "is not a function");
            return Tool.doNothingFunc;
        }
    },
    get(obj, attrs, op) {
        var rusObj = obj;
        var args = attrs.split('.'), wrong = false;
        for (var i = 0; i < args.length; i++) {
            rusObj = rusObj[args[i]];
            if (i + 1 < args.length) {
                if (typeof rusObj != "object") {
                    // Er.add("Tool.get",1)
                    wrong = true;
                    rusObj = null;
                    break;
                }
            }
        }
        Tool.judge({
            principle: "when there are combating",
            combat: [
                op
                    && typeof op.type == "string"
                    && op.type !== typeof rusObj,
                wrong
            ],
            fail() {
                // Tool.run(op.error)(rusObj)
            },
            success() {
                // Tool.run(op.success)(rusObj)
            }
        });
        return rusObj;
    },
    set(obj, attrs, value) {
        var rusObj = obj;
        var args = attrs.split('.');
        for (var i = 0; i < args.length; i++) {
            rusObj = rusObj[args[i]];
            if (i + 1 < args.length) {
                if (typeof rusObj != "object") {
                    // Er.add("Tool.set",1);
                    return;
                }
            }
        }
        return rusObj[attrs] || (rusObj[attrs] = value);
    },
    initChecker() {
        var checkStore = {};
        //what will hadppend before we  set checker??
        /**
        drop into endless circle ,

         */
        var quiker = {
            o: "obj",
            a: "array"
        };
        var funcStore = {
            obj(x) {
                return (typeof x === "object");
            },
            array(x) {
                return;
            }
        };
        var Arg = {
            c(x, asx) {
                Tool.set(checkStore, asx, x);
                asx = quiker[asx];
                Tool.get(funcStore, asx, {
                    type: "function",
                    success: function (func) {
                        func(x);
                    }
                });
            },
            addFunc(funcsop) {
                Tool.extend(funcStore, funcsop);
            },
            list() {
                console.log(checkStore);
            }
        };
        return Arg;
    },
    initErrorManager() {
        var errorStore = {}, catchStore = {};
        var Arg = {
            add(name, status) {
                Tool.set(errorStore, name, []).push({
                    status,
                    message: "wrong!"
                });
                Tool.get(catchStore, `${name}.${status}`, {
                    type: "function",
                    success: function (errorFunc) {
                        errorFunc();
                    }
                });
            },
            addFunc(sop) {
                Tool.extend(catchStore, sop);
            },
            list() {
                console.log(errorStore);
            }
        };
        return Arg;
    },
    events: {
        hash: "2017-06-28",
        addKeyPress(doc, op) {
            // op = {
            //     keystr: func
            // } 
            Tool.set(doc, "TellMySelf.KeyPress.hash", Tool.events.hash);
            Tool.get(doc, "TellMySelf.KeyPress.hash", {
                success(v) {
                    if (v !== Tool.events.hash) {
                        console.warn("you have use KeyPress on: " + doc.TellMySelf.KeyPress.hash);
                    }
                }
            });
            var rcKp = doc.TellMySelf.KeyPress; //rc-  headdress :reference to an obj
            Tool.extend(doc.TellMySelf.KeyPress, op);
        },
        initManager(fromDoc) {
            fromDoc = fromDoc || window;
            var self = {
                eventStore: null,
                eventFuncStore: null,
                analys(x) {
                    if (self.eventStore[x])
                        return self.eventStore[x];
                    var descrips = x.split(',');
                    var doc = fromDoc, len = descrips.length, status = 1; //是否为活跃的状态
                    if (len === 2) {
                        switch (descrips[0]) {
                            case "p":
                            case "pause":
                                status = 0;
                                break;
                            case "window":
                            case "w":
                                doc = window;
                                break;
                            case "k":
                            case "key":
                            case "keyPress":
                                var ks = descrips[1].split('+');
                                break;
                        }
                    }
                    self.eventStore[x] = {
                        status,
                        aimDoc: doc,
                        event: descrips[len - 1],
                        func: self.eventFuncStore[x]
                    };
                    return self.eventStore[x];
                }
            };
            var Arg = {
                initEvents(events) {
                    self.eventFuncStore = events;
                    self.eventStore = {};
                    for (var x in events) {
                        var rsu = self.analys(x);
                        if (rsu.status != 1)
                            continue;
                        else {
                            rsu.aimDoc.addEventListener(rsu.event, rsu.func);
                            rsu.status = 1;
                        }
                    }
                },
                startListen(x) {
                    var rsu = self.analys(x);
                    if (rsu.status === 0) {
                        rsu.aimDoc.addEventListener(rsu.event, rsu.func);
                        rsu.status = 1;
                    }
                },
                stopListen(x) {
                    var rsu = self.analys(x);
                    if (rsu.status === 1) {
                        rsu.aimDoc.removeEventListener(rsu.event, rsu.func);
                        rsu.status = 0;
                    }
                }
            };
            return Arg;
        }
    },
    dom: {
        initPicker(dom) {
            var func = {
                getTagList(domarr, tagReg) {
                    var self = {
                        rus: []
                    };
                    var func = {
                        findtag(tempDom, tagReg) {
                            for (var j = 0; j < tempDom.length; j++) {
                                if (this.check(tempDom[j].tagName, tagReg)) {
                                    self.rus.push(tempDom[j]);
                                }
                                this.findtag(tempDom[j].children, tagReg);
                            }
                        },
                        check(tagName, tagReg) {
                            if (tagName == undefined) {
                                return false;
                            }
                            if (!tagReg) {
                                return true;
                            }
                            if (tagReg.test(tagName)) {
                                return true;
                            }
                            return false;
                        }
                    };
                    func.findtag(domarr, tagReg);
                    return self.rus;
                },
                getTag(domarr, tag) {
                    var arr = [];
                    for (var j = 0; j < domarr.length; j++) {
                        var Tagarr = domarr[j].getElementsByTagName(tag);
                        for (var i = 0; i < Tagarr.length; i++) {
                            arr.push(Tagarr[i]);
                        }
                    }
                    return arr;
                },
                getByAttr(domarr, attr, value) {
                    if (value[0] == '-') {
                        return this.getAttrList(domarr, attr, new RegExp(value.slice(1)));
                    }
                    var arr = [], j = 0;
                    var func = {
                        selectWay(attr) {
                            var alterFunc = {
                                id(v) {
                                    var Tag = domarr[j].getElementById(v);
                                    if (Tag)
                                        arr.push(Tag);
                                },
                                class(v) {
                                    var Tagarr = domarr[j].getElementsByClassName(v);
                                    for (var i = 0; i < Tagarr.length; i++) {
                                        arr.push(Tagarr[i]);
                                    }
                                },
                                attr(v) {
                                    console.log("not yet");
                                }
                            };
                            var solveFunc = alterFunc[attr];
                            if (solveFunc === undefined) {
                                solveFunc = alterFunc['attr'];
                            }
                            return solveFunc;
                        }
                    };
                    var solve = func.selectWay(attr);
                    for (j = 0; j < domarr.length; j++) {
                        solve(value);
                    }
                    return arr;
                },
                getAttrList(domarr, attr, tagReg) {
                    var self = {
                        rus: []
                    };
                    var func = {
                        findtag(tempDom, tagReg) {
                            for (var j = 0; j < tempDom.length; j++) {
                                if (this.check(tempDom[j][attr], tagReg)) {
                                    self.rus.push(tempDom[j]);
                                }
                                this.findtag(tempDom[j].children, tagReg);
                            }
                        },
                        check(tagName, tagReg) {
                            if (tagName == undefined) {
                                return false;
                            }
                            if (!tagReg) {
                                return true;
                            }
                            if (tagReg.test(tagName)) {
                                return true;
                            }
                            return false;
                        }
                    };
                    func.findtag(domarr, tagReg);
                    return self.rus;
                }
            };
            var Arg = {
                dom,
                func,
                default: {
                    t: "textContent",
                    i: "innerHTML",
                    o: "outerHTML"
                },
                get(tagstr, option, forEachfunc) {
                    if (tagstr == undefined)
                        return Arg.dom;
                    tagstr = tagstr.trim();
                    var list = tagstr.split('>');
                    var vernier = [dom];
                    for (var i = 0; i < list.length; i++) {
                        switch (list[i][0]) {
                            case '-':
                                vernier = func.getTagList(vernier, new RegExp(list[i].slice(1)));
                                break;
                            case '#':
                                vernier = func.getAttrList(vernier, 'id', new RegExp(list[i].slice(1)));
                                break;
                            case '.':
                                vernier = func.getByAttr(vernier, 'class', list[i].slice(1));
                                break;
                            case '@'://具有某属性
                                vernier = func.getAttrList(vernier, list[i].slice(1), /./);
                                break;
                            default:
                                vernier = func.getTag(vernier, list[i]);
                        }
                    }
                    if (!!option && typeof option == "string") {
                        //是否是默认的快捷option
                        option = Arg.default[option] ? Arg.default[option] : option;
                        var values = []; //if occur error in 'for',then keep vernier 
                        try {
                            //special option :
                            //want domPicker chain
                            if (option == 'p') {
                                for (var j = 0; j < vernier.length; j++) {
                                    values.push(Tool.dom.initPicker(vernier[j]));
                                }
                                vernier = values;
                            }
                            else {
                                for (var j = 0; j < vernier.length; j++) {
                                    var op = vernier[j][option];
                                    op += "";
                                    values.push(op.trim());
                                }
                            }
                            vernier = values;
                        }
                        catch (e) {
                            values = [];
                            console.error(e);
                        }
                    }
                    if (typeof forEachfunc == "function") {
                        vernier.forEach(forEachfunc);
                    }
                    console.log(vernier);
                    return vernier;
                }
            };
            return Arg.get;
        },
        initFLyer() {
            var doc = document.getElementById("") //let IED know that doc is an Element;
            , func = {
                prepend(dom) {
                    var tdoc = doc;
                    tdoc.insertBefore(dom, tdoc.firstChild);
                    return this;
                },
                show(ms) {
                    var di, tdoc = doc;
                    if (function check() {
                        if (ms < 0) {
                            return true;
                        }
                        if (ms <= 60) {
                            di = 1;
                            return;
                        }
                        di = 60 / ms;
                    }()) {
                        return;
                    }
                    var opa = 0;
                    var animate = {
                        beClearer() {
                            opa += di;
                            if (opa > 1) {
                                opa = 1;
                                tdoc.style.opacity = opa + "";
                            }
                            tdoc.style.opacity = opa + "";
                            requestAnimationFrame(animate.beClearer);
                        }
                    };
                    requestAnimationFrame(animate.beClearer);
                },
                fade(ms) {
                    var di, tdoc = doc;
                    if (function check() {
                        if (ms < 0) {
                            return true;
                        }
                        if (ms <= 50 / 3) {
                            di = 1;
                            return;
                        }
                        di = (50 / 3) / ms;
                    }()) {
                        return;
                    }
                    var opa = 1;
                    var animate = {
                        befaded() {
                            opa -= di;
                            if (opa < 0) {
                                opa = 0;
                                tdoc.style.opacity = opa + "";
                                return;
                            }
                            tdoc.style.opacity = opa + "";
                            requestAnimationFrame(animate.befaded);
                        }
                    };
                    requestAnimationFrame(animate.befaded);
                },
                style(op) {
                    Tool.extend(doc.style, op);
                }
            };
            function setDoc(docobj) {
                doc = docobj;
                return func;
            }
            Tool.extend(setDoc, {
                create(str) {
                    return document.createElement(str);
                }
            });
            return setDoc;
        },
        initSuper() {
            var doc = document.getElementById("") //let IED know that doc is an Element;
            , docs = [], func = {
                prepend(dom) {
                    var tdoc = doc;
                    tdoc.insertBefore(dom, tdoc.firstChild);
                    return this;
                },
                all: null,
                show(ms) {
                    var di, tdoc = doc;
                    if (function check() {
                        if (ms < 0) {
                            return true;
                        }
                        if (ms <= 50 / 3) {
                            di = 1;
                            return;
                        }
                        di = (50 / 3) / ms;
                    }()) {
                        return;
                    }
                    var opa = 0;
                    var animate = {
                        beClearer() {
                            opa += di;
                            if (opa > 1) {
                                opa = 1;
                                tdoc.style.opacity = opa + "";
                            }
                            tdoc.style.opacity = opa + "";
                            requestAnimationFrame(animate.beClearer);
                        }
                    };
                    requestAnimationFrame(animate.beClearer);
                },
                fade(ms) {
                    var di, tdoc = doc;
                    if (function check() {
                        if (ms < 0) {
                            return true;
                        }
                        if (ms <= 50 / 3) {
                            di = 1;
                            return;
                        }
                        di = (50 / 3) / ms;
                    }()) {
                        return;
                    }
                    var opa = 1;
                    var animate = {
                        befaded() {
                            opa -= di;
                            if (opa < 0) {
                                opa = 0;
                                tdoc.style.opacity = opa + "";
                                return;
                            }
                            tdoc.style.opacity = opa + '';
                            requestAnimationFrame(animate.befaded);
                        }
                    };
                    requestAnimationFrame(animate.befaded);
                }
            }, pk = Tool.dom.initPicker(document), all = {};
            for (let x in func) {
                all[x] = function (...args) {
                    docs.forEach(function (obj) {
                        setDoc(obj)[x](...args);
                    });
                };
            }
            func.all = all;
            function setDoc(docobj) {
                doc = docobj;
                return func;
            }
            function setSuper(Docs) {
                if (typeof Docs == "string") {
                    Docs = pk(Docs);
                }
                if (!Docs.forEach) {
                    Docs = [Docs];
                }
                docs = Docs;
                doc = Docs[0];
                return func;
            }
            Tool.extend(setDoc, {
                create(str) {
                    return document.createElement(str);
                }
            });
            return setSuper;
        },
        initManager() {
        }
    },
    style: {
        initStyleSheet() {
            return document.stylesheets[0].ownerNode;
        }
    },
    initxml(str) {
        var parser = new DOMParser(), dom = parser.parseFromString(str, "text/xml");
        var Arg = {
            view() {
                // c.log(str)
                // c.dir(dom)
                // c.log(dom)
            }
        };
        Tool.extend(Arg, Tool.dom.initPicker(dom));
        return Arg;
    },
    struct: {
        //使用集合的方法管理set引用的对象;
        //利用obj的属性实现set
        initSet(set) {
            set = set || {}; //keys 
            if (typeof set !== "object") {
                console.warn("set is not an object");
                return;
            }
            var obj = {}; // object for not only str key;
            var Arg = {
                get(str) {
                    if (str == undefined)
                        return Object.keys(set);
                    return set[str];
                },
                add(str) {
                    if (set[str]) {
                        set[str]++;
                        return;
                    }
                    set[str] = 1;
                },
                sort() {
                    var rus = [], onep = null;
                    for (var x in set) {
                        onep = {
                            key: x,
                            w: set[x]
                        };
                        rus.push(onep);
                    }
                    rus.sort(function (a, b) {
                        var num = a.w < b.w;
                        return +num;
                    });
                    return rus;
                }
            };
            return Arg;
        }
    },
    initWaite(func) {
        var self = {
            done: true,
            arg: null,
            render() {
                if (self.done) {
                    // new Promise().then(function (){ //模拟绘图不阻塞;
                    //     func(...self.arg)
                    //     self.done = true;
                    // })
                }
            },
            tick(...arg) {
                if (self.done) {
                    self.render();
                    self.done = false;
                    self.arg = arg;
                }
            }
        };
        return self.tick;
    },
    initdate() {
        var Arg = {
            date: new Date(),
            objdate: null,
            get() {
                var date = new Date();
                if (Arg.objdate && Arg.objdate.day == date.getDate()) {
                    return Arg.objdate;
                }
                else {
                    Arg.date = date;
                }
                Arg.objdate = {
                    day: Arg.date.getDate(),
                    month: Arg.date.getMonth(),
                    year: Arg.date.getFullYear()
                };
                return Arg.objdate;
            },
            getCH() {
                Arg.get();
                return {
                    day: Arg.objdate.day + "日",
                    month: (Arg.objdate.month + 1) + "月",
                    year: Arg.objdate.year + "年",
                    type(d, m, y) {
                        var str = "";
                        if (y) {
                            str += this.year;
                        }
                        if (m) {
                            str += this.month;
                        }
                        if (d) {
                            str += this.day;
                        }
                        return str;
                    }
                };
            }
        };
        return Arg;
    },
    str: {
        trim(str) {
            var s = "", len = str.length, num = 0;
            for (var i = 0; i < len; i++) {
                if (str[i] !== ' ') {
                    s += str[i];
                    num = 0;
                }
                else {
                    s += (num > 0 ? '' : ' ');
                    num++;
                }
            }
            return s;
        },
        treeText(str) {
            var onepl = [], onepw = '', len = str.length, wordnum = 0, notword = /\W/, wordSet = Tool.struct.initSet(), text = {
                lines: [],
                allwords: 0,
                wordSet
            };
            function addline() {
                if (onepw !== '') {
                    addword();
                }
                if (onepl.length == 0)
                    return true;
                text.lines.push(onepl);
                onepl = [];
            }
            function addword() {
                if (onepw == '')
                    return true;
                onepl.push(onepw);
                wordSet.add(onepw);
                text.allwords += 1;
                onepw = '';
            }
            for (var i = 0; i < len; i++) {
                switch (true) {
                    case str[i] === '\n':
                        addline();
                        break;
                    case notword.test(str[i]):
                        addword();
                        break;
                    case !notword.test(str[i]):
                        onepw += str[i];
                        break;
                }
            }
            addline();
            return text;
        },
        initAxe() {
            var str = "";
            var func = {
                insert(a, b, words) {
                    var head = str.slice(0, a);
                    var tile = str.slice(b);
                    return head + words + tile;
                }
            };
            function setStr(Str, attr) {
                str = Str;
                return func;
            }
            return setStr;
        }
    },
    initFunc(usage, op, ext) {
        var warn = {
            check(leaf, funcNeed) {
                var rus = "";
                for (var x in funcNeed) {
                    if (typeof funcNeed[x] == "function") {
                        leaf[x] = funcNeed[x];
                        funcNeed[x] = 0;
                    }
                    if (funcNeed[x]) {
                        rus += "  " + x + "()";
                    }
                }
                if (rus) {
                    rus = "To use " + leaf.name + " we need:" + rus;
                    console.warn(rus);
                }
                return rus;
            }
        };
        var func = {
            troggle() {
            },
            troggleSet() {
                var troggle = false;
                var tick = {};
                var wayMap = null;
                var leaf = {
                    func: op.func.bind(tick),
                    id: null,
                    initArgs() {
                        for (var x in op.args) {
                            tick[x] = op.args[x].even;
                        }
                        if (typeof op.id === "function") {
                            leaf.id = op.id;
                            wayMap = new Map();
                        }
                        else {
                            leaf.grow = leaf.setArgs;
                        }
                    },
                    setArgs() {
                        if (troggle) {
                            for (var x in op.args) {
                                tick[x] = op.args[x].odd; //从一,从有;
                            }
                        }
                        else {
                            for (var x in op.args) {
                                tick[x] = op.args[x].even; //从〇,从无;
                            }
                        }
                    },
                    grow(...args) {
                        var oh = leaf.id(...args);
                        if (wayMap.has(oh)) {
                            troggle = wayMap.get(oh);
                            troggle = !troggle;
                            wayMap.set(oh, troggle);
                        }
                        else {
                            wayMap.set(oh, 1); //新来了一个,从一
                            troggle = !troggle; // 与 之同步
                        }
                        leaf.setArgs(); //setArgs 受troggle控制;
                    }
                };
                leaf.initArgs();
                return function troggleSetFunc(...args) {
                    troggle = !troggle;
                    leaf.grow(...args);
                    leaf.func(...args);
                };
            },
            hover() {
                var tick = {};
                var wayMap = null;
                var leaf = {
                    func: op.func.bind(tick),
                    init: null,
                    initArgs() {
                        for (var x in op.args) {
                            tick[x] = op.args[x].even;
                        }
                        if (typeof op.init === "function") {
                            leaf.init = op.init;
                            leaf.init.bind(tick)();
                        }
                    },
                    grow(e) {
                        switch (e.type) {
                            case "mouseover":
                                for (var x in op.args) {
                                    tick[x] = op.args[x].over; //从一,从有;
                                }
                                break;
                            case "mouseout":
                                for (var x in op.args) {
                                    tick[x] = op.args[x].out; //从〇,从无;
                                }
                                break;
                        }
                    }
                };
                leaf.initArgs();
                return function hoverListener(...args) {
                    leaf.grow(args[0]);
                    leaf.func(...args);
                };
            },
            once() {
                var time = 1;
                var tick = {};
                var wayMap = null;
                var leaf = {
                    func: null,
                    id: null,
                    initArgs() {
                        tick = op.args;
                        if (typeof op.id === "function") {
                            leaf.id = op.id;
                            wayMap = new Map();
                        }
                        else {
                            leaf.grow = leaf.dotime;
                        }
                        leaf.func = op.func.bind(tick); //change the refer;
                    },
                    doNothingFunc() {
                        return;
                    },
                    dotime(...args) {
                        if (time > 0) {
                            leaf.func(...args);
                            time--;
                        }
                        else {
                            leaf.grow = leaf.doNothingFunc;
                        }
                    },
                    grow(...args) {
                        var oh = leaf.id(...args);
                        if (wayMap.has(oh)) {
                            return;
                        }
                        else {
                            wayMap.set(oh, 0); //lest time;
                            leaf.func(...args);
                        }
                    }
                };
                leaf.initArgs();
                return function onceRunFunc(...args) {
                    leaf.grow(...args);
                };
            },
            change() {
                var lastOne = {};
                var tick = {};
                var wayMap = null;
                var leaf = {
                    func: null,
                    id: null,
                    initArgs() {
                        tick = op.args;
                        Tool.extend(tick, {
                            getLastOne() {
                                return lastOne;
                            }
                        });
                        if (typeof op.id === "function") {
                            leaf.id = op.id;
                        }
                        else {
                            leaf.grow = leaf.noId_grow;
                        }
                        leaf.func = op.func.bind(tick); //change the refer;
                    },
                    noId_grow(...args) {
                        if (lastOne !== args) {
                            lastOne = args;
                            leaf.func(...args);
                        }
                        else {
                            return;
                        }
                    },
                    grow(...args) {
                        var rus = leaf.id(...args);
                        if (lastOne !== rus) {
                            leaf.func(...args);
                            lastOne = rus;
                        }
                        else {
                            return;
                        }
                    }
                };
                leaf.initArgs();
                return function onceRunFunc(...args) {
                    leaf.grow(...args);
                };
            },
            delay() {
                var time = op.time, tick = null, lastTime = 0, curTime, timeHave, growing = false, leaf = {
                    func: function (...args) { },
                    initArgs() {
                        tick = op.args;
                        leaf.func = op.func.bind(tick); //change the refer;
                    },
                    grow(...args) {
                        function runGrow() {
                            leaf.grow(...args);
                        }
                        growing = true;
                        if (timeHave <= 0) {
                            leaf.func(...args);
                            growing = false;
                            return;
                        }
                        timeHave--;
                        requestAnimationFrame(runGrow);
                    }
                };
                leaf.initArgs();
                return function delayRunFunc(...args) {
                    if (growing) {
                        return;
                    }
                    timeHave = time / 6;
                    leaf.grow(...args);
                };
            }
        };
        // Te.c(func[usage],'f'); 
        var extop = {};
        if (typeof ext == "object") {
            Tool.extend(extop, op);
            extop["args"] = JSON.stringify(op.args);
            op = Tool.extend(extop, ext);
            if (typeof op.args == "string")
                op.args = JSON.parse(op.args);
        }
        if (!op.args) {
            op.args = {};
        }
        return func[usage]();
    },
    math: {
        getRandom(arr) {
            var len = arr.length;
            var index = Math.floor(Math.random() * len);
            return arr[index];
        }
    }
};
var hv = {
    addSetter(obj, key, Origin_gt, From_gt, fromObj) {
        var check = true;
        function get() {
            var FromValue = From_gt.get.call(fromObj);
            var curValue = Origin_gt.get.call(obj);
            if (FromValue != curValue) {
                check = false;
                set(FromValue);
                curValue = FromValue;
            }
            return curValue;
        }
        function set(newVal) {
            if (check) {
                var curValue = get.call(obj);
                if (newVal === curValue) {
                    return;
                }
            }
            Origin_gt.set.call(obj, newVal);
            From_gt.set.call(fromObj, newVal);
            check = true;
        }
        if (Origin_gt) {
            Object.defineProperty(obj, key, {
                enumerable: true,
                configurable: true,
                get: get,
                set: set
            });
        }
    },
    getset(obj, key, value) {
        if (!obj) {
            throw new Error("can't observer the " + key);
        }
        var property = Object.getOwnPropertyDescriptor(obj, key);
        if (property && property.configurable === false) {
            console.log("can't");
            throw new Error("I can't");
        }
        if (!property) {
            return hv.getset(obj.__proto__, key, value);
        }
        // cater for pre-defined getter/setters
        var backgroundValue = value;
        var getter = property.get || function defalutGet() {
            return backgroundValue;
        };
        var setter = property.set || function defalutSet(newVale) {
            backgroundValue = newVale;
        };
        var rus = {
            get: getter,
            set: setter
        };
        return rus;
    },
    bind(one, k1, two, k2) {
        var t1, t2;
        if (two instanceof Node) {
            console.log("wrong!");
        }
        t1 = hv.getset(one, k1, one[k1]);
        if (k2 === undefined) {
            if (two.set && two.get) {
                t2 = two;
                hv.addSetter(one, k1, t1, t2, undefined);
                hv.redefine(t2, t1, one);
                t2.getBinder = function () {
                    return {
                        dom: one,
                        key: k1
                    };
                };
                t2.log = function () {
                    console.dir(one);
                    console.log(k1, one[k1]);
                };
            }
        }
        else {
            t2 = hv.getset(two, k2, two[k2]);
            hv.addSetter(one, k1, t1, t2, two);
            hv.addSetter(two, k2, t2, t1, one);
        }
    },
    redefine(gt, From_gt, fromObj) {
        var Origin_gt = {
            get: gt.get,
            set: gt.set
        };
        var startValue = Origin_gt.get();
        var check = true;
        function get() {
            var FromValue = From_gt.get.call(fromObj);
            var curValue = Origin_gt.get();
            if (FromValue != curValue) {
                check = false;
                set(FromValue);
                curValue = FromValue;
            }
            return curValue;
        }
        function set(newVal) {
            if (check) {
                var curValue = get();
                if (newVal === curValue) {
                    return;
                }
            }
            Origin_gt.set(newVal);
            From_gt.set.call(fromObj, newVal);
            check = true;
        }
        check = false;
        set(startValue);
        gt.set = set;
        gt.get = get;
        return gt;
    }
};
Tool.init();


// var Sp = js.Sp;
// js.Sp(ttt).notify("one");
// js.Sp(ttt).on("one",function(){
//     console.log("affterone");
//     js.Sp(ttt).notify("two")
// })
// js.Sp(ttt).on("two",function(){
//     console.log("twoOver");
// });
// js.Sp(ttt).on("two",function(){
//     console.log("twoOver");
// });
// Sp(ttt).on("one",function (){
//     alert ("sfsfs");
// })
// Sp(ttt).addEvents({
//     "one"(){
//         console.log("good");
//         this.notify("two")
//     }
//     ,"two"(){
//         console.log("bad")
//         this.notify("one");
//     }
// })
// exports.Tool = Tool
/**
 * Tool.dom
 * get has warn! if you get null
 * get id is using document.geElementById()
 * option can be function
*/ 
