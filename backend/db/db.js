import mongoose from "mongoose";


const connectDB = async () =>{
    try {
        // console.log(process.env.MONGODB_URI)
        let DbInstance = await mongoose.connect(`${process.env.MONGODB_URI}`)
        console.log(`Database Connection: ${DbInstance.connection.host}`)
    } catch (error) {
        console.log('MongoDB conntection failed', error);
        process.exit(1)
    }
}


export default connectDB