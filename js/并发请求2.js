//模拟异步请求
function reqeust(){
    return new Promise( res =>
    {
        setTimeout( () =>
        {
            console.log( "请求" )
            res( "请求" )
        },1000)

    })
}
function concurRequest ( requests, maxNum )
{
    if ( requests.length===0)return Promise.resolve([])
    return new Promise( resolve =>
    {
        let index = 0
        const results = []
        //当前请求完成数量，有可能出现有请求未结束，但是resolve掉的情况
        let count=0
        async function _request ()
        {
            const i=index
            const curRequest = requests[ index ]
            index++
            try
            {
                const res = await curRequest()
                results[i]=res
            }catch(err){
                results[ i ] = err
            } finally
            {
                count++
                if ( count===requests.length )
                {
                    console.log( "请求结束" )
                    resolve( results )

                } 
                if ( index < requests.length ) {
                    _request()
                }
                
            }
           
        }
        for ( let j = 0; j < maxNum; j++ )
        {
            _request()
        }
        
       
    } )
}

const requests = [ reqeust, reqeust, reqeust, reqeust, reqeust, reqeust, reqeust, reqeust ]
async function a ()
{
    const res = await concurRequest( requests, 3 )
    console.log(res)
}

a()