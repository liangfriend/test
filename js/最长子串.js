function solution(str){
    let temp=new Map()
    for(item of str){

        if(!temp.has(item)){
            temp.set(item,1)
        }else{
            
            temp.set(item,temp.get(item)+1)
        }
    }
    console.log(temp)

}
solution("asfsdds")