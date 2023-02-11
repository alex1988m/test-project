import { ILogger } from './ILogger';

export class Logger implements ILogger {
    private isActive = process.env.DEBUG === 'true';
    constructor(private service: string) { }

    private getCurrentTime(): any {
        return new Date().toTimeString().split(' ')[0];
    }

    info(message: string): void {
        const messages = [
            this.getCurrentTime(),
            this.service,
            message
        ];

        this.isActive && console.info(messages.join('\t'));
    }

    error(message: string): void {
        const messages = [
            this.getCurrentTime(),
            this.service,
            message
        ];

        this.isActive && console.error(messages.join('\t'));
    }
}