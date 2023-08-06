
const birdDom = document.querySelector(".bird");
const birdStyles = getComputedStyle(birdDom);
const birdWidth=parseFloat(birdStyles.width)
const birdHeight=parseFloat(birdStyles.height)
const birdTop=parseFloat(birdStyles.top)
const birdLeft=parseFloat(birdStyles.left)
const gameHeight=document.querySelector(".game").clientHeight
const gameDom=document.querySelector(".game")

class Bird extends Rectangle{
    constructor(){
        super(birdWidth,birdHeight,100,birdTop,0,0,birdDom)
        this.g=0.02     //向下加速度
        this.maxY=gameHeight-landHeight-this.height
        this.swingStatus = 1   //小鸟的翅膀状态
        this.timer = null
    }
    //煽动翅膀
    startSwing(){
        this.timer=setInterval(()=>{
        
            this.swingStatus++;
            
            if(this.swingStatus === 4){
                this.swingStatus=1
            }
            this.render()
        },300)
    }
    stopSwing(){
        
        clearInterval(this.timer)
        this.timer = null
    }
    render(){
        super.render()//重用父类渲染逻辑
    //   console.log(this.swingStatus)
        this.dom.className=`bird swing${this.swingStatus}`;
    }


    move(duration){
        super.move(duration)//调用父类方法
        //根据加速度改变速度
        this.ySpeed+=this.g*duration
    }
    onMove(){
        console.log(this.maxY)
       
        if(this.top<0){
            this.top=0
        }else if(this.top > this.maxY){
            this.top=this.maxY
        }
    }
    jump(){
        console.log(this.ySpeed)
        this.ySpeed=-2.2
    }
}
