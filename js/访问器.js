const product1 = {
    count: 1,
    price: 10,
    total_price(){return this.count * this.price}
}
product1.count+=2
console.log(product1.total_price())
const product2 = {
    count: 1,
    price: 10,
    get total_price(){return this.count * this.price}
}
product2.count+=2
console.log( product2.total_price )
//get其实就是一个语法糖，相当于defineProperty设置一个属性