// 接收一个函数，返回一个新的函数，多次调用则返回第一次的结果
// function once(func) {
//     let used = false
//     let ans = null
//     return function() {
//         if(used) return ans
//         used = true
//         ans = func()
//         return ans
//     }
// }


//防抖
function fangdou(func,delay){
    let timer=null
    return function(){
        clearTimeout(timer)
        timer=setTimeout(()=>{
            func()
        },delay)
        
    }
}


//节流
function jieliu(func,delay){
    let is=flase
    return function(){
        if(!is){
            is=true
            setTimeout(()=>{
                func()
                is=false
            },delay)
        }

    }
}