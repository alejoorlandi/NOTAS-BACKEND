import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const dbURI = process.env.MONGO_URI;  

    if (!dbURI) {
      throw new Error("MONGO_URI no está definida en el .env");
    }

    await mongoose.connect(dbURI);

    console.log("MongoDB conectado correctamente");
  } catch (error) {
    console.error("Error al conectar a MongoDB:", error.message);
    process.exit(1);
  }
};