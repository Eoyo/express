// function second(second) {
//     if (typeof second == "number") {
//         var sec = second;
//         second = Math.abs(second);
//         var date = {
//             day: Math.floor(second / (24 * 60 * 60))
//             , hour: Math.floor(second / 3600) % 24
//             , min: Math.floor(second / 60) % 60
//             , second: second % 60
//         }
//         for (var x in date) {
//             if(date[x]!=0&&sec<0){
//                 date[x] = -date[x];
//             }
//         }
//         return date;
//     } else {
//         return null;
//     }
// }

// function render(data) {
//     var date = second(data);
//     if (date) {
//         var dom = document.getElementById("jsCountdown");
//         var str = "";
//         //refine the date;

//         for (var x in date) {
//             if (Math.abs(date[x]) < 10) {
//                 if (date[x] < 0) {
//                     date[x] = "-0" + Math.abs(date[x]);
//                 } else {
//                     date[x] = "0" + date[x];
//                 }
//             }
//         }
//         if (date.day != "00") {
//             str += "<sapn>" + date.day + "天</span>";
//         }
//         str += "<sapn>" + date.hour + ":</span>";
//         str += "<sapn>" + date.min + ":</span>";
//         str += "<sapn>" + date.second + "</span>";
//         dom.innerHTML = str;
//     } else {
//         return null;
//     }
// }

// // while(line=readline()){
// //     var sec= parseInt(line);
// //     render(sec);
// // }

// var line = "";
// // while(line=readline()){
// //     var lines = line.split("\n");
// //     var a = lines[0];
// //     var b = lines[1];
// //     var barr  = b.split("");
// //     barr.sort();
// //     // print(a+b);

// // }

// // var lines = line.split("\n");
// var a = lines[0]+"";
// var b = lines[1]+"";
// var aarr = a.split("");
// var barr = b.split("");
// barr = barr.sort(function (a, b) {
//     if (a >= b) {
//         return -1;
//     } else {
//         return 1;
//     }
// })
// console.log(barr);
// var j = 0;
// var lenb = barr.length;
// for (var x = 0; x < aarr.length; x++) {
//     if (aarr[x] < barr[j]) {
//         aarr[x] = barr[j];
//         if (j < lenb - 1) {
//             j++;
//         } else {
//             break;
//         }
//     }
// }
// // print(aarr.join(""));
// console.log(aarr.join(""));


// Math.max()

// 运算符的优先级
var val = "0";
console.log('Value is ' + (val != '0') ? 'define' : 'undefine');
//+ 大于?;
