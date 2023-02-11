"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoggerFactory = void 0;
const Logger_1 = require("./Logger");
class LoggerFactory {
    constructor() { }
    static getInstance(service) {
        return new Logger_1.Logger(service);
    }
}
exports.LoggerFactory = LoggerFactory;
