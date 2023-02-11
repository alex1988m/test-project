"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProxyService = void 0;
const axios_1 = __importDefault(require("axios"));
const LoggerFactory_1 = require("../logger/LoggerFactory");
class ProxyService {
    constructor() {
        this.HOST = process.env.DOCKER === 'false' ? 'localhost' : 'proxy';
        this.logger = LoggerFactory_1.LoggerFactory.getInstance('ProxyService');
    }
    async get() {
        this.logger.debug('get current proxy');
        const response = await axios_1.default.get(`http://${this.HOST}:3000/current`);
        return response.data;
    }
    async update() {
        await axios_1.default.get(`http://${this.HOST}:3000/update`);
    }
}
exports.ProxyService = ProxyService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUHJveHlTZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3Byb3h5L1Byb3h5U2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxrREFBMEI7QUFFMUIsMkRBQXdEO0FBR3hELE1BQWEsWUFBWTtJQUF6QjtRQUNZLFNBQUksR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sS0FBSyxPQUFPLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDO1FBQzlELFdBQU0sR0FBWSw2QkFBYSxDQUFDLFdBQVcsQ0FBQyxjQUFjLENBQUMsQ0FBQztJQVd4RSxDQUFDO0lBVEcsS0FBSyxDQUFDLEdBQUc7UUFDTCxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO1FBQ3ZDLE1BQU0sUUFBUSxHQUFHLE1BQU0sZUFBSyxDQUFDLEdBQUcsQ0FBUyxVQUFVLElBQUksQ0FBQyxJQUFJLGVBQWUsQ0FBQyxDQUFDO1FBQzdFLE9BQU8sUUFBUSxDQUFDLElBQUksQ0FBQztJQUN6QixDQUFDO0lBRUQsS0FBSyxDQUFDLE1BQU07UUFDUixNQUFNLGVBQUssQ0FBQyxHQUFHLENBQUMsVUFBVSxJQUFJLENBQUMsSUFBSSxjQUFjLENBQUMsQ0FBQztJQUN2RCxDQUFDO0NBQ0o7QUFiRCxvQ0FhQyJ9