(function (globle) {

    //num 目标数,进制,余递增的剩余集数组;
    function toString(num,k,code) {
        var str = ""
        function getMagicCoin(num = 10) {
            if (num <= 0) {
                console.log(num);
                return str;
            }
            var id = num % k;
            if(code){
                id = code[id];
            }
            num = num - id;


            str = id + str;
            return getMagicCoin(num / k);
        }
        console.log(getMagicCoin(num));
    }
    toString(156,2,[2,1]);
    //model 
    Vir({
        "title": "Hello"
        , ".viewbox": {
            $: "你好,我是异步加载的"
        }
    })
})(this)