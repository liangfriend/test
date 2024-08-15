
const bool = true
function a ()
{

    if ( bool )
    {
        console.log( 1 )
        if ( bool )
        {
            console.log( 2 )

        }
        console.log( 3 )
    }
    console.log( 4 )
}
a()