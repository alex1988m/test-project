"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logger = void 0;
class Logger {
    constructor(service) {
        this.service = service;
        this.isDebug = process.env.DEBUG === 'true';
    }
    getCurrentTime() {
        return new Date().toTimeString().split(' ')[0];
    }
    debug(message) {
        const messages = [
            this.getCurrentTime(),
            this.service,
            message
        ];
        this.isDebug && console.info(messages.join('\t'));
    }
    info(message) {
        const messages = [
            this.getCurrentTime(),
            this.service,
            message
        ];
        console.info(messages.join('\t'));
    }
    error(message) {
        const messages = [
            this.getCurrentTime(),
            this.service,
            message
        ];
        console.error(messages.join('\t'));
    }
}
exports.Logger = Logger;
