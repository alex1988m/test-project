import { IDB } from '../db/types/IDB';
import { ILogger } from '../logger/ILogger';
import { LoggerFactory } from '../logger/LoggerFactory';
import { IProxyGateway } from '../proxy/IProxyGateway';
import { IServer } from '../server/IServer';
import { IClient } from './IClient';

export class ClientFacade implements IClient {
    private logger: ILogger = LoggerFactory.getInstance('ClientFacade');

    constructor(
        private db: IDB,
        private ps: IProxyGateway,
        private server: IServer,
    ) { }

    async start(): Promise<void> {
        this.logger.info('reset db and insert the initial proxy list');
        await this.resetProxiesDB();

        this.logger.info('start proxy server');
        this.server.start();

        this.logger.info('start auto-update each 30 min to get proxy list');
        this.startAutoUpdate();
    }

    private startAutoUpdate() {
        setInterval(
            async () => {
                this.logger.info('auto-updating proxies list each 30 min...');
                await this.resetProxiesDB();
                this.logger.info('success update');
            },
            30 * 60 * 1000
        );
        setInterval(
            async () => {
                const result = await this.db.getCount();
                this.logger.info(`PROXY COUNT: ${result}`);
                if (result < 3) {
                    this.logger.info('auto-updating empty proxies list...');
                    await this.resetProxiesDB();
                    this.logger.info('success update');
                }
            },
            60 * 1000
        );
    }

    private async resetProxiesDB() {
        this.logger.info('reset proxies database...');
        const rawProxyList = await this.ps.get();
        const proxyList = this.toProxyPayload(rawProxyList);
        this.logger.info(`got ${proxyList.length} proxies`);
        await this.db.clearTable();
        await this.db.insertProxyList(proxyList);
        await this.db.setCurrent();
    }

    private toProxyPayload(rawProxyList: string) {
        return rawProxyList.split('\n');
    }
}
