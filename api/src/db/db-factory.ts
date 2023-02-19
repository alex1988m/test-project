import { Pool } from 'pg';
import { ILogger } from '../logger/ILogger';
import { LoggerFactory } from '../logger/LoggerFactory';
import Database from './db';
import { defaultConfig } from './db-config';
import { createIpListTable } from './queries/create-iplist-table';
import { createTable } from './queries/create-table';

export default class DatabaseFactory {
    private static logger: ILogger = LoggerFactory.getInstance('DatabaseFactory');
    static async getInstance() {
        const pool = new Pool(defaultConfig);
        DatabaseFactory.initPool(pool);
        await DatabaseFactory.createTables(pool);
        return new Database(pool);
    }

    private static async createTables(pool: Pool) {
        await pool.query(createTable('low'));
        await pool.query(createTable('high'));
        await pool.query(createIpListTable);
    }

    private static initPool(pool: Pool) {
        pool.on("connect", () => {
            this.logger.info('DB is connected!');
        });
        pool.on("error", (e: Error) => this.logger.error(e.message));
    }
}