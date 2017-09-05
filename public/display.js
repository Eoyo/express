//looks more professional
function Display(
    // default parameter ;
    op = {
        projs: [
            {
                title: "Booking System"
                , about: "To be honest ,it is just a table not a system."
                , link: "./Booking"
            }
            , {
                title: "Vir.js"
                , about: "use javascript to write html"
                , list: [
                    "separated data from document"
                    , "<a href = './display.js' >this pages</a> is write with vir.js"
                    , "you create html dom, you don't need jquery"
                ]
                , link: "./Vir"
            }
            , {
                title: "Chess"
                , about: "left hand play with right hand"
                , list: [
                    "old fashion"
                    , "you can't play online with others because of github page"
                ]
                , link: "./fiveGame"
            }
            , {
                title: "Chess"
                , about: "you can play with yourshelf"
            }
        ]
    }
) {
    //configue;
    var page = {
        title: "Welcome to Eoyo's GitHub Page!"
    }


    var mozila = {
        getImage() {
            return '<span xmlns="http://www.w3.org/1999/xhtml" class="newtab-thumbnail thumbnail" style="background-image: url(&quot;moz-page-thumb://thumbnail/?url=https%3A%2F%2Fwww.suibiji.com%2F%23%2Fnote%2Fnew&amp;revision=567&quot;);"></span>'
        }
    }

    //functions
    var flu = {
        //op.width is number of projs in one row
        createProjs(
            op = {
                projs: []
                , width: 3
            }
        ) {
            var rus = {};
            //transform
            function threeForRow(
                v = {
                    title: "", about: "", link: ""
                }
                , i
            ) {
                //add  one tr
                //one tr ,three children
                var trStr = Math.floor(i / op.width) + "; .tr"
                var oneTr = rus[trStr] || (rus[trStr] = {});

                //add one child to oneTr
                oneTr[i + "; div .onep"] = {
                    ".head": v.title
                    , ".desc": v.about

                    //amazing bind to list
                    //To declare as null stop the analysing
                    , "ul > li": v.list || null
                    , on: {
                        click(e) {
                            Vir(
                                this,
                                {
                                    "iframe [width = '1024px' height = '768px']": {
                                        args: {
                                            src: flu.getLink(v.link)
                                        }
                                    }
                                }
                            )
                        }
                    }
                    , args: {
                        href: flu.getLink(v.link)
                    }
                }
            }
            op.projs.forEach(threeForRow);
            return rus;
        }

        //auto refine the ulr;
        , linkLast: /\w*\.(html|js)/
        , getLink(
            link = "./nothing"
        ) {
            //auto add '/index.html';
            var dirs = link.split("/");
            flu.linkLast.test(dirs[dirs.length - 1])
                || (link += "/index.html")

            return link;
        }
    }

    ///create the page
    var eoyo = Vir({
        "nav": {
            "div .h3": page.title
        }
        , ".content": flu.createProjs({
            width: 3
            , projs: op.projs
        })
        , "title": "Display"
    })

    //test
    console.log(flu.getLink())
}
Display();
exports = Display;