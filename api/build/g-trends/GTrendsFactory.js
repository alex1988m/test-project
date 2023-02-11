"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HighGTrendsClient_1 = require("./HighGTrendsClient");
const LowGTrendsClient_1 = require("./LowGTrendsClient");
class GTrendsFactory {
    static getClient() {
        return process.env.TYPE === 'low'
            ? LowGTrendsClient_1.LowGTrendsClient
            : HighGTrendsClient_1.HighGTrendsClient;
    }
}
exports.default = GTrendsFactory;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR1RyZW5kc0ZhY3RvcnkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvZy10cmVuZHMvR1RyZW5kc0ZhY3RvcnkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSwyREFBd0Q7QUFDeEQseURBQXNEO0FBR3RELE1BQXFCLGNBQWM7SUFDL0IsTUFBTSxDQUFDLFNBQVM7UUFDWixPQUFPLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxLQUFLLEtBQUs7WUFDN0IsQ0FBQyxDQUFDLG1DQUFnQjtZQUNsQixDQUFDLENBQUMscUNBQWlCLENBQUM7SUFDNUIsQ0FBQztDQUNKO0FBTkQsaUNBTUMifQ==