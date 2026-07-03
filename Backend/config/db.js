import mongoose from "mongoose";

const dbConnect = async () => {
    try{
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`DataBase connected : ${conn.connection.host}`);
    } catch(error){
        console.log("DataBase connection failed: ", error.message);
        // process.exit(1);
    }
};

export default dbConnect;