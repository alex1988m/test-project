import HttpsProxyAgent from 'https-proxy-agent/dist/agent';
import { RawData } from '../types/RawData';

export interface IGTApi {
    get(keyWord: string): Promise<string>;
}
