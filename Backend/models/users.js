import mongoose from "mongoose";

const schema = new mongoose.Schema({
    username : {type : String , required : true , unique : true},
    password : {type : String , required : true},
    role : {type : String , enum : ["user" , "admin"] , default : "user"}
});

const Users = new mongoose.model("Users",schema);

export default Users;