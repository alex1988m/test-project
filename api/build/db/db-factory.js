"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
const LoggerFactory_1 = require("../logger/LoggerFactory");
const db_1 = __importDefault(require("./db"));
const db_config_1 = require("./db-config");
const create_table_1 = require("./queries/create-table");
class DatabaseFactory {
    static async getInstance() {
        const pool = new pg_1.Pool(db_config_1.defaultConfig);
        DatabaseFactory.initPool(pool);
        await pool.query((0, create_table_1.createTable)(process.env.TYPE)).catch(console.error);
        const db = new db_1.default(pool, process.env.TYPE, process.env.KEYWORD);
        return db;
    }
    static initPool(pool) {
        pool.on("connect", () => {
            this.logger.info('DB is connected!');
        });
        pool.on("error", (e) => this.logger.error(e.message));
    }
}
exports.default = DatabaseFactory;
DatabaseFactory.logger = LoggerFactory_1.LoggerFactory.getInstance('DatabaseFactory');
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGItZmFjdG9yeS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9kYi9kYi1mYWN0b3J5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsMkJBQTBCO0FBRTFCLDJEQUF3RDtBQUN4RCw4Q0FBNEI7QUFDNUIsMkNBQTRDO0FBQzVDLHlEQUFxRDtBQUVyRCxNQUFxQixlQUFlO0lBRWhDLE1BQU0sQ0FBQyxLQUFLLENBQUMsV0FBVztRQUNwQixNQUFNLElBQUksR0FBRyxJQUFJLFNBQUksQ0FBQyx5QkFBYSxDQUFDLENBQUM7UUFDckMsZUFBZSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUMvQixNQUFNLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBQSwwQkFBVyxFQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3JFLE1BQU0sRUFBRSxHQUFHLElBQUksWUFBUSxDQUFDLElBQUksRUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ3JFLE9BQU8sRUFBRSxDQUFDO0lBQ2QsQ0FBQztJQUVPLE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBVTtRQUM5QixJQUFJLENBQUMsRUFBRSxDQUFDLFNBQVMsRUFBRSxHQUFHLEVBQUU7WUFDcEIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsQ0FBQztRQUN6QyxDQUFDLENBQUMsQ0FBQztRQUNILElBQUksQ0FBQyxFQUFFLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBUSxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztJQUNqRSxDQUFDOztBQWZMLGtDQWdCQztBQWZrQixzQkFBTSxHQUFZLDZCQUFhLENBQUMsV0FBVyxDQUFDLGlCQUFpQixDQUFDLENBQUMifQ==