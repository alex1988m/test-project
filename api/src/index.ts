import DatabaseFactory from './db/db-factory';
import GTrendsFactory from './g-trends/GTrendsFactory';
import { IClient as IClient } from './client/IClient';
import { IGtrends as IGtrends } from './g-trends/types/IGtrends';
import { IDB } from './db/types/IDB';
import { IGTApi } from './g-trends/types/IGTApi';
import { IProxyAdapter as IProxy } from './proxy/types/IProxyAdapter';
import { ProxyService } from './proxy/ProxyService';
import { GTApi } from './g-trends/GTApi';
import { ClientFacade } from './client/ClientFacade';
import { ILogger } from './logger/ILogger';
import { LoggerFactory } from './logger/LoggerFactory';
import { delay } from './utils/delay';
import { CancellableDecorator } from './g-trends/decorator/CancellableGTrendsDecorator';

const logger: ILogger = LoggerFactory.getInstance('MainModule');

async function main() {
    logger.info('setup db service');
    const db: IDB = await DatabaseFactory.getInstance();

    logger.info('setup proxy service');
    const ps: IProxy = new ProxyService();

    logger.info('setup g-trends service');
    const gtApi: IGTApi = new GTApi();

    // сейчас работает без автореджекта
    // const cancellableGtApi = new CancellableDecorator(gtApi);
    const GTrendsAdapter = GTrendsFactory.getClient();
    const gt: IGtrends = new GTrendsAdapter(gtApi, ps);

    // раскомментить если нужен автореджект
    // const cancellableGtApi = new CancellableDecorator(gtApi);
    // const GTrendsAdapter = GTrendsFactory.getClient();
    // const gt: IGtrends = new GTrendsAdapter(cancellableGtApi, ps);

    logger.info('start client');
    const client: IClient = new ClientFacade(gt, db);

    logger.info('start application...');
    client.start();
}

main().catch(logger.error);
