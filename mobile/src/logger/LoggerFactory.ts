import { Logger } from './Logger';

export class LoggerFactory {
    private constructor() { }
    static getInstance(service: string) {
        return new Logger(service);
    }
}