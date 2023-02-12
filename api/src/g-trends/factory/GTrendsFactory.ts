import { HighService } from '../service/HighGTrendsAdapter';
import { LowService } from '../service/LowGTrendsAdapter';

export default class GTrendsFactory {
    static getClient(type: 'low' | 'high') {
        return type === 'low'
            ? LowService
            : HighService;
    }
}
