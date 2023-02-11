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
    private logger: ILogger = LoggerFactory.getInstance('Database');
    constructor(
        private pool: Pool,
        private type: string,
        private keyword: string,
    ) { }
    // `"INSERT INTO data_high (keyword, city, value) VALUES ('bmw new', 'Randburg', '100'), ('bmw new', 'Gurgaon', '32'), ('bmw new', 'Budapest', '8')"`
    async insertRows(data: SearchResult[]): Promise<void> {
        if (data?.length) {
            let parsed;
            let query;
            try {
                parsed = this.toDbList(data);
                query = format(insertRowsQuery(process.env.TYPE), parsed);
                await this.pool.query(query);
            } catch (error) {
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

    private toDbList(data: SearchResult[]) {
        return data.map(({ city, value }) => ([process.env.KEYWORD, city, value]));
    }

    async addRow(city: string, value: number) {
        return this.pool.query(insertData(this.type), [this.keyword, city, value]);
    }

    async getAll() {
        const result = await this.pool.query(selectAll(this.type));
        return result.rows;
    }
}
