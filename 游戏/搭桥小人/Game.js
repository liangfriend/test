class Game{
    constructor(){
        const speed=0.1
        this.groundgenerator=new Groundgenerator(speed)
        this.stick=new Stick(speed)
        this.sky=new Sky(speed)
        this.timer=null
        this.lockdown=false
        this.lockup=false
        this.store=0
        this.over=false
    }
    start(){
      

        if(this.over){
            window.location.reload()
        }
        console.log("开始")
        window.onmousedown = (e)=>{
            console.log(this.lockdown)
            if(!this.lockdown){
               
                this.lockdown=true
                this.stick.stretch()
                
            }

         
        }
        window.onmouseup=(e)=>{
            if(this.lockup){
              console.log("锁住")
            }else{
                this.stick.putDown()
                this.lockup=true
                setTimeout(()=>{
                    if(!this.isPass()){
                        this.timer=setInterval(()=>{
                            const length=this.groundgenerator.groundlist[1].left+
                            this.groundgenerator.groundlist[1].width
                   
                            this.move()
                            if(length<=215){
                                clearInterval(this.timer)
                                
                                this.stick.recover()
                                this.groundgenerator.generator()
                               
                                gameDom.removeChild(this.groundgenerator.groundlist[0].dom)
                                this.groundgenerator.groundlist.splice(0,1);
                                this.lockdown=false
                                this.lockup=false
                                
                                this.store=this.store+1;
                                
                            }
                            console.log(this.store)
                                document.querySelector(".store").innerHTML=this.store
                                
                            
                        },100)
                    }
                    
                },2000)
            }
            
           

        }
        this.groundgenerator.init()

     
        
  
    }
    move(){
        const duration=-100
     
        this.groundgenerator.groundlist.forEach((e)=>{
            e.move(duration)
        })
        this.sky.move(duration)
        
        this.stick.move(duration)
        
    }
    stop(){
        
    }
    isPass(){
        const length=this.stick.left+this.stick.height
        const left=this.groundgenerator.groundlist[1].left
        const right=this.groundgenerator.groundlist[1].left+
        this.groundgenerator.groundlist[1].width
        console.log(this.stick.width)
        console.log(this.stick.left)
        if(left<length && length<right){
            this.over=false
            return false
        }
        this.over=true
        console.log(gameDom.children[0].style)
        gameDom.children[0].style.display="block"
        return true
        
    }


    regEvent(){
        window.onkeydown=(e)=>{
            console.log(e)
            if(e.key=="Enter"){
                // window.location.reload()
                this.start()
                
            }
        }

    }
}
var g=new Game()
g.regEvent()
