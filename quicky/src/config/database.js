import mongoose from "mongoose";



export const connectToDB = async () => {

    const mongoURI = process.env.MONGO_URI;

    if(!mongoURI){
    throw new Error("MONGO_URI is not defined in environment variables");
}
 
    try {
        await mongoose.connect(mongoURI)
        console.log("Connected to DB");
    }
        catch(error){
            console.log(error);
        }

    }