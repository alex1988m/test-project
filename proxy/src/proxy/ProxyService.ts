import axios from 'axios';
import { ILogger } from '../logger/ILogger';
import { LoggerFactory } from '../logger/LoggerFactory';
import { IProxyGateway } from './IProxyGateway';

export class ProxyService implements IProxyGateway {
    private logger: ILogger = LoggerFactory.getInstance('ProxyService');
    private PROXY_LIST_URL = 'https://raw.githubusercontent.com/monosans/proxy-list/master/proxies_anonymous/http.txt';

    async get(): Promise<string> {
        this.logger.info('getting new proxy list...');
        const response = await axios.get<string>(this.PROXY_LIST_URL);
        return response.data;
    }
}
