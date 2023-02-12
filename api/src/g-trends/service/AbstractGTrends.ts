import { RawData } from '../types/RawData';
import { SearchResult } from '../types/SearchResult';
import { IGtrends } from '../types/IGtrends';
import { IGTApi } from '../api/IGTApi';
import { ILogger } from '../../logger/ILogger';
import { IService } from './IService';
import { IDB } from '../../db/types/IDB';

export abstract class AbstractService implements IService {
    private parsedData: SearchResult[] | null = null;
    protected abstract logger: ILogger;

    constructor (
        private api: IGTApi,
        private db: IDB,
        private type: 'low' | 'high',
        private keyword: string
    ) { }

    async save(): Promise<boolean> {
        if (this.parsedData) {
            await this.db.insertRows(this.parsedData, this.type);
            return true;
        }
        return false;
    }

    async requestTrends(): Promise<boolean> {
        this.logger.debug(`requesting...`);
        const response = await this.api.get(this.keyword);
        const data = this.toPayload(response);
        this.logger.debug('success');

        if (this.isValidData(data)) {
            this.parsedData = data;
            return true;
        } else {
            this.parsedData = null;
            return false;
        }
    }

    protected abstract isValidData(data: SearchResult[]): boolean;

    private toPayload(results: string): SearchResult[] {
        try {
            this.logger.debug('transform to payload:');
            const result = (JSON.parse(results) as RawData)
                .default
                .geoMapData
                .filter(this.nonNull())
                .sort(this.toLow())
                .map(this.parseResults());
            this.logger.debug('success transform');
            this.logger.debug(`results: ${JSON.stringify(result)}`);
            return result;
        } catch (e) {
            this.logger.error('unable to transform response');
            throw e;
        }
    }

    private parseResults(): (value: { geoName: string; value: number[]; }, index: number, array: { geoName: string; value: number[]; }[]) => { city: string; value: number; } {
        return ({ value, geoName }) => ({ city: geoName, value: +value[0] });
    }

    private toLow(): ((a: { geoName: string; value: number[]; }, b: { geoName: string; value: number[]; }) => number) | undefined {
        return (a, b) => +b.value[0] - +a.value[0];
    }

    private nonNull(): (value: { geoName: string; value: number[]; }, index: number, array: { geoName: string; value: number[]; }[]) => unknown {
        return ({ value }) => value[0] > 0;
    }
}
