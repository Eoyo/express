//    <script src = "http://localhost:3000/Hiv/HivData.js"></script>
var show = Hiv ({
    "4*div.good":{
        $:["good","hello","hai","lium"]
        ,on:{
            created(){
                this.title = this.innerHTML;
            }
        }
    }
})