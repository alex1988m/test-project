import DatabaseFactory from './db/db-factory';
import { IClient } from './client/IClient';
import { IDB } from './db/types/IDB';
import { ClientFacade } from './client/ClientFacade';
import { ILogger } from './logger/ILogger';
import { LoggerFactory } from './logger/LoggerFactory';
import { ServicesFactory } from './g-trends/factory/ServicesFactory';

const logger: ILogger = LoggerFactory.getInstance('MainModule');

async function main() {
    logger.info('setup db service');
    const db: IDB = await DatabaseFactory.getInstance();

    logger.info('setup api services');
    const services = ServicesFactory.getInstances(db);

    logger.info('start client');
    const client: IClient = new ClientFacade(services, db);

    logger.info('start application...');
    await client.start();
}

main().catch(logger.error);
