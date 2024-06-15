import express from "express";
import router from "./routes/contactRoutes.js";
import userrouter from "./routes/userRoutes.js";
import  dotenv from "dotenv";
import errorHandler from "./middleware/errorhandler.js";
import connectDb from "./config/db.connection.js";
dotenv.config();

const app=express();
app.use(express.json());
app.use(errorHandler);
app.use("/api/contacts",router);
app.use("/api/users",userrouter);
const port=process.env.PORT;

app.listen(port,()=>
{
    console.log(`Server is running on  ${port}`);
    connectDb();
});