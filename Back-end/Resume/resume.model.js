const mongoose=require("mongoose");
const {Schema}=mongoose;

const resumeSchema= new Schema({
    name:{
        type:String,
        required:true,
    },
    address:{
        type:String,
        required:true,
    },
    contact:{
        type:Number,
        required:true,
    },
    dateOfBirth:{
        type: String,
        default: Date.now(),
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    maritalStatus:{
        type:String,
        required:true,
    },
    degree:{
        type:String,
        required:true,
    },
    institution:{
        type:String,
        required:true,
    },
    CGPA:{
        type:Number,
        required:true,
    },
    workExp:{
        type:Number,
        required:true,
    },
    companyName:{
        type:String,
        required:true,
    },
    designation:{
        type:String,
        required:true,
    },
    expectedSalary:{
        type:Number,
        required:true,
    }


})

const ResumeModel= mongoose.model("Resume",resumeSchema);

module.exports={ResumeModel};