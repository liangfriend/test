let str = 'sdfgsgsdgfsgfsfgsgfssfgsrger34tyj';
 
    function fn2(str) {
        //先把字符串排序，好处就是会把一样的字符串排在一起
        str = str.split('').sort((a, b) => a.localeCompare(b)).join('')
            // console.log(str)
            // /(\w)\1*/g 是为了匹配那种连续字符
        let reg = /(\w)\1*/g; // \1 反向引用  代表第一个小分组匹配的内容
        let char = '',
            max = 0;
        str.replace(reg, function(a, b) {
            // console.log(a, b)
            if (a.length > max) {
                max = a.length;
                char = b;
            }
        })
        console.log(char, max)
    }
    fn2(str)