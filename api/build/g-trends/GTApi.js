"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GTApi = void 0;
// @ts-ignore
const google_trends_api_min_js_1 = __importDefault(require("../../google-trends-api.min.js"));
const config_1 = require("./config");
class GTApi {
    async get(agent, keyword) {
        return google_trends_api_min_js_1.default.interestByRegion({ ...config_1.gtrendsConfig, keyword, agent });
    }
}
exports.GTApi = GTApi;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR1RBcGkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvZy10cmVuZHMvR1RBcGkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsYUFBYTtBQUNiLDhGQUFxRDtBQU1yRCxxQ0FBeUM7QUFHekMsTUFBYSxLQUFLO0lBQ2QsS0FBSyxDQUFDLEdBQUcsQ0FBQyxLQUFzQixFQUFFLE9BQWU7UUFDN0MsT0FBTyxrQ0FBTyxDQUFDLGdCQUFnQixDQUFTLEVBQUUsR0FBRyxzQkFBYSxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDO0lBQ2xGLENBQUM7Q0FDSjtBQUpELHNCQUlDIn0=