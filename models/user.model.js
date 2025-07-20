const mongoose=require("mongoose")
const userSchema =new mongoose.Schema({
    username: {
        type :String,
        required:true,
        trim:true,
        lowercase:true,
        unique:true,
        minLength:[3,'username must be at least 3 characters long']
    
    },
    
        email: {
            type:String,
            required:true,
            lowercase:true,
            trim:true,
            unique:true,
            minLength:[13,'invalid email id ']
        },

    password:{
        type:String,
        trim:true,
        trim:true,
        minLength:[5,'password must be atleast 5 characters long ']
    }
})

const user=mongoose.model('user',userSchema)

module.exports=user;