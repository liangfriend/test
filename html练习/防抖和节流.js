// 节流



//防抖


function debounce(fn,delay) {
let timeout;
let immediate = true;
return function(...args) {
const context = this;
if(timeout) clearTimeout(timeout);
if(immediate) {
immediate = false;
fn(context,args)
}else {
timeout = setTimeout(()=>{
fn(context,args)
},delay)
}


}
}



function throttle(fn,delay) {

let oldTime = Date.now();
return function(...args) {
const context = this;
let newTime = Date.now();
if(newTime - oldTime < delay) {
fn.apply(context,args)
oldTime = Date.now();
}

}
}