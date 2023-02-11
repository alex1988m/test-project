import express, { Express, Request, Response } from 'express';
import { IDB } from '../db/types/IDB';
import { ILogger } from '../logger/ILogger';
import { LoggerFactory } from '../logger/LoggerFactory';
import { IServer } from './IServer';

export class Server implements IServer {
    private logger: ILogger = LoggerFactory.getInstance('ProxyServer');
    private app: Express;

    constructor(private db: IDB) {
        this.app = express();
        this.init();
    }

    private init() {
        this.registerGetCurrent();
        this.registerUpdateCurrent();
    }

    private registerUpdateCurrent() {
        this.logger.info('register GET /update endpoint');
        this.app.get('/update', async (_: Request, res: Response) => {
            this.logger.info('updating current proxy');
            await this.db.deleteCurrent();
            await this.db.setCurrent();
            res.send('success');
        });
    }

    private registerGetCurrent() {
        this.logger.info('register GET /current endpoint');
        this.app.get('/current', async (_: Request, res: Response) => {
            this.logger.info('getting current proxy');
            const result = await this.db.getCurrent();
            res.send(result);
        });
    }

    start() {
        this.app.listen(
            +process.env.PORT,
            () => this.logger.info(`listen on ${process.env.PORT}`)
        );
    }
}
