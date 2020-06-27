import mongoose from "mongoose";

const runDB = async () => {
  const { DB_HOST, DB_NAME } = process.env;

  try {
    await mongoose.connect(`mongodb://${DB_HOST}/${DB_NAME}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("DB OK!");
  } catch (err) {
    console.log(err);
  }
};

export default runDB;
