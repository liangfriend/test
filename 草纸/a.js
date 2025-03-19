function a () {
    return new Promise(resolve => resolve()).then(e =>{
        console.log(1)
    })

}
function b(){
    a()
    console.log(2)
}
b()