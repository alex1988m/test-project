"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const insert_1 = require("./queries/insert");
const select_all_1 = require("./queries/select-all");
const pg_format_1 = __importDefault(require("pg-format"));
const insert_rows_1 = require("./queries/insert-rows");
const LoggerFactory_1 = require("../logger/LoggerFactory");
class Database {
    constructor(pool, type, keyword) {
        this.pool = pool;
        this.type = type;
        this.keyword = keyword;
        this.logger = LoggerFactory_1.LoggerFactory.getInstance('Database');
    }
    // `"INSERT INTO data_high (keyword, city, value) VALUES ('bmw new', 'Randburg', '100'), ('bmw new', 'Gurgaon', '32'), ('bmw new', 'Budapest', '8')"`
    async insertRows(data) {
        if (data === null || data === void 0 ? void 0 : data.length) {
            let parsed;
            let query;
            try {
                parsed = this.toDbList(data);
                query = (0, pg_format_1.default)((0, insert_rows_1.insertRowsQuery)(process.env.TYPE), parsed);
                await this.pool.query(query);
            }
            catch (error) {
                console.debug(`
                    error on inserting:
                    error: ${JSON.stringify(error)}
                    data: ${JSON.stringify(data)}
                    parsed: ${JSON.stringify(parsed)}
                    query: ${JSON.stringify(query)}
                `);
            }
        }
    }
    toDbList(data) {
        return data.map(({ city, value }) => ([process.env.KEYWORD, city, value]));
    }
    async addRow(city, value) {
        return this.pool.query((0, insert_1.insertData)(this.type), [this.keyword, city, value]);
    }
    async getAll() {
        const result = await this.pool.query((0, select_all_1.selectAll)(this.type));
        return result.rows;
    }
}
exports.default = Database;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvZGIvZGIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFDQSw2Q0FBOEM7QUFDOUMscURBQWlEO0FBQ2pELDBEQUErQjtBQUMvQix1REFBd0Q7QUFJeEQsMkRBQXdEO0FBRXhELE1BQXFCLFFBQVE7SUFFekIsWUFDWSxJQUFVLEVBQ1YsSUFBWSxFQUNaLE9BQWU7UUFGZixTQUFJLEdBQUosSUFBSSxDQUFNO1FBQ1YsU0FBSSxHQUFKLElBQUksQ0FBUTtRQUNaLFlBQU8sR0FBUCxPQUFPLENBQVE7UUFKbkIsV0FBTSxHQUFZLDZCQUFhLENBQUMsV0FBVyxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBSzVELENBQUM7SUFDTCxxSkFBcUo7SUFDckosS0FBSyxDQUFDLFVBQVUsQ0FBQyxJQUFvQjtRQUNqQyxJQUFJLElBQUksYUFBSixJQUFJLHVCQUFKLElBQUksQ0FBRSxNQUFNLEVBQUU7WUFDZCxJQUFJLE1BQU0sQ0FBQztZQUNYLElBQUksS0FBSyxDQUFDO1lBQ1YsSUFBSTtnQkFDQSxNQUFNLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDN0IsS0FBSyxHQUFHLElBQUEsbUJBQU0sRUFBQyxJQUFBLDZCQUFlLEVBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxNQUFNLENBQUMsQ0FBQztnQkFDMUQsTUFBTSxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQzthQUNoQztZQUFDLE9BQU8sS0FBSyxFQUFFO2dCQUNaLE9BQU8sQ0FBQyxLQUFLLENBQUM7OzZCQUVELElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDOzRCQUN0QixJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQzs4QkFDbEIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUM7NkJBQ3ZCLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDO2lCQUNqQyxDQUFDLENBQUM7YUFDTjtTQUNKO0lBQ0wsQ0FBQztJQUVPLFFBQVEsQ0FBQyxJQUFvQjtRQUNqQyxPQUFPLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsT0FBTyxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDL0UsQ0FBQztJQUVELEtBQUssQ0FBQyxNQUFNLENBQUMsSUFBWSxFQUFFLEtBQWE7UUFDcEMsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFBLG1CQUFVLEVBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQztJQUMvRSxDQUFDO0lBRUQsS0FBSyxDQUFDLE1BQU07UUFDUixNQUFNLE1BQU0sR0FBRyxNQUFNLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUEsc0JBQVMsRUFBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztRQUMzRCxPQUFPLE1BQU0sQ0FBQyxJQUFJLENBQUM7SUFDdkIsQ0FBQztDQUNKO0FBeENELDJCQXdDQyJ9