import HttpsProxyAgent from 'https-proxy-agent/dist/agent';
import { RawData } from './RawData';

export interface IGTApi {
    get(agent: HttpsProxyAgent, keyWord: string): Promise<string>;
}
