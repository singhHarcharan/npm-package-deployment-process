"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const index_1 = require("@harcharan_singh_/dummy_package/dist/index");
const app = (0, express_1.default)();
const port = 3000;
app.use(express_1.default.json());
app.post('/signup', (req, res) => {
    const body = req.body;
    const response = index_1.signinInputs.safeParse(body);
    console.log("body is ", body);
    console.log("response is ", response);
    try {
        if (response.success) {
            res.json({
                message: "Signup successful"
            });
        }
        else {
            res.json({
                message: "Something up with inputs"
            });
        }
    }
    catch (e) {
        console.error(e);
        res.status(403);
        res.json({
            message: "Invalid request..."
        });
    }
});
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
