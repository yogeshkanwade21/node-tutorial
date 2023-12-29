const os = require('os')
const fs = require('fs')

// fs.writeFileSync('text.txt', 'hii from fs');
// fs.writeFileSync('text1.txt', 'hiii from fs', (err) => {});
// const text = fs.readFileSync('text.txt', 'utf-8');
// console.log(text);
// fs.readFile('text1.txt', 'utf-8', (err, result) => {
//     if(err){
//         console.log(err);
//     } else {
//         console.log(result);
//     }
// });
// fs.appendFileSync('text.txt', 'hahaha\n');
// fs.cpSync('text.txt', 'copy.txt');
// fs.unlinkSync('copy.txt');
console.log(os.cpus().length);