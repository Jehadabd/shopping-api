const mongose1=require('mongoose')
const orderSchema=mongose1.Schema({
    user:{
        type:mongose1.Schema.Types.ObjectId,
        required:true,
        ref:'User'
    },
    product:{
        type:Array,
        required:true
    }
})
module.exports=mongose1.model("Order",orderSchema)