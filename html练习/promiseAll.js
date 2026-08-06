function promiseAll(promises) {
  return new Promise(function(resolve,reject) {
    let resolvedCounter = 0
    let promiseNum = promises.length;
    let resolvedResults = new Array(promiseNum);
    for(let i =0;i<promiseNum;i++) {
      Promise.resolve(promises[i]).then(val=>{
        resolvedCounter++
        resolvedResults[i] = val
        if(resolvedCounter === promiseNum) {
          return resolve(resolvedResults)
        }
      },error => {
        return reject(error);
      })
    }
  })
}