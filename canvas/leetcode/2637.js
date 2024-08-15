// Given an asynchronous function fn and a time t in milliseconds, return a new time limited version of the input function. fn takes arguments provided to the time limited function.

// The time limited function should follow these rules:

// If the fn completes within the time limit of t milliseconds, the time limited function should resolve with the result.
// If the execution of the fn exceeds the time limit, the time limited function should reject with the string "Time Limit Exceeded".

var timeLimit = function ( fn, t )
{

    return async function ( ...args )
    {



        let timeoutHandle = null
        let result = new Promise( async ( resolve, reject ) =>
        {
            timeoutHandle = setTimeout( () =>
            {
                reject( "Time Limit Exceeded" )
                console.log( "执行" )
            }, t )
            try
            {

                const t = await fn( ...args )
                clearTimeout( timeoutHandle );
                resolve( t )
            } catch ( err )
            {
                clearTimeout( timeoutHandle );
                reject( err )
            }

        } )

        return result
    }
};

async function start ()
{
    fn = async ( n ) => { await new Promise( res => setTimeout( res, 100 ) ); return n * n; }

    inputs = [ 5 ]
    t = 50
    const limited = timeLimit( fn, t )
    const start = performance.now()
    let result;
    try
    {
        const res = await limited( ...inputs )
        result = { "resolved": res, "time": Math.floor( performance.now() - start ) };
    } catch ( err )
    {
        result = { "rejected": err, "time": Math.floor( performance.now() - start ) };
    }
    console.log( result )
}
start()