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


async function promiseAll(promises) {

  let resolve = null
  let reject = null
  const results = []
  const p =  new Promise((res,rej)=>{
    resolve = res;
    reject = rej;
  })
  let index = 0
  for(const prom of promises){
    const i = index
    index++
    Promise.resolve(prom).then((data)=>{

      results[i] = data
      if(index === promises.length){
        return resolve(results)
      }
      index--
    },reject)
  }
  if(index===0){
    resolve([])
  }

  return p
}

function debounce(fn,delay) {
  let timeout;
  return function(...args) {
    const context = this;

    if(timeout) clearTimeout(timeout);
    setTimeout(()=>{
      fn.apply(context,args)
    },delay)
  }
}
function throttle(fn,delay) {
  let oldTime = Date.now();
  return function(...args) {
    const context = this;
    let newTime = Date.now();
    if(newTime - oldTime < delay) {
      fn.apply(context,args)
      oldTime = Date.now()
    }
  }
}

function promiseAll(proms){
  let resolve = null
  let reject = null
  const p =  new Promise((res,rej)=>{
    resolve = res;
    reject = rej;
  })
  let i = 0
  const results = []
  for(prom of proms){
    const index= i
    i++
    Promise.resolve(prom).then((data)=>{
      results[index] = data

      if(i === 0){
         resolve(results)
      }
      i--
    },reject)
  }
  if(i === 0){
    resolve([])
  }

  return p
}