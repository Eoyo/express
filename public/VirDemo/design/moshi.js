var Single = (function () {
    var _single = null;
    class $Single {
        constructor() {
            if (_single !== null) {
                return _single;
            }
            this.a = "hello";
        }
        wow() {
            console.log("hehe");
        }
    }
    _single = new $Single();
    return function _Single() {
        return new $Single();
    }
})();

//内存模式,类的编译模式;
var Sp = (function initSp(mode) {
    var name = "";
    class SpRus {
        constructor(str = "") {
            this.type = str;
        }
        getName() {
            return name;
        }
        setName(str = "") {
            name = str;
            return this;
        }
    }
    var rus = new SpRus();
    switch (mode) {
        case "new":
            return function SpCreate(op) {
                rus = new SpRus(op);
                name = op;
                switch (typeof op) {
                    case "string":
                        console.log(rus.getName());
                }
                return rus;
            }

        //use share by default;
        case "share":
        default:
            return function SpShare(op) {
                name = op;
                rus.type = op;
                switch (typeof op) {
                    case "string":
                        console.log(rus.getName());
                }
                return rus;
            }
    }
})("share");

var op = Sp("sfs");
console.log( op.setName("sfs").type );
tes.find(op,".*")