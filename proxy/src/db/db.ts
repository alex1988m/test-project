import { Pool } from 'pg';
import format from 'pg-format';
import { ILogger } from '../logger/ILogger';
import { LoggerFactory } from '../logger/LoggerFactory';
import { deleteCurrentProxy } from './queries/delete-current-proxy';
import { deleteProxiesTable } from './queries/delete-table';
import { getCurrentProxy } from './queries/get-current-proxy';
import { getProxyCount } from './queries/get-proxy-count';
import { insertProxiesList as insertProxyList } from './queries/insert-rows';
import { setCurrentProxy } from './queries/set-current-proxy';
import { IDB } from './types/IDB';

export default class Database implements IDB {
    private logger: ILogger = LoggerFactory.getInstance('Database');
    constructor(private pool: Pool) { }

    async getCount(): Promise<number> {
        const { rows } = await this.pool.query<{ count: number; }>(getProxyCount);
        return rows[0].count;
    }

    async getCurrent(): Promise<string> {
        const { rows } = await this.pool.query<{ url: string; }>(getCurrentProxy);
        return rows[0].url;
    }

    async clearTable(): Promise<void> {
        this.logger.info('clearing proxies table...');
        await this.pool.query(deleteProxiesTable);
        this.logger.info('success');
    }

    async insertProxyList(proxyList: any): Promise<void> {
        this.logger.info('inserting proxy list...');
        const parsed = this.toDbProxyList(proxyList);
        const query = format(insertProxyList, parsed);

        const result = await this.pool.query(query);
        this.logger.info(`inserted ${result.rowCount} rows`);
    }

    private toDbProxyList(data: string[]) {
        return data.map(value => ([value]));
    }

    async setCurrent(): Promise<void> {
        await this.pool.query(setCurrentProxy);
    }

    async deleteCurrent(): Promise<void> {
        await this.pool.query(deleteCurrentProxy);
    }
}
