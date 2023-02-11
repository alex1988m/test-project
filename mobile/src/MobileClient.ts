import { ILogger } from './logger/ILogger';
import { LoggerFactory } from './logger/LoggerFactory';
import express, { Express, Request, Response } from 'express';
import { ICmdCommands } from "./ICmdCommands";


export class MobileClient {
    private logger: ILogger = LoggerFactory.getInstance('MobileClient');
    private app: Express;

    constructor (private cmd: ICmdCommands) {
        this.app = express();
        this.init();
    }

    private init() {
        this.registerGetResetInternet();
    }

    private registerGetResetInternet() {
        this.logger.info('register GET /reset endpoint');
        this.app.get('/reset', async (_: Request, res: Response) => {
            this.logger.info('reset internet connection');
            await this.cmd.resetInternet();
            res.send('success');
        });
    }

    start() {
        this.app.listen(
            +process.env.PORT || 4000,
            () => this.logger.info(`listen on ${process.env.PORT || 4000}!!!!!`)
        );
    }
}
