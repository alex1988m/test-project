import { Pool } from 'pg';
import { insertData } from './queries/insert';
import { selectAll } from './queries/select-all';
import format from 'pg-format';
import { insertRowsQuery } from './queries/insert-rows';
import { SearchResult } from '../g-trends/types/SearchResult';
import { IDB } from './types/IDB';
import { ILogger } from '../logger/ILogger';
import { LoggerFactory } from '../logger/LoggerFactory';

export default class Database implements IDB {
    constructor (private pool: Pool) { }

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
