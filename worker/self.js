self.onmessage=(e)=>{
    const data=e.data;
    console.log('worker data:'+data)
    timeCount(data)
}
function timeCount(data){
    setTimeout(()=>{
        console.log('计算一秒')
        self.postMessage(data**2)
    },1000)
}



