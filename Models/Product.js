const mongose1=require('mongoose')
const productSchema=mongose1.Schema({
    name:{
        type:String,
        
        required:true,
        maxlength:50
    },
    price:{
        type:Number,
        required:true
    },
    image:{
        type:String,
        required:true
    }
})
module.exports=mongose1.model("Product",productSchema)