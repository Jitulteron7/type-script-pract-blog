"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
// marked to convert sting to markdown 
const marked_1 = __importDefault(require("marked"));
// a way to render  html inside nodejs
const jsdom_1 = require("jsdom");
// to purify the markdom to pure html so that no one can write js and html code
// error solved by simple require method dont use import in dompurify case
const CreateDomPurifier = require("dompurify");
const purify = CreateDomPurifier(new jsdom_1.JSDOM().window);
const BlogShema = new mongoose_1.default.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    about: {
        type: String,
        required: true
    },
    purifiedDes: {
        type: String,
        required: true
    }
}, { timestamps: true });
BlogShema.pre("validate", function (next) {
    if (this.description) {
        //  String object to string primitive*** 
        // string object const a=new String("Jitul")
        // string primitive const a=String("Jitul") or const a ="Jitul"
        const data = this.description;
        this.purifiedDes = purify.sanitize(marked_1.default(data));
    }
    next();
});
exports.default = mongoose_1.default.model("BLog", BlogShema);
