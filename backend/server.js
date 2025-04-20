import express from "express"; 
import connectDB from "./config/mogodb.js";
import cors from "cors";
import 'dotenv/config';
import cookieParser from "cookie-parser"
import authenticationRouter from "./routes/routes.js"
import userRouter from "./routes/userroutes.js";
const app = express();
const port  =  process.env.PORT || 4000
connectDB();
app.use(express.json())
app.use(cookieParser())
app.use(cors({Credentials:true}))

app.get('/',(req,res)=>res.send("Server is Working"))
app.use('/api/auth',authenticationRouter)
app.use('/api/user',userRouter)
app.listen(port,()=>console.log(`Sever Started on port:${port}`))
