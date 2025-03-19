console.log("work执行")
onmessage = (e) => {
    console.log("接收",e.data[0]);

    postMessage(e.data[0]);
};