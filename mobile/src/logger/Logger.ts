import { ILogger } from './ILogger';

export class Logger implements ILogger {
    private isDebug = process.env.DEBUG === 'true';
    constructor(private service: string) { }

    private getCurrentTime(): any {
        return new Date().toTimeString().split(' ')[0];
    }

    debug(message: string): void {
        const messages = [
            this.getCurrentTime(),
            this.service,
            message
        ];

        this.isDebug && console.info(messages.join('\t'));
    }

    info(message: string): void {
        const messages = [
            this.getCurrentTime(),
            this.service,
            message
        ];

        console.info(messages.join('\t'));
    }

    error(message: string): void {
        const messages = [
            this.getCurrentTime(),
            this.service,
            message
        ];

        console.error(messages.join('\t'));
    }
}