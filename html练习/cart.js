
const vueapp=Vue.createApp({
    data(){
        return{
            price1: 0,
            price2: 0,
            price3: 0,
            css1:true,
            s1:true,
            s2:true,
            s3:true,
           
        }
        
    },
    methods:{
        plus() {
            this.price1=this.price1+1
        },
    },
}).mount("#cart")