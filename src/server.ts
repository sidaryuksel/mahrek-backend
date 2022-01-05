
import mongoose from "mongoose";
import dotenv from "dotenv";
import app from "./app";

dotenv.config();

let DB = process.env.DB!;

mongoose.connect(DB).then(() => {
    console.log("Connected to Database Server!");
}).catch((err: any) => console.log("mongoose connection error!", err));

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT} !`);
})
