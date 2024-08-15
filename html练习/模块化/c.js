console.log( "c" )
//行内命名导出
export const cc = 2

const c3 = 3
//命名子句导出
export { c3 }
const c4 = 4
export { c4 as cccc }

const c5 = 5
//默认导出
export default c5//export 和export default不冲突，且如果别名为default，就会默认识别为default导出