const mongoose=require('mongoose');
const bcrypt=require('bcrypt');

const UserSchema= new mongoose.Schema(
    {
        username:{
            type:String , unique:true,required:true
        },
        password:{
            type:String ,required:true
        },
        friends:[{
            type:mongoose.Schema.Types.ObjectId,ref:'User' // Reference to User
        }], // create an array to have a list of friends of current user 
        friendRequests:[{
            type:mongoose.Schema.Types.ObjectId , ref:'User'
        }],
        
        interests: [{ type: String }],

    }
);

// this middleware ensures that the password is always hashed before saving it to the database .
UserSchema.pre('save',async function (next) {
    if(!this.isModified('password')) return next();
    this.password=await bcrypt.hash(this.password,10);
    next();
    
});


module.exports=mongoose.model('User',UserSchema);