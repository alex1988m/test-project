import { ILogger } from './logger/ILogger';
import { LoggerFactory } from './logger/LoggerFactory';
import { exec } from 'node:child_process';
import { delay } from './util/delay';
import { ICmdCommands } from "./ICmdCommands";


export class Cmd implements ICmdCommands {
    private state = 'ready';
    private logger: ILogger = LoggerFactory.getInstance('CommandsModule');

    private RESET_TIMEOUT: number = +process.env.RESET_TIMEOUT || 5000;
    private SWITCH_OFF = `adb shell cmd connectivity airplane-mode enable`;
    private SWITCH_ON = `adb shell cmd connectivity airplane-mode disable`;
    private OPEN_SETTINGS = `adb shell am start -n com.android.settings/.TetherSettings`;
    private SELECT_WIFI_HOTSPOT = `adb shell input keyevent 20`;
    private PRESS_BUTTON = `adb shell input keyevent 66`;
    private PRESS_HOME = `adb shell input keyevent 3`;
    private CLEAR_SETTINGS = `adb shell pm clear com.android.settings`;
    private flag = 0;

    async resetInternet(): Promise<void> {
        if (this.state === 'ready') {
            try {
                this.state = 'busy';
                await this.executeCommand(this.CLEAR_SETTINGS);

                this.logger.info(`executing ${this.SWITCH_OFF}`);
                await this.executeCommand(this.SWITCH_OFF);

                this.logger.info(`pause ${this.RESET_TIMEOUT}`);
                await delay(this.RESET_TIMEOUT);

                this.logger.info(`executing ${this.SWITCH_ON}`);
                await this.executeCommand(this.SWITCH_ON);

                this.logger.info(`pause ${this.RESET_TIMEOUT}`);
                await delay(this.RESET_TIMEOUT);

                this.logger.info('enable wifi hotspot');
                this.logger.info('open settings');
                await this.executeCommand(this.OPEN_SETTINGS);

                if (this.flag === 0) {
                    this.logger.info('select wifi hotspot');
                    await this.executeCommand(this.SELECT_WIFI_HOTSPOT);
                    this.flag++;
                }

                this.logger.info('press button');
                await this.executeCommand(this.PRESS_BUTTON);


                this.logger.info('press home');
                await this.executeCommand(this.PRESS_HOME);

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
