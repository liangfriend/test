class Game{
    constructor(){
        this.sky=new Sky(-1)
        this.land=new Land(-1)
        this.bird=new Bird()
        this.pipeProducer=new PipePareProducer(-1)
        this.timer=null
        this.tick=16
        this.store=0
   
    }
    start(){
      
        if(this.timer){
            return
        }
        if(this.isGameOver()){
            window.location.reload()
        }
  
        this.pipeProducer.startProduce()
        this.timer=setInterval(()=>{
            const duration=3
            this.sky.move(duration)
            this.land.move(duration)
            this.bird.move(duration)
            this.bird.startSwing()
            this.pipeProducer.pairs.forEach(pair=>{
                pair.move(duration)
            })
            if(this.isGameOver()){
                this.stop()
            }

        },this.tick)
        
  
    }
    stop(){
        
        
        clearInterval(this.timer)
        
        this.timer=null
        this.bird.stopSwing()
    }
    isHit(rec1,rec2){
        
        //两个矩形中心店距离是否小于矩形宽度之和的一半
        var centerX1=rec1.left+rec1.width /2
        var centerY1=rec1.top+rec1.height /2
        var centerX2=rec2.left+rec2.width /2
        var centerY2=rec2.top+rec2.height /2
        var disX = Math.abs(centerX1-centerX2)
        var disY=Math.abs(centerY1-centerY2)
        console.log(centerX2+":"+centerX1)
        if(disX < (rec1.width+rec2.width)/2 && 
        disY < (rec1.height+rec2.height)/2){
            
            return true
        }
     
            this.store++;
      
        
        document.querySelector('.store').innerHTML=this.store
    }

    isGameOver(){
        if(this.bird.top === this.bird.maxY){
            return true
        }
        for(let i=0;i<this.pipeProducer.pairs.length;i++){
            const pair=this.pipeProducer.pairs[i]
            if(this.isHit(this.bird,pair.upPipe)){
                return true
            }
            if(this.isHit(this.bird,pair.downPipe)){
                return true
            }
        }
        return false
    }
    regEvent(){
        window.onkeydown = (e)=>{
      console.log(e.key)
            if(e.key === "Enter"){

                if(this.timer){
                    this.stop()
                }else{
                 console.log("开始")
                    this.start()
                }
            }else if(e.code === "Space"){
                this.bird.jump()
            }
        }
    }
}
var g=new Game()
g.regEvent()