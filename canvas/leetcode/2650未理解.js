



var cancellable = function ( generator )
{
  let rej = null
  const promise=new Promise(async (resolve,reject) =>
  {
    rej = reject
   
    let res={value:new Promise(r=>r()),done:false}
    while ( !res.done )
    {
      res = await res.value.then(  e=> generator.next( e ) )
      console.log(res)
    }
    
    
    resolve(res.value)
  } ).catch( e =>
  {
    rej(e)
  })


  const cancel = () =>
  {
    console.log("失败")
    rej('失败')
  }
  return [cancel,promise]
  
};





function* tasks ()
{
  
  const val = yield new Promise( resolve =>
  {
    
    resolve( 2 + 2 )
  } );
  
  yield new Promise( resolve => setTimeout( resolve, 100 ) );

  return val + 1;
}
const [cancel, promise] = cancellable(tasks());
setTimeout(cancel, 150);
promise.catch( console.log ); 







