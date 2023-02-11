import { IDB } from '../db/types/IDB';
import { IGtrends } from '../g-trends/types/IGtrends';
import { ILogger } from '../logger/ILogger';
import { LoggerFactory } from '../logger/LoggerFactory';
import { IClient } from './IClient';
import axios from 'axios';

export class ClientFacade implements IClient {
    private requestCount = 0;
    private logger: ILogger = LoggerFactory.getInstance('ClientFacade');
    constructor (
        private gt: IGtrends,
        private db: IDB,
    ) { }

    start(): void {
        setInterval(
            async () => await this.getKeywordInfo(),
            +process.env.INTERVAL || 20000
        );
    }

    private async getKeywordInfo(): Promise<void> {
        try {
            this.requestCount++;
            const keyWord = process.env.KEYWORD || 'bmw';
            const data = await this.gt.getTrends(keyWord);
            if (data) await this.db.insertRows(data);
            if (this.isResetConnectionRequired()) await this.resetConnection();
        } catch (e: unknown) {
            this.logger.error(JSON.stringify(e));
        }
    }
    private async resetConnection() {
        this.logger.info('reset internet connection');
        return axios.get(`http://host.docker.internal:4000/reset`);
    }

    private isResetConnectionRequired() {
        return this.requestCount > +process.env.REQUESTS_TO_RESTART;
    }
}