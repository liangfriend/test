

var myAtoi = function(s) {
  let res = ''
  for(i of s){

    if((+i).toString() === 'NaN') return +res
    res = res + s[i]
  }
  console.log(+res)
  return +res
};

myAtoi('46')