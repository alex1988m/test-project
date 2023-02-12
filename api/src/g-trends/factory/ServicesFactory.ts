import { ILogger } from '../../logger/ILogger';
import { LoggerFactory } from '../../logger/LoggerFactory';
import { GTApi } from '../api/GTApi';
import GTrendsFactory from './GTrendsFactory';
import { IGTApi } from '../api/IGTApi';
import { IService } from '../service/IService';
import { IDB } from '../../db/types/IDB';

export class ServicesFactory {
    private static logger: ILogger = LoggerFactory.getInstance('ServicesFactory');

    static getInstances(db: IDB): IService[] {
        this.logger.info('setup g-trends services');
        
        const gtLow: IService = ServicesFactory.setupService(db, 'low');
        const gtHigh: IService = ServicesFactory.setupService(db, 'high');

        return [gtLow, gtHigh];
    }

    private static setupService(db: IDB, type: 'low' | 'high') {
        const api: IGTApi = new GTApi(type);
        const Client = GTrendsFactory.getClient(type);
        const service: IService = new Client(api, db, type, JSON.parse(process.env.KEYWORD));
        return service;
    }
}
