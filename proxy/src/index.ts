import { ClientFacade } from './client/ClientFacade';
import { IClient } from './client/IClient';
import DatabaseFactory from './db/db-factory';
import { IDB } from './db/types/IDB';
import { ILogger } from './logger/ILogger';
import { LoggerFactory } from './logger/LoggerFactory';
import { IProxyGateway } from './proxy/IProxyGateway';
import { ProxyService } from './proxy/ProxyService';
import { IServer } from './server/IServer';
import { Server } from './server/Server';

const logger: ILogger = LoggerFactory.getInstance('MainModule');

const main = async () => {
    logger.info('starting proxy service');
    const db: IDB = await DatabaseFactory.getInstance();
    const ps: IProxyGateway = new ProxyService();
    const server: IServer = new Server(db);
    const client: IClient = new ClientFacade(db, ps, server);
    await client.start();
};

main().catch((e: Error) => logger.error(e.message));


















