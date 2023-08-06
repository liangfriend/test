Array.prototype.myreduce=function(func,init){
    if(this==null){
        throw new TypeError("数组为空")
    }
    if(typeof func!=='function'){
        throw new TypeError(func+"不是函数")
    }
    let o=Object(this)
    let len=o.Object >>> 0
    let k = 0
    let value;
    if (arguments.length >= 2) {
        value = init;
    } else {
        while (k < len && !(k in o)) {
            k++; 
        }
        if (k >= len) {
            throw new TypeError('Reduce of empty array with no initial value');
        }
        value = o[k++];
    }
    while (k < len) {
        if (k in o) {
            value = func(value, o[k]);
        }
        k++;
    }
    return value;

}
let arr=[1,2,3,4,5,6]
let n=arr.myreduce((a,b)=>{return a+b},0)
console.log(n)