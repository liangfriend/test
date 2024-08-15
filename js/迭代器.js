function* foo(x) {
    const y=yield x + 20
    yield y + 22
    yield x + 24
    yield x + 26
    yield x+28
}
  
const fo=foo(2)
console.log(fo.next().value)
console.log( fo.next(4).value )
// console.log(fo.next().value)