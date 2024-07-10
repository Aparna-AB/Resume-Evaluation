const mongoose =require("mongoose");
const connectDB=async ()=>{
    await mongoose.connect("mongodb://localhost:27017/Resume");
    console.log("Database connection successful");
}
module.exports={connectDB};