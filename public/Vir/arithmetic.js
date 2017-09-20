"use strict"

function Variable() {

    var arg = {

    }
    return arg;
}
var nodePrototype = {
    eval(v) {
        var value = 0;
        if (this.vari.eval) {
            v = this.vari.eval(v)
        }
        if (this.sign == '-') {
            value = -this.hes * v
        } else {
            value = this.hes * v
        }
        if (this.exp !== 1) {
            value = Math.pow(value, exp);
        }
        return value;
    }

}
function itNode() {
    var node = {
        vari: 'x'
        , value: ""
        , hes: 1
        , str: "-x"
        , sign: '-'
        , exp: 1
    }
    node.__proto__ = nodePrototype;
    return node;
}


function Item(str) {
    var operate = []
        , items = []
        , onep = null
        , lasOp = 9
        // for item link
        , link = []
    var arg = {
        do(x, ol) {
            if (typeof ol == "string") {
                ol = Item(ol);
            }
            //add x
            if (Item.opeRang[x] > lasOp) {
                onep = items.pop();
                items.push(Item.opeFunc[x](onep, ol));
            } else {
                lasOp = Item.opeRang[x]
                operate.push(Item.opeRang[x])
            }

            //add ol
            items.push(ol);
            return arg;
        }
        , eval() {
            return arg;
        }
    }
    items.push(arg);
    return arg;
}
Item.opeRang = {
    "*": 3
    , "/": 3
    , "^": 4
    , "+": 2
    , "-": 2
}
Item.opeFunc = {
    "*"(aItem, bItem) {

    }
    , "/": 3
    , "^": 4
    , "+": 2
    , "-": 2
}


function Polynomial(str = "", type) {
    //loop variable
    var len = 0
        , i = 0

        //for str compiler
        , usi = 0
        , varis = {}
        , vax = []
        // {
        //     x: "varis[0]"
        //     , y: "varis[1]"
        // }
        , onep = ""
        , las = "start"
        , stri = ""

        //for stack compiler
        , uter = null
        , fuc = "return ("
        , lastOne
        , stack = []
        , quo = []
        , qnm = -1
        , items = {}
        , lastItem = null
        //item auto 
        , uterStack = {
            push() {
                this.uterArr.push(uter);
                this.lastOneArr.push(lastOne);
                this.lastItemArr.push(lastItem);
                lastOne = "";
                lastItem = "";
                uter = null;
            }
            , pop() {
                lastOne = this.lastOneArr.pop();
                lastItem = this.lastItemArr.pop();
                uter = this.uterArr.pop();
            }
            , lastOneArr: []
            , uterArr: []
            , lastItemArr: []
        }
        , evalLastItem = ""

    //compile item str to stack;
    str += "\0";
    len = str.length;
    for (i = 0; i < len; i++) {
        stri = str[i];
        switch (las) {
            case "start":
                switch (true) {
                    case /[\(\)]/.test(stri):
                        stack.push(str[i]);
                        continue;
                    case /[0-9]/.test(stri):
                        las = "num";
                        onep = str[i];
                        continue;
                    case /\w/.test(stri):
                        las = "vari";
                        onep = str[i];
                        continue;
                    case stri == " " || stri == "\0":
                        continue;
                    default:
                        stack.push(str[i]);
                        continue;
                }

            case "num":
                if (str[i].match(/[0-9]/)) {
                    onep += str[i];
                } else {
                    if (onep) {
                        try {
                            stack.push(Number(onep));
                        } catch (e) {
                            console.log(e);
                        }
                    }
                    las = "start";
                    i--;
                    continue;
                }
                break;

            case "vari":
                if (str[i].match(/\w/)) {
                    onep += str[i];
                } else {
                    if (onep) {
                        if(Math[onep]){
                            varis[onep] = "Math."+onep;
                        }else{
                            if (!varis[onep]) {
                                varis[onep] = "varis[" + usi + "]";
                                usi++;
                                vax.push(onep);
                            }
                        }

                        stack.push(varis[onep]);
                    }
                    las = "start";
                    i--;
                    continue;
                }
                break;
        }
    }
    if (type == 1) {
        return stack;
    }

    // compile stack to function ;
    // stack = ["'x'", "+", "(", 3, "*", "(", "'x'", "-", 4, ")", "*", "'y'", ")", "^", 3];
    // stack = [3, "*", "x", "-", "y"];
    lastOne = "";
    len = stack.length;
    if (type == 3) {
        for (i = 0; i < len; i++) {
            switch (stack[i]) {
                case "(":
                    uterStack.push();
                    break;
                case ")":
                    evalLastItem = lastItem + ".eval()";
                    uterStack.pop();
                    if (uter) {
                        lastItem = uter(evalLastItem);
                        uter = null;
                    }
                    break;
                case "*":
                case "/":
                case "+":
                case "-":
                case "%":
                case "^":
                    lastOne = stack[i];
                    uter = (next) => (`${lastItem}.do('${lastOne}',${next})`);
                    break;
                default:
                    if (uter) {
                        lastItem = uter(stack[i])
                        uter = null;
                    } else {
                        lastItem = `Item(${stack[i]})`
                    }
                    break;
            }
        }
        return lastItem;
    }

    quo = []
    qnm = -1;
    for (i = 0; i < len; i++) {
        if (uter) {
            lastOne = uter(stack[i])
            uter = null;
        } else {
            switch (stack[i]) {
                case "(":
                    if (lastOne) {
                        if(qnm<0){
                            fuc += lastOne;
                        }else{
                            quo[qnm] += lastOne;
                        }
                    }
                    qnm++;
                    quo[qnm] = "(";
                    lastOne = "";
                    break;
                case ")":
                    quo[qnm] += lastOne + ")";
                    lastOne = quo[qnm];
                    qnm--;
                    break;
                case "^":
                    uter = (next) => ("Math.pow(" + lastOne + "," + next + ")");
                    continue;
                default:
                    if (qnm >= 0) {
                        quo[qnm] += lastOne;
                        lastOne = stack[i];
                    } else {
                        fuc += lastOne;
                        lastOne = stack[i];
                    }
            }
        }
    }
    fuc += lastOne + ")";
    if (type == 2) {
        return fuc;
    }
    var getValue = new Function("varis", fuc);
    var arg = {
        assign(...args) {
            console.log(getValue(args));
        }
        , varisLength: usi
        , see(...args) {
            if (args.length <= 0) {
                return str;
            }
            var reg = /varis\[[0-9]*\]/;
            var get = /varis\[([0-9]*)\]/
            var seeStack = stack.map(function (si) {
                if (reg.test(si)) {
                    var num = get.exec(si)[1];
                    return args[+num];
                }
                return si;
            })
            return seeStack.join("");
        }
        , coheren() {

        }
        , getVax() { //获取变量名
            return vax;
        }
        , v(...args) {
            return getValue(args);
        }
        , at(op = {
            y: 0
        }) {
            return this;
        }
        , ifValue(val) {
            if (arg.varisLength > 1) {
                console.log("can't do it now!")
                return;
            } else {
                var maxTime = 10;
                function atX(x){
                    if(maxTime<0){
                        return x;
                    }else{
                        maxTime--;
                    }
                    var y = arg.v(x)
                    , offset = y - val
                    , y2 = arg.v(x-offset)
                    if(offset<0.1 && offset>0.1){
                        return x;
                    }
                    if(y2*y&&offset*(y+y2)>0){
                        return atX(x - offset/2);
                    }else{
                        return atX(x + offset/2);
                    }
                }
                return atX(0);
            }
        }
    }
    return arg;
}