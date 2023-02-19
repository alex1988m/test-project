import { Pool } from 'pg';
import format from 'pg-format';
import { insertRowsQuery } from './queries/insert-rows';
import { SearchResult } from '../g-trends/types/SearchResult';
import { IDB } from './types/IDB';
import { getIpList } from './queries/get-ip-list';
import { insertIp } from './queries/insert-ip';

export default class Database implements IDB {
    constructor (private pool: Pool) { }

    async insertIp(ip: string): Promise<void> {
        await this.pool.query(insertIp, [ip]);
    }

    async getIpList(): Promise<string[]> {
        const { rows } = await this.pool.query<{ address: string; }>(getIpList);
        return rows.map(r => r.address);
    }

    async insertRows(
        data: SearchResult[],
        type: 'low' | 'high'
    ): Promise<void> {
        if (data?.length) {
            let parsed;
            let query;
            try {
                parsed = this.toDbList(data);
                query = format(insertRowsQuery(type), parsed);
                await this.pool.query(query);
            } catch (error) {
                console.error(`
                    error on inserting:
                    error: ${JSON.stringify(error)}
                    data: ${JSON.stringify(data)}
                    parsed: ${JSON.stringify(parsed)}
                    query: ${JSON.stringify(query)}
                `);
            }
        }
    }

    private toDbList(data: SearchResult[]) {
        return data.map(({ city, value }) => ([process.env.KEYWORD, city, value]));
    }
}
