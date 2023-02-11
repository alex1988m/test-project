import { RawData } from './types/RawData';
import { SearchResult } from './types/SearchResult';
import { IProxy } from '../types/IProxyService';
import { IGtrends } from './types/IGtrends';
import { IGTApi } from './types/IGTApi';
import { ILogger } from '../logger/ILogger';
import { LoggerFactory } from '../logger/LoggerFactory';
import { HttpsProxyAgent } from 'https-proxy-agent';

export abstract class AbstractGTrendsAdapter implements IGtrends {
    private logger: ILogger = LoggerFactory.getInstance('GTrendsAdapter');

    constructor(private gtApi: IGTApi, private ps: IProxy) { }

    protected abstract isValidData(data: SearchResult[]): boolean;

    private toPayload(results: string): SearchResult[] {
        try {
            this.logger.debug('transform to payload:');
            const result = (JSON.parse(results) as RawData).default.geoMapData
                .filter(({ value }) => value[0] > 0)
                .sort((a, b) => +b.value[0] - +a.value[0])
                .map(({ value, geoName }) => ({ city: geoName, value: +value[0] }));
            this.logger.debug('success transform');
            this.logger.debug(`results: ${JSON.stringify(result)}`);
            return result;
        } catch (e) {
            this.logger.error('unable to transform response');
            throw e;
        }
    }

    async getTrends(keyWord: string): Promise<SearchResult[] | undefined> {
        this.logger.debug('setup proxy agent:');
        const agent = await this.getAgent();
        try {
            this.logger.debug(`requesting...`);
            const response = await this.gtApi.get(agent, keyWord);
            this.logger.debug('success');
            const data = this.toPayload(response);
            if (this.isValidData(data)) return data;
        } catch (e: unknown) {
            this.logger.info(`Error: ${(e as Error).message || 'unknown error!'}`);
            this.logger.info('updating current proxy...');
            await this.ps.update();
        }
    };

    private async getAgent() {
        const proxy = await this.ps.get();
        const proxyURL = `http://${proxy}`;
        const agent = new HttpsProxyAgent(proxyURL);
        this.logger.info(`proxy url: ${proxyURL}`);
        return agent;
    }
}
