"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const app_1 = __importDefault(require("./app"));
const config_1 = __importDefault(require("./app/config"));
async function bootstrap() {
    try {
        console.log("Connecting to MongoDB...", config_1.default.database_url);
        await mongoose_1.default.connect(config_1.default.database_url);
        console.log("MongoDB Connected");
        app_1.default.listen(config_1.default.port, () => {
            console.log(`Server running on ${config_1.default.port}`);
        });
    }
    catch (err) {
        console.log(err);
    }
}
bootstrap();
