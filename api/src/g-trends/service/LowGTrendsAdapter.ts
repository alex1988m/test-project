import { ILogger } from '../../logger/ILogger';
import { LoggerFactory } from '../../logger/LoggerFactory';
import { SearchResult } from '../types/SearchResult';
import { AbstractService } from './AbstractGTrends';

export class LowService extends AbstractService {
    protected logger: ILogger = LoggerFactory.getInstance('LowService');
    protected isValidData(data: SearchResult[]): boolean {
        return data.every(({ value }) => true);
        // return data.every(({ value }) => value === 100 || value < 40);
    }
}
