import mongoose from "mongoose";
import dateFormat from "../utils/helper/dateFormat";

const connectDatabase = async () => {
    const dbURI = process.env.URI || "mongodb://localhost:27017/nfcdatabase"
    await mongoose.connect(dbURI);
    console.log(`[${dateFormat}] MongoDB connected successfully at ${dbURI.split('@').pop()}`);
    return mongoose.connection;
};

export default connectDatabase;
