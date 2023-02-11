import { ILogger } from './logger/ILogger';
import { LoggerFactory } from './logger/LoggerFactory';
import { Cmd } from './Cmd';
import { MobileClient } from './MobileClient';
import { ICmdCommands } from './ICmdCommands';

const logger: ILogger = LoggerFactory.getInstance('MobileModule');

async function main() {
    logger.info('Starting mobile module.');
    const cmd: ICmdCommands = new Cmd();
    const client = new MobileClient(cmd);
    client.start();
}

main().catch(console.error);