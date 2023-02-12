// @ts-ignore
import gtrends from '../../../google-trends-api.min.js';
// import gtrends from 'google-trends-api';
import { ILogger } from '../../logger/ILogger';
import { LoggerFactory } from '../../logger/LoggerFactory';
import { IGTApi } from './IGTApi';
import { RawData } from '../types/RawData';
import { gtrendsConfig } from '../config/config';
import { HttpsProxyAgent } from 'https-proxy-agent';

export class GTApi implements IGTApi {
    private config: {};
    constructor (type: 'low' | 'high') {
        this.config = { ...gtrendsConfig, lowSearch: type === 'low' };
    }

    async get(keyword: string): Promise<string> {
        return gtrends.interestByRegion<string>({ ...this.config, keyword });
    }
}