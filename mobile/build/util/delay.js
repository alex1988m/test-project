"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.delay = void 0;
const timers_1 = require("timers");
const delay = (ms) => new Promise((resolve, reject) => {
    (0, timers_1.setTimeout)(resolve, ms);
});
exports.delay = delay;
