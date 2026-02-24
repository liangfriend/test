function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

// 监听主线程消息
self.onmessage = function (e) {
  const n = e.data;
  const result = fibonacci(n);
  self.postMessage(result);
};
