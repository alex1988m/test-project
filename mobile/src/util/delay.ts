import { setTimeout } from 'timers';

export const delay = (ms: number) => new Promise((resolve, reject) => {
    setTimeout(
        resolve,
        ms
    );
});