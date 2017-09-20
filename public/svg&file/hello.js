var prettySelector = {
    init: Vir.modelInit
    , name: "selector"
    , main() {
        var style = document.createElement("style");
        style.innerHTML = ``;
        document.body.appendChild(style);
        var select = this[this.name];
        if (Array.isArray(select)) {
            for (var x of select)
                this.renderSelect(x);
        } else {
            this.renderSelect(select);
        }
    }
    , renderSelect(select) {
        var func = {
            run(num) {
                if (this.ran) {
                    func.displayChildren(num);
                    return;
                }
                var max = 5;
                var i = max;
                var j = 0;
                var ls = this.ele.children;
                function display() {
                    if (i >= max) {
                        i = 0;
                        if (ls[j]) {
                            ls[j].className = "active" + num;
                        } else {
                            return;
                        }
                        j++;
                    } else {
                        i += 1;
                    }
                    requestAnimationFrame(display);
                }
                display();
                this.ran = true;
            }
            , oldClassName: ""
            , displayChildren(num) {
                this.ele.className = this.oldClassName + " show" + num;
            }
            , ran: false
            , set ele(ele) {
                this._ele = ele;
                this.oldClassName = ele.className;
            }
            , get ele() {
                return this._ele;
            }
        }
        var [title, list] = Vir(select, ["title", "list"])
            // var [title, list,ls] = Vir(select, [".title", ".list",".list>div"])
            , troggle = 1
            , active = 0
        func.ele = list[0];
        Vir(title[0], {
            on: {
                click(e) {
                    if (troggle) {
                        list[0].style.visibility = "visible";
                        func.run(active);
                        active ^= 1;
                    } else {
                        list[0].style.visibility = "hidden";
                    }
                    troggle ^= 1;

                }
                , selected(e) {
                    this.innerHTML = e.detail;
                }
            }
            , style: {
                cursor: "pointer"
            }
        })
        Vir(list[0], {
            on: {
                click(e) {
                    if (e.target.parentElement == list[0]) {
                        var str = e.target.innerHTML;
                        Vir.send(title[0], {
                            eventName: "selected"
                            , type: "custome"
                            , detail: str + 12
                        })
                    }
                }
            }
            , style: {
                cursor: "pointer"
            }
        })
    }
}

var love = {
    love: null
    , main() {
        var loveHeart = love.love
            , ctx = this.love.getContext("2d")
            , gg = new Garden(ctx, loveHeart)
            // renderLoop
            , time = setInterval(
                function () {
                    gg.render();
                }
                , 50
            );
        //init 
        var lis = 1000;
        Vir(loveHeart, {
            style: {
                width: lis + "px"
                , height: lis + "px"
            }
            , args: {
                width: lis
                ,height:lis
            }
        })
        this.offsetX = lis/ 2;
        this.offsetY = lis/ 2;
        this.startHeartAnimation(gg);
    }
    , getHeartPoint(angle) {
        var t = angle / Math.PI;
        var x = 19.5 * (16 * Math.pow(Math.sin(t), 3));
        var y = - 20 * (13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));
        return [this.offsetX + x, this.offsetY + y];
    }
    , startHeartAnimation(gg) {
        var interval = 50;
        var angle = 10;
        var heart = new Array();
        var animationTimer = setInterval(function () {
            var bloom = love.getHeartPoint(angle);
            var draw = true;
            for (var i = 0; i < heart.length; i++) {
                var p = heart[i];
                var distance = Math.sqrt(Math.pow(p[0] - bloom[0], 2) + Math.pow(p[1] - bloom[1], 2));
                if (distance < Garden.options.bloomRadius.max * 1.3) {
                    draw = false;
                    break;
                }
            }
            if (draw) {
                heart.push(bloom);
                gg.createRandomBloom(bloom[0], bloom[1]);
            }
            if (angle >= 30) {
                clearInterval(animationTimer);
            } else {
                angle += 0.2;
            }
        }, 50);
    }
}

var lis = [
    "grunt"
    , "gulp"
    , "liumiao"
]

var eoyo = Vir([prettySelector.init({ name: "selector" }), love], {
    "Head; h2": "head"
    , "::selector .selector": {
        ".title": "clickMe"
        , ".list > div": lis
    }
    , "Tail; h2": "tail"
    , "canvas .loveFlower ::love": ""
});
// load.setContext(eoyo.ele);