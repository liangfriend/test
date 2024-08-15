class Asd
{
    constructor ()
    {
        this.constant = 1   
        console.log(this.constant)
    }
}
// const aa=new Asd()
function test (func)
{
    func()
}

test( function  b(m)
{this.a=1
    console.log( this.a )
    b(this.a)
})