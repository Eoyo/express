var op = {
    value: "# I'am tired"
}

var editor = Vir({
    "#editor": {
        "textarea ::txt": {
            args: {
                value: op.value
            }
            , on: {
                input: _.debounce(function (e) {

                    //Vue 是拒绝dom的,so它得绕弯子;
                    //Vir.js 用标记就能解决:
                    flu.computeMarkdown(e.target.value);
                }, 300)
            }
        }
        , "div ::markdown": ""
    }
    ,"title": "Introduce"
})

var flu = {
    computeMarkdown(value) {
        editor.markdown.innerHTML = marked(value, { sanitize: true });
        editor.txt.value = value;
    }
}

//run functions to init ;
flu.computeMarkdown(op.value);

ajax({
    type:"GET"
    ,url : "./README.md"
    ,success: flu.computeMarkdown
})