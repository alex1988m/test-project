import { Pool } from 'pg';
import { ILogger } from '../logger/ILogger';
import { LoggerFactory } from '../logger/LoggerFactory';
import Database from './db';
import { defaultConfig } from './db-config';
import { createTable } from './queries/create-table';

export default class DatabaseFactory {
    private static logger: ILogger = LoggerFactory.getInstance('DatabaseFactory');
    static async getInstance() {
        const pool = new Pool(defaultConfig);
        DatabaseFactory.initPool(pool);
        await pool.query(createTable(process.env.TYPE)).catch(console.error);
        const db = new Database(pool, process.env.TYPE, process.env.KEYWORD);
        return db;
    }

    private static initPool(pool: Pool) {
        pool.on("connect", () => {
            this.logger.info('DB is connected!');
        });
        pool.on("error", (e: Error) => this.logger.error(e.message));
    }
}