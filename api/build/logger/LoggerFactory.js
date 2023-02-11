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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTG9nZ2VyRmFjdG9yeS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9sb2dnZXIvTG9nZ2VyRmFjdG9yeS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxxQ0FBa0M7QUFFbEMsTUFBYSxhQUFhO0lBQ3RCLGdCQUF3QixDQUFDO0lBQ3pCLE1BQU0sQ0FBQyxXQUFXLENBQUMsT0FBZTtRQUM5QixPQUFPLElBQUksZUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQy9CLENBQUM7Q0FDSjtBQUxELHNDQUtDIn0=