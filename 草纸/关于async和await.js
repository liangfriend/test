/*第二题，await相当于一个promise（async1()）.then(两个console)，如果变成下边这样
        async function async1(){
        console.log("async1 start");
        await async2();
        await console.log("async3 end");
        await console.log("async4 end");
        }
        则是把下边async4放到第二个.then中.
        async function async1(){
        console.log("async1 start");
        await async2();
        await console.log("async3 end");
        await console.log("async4 end");
        }
        async function async1(){
        console.log("async1 start");
        await async2();
        await console.log("async3 end");
         console.log("async4 end");
        }
        这两个执行结果是一样的，结论就是如果是最后一行 await加不加都一样
   */
// async function async1() {
//     console.log('async1 start');
//     await async2();
//     console.log('async3 end');
//     console.log('async4 end');
// }
// async function async2() {
//     console.log('async2');
// }
// console.log('script start');
// setTimeout(function () {
//     console.log('settimeout');
// }, 0);
// async1();
// new Promise(function (resolve) {
//     console.log('promise1');
//     resolve();
//     console.log('promise3');
// }).then(function () {
//     console.log('promise2');
// });
// console.log('script end');

//第三题
// var promise=new Promise(resolve=>{
//         console.log(1);
//         resolve()
//         })
//         setTimeout(()=>{
//         console.log(2);
//         })
//         promise.then(()=>{
//         console.log(3);
//         })
//         var promise2=getPromise();
//         async function getPromise(){
//         console.log(5);
//         await promise;
//         console.log(6);
//         }
//         console.log(8);

// var a=1

//         setTimeout(()=>{
//                 a++
//                 console.log(a)

//         },1000)
// console.log(a)
//

//2024 12 23 通过下边的代码，理解async中的await,相当于，第一个await变return,后边的await变 .then
// async function a() {
//     // console.log("a")
//     return new Promise((resolve) => {
//         resolve();
//     })
//         .then((res) => {
//             console.log('100');
//         })
//         .then((res) => {
//             new Promise((resolve) => {
//                 resolve();
//             }).then((res) => {
//                 console.log('300');
//             });
//         })
//         .then((res) => {
//             new Promise((resolve) => {
//                 resolve();
//             }).then((res) => {
//                 console.log('500');
//             });
//         });
// }
//上下两个a方法等价
// async function a() {
//         // console.log("a")
//         await new Promise((resolve) => resolve()).then((res) => {
//             console.log('100');
//         });

//         await new Promise((resolve) => resolve()).then((res) => {
//             console.log('300');
//         });

//         await new Promise((resolve) => resolve()).then((res) => {
//             console.log('500');
//         });
//     }

// function b() {
//     new Promise((resolve) => {
//         // console.log("a")
//         resolve();
//     })
//         .then((res) => {
//             console.log('200');
//         })
//         .then((res) => {
//             console.log('400');
//         })
//         .then((res) => {
//             console.log('600');
//         });
// }

// async function c() {
//     return 'test';
// }

// a();
// b();
