# Vir.js
> *新** Vir的介绍太长了,看点小东西到: 六. 一些额外的小功能

## 一.基本用法
>index.html
```html
<html>
<head>
    <meta charset = "utf-8">
    <link rel="stylesheet" href="test.css">
</head>
<body>
    <script src = "Vir.js"></script>
    <script src="table.js" ></script>
</body>
</html>
```

>table.js
```js
var table = Vir({
    table:{
        "3*tr > 2*td"{
            $:[
                1,2
                ,3,4
                ,5,6
            ]
        }
    }
})
```
>于是你有了一个三行二列的 table; 以下是语法篇;

## 一.属性名解析语法
### 1.基本的 id 与class 解析 : `"#id .class .classtwo"`
`#`后紧跟id名, `.`后跟class名,class是按顺序的,可以多个;id 与和class 不分顺序,class之间有顺序的;
标签名默认为div;

### 2.属性解析:`[key = 'value']` 
和html 中写属性值一样;

### 3.子元素解析:`".parent > .son"` 
>创建的是:
```html
<div class = "parent">
    <div class = "son"></div>
</div>
```
>在js中:
```js
".parent > .son":{
    $:"son"
    ///绑定在最后生成的元素上;即为.son上;
}
```


### 4.多个元素 : `"3* div"`
数字和*黏在一起;不可以!!!!:`"3 *div"`。
但是可以:`"3*div"`。最好是放在开头，其他地方也可以，但容易出错；



### 5.定义变量 : `"div  ::oneDiv"`
创建的div存在oneDiv里。可以多次出现::oneDiv在不同的标签属性里，结果是oneDiv变成了数组，按创建次序记录各个element；还可以与point 4中的乘法搭用，生成数组（不是“反常坑”的HTMLcollection）。


### 6.混搭 :`"div ::parentDiv > 3*div ::threeChild"`
js代码:
```js
var test = Vir({
    "div ::parentDiv > 3*div ::threeChild":{
        $:"son"
        ///绑定在最后生成的元素上;即为.son上;
    }
})
```
生成如下:
```html
<div> 
    <div>son</div>
    <div>son</div>
    <div>son</div>
</div>
```
使用变量threeChild;
```js
test.threeChild.forEach((v)=>{
    v.innerHTML = "use";
})
```
改动效果如下html:
```html
<div> 
    <div>use</div>
    <div>use</div>
    <div>use</div>
</div>
```

### 6.1 分述,(解构)
>如果js代码为:
```js
".parent > 3* .son":{
    $:["son1","son2","son3"]
    args:{
        title:"son"
    }
    ///绑定在最后生成的元素上;即为.son上;
}
```

分述在节点值为数组时触发;否则为复述
>生成html为:

```html
<div> 
    <div title = "son">son1</div>
    <div title = "son">son2</div>
    <div title = "son">son3</div>
</div>
```
### 6.2 以数组为节点的 分述,(数组内值的大类型得一致)
#### 1. 为值类型
```js

".parent >.son":[
    "son1","son2","son3"
]
//绑定在最后生成的元素上;即为.son上;
//等价于 如下:
".parent > 3* .son":{
    $:["son1","son2","son3"]
    ///绑定在最后生成的元素上;即为.son上;
}
//前者相当于是一种特殊情况的简写
```
#### 2. 为对象类型

### 7.标记 :`"Hidden; .parent"`
>主要用途:
* 解决同级的属性名不可以一样的问题;
* 调试的时候好看, 相当于为属性写了注释
* 强制避免无意义重复, 强制让代码更有意思;

>注意事项:
* 大量重复的用代码生成,使用分述等;
* 为了与内联的style区分,`[style='color:blue;border:gray;']`,`;`后不打空格,style采用压缩写法
* 标记是唯一要注意*空格*使用的语法;用于标记的分号`;`后必须加空格,否则会报错;
### 8*.svg
部分支持了,正在开发
可确定的特性有
```
"svg (0 0 200 200)"
"polygon ('0,0 3,3 0,6')" ////画个指定路径的多边形
"polygon (15 15,5,5)" //画个正五边形
"circle (1,2,1)"
//逗号这分割符你随意也可以空格等,别和关键字冲突就可以;
```
如上,'????' 引号引起来的为一个整体,用(??)实现函数式的传固定的属性值;当然也可以:`"circle[cx = '100' cy = '100' r= '50']"`
>不推荐直接用js代码开发svg的应用,我正在开发vitalSvg.js;可视化的,类似于CAD的,可嵌入脚本的开发;更加的面向未来,哈哈;


### 注意事项 
>逗号这分割符你随意也可以空格等,别和关键字冲突就可以;
>该黏在一起的,要黏在一起如:"#id" 不可以写成"# id"

## 二.特殊属性
目前的有: `$ data style args on`共五个
### 1.$
简单的直接绑定的innerHTML; 如果只想绑定到innerHTML,可以简写;如下为两种写法:
```js
{
    "1;.parent" : "我在innerHTML里了"
    "2;.parent" : {
        $ : "我在innerHTML里了"
    }
}
```

### 2.data
解析到dom对象的dataSet接口上
,都会被和谐成字符串的哈哈;
### 3.style
简单的extend到样式上;

### 4.args
相当于setAttribute 到dom element对象上; 但特殊的有:'class离子化'
```js
args:{
    class:{
        active:false
        song : true
    }
}
//则className解析为: "song" (可被Data对象绑定)
```
### 5.on
用于绑定各种事件特殊的有:
```js
on :{
    "created"(ele,index){//( ele:这个elememt ,index:第几个 )
        //当dom element 被创建后执行;
        //通常在nexttick 回调
        //当然 this == ele,只是this不利于使用函数闭包,我就给了你个ele
    }

    keydown:{
        "ctrl + k"(e){
            //轻松的绑定组合键;
        }
    }
}
```
>keydown 中可以使用的keyname 详见Vir.js代码开头的keyCode对象;

## 三.双向绑定

说实话我不喜欢这个,虽然我实现了,但还是先讲讲变量声明大法吧!

## 四.变量声明大法

前面的 `一.5.定义变量` 中只提到了属性中变量声明的方式"::"+"valueName",现在讲讲高级用法

### 1.结合"模块"使用
```js
var model1 = {
    sex : null
    , setSex(str = "男"){
        this.sex.innerHTML = str;
    }
}
var model2 = {
    name : null
    , setName(str = "eoyo"){
        this.name.innerHTML = str;
    }
}
/*
null 在js里多用于表示这里空着个对象;
null 在Vir.js里更进一步的表示这是故意空着的缺口
    ,是区别与undefined的,Vir会吧生成的值塞到这个缺口
*/


var dom = Vir([model1,model2],{
    "p ::sex":""
    ,"div ::name":""
})

//然后你的models 就可以工作了: ,对IDE也是相当的友好了;
model1.setName("SiLuo");

//现代的js解释器属性名访问比数组脚标访问还快,全对象化没啥不好...,嗯..应该就是这样子的;
```
> ps:如果有重名呢?会变成数组;

### 2.让render函数与Vir的文档树更近 (好看一点)

```js
var yiKu = {
    display:null
    ,fire(){
        this.display("放大了!!揍你!");
        console.log("fire is ok!");
    }
}

//对的 你必须得用[]包裹你的yiKu;
var dom = Vir([yiKu],{
    "div .dosomething ::display"(str){
        return {
            $:str
        }
    }
    // 此时display 指向的是 一个函数; 其this 指向"div.dosomething"
})
```
> ps: Vir的文档树最好是只有一个,即只有一个独立 Vir();

### 五.那个很麻烦的双向绑定

#### 1.实现双向绑定的关键: Data 类
```js
//原始数据
var dt = {
    list:[
        "good"
        ,"nice"
    ]
    ,title:"welcome"
}

//data 化
dt = new Data (dt);
//dt 就像是进化了 , 不可引用的基础值类型变成了可以引用的object类型;
console.log( dt.title )
/*输出
{
    get(){...}
    ,set(){...}
}
*/
//值被get set化
```


#### 2.在Vir里使用
>将会遇到关键函数 For()
```js
var dt = new Data ({
    list:[
        "good"
        ,"nice"
    ]
    ,title:"welcome"
});

var dom = Vir ({
    ".title":{
        $:dt.title
    }
    , "ul":For( //***关键函数 For ****
        dt.list
        , (listr)=>({ //js 箭头函数
            "li":{
                $:listr
            }
        })
    ) //*** For end ***;
})

//绑定后的简单操作
dt.list.push( "well" );//点对点的触发更新
dt.title.set("store");

/*
如果你不想绑定只是静态的渲染的话:
*/
//一下是简单的静态的渲染
var dt2 = {
    list:[
        "good"
        ,"nice"
    ]
    ,title:"welcome"
}
var dom2 = Vir({
    ".title":{
        $:dt2.title
    }
    , "ul > li": dt2.list
})
// oh 短了许多.... (使用了,一. 6.2 以数组为节点的 分述)

/*
复杂的静态的渲染的话:
*/
var dt3 = {
    list:[
        "good"
        ,"nice"
    ]
    ,title:"welcome"
}
var dom3 = Vir({
    ".title":{
        $:dt3.title
    }
    , "ul": For(
        dt3.list
        , (listr) =>( { li : listr } )
        , {
            args : {
                className : "ulList"
            }
        }
    )// *新** 三参数For(),第三个参数相当于写在"ul"上; 这里生成了: "ul.ulList > li ..."
    // *新** For 也可以用普通的值为第一参数;,只是不能双向绑定了
    // ps: 想要 n参数的 For()??, 那样不好看了,算了;除非有必要;
    , "same as last one ul; ul":{
        li : dt3.list
        , {
            args : {
                className : "ulList"
            }
        }
    }
})
// oh 长了许多....
```

### 六. 直接以js文件为模块
> 前端文件的加载只能是异步的;Vir.js对dom的显示做了优化,以防异步模块加载造成的*闪动*;
> 模块无需特别的申明为模块,能*独立运行*的Vir文件都可以为模块;
具体用法如下:
1. 创建加载器: `var Load = Vir.createLoader("sync");`
2. 使用加载器加载文件到Vir的dom树节点上:　`, ".onep": Load("./vitalSvg.js")`
```js

var Load = Vir.createLoader("sync");  //*new**  创建加载器类型为:sync;
var eoyo = Vir({
    "0; h2": "head"
    , ".onep": Load("./vitalSvg.js")  //*new** viralSvg.js 的Vir 全局上下文为当前文件中Vir生成的 `div.onep`
    , "::ele": "Ok了"
    , "1; h2": "tail"
});

// 同文件中你可以用多次的全局 Vir,会接着eoyo里的内容显示;
var reok = Vir({ 
    "0; h2": "head"
    , "::ele": "Ok了"
    , "1; h2": "tail"
});
//*alert** 你甚至可以自己加载自己,可以陷入循环加载,小心爆栈!;
```

3. 理论上是可以实现`愚蠢的自加载`的: (这个目前只能在浏览器端跑)
>circleLoading.js
```js
//circleLoading.js
(function (globle) {
    var Load = Vir.createLoader("sync");

    js.setValue(globle, "times", (v = 0)=> v + 1);

    if (globle.times > 5) {
        Vir({
            ".orange": (globle.times>1 ? "最后的光辉!"+ (globle.times - 1) : null),
            ".onep": "it is Over!"
        })
        return;
    } else {
        Vir({
            ".orange": (globle.times>1 ? "意思一下!"+ (globle.times - 1) : null)
            , ".onep": Load("./circleLoading.js")
        });
    }
})(this);
```

> 结果是 :
<div class="onep" style="padding:10px;border:1px solid gray"><div class="orange" style="color:orange">意思一下!1</div><div class="onep" style="padding:10px;border:1px solid gray"><div class="orange" style="color:orange">意思一下!2</div><div class="onep" style="padding:10px;border:1px solid gray"><div class="orange" style="color:orange">意思一下!3</div><div class="onep" style="padding:10px;border:1px solid gray"><div class="orange" style="color:orange">意思一下!4</div><div class="onep" style="padding:10px;border:1px solid gray"><div class="orange" style="color:orange">最后的光辉!5</div><div class="onep" style="padding:10px;border:1px solid gray">it is Over!</div></div></div></div></div></div>

### 附. 一些额外的小功能
>ps: 功能独立,实现是耦合的;就算Vir.js 你不喜欢,还有些小功能希望你喜欢

#### 1.htmlString

增加了String.prototype的方法; 让你轻便的生成html dom string; 如下javascript 代码:
```js
Vir.config(["htmlString"]); //声明你要用htmlString;

var htmlStr =( "如果手机不能玩" + "游戏".span(".outstand") + "你还要吗??" ).prop("q .quote");
console.log(htmlStr);
/*

输出为:
"<q class = "quote">如果手机不能玩 <span class = "outstand">游戏</span>你还要吗??</q> "

*/
```
    htmlString 写起来更符合写代码的习惯;
    1.span 显示地要用`span`包裹文字;
    2.prop 通用的, 传入值使用Vir.js 的属性名语法;没有target 名,将默认用`div`包裹文字;
>ps:未完待续..