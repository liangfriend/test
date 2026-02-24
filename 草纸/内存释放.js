// 方便打印当前内存
function printMemory(tag) {
    const mem = process.memoryUsage();
    console.log(`\n[${tag}]`);
    console.log(`heapUsed: ${(mem.heapUsed / 1024 / 1024).toFixed(2)} MB`);
}

// 一个会在函数结束后释放内存的普通函数
function normalFunc() {
    // 创建大数组（约 100MB）
    const arr = new Array(1024 * 1024).fill(1);
    console.log("normalFunc created:", arr.length, "items");
}

// 一个闭包函数：内部变量被外部引用保持，GC 无法释放
let closureHolder = null;
function closureFunc() {
    const arr = new Array(1024 * 1024 ).fill(1);

    // 闭包：arr 被 return 的函数捕获，不能释放
    closureHolder = () => arr.length;

    console.log("closureFunc created:", arr.length, "items");
}

// ----------------------------
//             测试开始
// ----------------------------
printMemory("start");

// 普通函数分配内存
normalFunc();
printMemory("after normalFunc");

// 手动 GC（普通函数数据已无引用，应被回收）
global.gc();
printMemory("after GC (normalFunc cleaned)");


// 闭包函数分配内存
closureFunc();
printMemory("after closureFunc");

// 手动 GC（闭包数据仍被引用，不会释放）
global.gc();
printMemory("after GC (closureFunc NOT cleaned)");

// 断开闭包引用
closureHolder = null;
global.gc();
printMemory("after removing closureHolder & final GC");
