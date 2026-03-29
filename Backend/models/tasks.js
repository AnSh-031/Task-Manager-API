import mongoose from "mongoose";

const schema = new mongoose.Schema({
    title : {type : String, required : true},
    description : {type : String},
    status : {type : String, enum : ["pending" , "completed"],default : "pending"},
    createdBy : {type : mongoose.Schema.Types.ObjectId , ref : "Users"}
}, {timestamps : true})

const Tasks = mongoose.model("Tasks", schema);

export default Tasks;