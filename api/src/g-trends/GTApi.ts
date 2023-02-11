// @ts-ignore
import gtrends from '../../google-trends-api.min.js';
// import gtrends from 'google-trends-api';
import { ILogger } from '../logger/ILogger';
import { LoggerFactory } from '../logger/LoggerFactory';
import { IGTApi } from './types/IGTApi';
import { RawData } from './types/RawData';
import { gtrendsConfig } from './config';
import { HttpsProxyAgent } from 'https-proxy-agent';

export class GTApi implements IGTApi {
    async get(agent: HttpsProxyAgent, keyword: string): Promise<string> {
        return gtrends.interestByRegion<string>({ ...gtrendsConfig, keyword, agent });
    }
}