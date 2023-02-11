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
exports.MobileClient = exports.Cmd = void 0;
const LoggerFactory_1 = require("./logger/LoggerFactory");
const express_1 = __importDefault(require("express"));
const node_child_process_1 = require("node:child_process");
const delay_1 = require("./util/delay");
const logger = LoggerFactory_1.LoggerFactory.getInstance('MobileModule');
class Cmd {
    constructor() {
        this.logger = LoggerFactory_1.LoggerFactory.getInstance('CommandsModule');
        this.RESET_TIMEOUT = +process.env.RESET_TIMEOUT || 20000;
        this.DEVICE_ID = process.env.DEVICE_ID || '1619d8990312';
        this.SWITCH_OFF = `adb -s ${this.DEVICE_ID} shell cmd connectivity airplane-mode enable`;
        this.SWITCH_ON = `adb -s ${this.DEVICE_ID} shell cmd connectivity airplane-mode disable`;
    }
    resetInternet() {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.info(`executing ${this.SWITCH_OFF}`);
            yield this.executeCommand(this.SWITCH_OFF);
            this.logger.info(`pause ${this.RESET_TIMEOUT}`);
            yield (0, delay_1.delay)(this.RESET_TIMEOUT);
            this.logger.info(`executing ${this.SWITCH_ON}`);
            yield this.executeCommand(this.SWITCH_ON);
            this.logger.info(`pause ${this.RESET_TIMEOUT}`);
            yield (0, delay_1.delay)(this.RESET_TIMEOUT);
        });
    }
    executeCommand(command) {
        return new Promise((resolve, reject) => (0, node_child_process_1.exec)(command, error => error ? reject(error) : resolve()));
    }
}
exports.Cmd = Cmd;
class MobileClient {
    constructor(cmd) {
        this.cmd = cmd;
        this.logger = LoggerFactory_1.LoggerFactory.getInstance('MobileClient');
        this.app = (0, express_1.default)();
        this.init();
    }
    init() {
        this.registerGetResetInternet();
    }
    registerGetResetInternet() {
        this.logger.info('register GET /reset endpoint');
        this.app.get('/reset', (_, res) => __awaiter(this, void 0, void 0, function* () {
            this.logger.info('reset internet connection');
            yield this.cmd.resetInternet();
            res.send('success');
        }));
    }
    start() {
        this.app.listen(+process.env.PORT || 4000, () => this.logger.info(`listen on ${process.env.PORT || 4000}`));
    }
}
exports.MobileClient = MobileClient;
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        logger.info('Starting mobile module.');
        const cmd = new Cmd();
        const client = new MobileClient(cmd);
        client.start();
    });
}
main().catch(console.error);
