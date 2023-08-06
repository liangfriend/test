const stickDom = document.querySelector(".stick");
const stickStyles = getComputedStyle(stickDom);
const stickWidth=parseFloat(stickStyles.width)
const stickHeight=parseFloat(stickStyles.height)
const stickTop=parseFloat(stickStyles.top)

class Stick extends Rectangle{
    constructor(speed){
        super(stickWidth,stickHeight,198,stickTop,speed,0,stickDom)
      
        this.timer=null
        this.originTop=stickTop
        this.originHeight=stickHeight
    }
    onMove(){
       
    }

    stretch(){


        this.timer=setInterval(()=>{
            
            this.top=this.top-1
            this.height=this.height+1
            // console.log(this.dom.style.height) 
            super.render()
        },10)
        
    }
    recover(){
        console.log("复原")
    
        
        this.dom.style.transform="rotate("+0+"deg)";
        this.left=198
        this.height=0
        this.top=this.originTop
        super.render()

       
    }
   
    putDown(){
        clearInterval(this.timer)
        console.log(this.dom.style.height)
        let i=0
        this.timer=setInterval(()=>{
            
            this.dom.style.transformOrigin="0px "+this.dom.style.height
            this.dom.style.transform="rotate("+i+"deg)";
            // this.dom.style.transition="3s"
            i++;
            if(i>90){
                clearInterval(this.timer)
            }
        },20)

        


    }
}