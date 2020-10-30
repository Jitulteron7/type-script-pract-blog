import mongoose from "mongoose";
// marked to convert sting to markdown 
import marked from "marked";
// a way to render  html inside nodejs
import {JSDOM} from "jsdom";
// to purify the markdom to pure html so that no one can write js and html code and use it for manupulating the website
// error solved by simple require method dont use import in dompurify case
const CreateDomPurifier =require("dompurify");

const purify=CreateDomPurifier(new JSDOM().window)
// const purify=CreateDomPurifier(new Jsdom.JSDOM().window);

export interface blogPost extends mongoose.Document{
title:String,
description:String,
about:String,
purifiedDes:String
}
const BlogShema=new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    about:{
        type:String,
        required:true
    },
    banner:{
        type:String,
        // required:true
    },
    purifiedDes:{
        type:String,
        required:true
    }
},{timestamps:true});

BlogShema.pre<blogPost>("validate",function(next){
 if(this.description){
    //  String object to string primitive*** 
    // string object const a=new String("Jitul")
    // string primitive const a=String("Jitul") or const a ="Jitul"
     const data=this.description;
     
     this.purifiedDes=purify.sanitize(marked(data.toString()));
   }
 next();
})
export default mongoose.model("BLog",BlogShema);