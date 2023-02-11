import { HttpsProxyAgent } from 'https-proxy-agent';
import { cancellablePromise } from '../../utils/cancellable-promise';
import { IGTApi } from '../types/IGTApi';

export class CancellableDecorator implements IGTApi {
    private CANCEL_INTERVAL = process.env.INTERVAL - 500;
    constructor (private subject: IGTApi) { }

    async get(agent: HttpsProxyAgent, keyword: string): Promise<string> {
        const cancellable = cancellablePromise(
            (resolve, reject) => {
                this.subject
                    .get(agent, keyword)
                    .then(
                        res => {
                            resolve(res);
                        },
                        rej => {
                            reject(rej);
                        }
                    );
            }
        );
        setTimeout(
            () => {
                cancellable.cancel(new Error(`Request is rejected after ${this.CANCEL_INTERVAL / 1000} sec.`));
            },
            this.CANCEL_INTERVAL
        );
        return cancellable as Promise<string>;
    }
}
