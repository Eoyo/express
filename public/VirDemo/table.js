var good = {
    list: [1, 2, 3]
}
good = new Data(good);

var table = Vir({
    ".desc": "这是手动实现的table,在下面输入后按enter"
    , "input": {
        on: {
            keydown: {
                "enter"(e) {
                    good.list.push(this.value);
                }
            }
        }
    }
    , ".mytable": {
        ".tr": For(good.list, (onep) => {
            return {
                ".td": {
                    $: onep
                    , on: {
                        
                        "click"(e) {
                            var index = onep.nodeName;
                            good.list.splice(index,1);
                        }
                    }
                }
            }
        })
        , "3*.tr > 2*.td": {
            $: [
                "m1","m2", "m3"
                ,"m1","m2", "m3"
            ]
        }
    }
})
console.log(table.VVVVVV);