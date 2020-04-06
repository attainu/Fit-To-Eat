var fs=require('fs');
let file=fs.readFileSync('./data.csv','utf8')
file=file.split('\n')
// console.log(file)
let arr=[]
for(i=0;i<file.length;i++){
    let data=file[i].split(',')
    let object={
        name:data[0],
        category:data[1],
        food:data[2],
        calorie:data[3],
        price:data[4]
    }
arr.push(object)
}
console.log(arr)
module.exports=arr