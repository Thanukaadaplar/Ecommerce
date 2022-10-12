const mongoose = require("mongoose")
const bcrypt = require('bcryptjs');
 
const UserSchema= new mongoose.Schema(
    {
        username :{type:String ,required:true,unique:true},
        email:{type:String ,required:true,unique:true},
        password:{type: String, required: true},
        isAdmin: {
            type: Boolean,
            default: false,
          },
        },
        { timestamps: true }
      );
      UserSchema.pre("save",async function(next){
        if(this.isModified("password")){
         console.log(`the current password is ${this.password}`);
         this.password = await bcrypt.hash(this.password,10);
         console.log(`the current password is ${this.password}`);
         this.confirmPassword = undefined;
        }
        next();
    })	

    UserSchema.methods.isValidPassword = async function (password){
        try{
        return await bcrypt.compare(password,this.password)
        }catch(err){
            throw err
        }
    }
      
      module.exports = mongoose.model("User", UserSchema);
    