
//统一key name
var Vir;
(function (globle) {
    var keyCode = {
        "0": 48,
        "1": 49,
        "2": 50,
        "3": 51,
        "4": 52,
        "5": 53,
        "6": 54,
        "7": 55,
        "8": 56,
        "9": 57,
        "q": 81,
        "w": 87,
        "e": 69,
        "r": 82,
        "t": 84,
        "y": 89,
        "u": 85,
        "i": 73,
        "o": 79,
        "p": 80,
        "a": 65,
        "s": 83,
        "d": 68,
        "f": 70,
        "g": 71,
        "h": 72,
        "j": 74,
        "k": 75,
        "l": 76,
        "z": 90,
        "x": 88,
        "c": 67,
        "n": 78,
        "v": 86,
        "m": 77,
        "b": 66,
        ",": 188,
        "`": 192,
        "tab": 9,
        "capslock": 20,
        "escape": 27,
        "delete": 46,
        "insert": 45,
        "numlock": 144,
        "arrowdown": 40,
        "pagedown": 34,
        "end": 35,
        "clear": 12,
        "arrowleft": 37,
        "arrowright": 39,
        "home": 36,
        "pageup": 33,
        "+": 107,
        "-": 189,
        "*": 56,
        "/": 111,
        "enter": 13,
        "control": 17,
        "process": 229,
        "alt": 18,
        "contextmenu": 93,
        "backspace": 8,
        "arrowup": 38,
        "=": 187,
        "shift": 16,
        "(": 57,
        ")": 48,
        "&": 55,
        "%": 53,
        "^": 54,
        "#": 51,
        "$": 52,
        "@": 50,
        "!": 49,
        "_": 189,
        "meta": 91,
        " ": 32
    }
    var js = {
        createArray(from, to) {
            var len = to - from + 1;
            var arr = new Array(len);
            for (var x = 0; x < len; x++) {
                arr[x] = from;
                from++;
            }
            return arr;
        },
        isObject(obj) {
            return obj !== null && typeof obj === 'object';
        },
        isPlainObject(obj) {
            return js.toString.call(obj) === '[object Object]';
        },
        isNative(Ctor) {
            return typeof Ctor === 'function' && /native code/.test(Ctor.toString());
        },
        getType(v) {
            var ty = typeof v;
            if (ty === "object") {
                switch (true) {
                    case !v:
                        ty = "null";
                        break;
                    case Array.isArray(v):
                        ty = "array";
                        break;
                }
            }
            return ty;
        }
        , getLastWord(abs = "f/sfsf/sf") {
            var len = abs.length;
            var rus = ""
            for (var x = len - 1; x >= 0; x--) {
                if (abs[x] === "/") {
                    rus += ".js"
                    return rus;
                }
                rus = abs[x] + rus;
            }
        }
        , isNotSimple(v) {
            var ty = js.getType(v);
            if (!ty) {
                return false;
            }
            if (ty === "string" || ty === "number" || ty === "boolean") {
                return false;
            }
            else {
                return true;
            }
        },
        isPrimitive(value) {
            return typeof value === 'string' || typeof value === 'number';
        },
        hasOwn(obj, key) {
            return Object.prototype.hasOwnProperty.call(obj, key);
        }
        //set ebumerable to false by defalut;
        ,
        def(obj, key, val, enumerable) {
            if (val === undefined)
                val = obj[key];
            Object.defineProperty(obj, key, {
                value: val,
                enumerable: !!enumerable,
                writable: true,
                configurable: true
            });
        },
        defineGetValue(obj, key, val) {
            Object.defineProperty(obj, key, {
                enumerable: false,
                configurable: true,
                get() {
                    return val;
                },
                set(v) {
                    val = v;
                }
            });
        },
        getFirstProp(obj) {
            for (var x in obj) {
                return x;
            }
            return null;
        },
        extend(first, second) {
            for (let id in second) {
                if (!first.hasOwnProperty(id)) {
                    first[id] = second[id];
                }
            }
            return first;
        },
        tick(ele, str) {
            // var event = globle.document.createEvent("UIEvent");
            // event.initUIEvent("input",true,true);
            // event.target = ele;
            // ele.dispatchEvent(event);
        }
        , Set: class _Set {
            constructor() {
                this.set = Object.create(null);
                var Set = Set || null;
                if (Set) {
                    return new Set();
                }
                else {
                    this.set = Object.create(null);
                }
            }
            has(key) {
                return this.set[key] === true;
            }
            add(key) {
                return this.set[key] = true;
            }
            clear() {
                this.set = Object.create(null);
            }
        },
        nextTick(cb, ctx) { return; },
        noop() {
            return;
        },
        set: (function valueSetter() {
            function getValue(obj) {
            }
            function setFunc(obj, k, value) {
                obj[k] = value;
            }
            return setFunc;
        })(),
        SpValueSetter(obj, key, value) {
        },
        Sp: (function () {
            var mmp = new Map();
            var idmp = new Map();
            var targetObj;
            var targetKey = "";
            var curDep;
            function getDep(fromObj) {
                var oneDep;
                if (mmp.has(fromObj)) {
                    oneDep = mmp.get(fromObj);
                }
                else {
                    oneDep = new Dep(fromObj);
                    mmp.set(fromObj, oneDep);
                }
                return oneDep;
            }
            function getIdMap(fromObj, id) {
                var things = idmp.get(fromObj);
                if (!things) {
                    things = new Map();
                    idmp.set(fromObj, things);
                }
                if (id != undefined) {
                    if (things.get(id)) {
                        return true;
                    }
                    else {
                        things.set(id, true);
                        return false;
                    }
                }
            }
            // function setValue(data) {
            //     if (targetKey) {
            //         targetObj[targetKey] = data;
            //     }
            //     else {
            //         targetObj.set(data);
            //     }
            // }
            var func = {
                listenTo(gsObj, evType, cb) {
                    var gsDep = getDep(gsObj);
                    var tKey = targetKey;
                    var tObj = targetObj;
                    cb = cb || function (e) {
                        try {
                            tObj[tKey] = e.data;
                        }
                        catch (e) {
                            console.error("Can't set " + tKey + " at ", tObj);
                            throw new Error("Can't set value");
                        }
                    };
                    gsDep.addEvent(evType, cb);
                },
                bindTo(gsObj) {
                    // var ob = Hif.observe(gsObj);
                    // //this listener func:
                    // func.on("set", function (data) {
                    //     gsObj.set(data)
                    // })
                },
                on(eventType, cd, id) {
                    if (getIdMap(targetObj, id)) {
                        return;
                    }
                    curDep.addEvent(eventType, cd);
                },
                notify(type, ev) {
                    curDep.emit(type, ev);
                }
            };
            return function Superinit(srObj, srKey) {
                targetKey = srKey;
                targetObj = srObj;
                curDep = getDep(srObj);
                return func;
            };
        })(),
        Cacher: class Cacher {
            constructor(max) {
                this.num = 0;
                this.set = {};
                this.first = 0;
                this.max = max;
            }
            cache(key, obj) {
                while (this.num - this.first > this.max) {
                    var deletstr = js.getFirstProp(this.set);
                    if (deletstr)
                        delete this.set[deletstr];
                    this.first++;
                }
                if (this.num - this.first == this.max) {
                    return;
                }
                this.set[key] = obj;
                this.num++;
            }
            find(key) {
                return this.set[key];
            }
            do(key, creator) {
                var find = this.find(key);
                if (find) {
                    return find;
                }
                else {
                    find = new creator(key);
                    this.cache(key, find);
                    return find;
                }
            }
        },
        init() {
            js.nextTick = (function () {
                var callbacks = [];
                var pending = false;
                var timerFunc;
                function nextTickHandler() {
                    pending = false;
                    var copies = callbacks.slice(0);
                    callbacks.length = 0;
                    for (var i = 0; i < copies.length; i++) {
                        copies[i]();
                    }
                }
                // the nextTick behavior leverages the microtask queue, which can be accessed
                // via either native Promise.then or MutationObserver.
                // MutationObserver has wider support, however it is seriously bugged in
                // UIWebView in iOS >= 9.3.3 when triggered in touch event handlers. It
                // completely stops working after triggering a few times... so, if native
                // Promise is available, we will use it:
                /* istanbul ignore if */
                var Promise = Promise || null;
                if (typeof Promise !== 'undefined' && js.isNative(Promise)) {
                    var p = Promise.resolve();
                    var logError = function (err) { console.error(err); };
                    timerFunc = function () {
                        p.then(nextTickHandler).catch(logError);
                        // in problematic UIWebViews, Promise.then doesn't completely break, but
                        // it can get stuck in a weird state where callbacks are pushed into the
                        // microtask queue but the queue isn't being flushed, until the browser
                        // needs to do some other work, e.g. handle a timer. Therefore we can
                        // "force" the microtask queue to be flushed by adding an empty timer.
                        if (test.br.isIOS) {
                            setTimeout(js.noop);
                        }
                    };
                }
                else if (typeof MutationObserver !== 'undefined' && (js.isNative(MutationObserver) ||
                    // PhantomJS and iOS 7.x
                    MutationObserver.toString() === '[object MutationObserverConstructor]')) {
                    // use MutationObserver where native Promise is not available,
                    // e.g. PhantomJS IE11, iOS7, Android 4.4
                    var counter = 1;
                    var observer = new MutationObserver(nextTickHandler);
                    var textNode = globle.document.createTextNode(String(counter));
                    observer.observe(textNode, {
                        characterData: true
                    });
                    timerFunc = function () {
                        counter = (counter + 1) % 2;
                        textNode.data = String(counter);
                    };
                }
                else {
                    // fallback to setTimeout
                    /* istanbul ignore next */
                    timerFunc = function () {
                        setTimeout(nextTickHandler, 0);
                    };
                }
                return function queueNextTick(cb, ctx) {
                    var _resolve;
                    callbacks.push(function () {
                        if (cb) {
                            try {
                                cb.call(ctx);
                            }
                            catch (e) {
                                test.handleError(e, ctx, 'nextTick');
                            }
                        }
                        else if (_resolve) {
                            _resolve(ctx);
                        }
                    });
                    if (!pending) {
                        pending = true;
                        timerFunc();
                    }
                    if (!cb && typeof Promise !== 'undefined') {
                        return new Promise(function (resolve, reject) {
                            _resolve = resolve;
                        });
                    }
                };
            })();
        }
    };
    var el = {
        refine(type, str) {
            switch (type) {
                case "style":
            }
            return str;
        },
        set() {
        }
    };
    var ts = {
        error(str) {
            try {
                console.error(ts.translate(str));
                var er = new Error(str);
                var at = 0;
                var sta = er.stack;
                var i = 3;
                var erStr = "";
                while (sta && i > 0) {
                    at = sta.indexOf("at");
                    --i;
                    if (i <= 0) {
                        erStr = "at" + sta.slice(0, at);
                    }
                    sta = sta.slice(at + 2);
                }
                console.error(er.stack);
                throw er;
            }
            catch (e) {
                if (ts.args.stopAtFirstWrong) {
                    // alert("something wrong!")!
                    throw e;
                }
            }
        },
        translate(str) {
            switch (str) {
                case "ArrayType":
                    return "you shouldn'y set raw array to jsDom";
            }
            return str;
        },
        args: {
            stopAtFirstWrong: true
        }
    };
    js.init();
    class Prop {
        constructor(str) {
            var arr = str.split(';');
            var sar;
            if (arr.length > 0) {
                sar = arr.pop().split('');
            }
            else {
                sar = str.split('');
            }
            this.cmd = arr;
            //add End to sar
            sar.push('\0');
            var len = sar.length;
            var reg = {
                number: /[0-9]/,
                word: /[\w\-\_]/
            };
            var state;
            var attrst;
            var frequency = 0;
            var now = "";
            state = "start";
            attrst = "attrstart";
            this.attr = [];
            this.className = "";
            this.id = "";
            this.targName = "div";
            this.num = 1;
            var onep;
            onep = {
                key: "",
                value: ""
            };
            var quoteStart = "'";
            for (var x = 0; x < len; x++) {
                //if is normal head
                switch (state) {
                    case "start":
                        if (reg.number.test(sar[x])) {
                            state = "num";
                            x--;
                            continue;
                        }
                        if (reg.word.test(sar[x])) {
                            state = "targ";
                            x--;
                            continue;
                        }
                        if (sar[x] == '.') {
                            state = "class";
                            continue;
                        }
                        if (sar[x] == '#') {
                            state = "id";
                            continue;
                        }
                        if (sar[x] == '[') {
                            state = "attr";
                            continue;
                        }
                        if (sar[x] == '(') {
                            state = "func";
                            this.func = [];
                            continue;
                        }
                        if (sar[x] == ':') {
                            frequency = 0;
                            state = "name";
                            continue;
                        }
                        if (sar[x] == ">") {
                            var childrenStr = sar.slice(x + 1).join("");
                            if (childrenStr) {
                                this.Children = new Prop(childrenStr);
                            }
                            return this;
                        }
                        break;
                    case "name":
                        if (sar[x] == ':') {
                            frequency = 1;
                            now = "";
                        }
                        else {
                            if (frequency && reg.word.test(sar[x])) {
                                now += sar[x];
                            }
                            else {
                                //frequncy maybe = 0;
                                if (now) {
                                    this.name = now;
                                    now = "";
                                }
                                state = "start";
                                frequency = 0;
                                x--;
                            }
                        }
                        break;
                    case "num":
                        if (reg.number.test(sar[x])) {
                            now += sar[x];
                        }
                        else {
                            if (sar[x] == "*") {
                                this.num = Number(now);
                                now = "";
                                state = "start";
                            }
                            else {
                                throw Error("need * after number");
                            }
                        }
                        break;
                    case "targ":
                        if (reg.word.test(sar[x])) {
                            now += sar[x];
                        }
                        else {
                            this.targName = now;
                            now = "";
                            state = "start";
                            x--;
                        }
                        break;
                    case "id":
                        if (reg.word.test(sar[x])) {
                            now += sar[x];
                        }
                        else {
                            this.id = now;
                            now = "";
                            state = "start";
                            x--;
                        }
                        break;
                    case "class":
                        if (reg.word.test(sar[x])) {
                            now += sar[x];
                        }
                        else {
                            this.className += this.className ? " " + now : now;
                            now = "";
                            state = "start";
                            x--;
                        }
                        break;
                    case "attr":
                        if (sar[x] == "]") {
                            state = "start";
                            attrst = "attrstart";
                            now = "";
                            break;
                        }
                        else {
                            switch (attrst) {
                                case "attrstart":
                                    if (reg.word.test(sar[x])) {
                                        attrst = "key";
                                        x--;
                                        continue;
                                    }
                                    if (sar[x] == '=') {
                                        attrst = "equo";
                                        x--;
                                        continue;
                                    }
                                    if (sar[x] == "'") {
                                        attrst = "quote";
                                        x--;
                                        continue;
                                    }
                                    break;
                                case "key":
                                    if (reg.word.test(sar[x])) {
                                        now += sar[x];
                                    }
                                    else {
                                        onep = {
                                            key: now,
                                            value: ""
                                        };
                                        attrst = "attrstart";
                                        now = "";
                                        x--;
                                    }
                                    break;
                                case "equo":
                                    if (onep.key !== "") {
                                        attrst = "quote";
                                    }
                                    else {
                                        attrst = "attrstart";
                                    }
                                    break;
                                case "quote":
                                    if (sar[x] == "'" || sar[x] == "\"") {
                                        quoteStart = sar[x];
                                        attrst = "quoteStart";
                                    }
                                    else {
                                        if (reg.word.test(sar[x])) {
                                            attrst = "key";
                                            x--;
                                            continue;
                                        }
                                    }
                                    break;
                                case "quoteStart":
                                    if (sar[x] == quoteStart) {
                                        attrst = "quoteEnd";
                                        x--;
                                    }
                                    else {
                                        now += sar[x];
                                    }
                                    break;
                                case "quoteEnd":
                                    if (onep.key !== "") {
                                        onep.value = now;
                                        this.attr.push(onep);
                                        now = "";
                                        attrst = "attrstart";
                                    }
                                    else {
                                        now = "";
                                        attrst = "attrstart";
                                    }
                                    break;
                            }
                        }
                        break;
                    case "func":
                        switch (true) {
                            case reg.word.test(sar[x]):
                                now += sar[x];
                                break;
                            case sar[x] == ")":
                                now && this.func.push(now);
                                now = "";
                                state = "start";
                                continue;
                            case sar[x] == "'":
                            case sar[x] == "\"":
                                state = "quote";
                                quoteStart = sar[x];
                                continue;
                            default:
                                now && this.func.push(now);
                                now = "";
                                break;
                        }
                        state = "func";
                        break;
                    case "quote":
                        if (sar[x] == quoteStart) {
                            state = "func";
                            continue;
                        } else {
                            now += sar[x];
                            continue;
                        }
                }
            }
        }
    }

    var svg = {
        nameSpace: "http://www.w3.org/2000/svg"
        , circle(args) {
            var doc = globle.document.createElementNS(svg.nameSpace, "circle")
            doc.setAttribute("cx", args[0]);
            doc.setAttribute("cy", args[1]);
            doc.setAttribute("r", args[2]);
            return doc;
        }
        , rect(args) {
            var doc = globle.document.createElementNS(svg.nameSpace, "rect")
            doc.setAttribute("x", args[0]);
            doc.setAttribute("y", args[1]);
            doc.setAttribute("width", args[2]);
            doc.setAttribute("height", args[3]);
            args[4] && doc.setAttribute("rx", args[4]);
            args[5] && doc.setAttribute("ry", args[5]);
            return doc;
        }
        , line (args){
            var doc = globle.document.createElementNS(svg.nameSpace, "line")
            doc.setAttribute("x1", args[0]);
            doc.setAttribute("y1", args[1]);
            doc.setAttribute("x2", args[2]);
            doc.setAttribute("y2", args[3]);
            return doc;
        }
        , polygon(args) {
            var doc = globle.document.createElementNS(svg.nameSpace, "polygon")
            if (args.length < 3) {
                doc.setAttribute("points", args[0]);
                return doc;
            } else {
                var poiStr = ""
                    , x = 0
                    , y = 0
                    , cx = +args[0]
                    , cy = +args[1]
                    , len = +args[2]
                    , r = +args[3]
                    , pi = Math.PI * 2 / len
                    , cos = Math.cos
                    , sin = Math.sin
                    , vi = 0
                    , xi = 2;
                if (len % 2) {
                    xi = 2;
                } else {
                    xi = 3;
                }
                for (var i = 0; i < len; i++) {
                    vi = i * xi % len;
                    x = cos(pi * vi) * r;
                    y = sin(pi * vi) * r;
                    poiStr += (x + cx) + "," + (y + cy) + " ";
                }
                doc.setAttribute("points", poiStr);
                return doc;
            }
        }
        , svg(viewBox) {
            var doc = globle.document.createElementNS(svg.nameSpace, "svg")
            viewBox && doc.setAttribute("viewBox", viewBox.join(" "));
            return doc;
        }
        , createFunc(op) {

        }
        , define: {
            circle: { cx_cy_r() { } }
            , rect: { x_y_width_height_rx_ry() { } }
        }
        , init() {
            svg.createFunc(svg.define);
        }
    }



    var Hif = {
        creatEle(prop) {
            var doc;
            if (prop.targName == "svg") {
                doc = svg.svg(prop.func)
            } else if (prop.func) {
                doc = svg[prop.targName](prop.func);
            } else {
                doc = globle.document.createElement(prop.targName);
            }
            if (prop.id)
                // doc.id = prop.id;
                doc.setAttribute("id", prop.id);
            if (prop.className)
                // doc.className = prop.className;
                doc.setAttribute("class", prop.className);
            //add element attrs
            var len = prop.attr.length;
            for (let x = 0; x < len; x++) {
                var onep = prop.attr[x];
                doc.setAttribute(onep.key, onep.value);
                // doc[onep.key] = onep.value;
            }
            return doc;
        }
        , addDocs(srDoc, domRus) {
            domRus.docs.forEach((x) => {
                srDoc.appendChild(x);
            });
        }
        , addHTML(aimDoc, domHtml) {
            domHtml.forEach((x) => {
                aimDoc.appendChild(x);
            });
        }
        //js helper
        ,
        js: {
            getClass(obj) {
                return Object.getPrototypeOf(obj).constructor.name;
            },
            isPrimitive(value) {
                return typeof value === 'string' || typeof value === 'number';
            },
            isArray(obj) {
                var str = Object.prototype.toString.call(obj);
                return str === "[object Array]";
                // return obj instanceof Array;
                // return Array.isArray(obj);
            },
            getHash(n) {
                function getRandom(n) {
                    return parseInt(Math.random() * n + "");
                }
                var str = new Date().valueOf() + ":DATE";
                for (var x = 0; x < n; x++) {
                    str += getRandom(n);
                }
                return str;
            },
            Map: (function () {
                var ccd = Object.create(null);
                return function MyMap(obj, str) {
                    if (typeof obj !== "object") {
                        return ccd;
                    }
                    function has(obj) {
                        for (var x in ccd) {
                            for (var y in ccd[x]) {
                                if (ccd[x][y] == obj) {
                                    return {
                                        x: x,
                                        y: y
                                    };
                                }
                            }
                        }
                        return false;
                    }
                    var ha = has(obj);
                    if (ha) {
                        if (str) {
                            if (ha.x === str) {
                                return ha;
                            }
                            else {
                                return false;
                            }
                        }
                        else {
                            return ha;
                        }
                    }
                    else {
                        if (!str) {
                            return false;
                        }
                        ccd[str] = ccd[str] || [];
                        ccd[str].push(obj);
                        return {
                            x: str,
                            y: (ccd[str].length - 1) + ""
                        };
                    }
                };
            })(),
            arrayFuncs: [
                'push',
                'pop',
                'shift',
                'unshift',
                'splice',
                'sort',
                'reverse'
            ]
        },
        func: {
            id(n) {
                var id = Hif.js.getHash(n);
                return function getId() {
                    return id;
                };
            }
        },
        warn(str, substr) {
            console.warn(str);
            throw new Error(str);
        },
        doSomething(fr, job) {
            // switch(type){
            //     case "push":
            //     case "unshift":
            //     break;
            // }
            console.log("this is watch for : ", fr, "and will do : Array." + job);
        },
        Binder: {
            initVerge(srObj, srkey) {
                return;
            }
        },
        initObserve(value, asRootData) {
            if (!js.isObject(value)) {
                test.wrong();
            }
            var ob;
            if (js.hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
                ob = value.__ob__;
            }
            else if (config.observerState.shouldConvert &&
                !test._isServer &&
                (Array.isArray(value) || js.isPlainObject(value)) &&
                Object.isExtensible(value) &&
                !value._isVue) {
                ob = new Observer(value);
            }
            if (asRootData && ob) {
                ob.vmCount++;
            }
            return ob;
        },
        createWatcher(obj, key) {
        },
        createFollower(obj, key) {
        },
        getClass(classObj) {
            var str = "";
            for (var oneclass in classObj) {
                str += classObj[oneclass] ? oneclass + " " : "";
            }
            return str;
        },
        getStorage(STORAGE_KEY) {
            var localHave = localStorage.getItem(STORAGE_KEY);
            try {
                var storeArr = JSON.parse(localHave || '[]');
            }
            catch (e) {
                storeArr = [];
            }
            return storeArr;
        },
        finalStore(STORAGE_KEY, cb) {
            window.addEventListener("unload", function (e) {
                // alert("store the data")
                var value = cb(e);
                if (js.isPrimitive(value)) {
                    localStorage.setItem(STORAGE_KEY, value);
                } else {
                    localStorage.setItem(STORAGE_KEY, JSON.stringify(value));
                }
            });
        },
        target: null,
        Spf: (function initSpecaiFunc() {
            var domRus, srcel;
            function init(srcele, srcdomRus) {
                domRus = srcdomRus;
                srcel = srcele;
                return func;
            }
            function check() {
            }
            var func = {
                do(x, index) {
                    var has = domRus.has;
                    var hasx = has[x];
                    var ele = srcel;
                    Hif.setValIndex = index;
                    switch (x) {
                        case "data":
                            for (var onedata in hasx) {
                                Hif.setVal(ele.dataset, onedata, hasx[onedata]);
                            }
                            break;
                        case "on":
                            var onObj = domRus.has[x];
                            //添加事件监听
                            var rusObj = new ArgsEvent(onObj, ele);
                            return rusObj;
                        // case "data":
                        // break;
                        case "style":
                            for (var name in hasx) {
                                var aiName = el.refine("style", name);
                                Hif.setVal(ele.style, aiName, hasx[name]);
                            }
                            break;
                        case '$':
                            Hif.setVal(ele, "innerHTML", hasx);
                            break;
                        case "args":
                            //argsset$$
                            for (var name in hasx) {
                                var aiName = el.refine("args", name);
                                switch (aiName) {
                                    case "model":
                                        Hif.bindinVoker(ele, hasx.model);
                                        // console.log(ele)
                                        continue;
                                    case "show":
                                        if (typeof hasx[name] == "function") {
                                            js.Sp(Hif.target).on("somethingChange", function () {
                                                Hif.setVal(ele, "show", hasx.show());
                                            });
                                        }
                                        else {
                                            Hif.setVal(ele, "show", hasx.show);
                                        }
                                        continue;
                                    case "focus":
                                        switch (typeof hasx[name]) {
                                            case "function":
                                                js.Sp(Hif.target).on("somethingChange", function () {
                                                    var res = hasx[name]();
                                                    if (res) {
                                                        ele.focus();
                                                    }
                                                });
                                                break;
                                            default:
                                                var res = hasx[name];
                                                console.log("it is better to make focus prop as a function");
                                                if (res) {
                                                    ele.focus();
                                                }
                                                break;
                                        }
                                        continue;
                                    case "class":
                                        if (typeof hasx[name] == "object") {
                                            var classObjhere = hasx.class;
                                            var classCopy = {};
                                            for (let some in classObjhere) {
                                                if (typeof classObjhere[some] === "function") {
                                                    js.Sp(Hif.target).on("somethingChange", function () {
                                                        classCopy[some] = classObjhere[some].bind(ele)();
                                                        js.Sp(classCopy).notify("setKey");
                                                    });
                                                }
                                                else {
                                                    Hif.setOnepVal(classCopy, some, classObjhere[some], function (e) {
                                                        classCopy[some] = e.data;
                                                        js.Sp(classCopy).notify("setKey");
                                                    });
                                                }
                                            }
                                            // js.Sp(classCopy).on("change",function (){
                                            //     ele.className = Hif.getClass(classCopy);
                                            // })
                                            js.Sp(classCopy).on("setKey", function () {
                                                ele.className = Hif.getClass(classCopy);
                                            });
                                            ele.className = Hif.getClass(classCopy);
                                            continue;
                                        }
                                        break;
                                }
                                Hif.setVal(ele, aiName, hasx[name]);
                            }
                            break;
                    }
                    Hif.setValIndex = "";
                }
            };
            return init;
        })(),
        Cac: new js.Cacher(100),
        checkEleValue(ele) {
            var targN = ele.tagName;
            if (targN == "INPUT" || targN == "TEXTAREA") {
                return true;
            }
            else {
                return false;
            }
        },
        bindinVoker(ele, model) {
            var oneModel;
            if (model instanceof Array) {
                oneModel = model[Hif.setValIndex];
            }
            else {
                oneModel = model;
            }
            switch (ele.type) {
                case "checkbox":
                    Hif.setVal(ele, "checked", oneModel);
                    ele.addEventListener("click", function (e) {
                        oneModel.set(e.target.checked);
                    });
                    break;
                case "text":
                    Hif.setVal(ele, "value", oneModel);
                    ele.addEventListener("input", function (e) {
                        oneModel.set(e.target.value);
                    });
                    break;
            }
        },
        setBubble(srcObj, parent) {
            js.Sp(srcObj).on("bubble", function (e) {
                js.Sp(Hif.target).notify("somethingChange");
            });
        },
        viewDom(ele, padding) {
            var len = ele.children.length;
            var str = "\n";
            padding = padding || "  ";
            for (var i = 0; i < len; i++) {
                str += padding + Hif.viewDom(ele.children[i], padding + "  ") + "\n";
            }
            if (str != '\n') {
                str = '\n' + ele.tagName.toLowerCase() + str;
                return str;
            }
            return ele.tagName.toLowerCase();
        }
        , setValIndex: ""

        //set value for one js obj
        , setOnepVal(ele, key, value, cb) {
            switch (true) {
                case value instanceof DataLeaf:
                    //all listen to gsObj;
                    //but listener should be updated nextTick;
                    var gotValue = value.get();
                    ele[key] = gotValue;
                    js.Sp(ele, key).listenTo(value, "set", cb);
                    return;
                case value instanceof ArrayData:
                    function setArrayDom() {
                        ele.innerHTML = "";
                        if (value.__map_domList__ == undefined) {
                            ts.error("ArrayType");
                        }
                        else {
                            value.__map_domList__.forEach(function (a) {
                                var len = a.html.length;
                                for (var i = 0; i < len; i++) {
                                    ele.appendChild(a.html[i]);
                                }
                            });
                        }
                    }
                    js.Sp(value).on("domCreated", setArrayDom);
                    setArrayDom();
                    return;
                case value instanceof Array:
                    var i = Hif.setValIndex;
                    if (i !== "") {
                        Hif.setOnepVal(ele, key, value[i]);
                    }
                    return;
                case value && (value.set instanceof Function):
                    js.Sp(ele, key).listenTo(value, "set", function setValue(e) {
                        ele[key] = e.data;
                        js.Sp(ele).notify("setKey", { keyName: key });
                    });
                    break;
                default:
                    ele[key] = value;
            }
        }

        //for dom element
        , setVal(ele, key, value, cb) {
            switch (true) {
                case value instanceof DataLeaf:
                    //all listen to gsObj;
                    //but listener should be updated nextTick;
                    var gotValue = value.get();
                    switch (key) {
                        case "show":
                            function setShow(e) {
                                var gotV = e.data;
                                if (gotV) {
                                    ele.style.visibility = "visible";
                                }
                                else {
                                    ele.style.visibility = "hidden";
                                }
                            }
                            js.Sp(ele, key).listenTo(value, "set", setShow);
                            //初始化show值
                            setShow({ data: gotValue })
                            break;
                        default:
                            ele[key] = gotValue;
                            js.Sp(ele, key).listenTo(value, "set", cb);
                    }
                    return;
                case value instanceof ArrayData:
                    function setArrayDom() {
                        ele.innerHTML = "";
                        if (value.__map_domList__ == undefined) {
                            ts.error("ArrayType");
                        }
                        else {
                            value.__map_domList__.forEach(function (a) {
                                var len = a.html.length;
                                for (var i = 0; i < len; i++) {
                                    ele.appendChild(a.html[i]);
                                }
                            });
                        }
                    }
                    js.Sp(value).on("domCreated", setArrayDom);
                    setArrayDom();
                    return;
                case value instanceof Array:
                    var i = Hif.setValIndex;
                    if (i !== "") {
                        Hif.setVal(ele, key, value[i]);
                    }
                    return;
                case value && (value.set instanceof Function):
                    js.Sp(ele, key).listenTo(value, "set", function setValue(e) {
                        ele[key] = e.data;
                        js.Sp(ele).notify("setKey", { keyName: key });
                    });
                    break;
                default:
                    switch (key) {
                        case "show":
                            if (value) {
                                ele.style.visibility = "visible";
                            }
                            else {
                                ele.style.visibility = "hidden";
                            }
                            break;
                        case "class":
                            ele.className = value;
                            break;
                        case "value":
                            ele.value = value;
                            js.tick(ele, "input");
                            break;
                        default:
                            ele[key] = value;
                    }
            }
        },
        setChildren(ele, array) {
            var len = array.length;
            try {
                for (var i = 0; i < len; i++) {
                    ele.appendChild(array[i]);
                }
            } catch (e) {
                console.error(e);
            }
        },
        initSelector() {
            var beforeEditCache = false;
            var mmp = new Map();
            var func = {
                init(onep) {
                    var gt = mmp.get(onep);
                    var backgroundValue;
                    if (gt) {
                        return gt;
                    }
                    else {
                        gt = {
                            get() {
                                return backgroundValue;
                            },
                            set(v) {
                                backgroundValue = v;
                                js.Sp(this).notify("set");
                                //js.Sp maybe have storege lost!!!
                                //ai, just ignore it now !;
                            }
                        };
                        mmp.set(onep, gt);
                    }
                    return gt;
                },
                select(onep) {
                    if (beforeEditCache) {
                        beforeEditCache.set(false);
                    }
                    var lastgt = mmp.get(onep);
                    if (lastgt) {
                        lastgt.set(true);
                    }
                    beforeEditCache = lastgt;
                },
                set(onep) { }
            };
            func.set = func.select;
            return func;
        },
        initStorage(stObj) {
            for (let x in stObj) {
                let onep = stObj[x];
                onep.get(Hif.getStorage(x));
                Hif.finalStore(x, onep.set);
            }
        }
    };
    class EventFunc {
        constructor(str, func) {
            function getEvents(str) {
            }
        }
    }
    //depart this to attritube args;
    class ArgsEvent {
        constructor(obj, ele) {
            // var evs = [];
            // for (var x in obj){
            //     evs.push( new EventFunc (x,obj[x]) )
            // }
            this.attachTo(ele);
            // this.setArgs(args);
            for (let x in obj) {
                let func = obj[x];
                if (func instanceof Function) {
                    switch (x) {
                        case "create":
                            func.call(ele, ele, Hif.setValIndex)
                            break;
                        case "created":
                        case "afterCrreate":
                            js.Sp(ele).on("created", function () {
                                func.call(ele, ele, Hif.setValIndex)
                            })
                            break;
                    }
                    ele.addEventListener(x, func);
                }
                else {
                    switch (x) {
                        case "keydown":
                            for (let i in func) {
                                let unionKey = {};
                                let len = 0;
                                let pressNum = 0;
                                let keyName = ArgsEvent.keyValue(i);
                                let funci = func[i];
                                if (typeof keyName === "string") {
                                    var kc = keyCode[keyName]
                                    unionKey[kc] = 0;
                                    len = 1;
                                }
                                else {
                                    len = keyName.length;
                                    for (var ij = 0; ij < len; ij++) {
                                        var kc = keyCode[keyName[ij]]
                                        unionKey[kc] = 0;
                                    }
                                }
                                ele.addEventListener("keydown", function (e) {
                                    var sizeKey = e.keyCode;
                                    if (unionKey[sizeKey] === 0) {
                                        pressNum++;
                                        unionKey[sizeKey] = 1;
                                    }
                                    if (pressNum === len) {
                                        funci.call(this, e);
                                    }
                                });
                                ele.addEventListener("keyup", function (e) {
                                    var sizeKey = e.keyCode;
                                    if (unionKey[sizeKey] === 1) {
                                        pressNum--;
                                        unionKey[sizeKey] = 0;
                                    }
                                });
                            }
                            break;
                        case "keyup":
                            let caseFunc = {};
                            for (let i in func) {
                                var kc = keyCode[i.trim().toLowerCase()]
                                caseFunc[kc] = func[i];
                            }
                            ele.addEventListener("keyup", function (e) {
                                var funcE = caseFunc[e.keyCode];
                                if (funcE) {
                                    funcE.call(this, e);
                                }
                            });
                            break;
                    }
                }
            }
            // Tool.extend(this.el.dataset, this.args);
        }
        setArgs(obj) {
            if (obj) {
                this.args = obj;
            }
            else {
                this.args = {};
            }
            // this.args.dom = this.el;
        }
        attachTo(el) {
            this.el = el;
        }
        static keyValue(key) {
            {
                var keyarr = key.split("+");
                var len = keyarr.length;
                for (var i = 0; i < len; i++) {
                    var getKey = keyarr[i].trim().toLocaleLowerCase();
                    switch (getKey) {
                        case "ctrl":
                            getKey = "control";
                            break;
                    }
                    keyarr[i] = getKey;
                }
                if (len > 1) {
                    return keyarr;
                }
                else {
                    return key.toLocaleLowerCase();
                }
            }
        }
    }
    class DataLeaf {
        constructor(gt, id, parent, x) {
            if (!id) {
                id = Hif.js.getHash(6);
                this.root = id;
                js.def(this, "root", id);
                parent = this;
            }
            else {
                js.def(this, "parent", parent);
                js.def(this, "nodeName", x);
            }
            js.def(this, "set", gt.set);
            js.def(this, "get", gt.get);
            // js.def(this, "srData", dt);
            // var mp = Hif.js.Map(this,id);
            js.defineGetValue(this, "__data_id__", id);
            js.def(this, "__map_dom__", null);
            ``;
            // js.Sp(this).on("bubble", function (e) {
            //     if (parent.root !== id) {
            //         js.Sp(parent).notify("bubble", e);
            //     }
            //     js.Sp(parent).notify("somethingChange", e);
            // })
            Hif.setBubble(this, parent);
        }
    }
    class Data {
        constructor(dt, id, parent, x) {
            if (!id) {
                id = Hif.js.getHash(6);
                dt = JSON.parse(JSON.stringify(dt)); //clone to avoid dirty data; 
                this.root = id;
                js.def(this, "nodeName", "root");
                js.def(this, "root", id);
                parent = this;
                Hif.target = this;
            }
            else {
                js.def(this, "parent", parent);
                js.def(this, "nodeName", x);
            }
            js.def(this, "srData", dt);
            js.def(this, "__map_dom__", null);
            // var mp = Hif.js.Map(this,id);
            js.defineGetValue(this, "__data_id__", id);
            // js.Sp(this).on("bubble", function (e) {
            //     if (parent.root !== id) {
            //         js.Sp(parent).notify("bubble", e);
            //     }
            //     js.Sp(parent).notify("somethingChange", e);
            // })
            Hif.setBubble(this, parent);
            if (Hif.js.isPrimitive(dt)) {
                if (parent) {
                    let backgroundValue = dt;
                    let normalgt = {
                        set(v) {
                            if (js.isNotSimple(v)) {
                                // Data.setNewNode(this,v,id);
                                console.log("not a good simplify value");
                                return;
                            }
                            backgroundValue = v;
                            js.Sp(this).notify("set");
                        },
                        get() {
                            return backgroundValue;
                        }
                    };
                    return new DataLeaf(normalgt, id, parent, x);
                } else {
                    Hif.warn("can't init Data object from a primitive type data");
                }
            }
            for (let x in dt) {
                let backgroundValue = dt[x];
                let normalgt = {
                    set(v) {
                        if (js.isNotSimple(v)) {
                            // Data.setNewNode(this,v,id);
                            console.log("not a good simplify value");
                            return;
                        }
                        backgroundValue = v;
                        js.Sp(this).notify("set");
                    },
                    get() {
                        return backgroundValue;
                    }
                };
                let ty = js.getType(dt[x]);
                switch (ty) {
                    case "string":
                    case "number":
                    case "boolean":
                        let gt = new DataLeaf(normalgt, id, this, x);
                        this[x] = gt;
                        dt[x] = gt;
                        break;
                    case "array":
                        Data.initArrayData(dt, this, x, id);
                        // js.def(this[x], "set", normalgt.set)
                        js.def(this[x], "get", normalgt.get);
                        js.def(dt[x], "__map_data__", this[x]);
                        break;
                    case "object":
                        this[x] = new Data(dt[x], id, this, x);
                        // js.def(this[x], "set", normalgt.set)
                        // js.def(this[x], "get", normalgt.get)
                        js.def(dt[x], "__map_data__", this[x]);
                        dt[x] = this[x];
                        break;
                    case "function":
                        console.log("don,t know how to deal whit this");
                        break;
                }
            }
            // Object.freeze(this)
        }
        static initArrayData(dt, vm, x, id) {
            //make it to Data for Each one
            vm[x] = new ArrayData(dt[x], id, vm, x);
            js.Sp(vm[x]).on("reArray", function () {
                Data.reReadArray(dt, vm, x, id);
            });
            //set array function to this[x];
            for (let arrfunc of Hif.js.arrayFuncs) {
                vm[x][arrfunc] = function (...args) {
                    // Hif.doSomething(vm[x],arrfunc);
                    dt[x][arrfunc](...args);
                    if (arrfunc == "sort") {
                        js.Sp(vm[x]).notify("reArray");
                    }
                    else {
                        Data.reReadArray(dt, vm, x, id);
                    }
                };
            }
            var vmx = vm[x];
            vmx.assign = function (arr) {
                var len = vmx.length > arr.length ? arr.length : vmx.length;
                for (var i = 0; i < len; i++) {
                    vmx[i].set(arr[i]);
                }
            }
            vmx.length = dt[x].length;
            return vm[x];
        }
        static reReadArray(dt, vm, x, id) {
            var len = dt[x].length;
            var dtx = dt[x];
            for (var i = 0; i < len; i++) {
                if (dtx[i].__data_id__) {
                    if (dtx[i].__data_id__ !== id) {
                        ts.error("it is not good to set Data with Data");
                        return;
                    }
                    vm[x][i] = dtx[i];
                }
                else {
                    vm[x][i] = new Data(dtx[i], id, vm[x], i);
                    if (typeof dtx[i] == "object") {
                        js.def(dtx[i], "__map_data__", vm[x][i]);
                    }
                    dtx[i] = vm[x][i];
                }
                dtx[i].nodeName = i;
            }
            js.Sp(vm[x]).notify("reArrayDone");
        }
        // static setNewNode(vm, v, id) {
        //     var newNode = new Data(v, id, vm.parent, vm.nodeName);
        //     vm.parent[vm.nodeName] = newNode;
        // }
        static coheren(data) {
            if (data.set) {
                return data.get();
            }
            else {
                if (js.isPrimitive(data))
                    return data;
            }
            var rus = {};
            for (var x in data) {
                var srD = data[x].srData;
                if (js.isNotSimple(srD)) {
                    if (Array.isArray(srD)) {
                        rus[x] = [];
                        for (var j = 0; j < srD.length; j++) {
                            rus[x].push(Data.coheren(srD[j]));
                        }
                    }
                    else {
                        rus[x] = Data.coheren(data[x]);
                    }
                }
                else {
                    rus[x] = data[x].get();
                }
            }
            return rus;
        }
    }
    class ArrayData extends Data {
        constructor(dt, id, parent, x) {
            super(dt, id, parent, x);
        }
    }
    var gr = {
        uid: 0,
        uid$2: 0
    };
    class Dep {
        constructor(forObj) {
            this.evPool = {};
            this.jobs = {
                "set": false,
                "change": false,
                "bubble": false
            };
            this.id = gr.uid++;
            this.forObj = forObj;
        }
        addEvent(evType, cb) {
            if (!this.evPool[evType]) {
                this.evPool[evType] = [];
            }
            this.evPool[evType].push(cb);
        }
        removeEvent(evType, cb) {
            this.evPool[evType] = [];
        }
        emit(type, customerEv) {
            this.doingEv = type;
            if (this.jobs[type]) {
                return;
            }
            if (this.jobs[type] === undefined) {
                this.jobs[type] = false;
            }
            var ev = customerEv || {
                data: (this.forObj.get && this.forObj.get()) || "",
                from: this.forObj
            };
            // switch (type) {
            //     case "set":
            //     case "change":
            //     case "bubble":
            //     case "array":
            //     break;
            // }
            this.do(ev);
            if (!Dep.isToIgnore(type)) {
                this.emit("bubble", ev);
            }
        }
        do(ev) {
            var evty = this.doingEv;
            var jobs = this.jobs;
            function workList() {
                var callBacks = this.evPool[evty];
                for (var i in callBacks) {
                    if (callBacks[i] instanceof Function) {
                        callBacks[i](ev);
                    }
                    jobs[evty] = false;
                }
            }
            if (!this.jobs[evty]) {
                jobs[evty] = true;
                js.nextTick(workList, this);
            }
        }
        static isToIgnore(type) {
            if (Dep.toIgnore[type]) {
                return true;
            }
            return false;
        }
    }
    Dep.toIgnore = {
        bubble: true,
        reArray: true,
        reArrayDone: true
    };
    class Dom {
        constructor(jsDom) {
            this.args = {};
            // var Evm = new EventManager();
            var self = this
                , isNum = /^[0-9]+$/
                , parentProp = new Prop(".div")
                , parentEle = [globle.document.createElement("div")]
                , trueParentEle = parentEle[0]
                , parentRus = []
            function getDom(dom) {
                //for specail prop
                //for specails 
                var rus = {
                    has: {
                        on: null,
                        data: null,
                        args: null,
                        style: null,
                        $: null
                    },
                    docs: []
                };
                //create docs;
                var is_notcreateProp = false;
                if (dom instanceof Array) {
                    var arrNum = dom.length;
                    var arrMode = "parents"
                    is_notcreateProp = true;
                }
                for (let x in dom) {
                    if (x == "") continue;
                    if (Dom.is_specail(x)) {
                        rus.has[x] = dom[x];
                        continue;
                    }
                    var domRus;
                    var dnext = dom[x];

                    if (is_notcreateProp && isNum.test(x)) {
                        workForDnext(parentProp, parentEle[parentEle.length - 1], +x,dnext)
                        continue;
                    }

                    //avoid duplitly analizing
                    var prop = Hif.Cac.do(x, Prop);

                    /**Prop.name 生成记录当前的 ele 的变量
                     * it is an ele[]
                     */
                    //判断name 是否存在于this.dom上
                    //多于一个时变为数组;
                    function addValueName(name, oneEle) {
                        if (name) {
                            var namearr = self.args[name];
                            if (namearr) {
                                if (Array.isArray(namearr)) {
                                    namearr.push(oneEle)
                                } else {
                                    self.args[name] = [namearr, oneEle]
                                }
                            }
                            else {
                                self.args[name] = oneEle;

                                //方便误以为是数组的人
                                // oneEle[0] = oneEle;
                            }
                        }
                    }
                    function workForChildren(chilProp, parent, index,dnext) {
                        for (let i = 0; i < chilProp.num; i++) {
                            let oneEle = Hif.creatEle(chilProp);

                            parent.appendChild(oneEle);
                            if (chilProp.Children) {
                                addValueName(chilProp.name, oneEle);
                                workForChildren(chilProp.Children, oneEle, index * chilProp.num + i,dnext);
                            }
                            else {
                                workForFinalEle(chilProp, oneEle, index * chilProp.num + i,dnext);
                            }
                        }
                    }
                    function workForDnext(fprop, fEle, index,dnext){
                        var temp = parentProp;
                        parentProp = fprop;
                        parentEle.push(fEle);
                        switch (true) {
                            case js.isPrimitive(dnext):
                                //dosomthing with fEle
                                //when dnex is one value of an array;
                                /**arrMode --
                                 * useRus : don't have " > " in xstr , which parentElement is not ensured yet;
                                 *      ** [ use element.parentElement  ]
                                 * parents : use " > ", and element's parent is ensured; 
                                 */
                                if (arrNum > 1) {
                                    var newEle = Hif.creatEle(fprop);
                                    var oldEle = parentEle[parentEle.length - 2];

                                    if (index == 0 && fEle.parentElement == null) {
                                        arrMode = "useRus";
                                        parentRus[parentRus.length - 1].docs = [];
                                    }

                                    if (arrMode == "useRus") {
                                        fEle = newEle;
                                        parentRus[parentRus.length - 1].docs.push(fEle);
                                    } else {
                                        if (fEle.parentElement) {
                                            trueParentEle = fEle.parentElement
                                        } else {
                                            trueParentEle.appendChild(fEle);
                                        }
                                    }
                                    //default:
                                    parentEle[parentEle.length - 2] = newEle;
                                    addValueName(fprop.name, fEle);
                                }
                                //default: 
                                Hif.setVal(fEle, "innerHTML", dnext);

                                // rus.docs.push(tmpele);
                                break;
                            case dnext instanceof ArrayData:
                                // var tmpele = Hif.creatEle(fprop);
                                Hif.setVal(fEle, "", dnext);
                                // rus.docs.push(tmpele);
                                break;
                            case typeof dnext == "object":
                                parentRus.push(rus);
                                domRus = getDom(dnext);
                                Dom.initSpecail(fEle, domRus, index);
                                Hif.addDocs(fEle, domRus);
                                parentRus.pop();
                                break;
                        }
                        //递归后的pop,回返
                        parentProp = fprop;
                        parentEle.pop();
                        js.Sp(fEle).notify("created");
                    }
                    function workForFinalEle(fprop, fEle, index,dnext) {
                        
                        if(typeof dnext == "function"){
                            addValueName(fprop.name, function(args){
                                workForDnext(fprop,fEle,index,dnext.call(fEle,args));
                            })
                            workForDnext(fprop, fEle, index,dnext());
                        }else{
                            addValueName(fprop.name,fEle);
                            workForDnext(fprop, fEle, index,dnext);
                        }

                    }
                    //analy prop
                    for (let j = 0; j < prop.num; j++) {
                        //null node is none
                        if (dnext === null) {
                            break;
                        }
                        let oneEle = Hif.creatEle(prop);
                        //want to return docs
                        rus.docs.push(oneEle);

                        if (prop.Children) {
                            addValueName(prop.name, oneEle);
                            workForChildren(prop.Children, oneEle, j,dnext);
                        }
                        else {
                            //every times create new dom node
                            workForFinalEle(prop, oneEle, j,dnext);
                        }
                    }
                }
                return rus;
            }
            this.domRus = getDom(jsDom);
            this.html = this.domRus.docs;
        }
        //index use to get one from array value 
        static initSpecail(ele, domRus, index) {
            var to = Hif.Spf(ele, domRus);
            if (domRus) {
                for (let x in domRus.has) {
                    if (domRus.has[x] !== null) {
                        to.do(x, index);
                    }
                }
            }
        }
        static is_specail(str) {
            var specail = {
                on: 1,
                data: 1,
                style: 1,
                args: 1,
                $: 1
            };
            return !!specail[str];
        }
    }
    function Vir(ele, jsHiv) {
        var dom
            , doEle = globle.document.body

        // ele is true
        if (jsHiv) {
            dom = new Dom(jsHiv);
            switch (true) {
                //auto data Bind;
                case Array.isArray(ele):
                    ele.forEach(function(v){
                        for(var x in dom.args){
                            if( v[x] === null){
                                v[x] = dom.args[x];
                            }
                        }
                    })
                    break;
                case typeof ele == "object":
                    doEle = ele;
                    break;
                default:
                    try {
                        doEle = globle.document.querySelectorAll(ele)
                    }
                    catch (e) {
                        console.error(e);
                    }
                    return;
                    break;
            }
        }
        else {
            var dom = new Dom(ele);
        }
        Hif.setChildren(doEle, dom.html);
        return dom.args;
        //deal with for {}
    }
    function createEle(eleName, str) {
        return "<" + eleName + ">" + str + "</" + eleName + ">";
    }
    Vir.strong = function (str) {
        return createEle("strong", str);
    }
    Vir.addError = function (str, code) {
        error.addError(str, code);
        console.error(code, str);
    }

    var error = {
        hasVirWrong: false
        , shower: null
        , dt: new Data({
            show: false
            , wronglist: []
        })
        , showAlert() {
            error.dt.show.set(true);
        }
        , addError(str, code) {
            error.createAlert();
            error.dt.wronglist.push({
                str,
                code
            })
            error.showAlert();
        }
        , createAlert() {
            if (error.shower) return;
            error.shower = Vir({
                "#virError": {
                    ".icon div .wrong": ""
                    , ".content": {
                        ".message ::message": {
                            $: "此页有javaScript丢失,可前往控制台查看:ctrl+shif+I"
                        }
                        , "ol": For(error.dt.wronglist, (onep) => {
                            return {
                                "li": {
                                    args: {
                                        className: "wrongAt" + onep.code.get()
                                    }
                                    , $: onep.str.get() + "," + ("status code is:" + onep.code.get() + "</div>").small()
                                }
                            }
                        })
                    }
                    , args: {
                        class: {
                            show: error.dt.show
                        }
                    }
                }
            })
        }
    }

    function For(from = {}, cb = () => { }, extend = {}) {
        switch (true) {
            case Array.isArray(from):
                var rus = [];
                from.forEach(function (v, i, t) {
                    var onep = cb.call(this, v, i, t);
                    rus.push(onep);
                });
                js.extend(rus, extend)
                return rus;
                break;
            case (from instanceof ArrayData):
                var dataList = from.srData;
                function update() {
                    var domList = [];
                    dataList.forEach(function (a, b, c) {
                        var jsDom = cb.call(this, a, b, c);
                        var newDom;
                        newDom = a.__map_dom__;
                        if (newDom) {
                            domList.push(newDom);
                        }
                        else {
                            newDom = new Dom(jsDom);
                            a.__map_dom__ = newDom;
                            domList.push(newDom);
                        }
                    });
                    from.__map_domList__ = domList;
                    js.Sp(from).notify("domCreated");
                }
                js.Sp(from).on("reArrayDone", update);
                update();
        }
        return from;
    }

    function ajax(op = {
        type: "GET" || "POST"
        , async: true
        , url: ""
        , success(data = "") { }
        , error(data = "", xhr) { }
    }) {
        var xhr = new XMLHttpRequest();
        var queryStr = "";
        if (op.async == undefined) {
            op.async = true;
        }

        if (op.type == "GET") {
            if (op.data) {
                var head = '?';
                for (var x in op.data) {
                    queryStr += head + encodeURIComponent(x) + '=' + encodeURIComponent(op.data[x]);
                    head = "&";
                }
            }
            op.url += queryStr;
        }
        switch (op.type) {
            case "GET":
                xhr.open(op.type, op.url, op.async);
                xhr.send();
                break;
            case "POST":
                xhr.open(op.type, op.url, op.async);
                xhr.send(op.data);
                break;

        }
        if (op.async == undefined) op.async = true;
        xhr.onreadystatechange = function (e) {
            if (xhr.readyState == 4) {
                if (xhr.status == 200) {
                    op.success && op.success(e.target.response);
                } else {
                    op.error && op.error(e.target.response, xhr);
                }
            }
        }
    }

    function virRequire(op = {
        js: [
            "test.js"
        ]
        , cssDir: "http://localhost:3000/css/"
        , css: [
            "base.css"
        ]
    }) {
        var head = globle.document.head;
        if (op.css) {
            op.css.forEach((v) => {
                var style = globle.document.createElement("style");
                ajax({
                    async: true
                    , type: "GET"
                    , url: op.cssDir + v
                    , success(data) {
                        style.innerHTML = data;
                        head.appendChild(style);
                        console.log(ok);
                    }
                    , error(data, xhr) {
                        console.error(xhr, data);
                    }
                })
            })
        }
        if (op.js) {
            op.js.forEach((v, i) => {
                var jsc = globle.document.createElement("script");
                jsc.src = v;
                head.appendChild(jsc);
            })
        }
    }


    //init 初始化的,使得一些辅助的功能得以运行
    function initNodeFile(globle) {
        var inNode = false;
        try {
            inNode = (module !== undefined)
        }catch(e){
            inNode = false;
        }
        if (inNode) {
            // var file = require("./file.js")
            console.log("module is ok")

            //reWrite Hif func 
            function nodeEle(targName) {
                var arg = {
                    get innerHTML() {
                        if (arg.children.length > 0) {
                            var inner = arg.inner;
                            for (var i = 0; i < arg.children.length; i++) {
                                inner += arg.children[i].outerHTML;
                            }
                            return inner;
                        }else{
                            return arg.inner;
                        }
                    }
                    , set innerHTML(str = "") {
                        arg.children = [];
                        arg.inner = str;
                    }
                    , get outerHTML() {
                        return `<${targName} ${arg.getAttributeList()}>${arg.innerHTML}</${targName}>`
                    }
                    , parentElement : null
                    , setAttribute(attr, value) {
                        arg.list[attr] = value;
                    }
                    , appendChild(nd) {
                        arg.children.push(nd);
                        nd.parentElement = arg;
                    }
                    , getAttributeList() {
                        var str = "";
                        for (var attr in arg.list) {
                            str += attr + "= '" + arg.list[attr] + "' ";
                        }
                        return str;
                    }
                    , addEventListener(){
                        return true;
                    }
                    , list: {}
                    , children: []
                    , inner: ""
                }
                return arg;
            }


            if (globle.document == null) {
                globle.document = {
                    createElement: nodeEle
                }
            } else {
                console.error("Vir.js error!!,message:: you are useing document object from others ")
            }
            globle.document.body = nodeEle("body");
            Vir.body = globle.document.body;
            module.exports = Vir;
        }
        else {
            // someThingWrong
            globle.onerror = function (mes) {
                document.write(`
                <h2>Oops! ${mes} </h2>
                <p>please go to console to see what happend!</p>
                <p>you can press :&nbsp;&nbsp;<a href='#'>ctrl+shif+I</a></p>
            `)
            }
            globle.Vir = Vir;
        }
    }
    initNodeFile(globle);
    js.extend(globle,{
        Vir
        ,For
        ,js
        ,svg
        ,Data
    })
    js.extend(Vir,{
        svg
    })
}(this));
//change 
/**
 * 改动了Dom 的workfor..函数("修复了生成两个dom的bug")
 * 
 * 主动的提交内容的优化搜索
 * 
 */
/**
 * 更新日志::
 * 
 * 2017 8 23 
 * 修复了bug : 
 *  class 离子化
 * 添加功能:
 *  virjs file 加载的错误提示
 *  data 对象的数组 assign
 *  virRequire 功能
 * 
 * 2017 8 24 
 *  For 支持普通数组
 *  For 在普通数组时可以extend , 只可以single array;
 * 
 * 2017 8 25
 *  null节点阻断解析;
 *  支持array 节点;
 * 
 * 
 * 2017 8 29 
 *  js.tick 手动触发事件;
 *  set value 默认触发input //失败!! ,无法实现;
 * 
 *  在某个dom处插入Vir片段;( Vir 可以多参数 )
 *  iframe 默认解析到src上( iframe 节点只能是primitive or primitive[] )
 * 
 * 2017 8 30 
 *  use svg!
 * 
 * 2017 9 1
 *  run with node.js and create dom.html file
 *  函数的包装 
 * 2017 9 2
 *  自动的配置变量,配给值为null的;
 * 
 * 2017 9 5 
 *  函数式节点;
 * 
 * 待添加的功能
 *  智能的set
 * 
 *  
 */