"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const express_1 = __importDefault(require("express"));
if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI environment variable is not set.");
}
mongoose_1.default
    .connect(process.env.MONGO_URI, {})
    .then(() => {
    console.log("DB connected");
})
    .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
});
mongoose_1.default.connection.on("error", (error) => {
    console.log("database connection error: ", error);
});
const app = (0, express_1.default)();
//# sourceMappingURL=server.js.map