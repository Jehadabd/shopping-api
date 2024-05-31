const mongose=require('mongoose')
const userSchema=mongose.Schema({
    name:{
        type:String,
           
        required:true,
        maxlength:50
    },
    userName:{
        type:String,
        unique:true,       
        required:true,
        maxlength:50
    },    
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        minlength:6
    }
    
})
module.exports=mongose.model("User",userSchema)
