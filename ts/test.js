async function a(){
    await new Promise((resolve, reject) => {
        console.log(1)
        resolve()
    }).then(()=>{
        console.log(5)
    })
    await new Promise((resolve, reject) => {
        console.log(2)
    })
    new Promise((resolve, reject) => {
        console.log(3)
    })
    new Promise((resolve, reject) => {
        console.log(4)
    })
    console.log(0)
}
a()