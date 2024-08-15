Array.prototype.snail = function ( rowsCount, colsCount )
{

    const limit = colsCount * rowsCount
    if(limit!==this.length) return []
    const cols = Math.floor( ( this.length - 1 ) / rowsCount + 1 )
    const arr = Array.from( { length: rowsCount }, () => [] )
   
    this.forEach( ( e, i ) =>
    {
        const x = Math.floor( i / rowsCount )
        
        const y = ( x % 2 === 0 ? i % rowsCount : ( rowsCount - i % rowsCount )-1 ) 
       console.log(x,y,i)
        arr[ y ][ x  ] = e
    } )
    return arr
}

const arr = [ 1, 3 ]
const a=arr.snail( 2, 2 );
console.log(a)