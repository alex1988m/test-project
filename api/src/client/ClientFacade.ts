import { readFile, writeFile } from 'fs/promises';
import { ILogger } from '../logger/ILogger';
import { LoggerFactory } from '../logger/LoggerFactory';
import { IClient } from './IClient';
import axios from 'axios';
import { IService } from '../g-trends/service/IService';
import { delay } from '../utils/delay';
import { IDB } from '../db/types/IDB';

export class ClientFacade implements IClient {
    private requestCount = 0;
    private state: 'ready' | 'busy' = 'ready';
    private logger: ILogger = LoggerFactory.getInstance('ClientFacade');
    constructor (
        private services: IService[],
        private db: IDB,
    ) { }

    async start(): Promise<void> {
        while (true) {
            await this.getKeywordInfo();
            await delay(+process.env.INTERVAL);
        }
    }

    private async getKeywordInfo(): Promise<void> {
        try {
            this.requestCount += this.services.length;
            const results = await Promise.all(this.invokeRequest());
            if (this.isSuccessResult(results)) await Promise.all(this.invokeSave());
            await this.checkConnection();
        } catch (e: unknown) {
            if (e instanceof Error) this.logger.error(e.message);
        }
    }

    private isSuccessResult(results: boolean[]) {
        return results.every(result => result);
    }

    private invokeSave(): Promise<boolean>[] {
        return this.services.map(service => service.save());
    }

    private invokeRequest(): Promise<boolean>[] {
        return this.services.map(service => service.requestTrends());
    }

    private async checkConnection() {
        if (this.isResetConnectionRequired()) await this.resetConnection();
    }

    async getIpList() {
        const ipList = await this.db.getIpList();
        this.logger.debug(`iplist: ${JSON.stringify(ipList)}`);
        return ipList;
    }

    async addIpToList(ip: string) {
        await this.db.insertIp(ip);
    }

    private async resetConnection() {
        this.state = 'busy';
        let ip: string;
        this.logger.info('starting connection reset...');
        const ipList = await this.getIpList();
        this.logger.info('reset internet connection');
        do {
            await axios.get(`http://host.docker.internal:4000/reset`);
            ({ data: ip } = await axios.get<string>('http://ipinfo.io/ip'));
            this.logger.info(`Current ip: ${ip}`);
        } while (ipList.includes(ip));
        await this.addIpToList(ip);
        this.requestCount = 0;
        this.state = 'ready';
    }

    private isResetConnectionRequired() {
        return this.requestCount > +process.env.REQUESTS_TO_RESTART;
    }
}