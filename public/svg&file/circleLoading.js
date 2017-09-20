(function (globle) {
    var Load = Vir.createLoader("sync");

    js.setValue(globle, "times", (v = 0)=> v + 1);

    if (globle.times > 5) {
        Vir({
            ".orange [style = 'color:orange']": (globle.times>1 ? "最后的光辉!"+ (globle.times - 1) : null),
            ".onep[style = 'padding:10px;border:1px solid gray']": "it is Over!"
        })
        return;
    } else {
        Vir({
            ".orange  [style = 'color:orange']": (globle.times>1 ? "意思一下!"+ (globle.times - 1) : null)
            , ".onep[style = 'padding:10px;border:1px solid gray']": Load("./circleLoading.js")
        });
    }
    Vir.config(["htmlString"]);
    var htmlStr =( "如果手机不能玩" + "游戏".span(".outstand") + "你还要吗??" ).prop("q .quote");
    console.log(htmlStr);
})(this);