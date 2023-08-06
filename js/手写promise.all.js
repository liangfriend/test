Promise.myAll = function(proms) {
    return new Promise((resolve, reject) => {
        let count = 0;
        const result = [];
        for(let i = 0; i < proms.length; i++) {
            Promise.resolve(proms[i])
                .then((data) => {
                    result[i] = data;  // 使用正确的索引 i，而不是 result.length
                    count++;
                    if(count === proms.length) {
                        resolve(result);  // 所有的 Promise 都成功完成，resolve 结果
                    }
                })
                .catch((err) => {
                    reject(err);  // 如果有一个 Promise 失败，reject 错误
                });
        }
        if(proms.length === 0) {
            resolve(result);  // 如果输入的数组为空，立即 resolve
        }
    });
}

Promise.myAll([1, 2, 3, 4]).then((datas) => {
    console.log(datas);
}, (err) => {
    console.log(err);
});
