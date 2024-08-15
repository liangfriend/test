/*
eval 同步，当前作用域
setTimeout 异步，全局作用域
script 同步，全局作用域  会创建额外标签
Function 同步 全局作用域
*/
const code = "console.log(1)"
let a = 1
//当前作用域
function exec ( code )
{
    let a = 2
    eval( code )
}

//打印2
exec( code )

//这两个个执行不了，不知道咋回事，有可能需要浏览器环境
// function exec2 ( code )
// {
//     let a = 3
//     setTimeout( 'console.log(1)', 0 );
// }
// exec2( code )
// function exec3 ( code )
// {
//     let a = 4
//     const func = new Function( code )
//     func()
// }
// exec3( code )
function exec4 ()
{
    //创建script元素，设置innerHtml为code，把元素加到页面
}