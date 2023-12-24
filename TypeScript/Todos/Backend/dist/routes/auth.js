"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const express_1 = __importDefault(require("express"));
const middelware_1 = require("../middelware/");
const db_1 = require("../db");
const route = express_1.default.Router();
route.post('/signup', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    const user = yield db_1.User.findOne({ username });
    if (user) {
        return res.status(402).json({
            massage: "User already exist"
        });
    }
    else {
        const newUser = new db_1.User({ username, password });
        yield newUser.save();
        const token = jsonwebtoken_1.default.sign({ id: newUser._id }, middelware_1.SECRET, { expiresIn: '1h' });
        res.json({
            massage: "User Created succefully", token
        });
    }
}));
route.post('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    const user = yield db_1.User.findOne({ username, password });
    if (!user) {
        return res.status(403).json({
            massage: "User does not exist"
        });
    }
    else {
        const token = jsonwebtoken_1.default.sign({ id: user._id, }, middelware_1.SECRET, { expiresIn: '1h' });
        return res.status(200).json({
            massage: "User logged in", token
        });
    }
}));
route.get('/me', middelware_1.authenticateJWT, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield db_1.User.findOne({ _id: req.headers["userId"] });
    if (user) {
        res.json({ username: user.username });
    }
    else {
        res.status(403).json({
            massage: "Invalid User"
        });
    }
}));
exports.default = route;
// module.exports = route
