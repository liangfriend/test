const data={
    'a':1,
    'b':null,
    'c':undefined,
    'd':'ss',
    'e':{
        'f':1,
        'g':undefined
    }
}
function a(data){
    
    for(let key in data){
        if(typeof(data[key])==='object'){
            a(data[key])
        }
        if(!data[key]){
            delete data[key]
        }
    }
}
a(data)
console.log(data.e)
