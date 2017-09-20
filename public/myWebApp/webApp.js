
var dt = {
    apps: [
        {
            title: "随笔记"
            , theam: "green"
            , href: "http://www.suibiji.com"
        }
        , {
            title: "SpreadJS"
            , theam: "green"
            , href: "http://demo.gcpowertools.com.cn/spreadjs/ExcelLikeSample/inspector.html"
        }
        , {
            title: "Baidu"
            , theam: "green"
            , href: "http://www.baidu.com"
        }
    ]
    , mode: {
        fullScreen: "channelmode=yes,fullscreen=yes,location=yes,toolbar=yes"
    }
}

var conf = {
    clickDiv:{
        "title":{
            times:0
            ,size:123
        }
    }
    ,getTimer(title){
        if(!conf.clickDiv[title]){
            var timer = {
                times:0
            }
            conf.clickDiv[title] = timer;
        }else{
            timer = conf.clickDiv[title];
        }
        return timer;
    }
    ,getAddingSize(times = 0){
        Math.log(times+5);
    }
}

js.store({
    "apps":{
        get(data){
            dt.apps = data;
        }
        ,set(){
            return dt.apps;
        }
    }
})


var func = {
    openHref() {
        var wi = window.open(this.href, this.title, dt.mode.fullScreen,false);
        console.log(wi);
    }
    , icons:[
        "/favicons/favicon-192x192.png"
        ,"/favicon.ico"
    ]
    , lostIcon:"../images/crosshair.svg"
    ,getIcon(ele, v = {iconSrc:""}){
        var img = new Image();
        var i =0;
        var len = func.icons.length;
        img.src = v.iconSrc||(v.href + func.icons[i]);
        img.onload = function () {
            img.width = 40;
            img.height = 40;
            v.iconSrc = img.src;
            ele.appendChild(img);
        }
        img.onerror = function (e) {
            i++;
            if(i<len){
                img.src = v.href + func.icons[i];
                return true;
            }else{
                v.iconSrc = func.lostIcon;
                img.src = v.iconSrc;
                ele.appendChild(img);
                console.log("can't find favicon")
                return false;
            }
        }
    }
    ,sizeDiffer : Polynomial("3*log((x*3+144)/(x*3+1))").v
}

var app = {
    appList: null
    , add(dtJSON) {
        var v = dtJSON;
        if(this.appList){
            for(var x of dt.apps){
                if( x.title == v.title){
                    return null;
                }
            }
            dt.apps.push(v);
        }
        var timer = conf.getTimer(v.title);
        var VirDom = {
            "div": {
                args: {
                    title: v.title
                    , href: v.href
                }
                , style: {
                    "cursor": "pointer"
                }
                , on: {
                    click(){
                        // func.openHref.call(this);
                        timer.times++;
                        VirDom.needRender = true;
                        app.addSize(this, Math.round ( func.sizeDiffer(timer.times) ));
                    }
                }
                , ".head": {
                    ".icon": {
                        on: {
                            created() {
                                func.getIcon(this, v);
                            }
                        }
                    }
                    ,".des":{
                        $: v.title
                    }
                }
                , ".timer":()=>({
                    $:timer.times;
                })
            }
        }
        return Vir(this.appList, VirDom)
    }
    , addSize(ele,size){
        var offw = ele.offsetWidth;
        var offh = ele.offsetHeight;
        ele.style.width = offw + size+"px";
        ele.style.height = offh + size + "px";
    }
}

Vir([app], {
    "title": "MyApp",
    "nav": {

    }
    , "myh2":"常用的App"
    , ".content": {
        ".list ::appList": For(
            dt.apps
            , app.add
        )
    }
    , ".menu": ""
    , "footer": "hehe"
})

app.add({
    title: "CodePen"
    , theam: "green"
    , href: "http://codepen.io"
})