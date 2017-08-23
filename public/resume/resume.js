var res = {
    name: "刘淼"
    , sex: "男"
    , age: "22岁"
    , from: "湖北" + "咸宁人".small()
    , aim: "web前端工程师"
    , tel: "18362901054"
    , email: "yoix@foxmail.com"
    , img: "http://localhost:3000/images/lium.jpg"
    , data: [
        {
            for: "简介"
            , message: `none`
        }
        , {
            for: "教育"
            , school: "南京邮电大学"
            , major: "软件工程"
            , rank: "本科"
            , time: "2014-2018"
        }
        , {
            for: "技能"
            , caption: [
                {
                    title: "web前端"
                    , skills: [
                        "HTML5/SVG"
                        , "CSS3/SASS"
                        , "JavaScript/ES6"
                        , "Jquery/Vue/Bootstrap"
                    ]
                }
                , {
                    title: "web后端"
                    , skills: [
                        "node.js"
                        , "websokect"
                        , "gulp.js"
                    ]
                }
            ]
        }
        , {
            for: "项目经验"
            , caption: [
                {
                    title: "Vir.js"
                    , job: "核心研发人员"
                    , about: `用于js的模板引擎，一种框架，一种开发理念。利用${"属性名解析".bold()}将js对象转成dom，将js的独特对象语法展现地淋漓尽致`
                    , github: "https://github.com/Eoyo/express/tree/master/public/Vir"
                }
                , {
                    title: "会议记录系统"
                    , job: '全栈开发'
                    , about: "利用Vue与node.js写的一个web App。可对会议信息分类、查看会议进程、实时分配任务。新颖的可视化操作大获老师的赞许"
                }
                , {
                    title: "某一军工保密系统"
                    , job: "web前端可视化"
                    , about: "参与云计算老师的一个项目,了解了前后端合作的难点,学会了使用百度Echarts,jQuery,BootStrap等现有框架"
                }
            ]
        }
    ]
    , foot: {
        desc: "用Vir.js写成,Vir.js可以方便的把Json 映射成DOM"
        , github: "https://github.com/Eoyo/express/tree/master/public/resume"
    }
}


//标题
var title = {
    desc :"个人简历"
}
var git ={
    icon:`<svg height="24" class="octicon octicon-mark-github" viewBox="0 0 16 16" version="1.1" width="24" aria-hidden="true"><path fill-rule="evenodd" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z"></path></svg>`
}
var flu = {
    createSkills(caps = []) {
        var rus = {};
        caps.forEach(function (v, k) {
            rus[k + "; div"] = {
                $: v.title.big()
                , [`ul.skillsUL> ${v.skills.length}* li`]: {
                    $: v.skills
                }
            }
        })
        return rus;
    }
    , createExperience(caps = []) {
        var rus = {};
        caps.forEach(function (v, k) {
            var temp = rus[k + "; div .oneProj"] = {
                ".head": v.title
                , [v.job ? ".job div[title='job']" : ""]: (v.job ? {
                    $: v.job.small()
                } : 0)
                , "p": {
                    $: v.about
                }
            }
            v.github && (temp[".github"] = {
                $:git.icon + "github详情:" + ("<a href='" + v.github + "'>" + v.github + "<a/>").small()
            })
        })
        return rus;
    }
}
var doa = Vir({
    ".resume": {
        ".title":{
            ".main": title.desc
            ,"div.english":{
                span:"personal resume"
            }
        }
        ,".head": {
            ".message": {
                ".name": res.name + '<span>' + res.sex + " " + res.age + "·" + res.from + "</span>"
                , ".aim": "求职意向:".big() + res.aim.bold()
                , "div.img": {}
            }
            , ".contact": {
                "2*div": {
                    $: [
                        "电话: ".bold() + res.tel
                        , "邮箱: ".bold() + res.email
                    ]
                }
            }
        }
        , [(s = res.data, "education, .row ::edu")]: {
            h3: s[1].for
            , ".content": {
                h2: s[1].school
                , "p.indent": {
                    div: "专业:" + s[1].major.big()+ "("+s[1].rank+")" + s[1].time.small()
                }
            }
        }
        , "skills; .row": {
            "h3": s[2].for
            , ".content .skillsDiv": flu.createSkills(s[2].caption)
        }
        , "experience; .row": {
            "h3": s[3].for
            , ".content": flu.createExperience(s[3].caption)
        }
        , "foot": {
            ".desc": ("<a href='" + res.foot.github +"'>此页面<a/>").small() + res.foot.desc.small()
        }
    }
})