import { HighGTrendsClient } from './HighGTrendsClient';
import { LowGTrendsClient } from './LowGTrendsClient';


export default class GTrendsFactory {
    static getClient() {
        return process.env.TYPE === 'low'
            ? LowGTrendsClient
            : HighGTrendsClient;
    }
}
