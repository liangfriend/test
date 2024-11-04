const obj={
    b:{
        c:1
    }
}
const l=obj.b
obj.b=null
console.log(l)
console.log(obj)