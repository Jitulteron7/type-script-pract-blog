"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const body_parser_1 = __importDefault(require("body-parser"));
const create_1 = __importDefault(require("./route/create"));
const cors_1 = __importDefault(require("cors"));
const app = express_1.default();
// mongodb connection
mongoose_1.default.connect("mongodb+srv://Blog:zpSnKGbcr9kAAGek@cluster0.tcwgg.mongodb.net/<dbname>?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true });
mongoose_1.default.connection.on("connected", () => {
    console.log("mongodb connected");
});
mongoose_1.default.connection.on("error", (err) => {
    console.log("mongod", err);
});
app.use(cors_1.default());
app.use(express_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(create_1.default);
app.get("/", (req, res) => {
    res.send("hello");
});
app.listen(4000, () => {
    console.log("connected");
});
