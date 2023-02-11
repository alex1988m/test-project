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
        await DatabaseFactory.init(pool);
        return new Database(pool);
    }

    private static async init(pool: Pool) {
        pool.on("connect", () => {
            this.logger.info('DB is connected!');
        });
        pool.on("error", (e: Error) => this.logger.error(e.message));
        await pool.query(createTable);
    }
}