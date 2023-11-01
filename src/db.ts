import mongoose from "mongoose";

export const dbConnetc = async () => {
  try {
    const db = await mongoose.connect(
      "mongodb+srv://pnauj:arigat00_@mongo.fhu9jsm.mongodb.net/"
    );
    console.log("DB Connected to...", db.connection.db.databaseName);
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    }
  }
};
