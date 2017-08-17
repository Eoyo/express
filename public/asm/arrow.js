var getOne = ()=>{
    if(a--<0){
        return ;
    }
    getOne();
};
function getw(){
    if(b--<0){
        return ;
    }
    getw();
}
var b = 1000;
var a = 1000;

getOne();
setTimeout(getw,1000)