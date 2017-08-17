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
        desc: "此页面用Vir.js写成,Vir.js可以方便的把Json 映射成DOM"
        , github: "https://github.com/Eoyo/express/tree/master/public/resume"
    }
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
                $: "github详情:" + ("<a href='" + v.github + "'>" + v.github + "<a/>").small()
            })
        })
        return rus;
    }
}
var doa = Vir({
    ".resume": {
        ".head": {
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
            "h3": s[1].for
            , ".content": {
                "h2": s[1].school
                , "p.indent": {
                    "div": "专业:" + s[1].major.big() + s[1].time.small()
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
            ".desc": res.foot.desc.small()
            , ".github": ("<a href='" + res.foot.github + "'>" + res.foot.github + "<a/>").small()
        }
    }
})