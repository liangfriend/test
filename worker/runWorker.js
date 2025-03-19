// 处理耗时任务，返回结果
function runWorker(fn, ...args) {
    return new Promise((resolve, reject) => {
        // 将函数和参数转换为字符串传递给 Worker
        const workerCode = `
            onmessage = function(e) {
                const [fnString, args] = e.data;
                const fn = new Function('return ' + fnString)(); // 反序列化函数
                postMessage(fn(...args)); // 执行函数并返回结果
            };
        `;

        // 创建 Worker Blob
        const blob = new Blob([workerCode], { type: "application/javascript" });
        const worker = new Worker(URL.createObjectURL(blob));

        // 监听 Worker 线程返回的数据
        worker.onmessage = (e) => {
            resolve(e.data);
            worker.terminate(); // 任务完成后销毁 Worker
        };

        // 监听错误
        worker.onerror = (e) => {
            reject(e);
            worker.terminate();
        };

        // 发送函数和参数到 Worker
        worker.postMessage([fn.toString(), args]);
    });
}