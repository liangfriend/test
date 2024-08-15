var o = ( function ()
{
    var obj = {
        a: 1,
        b: 2
    }
    //Object.setPrototypeOf(obj,null),断掉原型链来防止攻击
    return {
        get: function ( k )
        {
            return obj[ k ]
        }
    }
} )()
// 在不改变上面代码的情况下修改obj对象
Object.defineProperty( Object.prototype, 'abc', {
    get ()
    {
        return this
    }
} )
const obj = o.get( 'abc' )
console.log( obj )
obj.a = 21123

console.log( o.get( 'a' ) )
//这种方法是攻击原型链



