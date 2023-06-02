import mongoose from "mongoose";

const connectMongo = async () => mongoose.connect(process.env.MONGODB_URI as string);

export default connectMongo;
