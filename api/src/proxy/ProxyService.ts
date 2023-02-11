import axios from 'axios';
import { ILogger } from '../logger/ILogger';
import { LoggerFactory } from '../logger/LoggerFactory';
import { IProxy } from '../types/IProxyService';

export class ProxyService implements IProxy {
    private HOST = process.env.DOCKER === 'false' ? 'localhost' : 'proxy';
    private logger: ILogger = LoggerFactory.getInstance('ProxyService');

    async get(): Promise<string> {
        this.logger.debug('get current proxy');
        const response = await axios.get<string>(`http://${this.HOST}:3000/current`);
        return response.data;
    }

    async update(): Promise<void> {
        await axios.get(`http://${this.HOST}:3000/update`);
    }
}