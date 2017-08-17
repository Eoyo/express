# Vir.js

## 基本写法
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
                1,2,3
                ,4,5,6
            ]
        }
    }
})
```
>于是你有了一个三行二列的 table;<div>目前还在设计开发,有些地方没确定下来,使用方法可能改动,但是基本语法不变,以下是语法篇;</div>

## 属性名解析语法
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

### 7.标记 :`"Hidden; .parent"`
同级的属性名不可以一样,否则会覆盖之前的;
so,使用 "???; ",在真的被解析字符前面加标记;
最好是有意义的,调试的时候好看;

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



### 注意事项 
>逗号这分割符你随意也可以空格等,别和关键字冲突就可以;
>该黏在一起的,要黏在一起如:"#id" 不可以写成"# id"

## 特殊属性
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
直接extend 到dom element对象上; 但特殊的有:'class离子化'
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
用于绑定各种事件
特殊的有:
```js
on :{
    "created"(ele,index){
        //当dom element 被创建后执行;
    }

    keydown:{
        "ctrl + k"(e){
            //轻松的绑定组合键;
        }
    }
}
```