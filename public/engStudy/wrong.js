var dt = new Data({
    show: [0, 1]
})
var wrong = Vir({
    ".virError": {
        ".icon div .wrong": ""
        , ".content": {
            ".message": {
                $: "此页有javaScript丢失,可前往控制台查看"
            }
        }
        , args: {
            class: {
                show: dt.show[0]
                , active: dt.show[1]
            }
        }
    }
})
dt.show.assign([1, 1])