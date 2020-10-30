"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const blog_1 = __importDefault(require("../modal/blog"));
const express_1 = __importDefault(require("express"));
const router = express_1.default();
router.get("/myblogs", (req, res) => {
    blog_1.default.find().then(data => {
        res.json({ info: data });
    }).catch(err => {
        console.log(err, "found in blog search");
    });
});
router.post("/createBlog", (req, res) => {
    const { title, about, description } = req.body;
    const blog = new blog_1.default({
        title,
        description,
        about
    });
    blog.save().then(data => {
        console.log(data);
        res.json({ info: data });
    }).catch(err => console.log(err));
});
router.post("/edit", (req, res) => {
});
router.delete("/delete/:id", (req, res) => {
    const id = req.params;
});
exports.default = router;
