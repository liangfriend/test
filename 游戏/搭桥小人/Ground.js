const gameDom=document.querySelector(".game")
const groundDom = document.querySelector(".ground");
const groundStyles = getComputedStyle(groundDom);
// const groundWidth=parseFloat(stickStyles.width)
const groundHeight=parseFloat(groundStyles.height)
const groundTop=parseFloat(groundStyles.top)
const gameStyles=getComputedStyle(gameDom)
console.log(Math.random())
class Ground extends Rectangle{
    constructor(groundLeft,groundWidth,gound,speed){
        super(groundWidth,groundHeight,groundLeft,groundTop,speed,0,gound)

    }
    onMove(){
        
 
    }

}
class Groundgenerator{
    constructor(speed){
        
        this.timer=null
        this.groundlist=[]
        this.preLeft=0;
        this.newLeft=0;
        this.newWidth=200
        this.speed=speed
        
    }

    init(){
        this.groundlist.push(new Ground(0,200,groundDom,this.speed))
        while(true){
            if(this.preLeft<parseFloat(gameStyles.width)){
                this.generator()
            }else{
                break
            }
        }
    }
    generator(){

                this.getRandom()
                const dom=document.createElement("div")
                dom.className="ground"
                gameDom.appendChild(dom)
                console.log(this.newLeft)
                console.log(this.newWidth)
                this.groundlist.push(new Ground(this.newLeft,this.newWidth,dom,this.speed))
              

    }
    getRandom(){
        const left=this.groundlist[this.groundlist.length-1].left
        
        this.newLeft=Math.random()*200+left+10+this.newWidth
        this.newWidth=Math.random()*100+20

        this.preLeft=this.newLeft+this.newWidth

    }   
}
// const g=new Groundgenerator()
// g.move(10)
// g.generator()