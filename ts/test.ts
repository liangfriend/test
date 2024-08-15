interface User {
    (id: number): number;
    name: string;
    play(): void;
  }
  
  function user(): User {
    let obj = <User>function (id: number){};
    obj.name = "张三";
    obj.play = function () {};
    return obj;  }
  console.log("你好")