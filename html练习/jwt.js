    const crypto = require('crypto');
    function sign(info,key){
        const hmac = crypto.createHmac('sha256',key)
        hmac.update(info); //添加要计算的数据  update()
        return hmac.digest('hex')  //计算并返回   digest()
    }

console.log(sign('粮油一','123546'))
const base=btoa("{id:5}")
console.log(atob(base))
