
import express,{Application,Request,Response} from "express"
import mongoose from "mongoose";
import bodyParser from "body-parser";
import router from "./route/create";
import cors from "cors";
import {MONGOURL} from "../keys"

const app:Application=express();
// mongodb connection
mongoose.connect(MONGOURL,{useNewUrlParser:true,useUnifiedTopology:true});
mongoose.connection.on("connected",()=>{
    console.log("mongodb connected");  
});
mongoose.connection.on("error",(err)=>{
    console.log("mongod",err);
});
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(router);
app.get("/",(req:Request,res:Response)=>{
    res.send("hello")
});
app.listen(4000,()=>{
    console.log("connected");
    
})