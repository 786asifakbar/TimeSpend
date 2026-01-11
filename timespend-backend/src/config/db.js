import mongoose from 'mongoose';
import { DB_NAME } from '../constants.js';

const connectDb = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        console.log(`Database connection successfull ${connectionInstance.connection.host}`)
    } catch (error) {
        console.log("Database connection field", error)
        process.exit(1);
    }
}
export default connectDb;