import { ILogger } from './logger/ILogger';
import { LoggerFactory } from './logger/LoggerFactory';
import express, { Express, Request, Response } from 'express';
import { exec } from 'node:child_process';
import { delay } from './util/delay';

const logger: ILogger = LoggerFactory.getInstance('MobileModule');

interface ICmdCommands {
    resetInternet(): Promise<void>;
}

export class Cmd implements ICmdCommands {
    private state = 'ready';
    private logger: ILogger = LoggerFactory.getInstance('CommandsModule');

    private RESET_TIMEOUT: number = +process.env.RESET_TIMEOUT || 5000;
    private DEVICE_ID = process.env.DEVICE_ID || '1619d8990312';
    private SWITCH_OFF = `adb -s ${this.DEVICE_ID} shell cmd connectivity airplane-mode enable`;
    private SWITCH_ON = `adb -s ${this.DEVICE_ID} shell cmd connectivity airplane-mode disable`;

    async resetInternet(): Promise<void> {
        if (this.state === 'ready') {
            try {
                this.state = 'busy';
                this.logger.info(`executing ${this.SWITCH_OFF}`);
                await this.executeCommand(this.SWITCH_OFF);

                this.logger.info(`pause ${this.RESET_TIMEOUT}`);
                await delay(this.RESET_TIMEOUT);

                this.logger.info(`executing ${this.SWITCH_ON}`);
                await this.executeCommand(this.SWITCH_ON);

                this.logger.info(`pause ${this.RESET_TIMEOUT}`);
                await delay(this.RESET_TIMEOUT);
            } catch (err) {
                throw err;
            } finally {
                this.state = 'ready';
            }
        } else {
            this.logger.info('command is currently executing');
            await delay(this.RESET_TIMEOUT * 3);
        }
    }

    private executeCommand(command: string): Promise<void> {
        return new Promise((resolve, reject) => exec(command, error => error ? reject(error) : resolve()));
    }
}

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

async function main() {
    logger.info('Starting mobile module.');
    const cmd: ICmdCommands = new Cmd();
    const client = new MobileClient(cmd);
    client.start();
}

main().catch(console.error);