const original = [ 1, 5, 2, 40, 51, 20, 41, 20, 31, 54, 12, 3, 1, 4, 6 ]

function sort ()
{
    const length = original.length
    let low = 0
    let high = length - 1
    const mid = length / 2
    let spot = 0


    spot = medianOfThree( original[ low ], original[ high ], original[ mid ] )

    while ( low < high )
    {
        if ( original[ low ] > spot )
        {
            let temp = spot
            spot = original[ low ]
            original[ low ] = temp
        } else
        {

        }
    }

}
//取中值辅助函数
function medianOfThree ( a, b, c )
{
    if ( ( a - b ) * ( c - a ) >= 0 )
    {
        return a;
    } else if ( ( b - a ) * ( c - b ) >= 0 )
    {
        return b;
    } else
    {
        return c;
    }
}
