const worker = new Worker( 'self.js' );
worker.onmessage = ( e ) =>
{
    const data = e.data;
    console.log( 'Receive self message' )
}
function work ()
{
    worker.postMessage( Math.floor( Math.random() * 10 ) );
}
window.start = work
