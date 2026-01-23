import mongoose from "mongoose";

const MONGODB_URI=process.env.MONGODB_URI as string

if(!MONGODB_URI){
    throw new Error("please define")
}
export async function connectDB(){
    if(mongoose.connection.readyState>=1){
        console.log("Already connected");
        return
    }
    try {
        await mongoose.connect(MONGODB_URI,{
            dbName:"WorkCred"
        })
        console.log("successfully connected")
    } catch (error) {
        console.log("connection error",error)
        
    }

}