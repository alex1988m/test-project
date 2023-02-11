"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CancellableDecorator = void 0;
const cancellable_promise_1 = require("../../utils/cancellable-promise");
class CancellableDecorator {
    constructor(subject) {
        this.subject = subject;
        this.CANCEL_INTERVAL = process.env.INTERVAL - 2000;
    }
    async get(agent, keyword) {
        const cancellable = (0, cancellable_promise_1.cancellablePromise)((resolve, reject) => {
            this.subject
                .get(agent, keyword)
                .then(res => {
                resolve(res);
            }, rej => {
                reject(rej);
            });
        });
        setTimeout(() => {
            cancellable.cancel(new Error(`Request is rejected after ${this.CANCEL_INTERVAL / 1000} sec.`));
        }, this.CANCEL_INTERVAL);
        return cancellable;
    }
}
exports.CancellableDecorator = CancellableDecorator;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ2FuY2VsbGFibGVHVHJlbmRzRGVjb3JhdG9yLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2ctdHJlbmRzL2RlY29yYXRvci9DYW5jZWxsYWJsZUdUcmVuZHNEZWNvcmF0b3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQ0EseUVBQXFFO0FBR3JFLE1BQWEsb0JBQW9CO0lBRTdCLFlBQXFCLE9BQWU7UUFBZixZQUFPLEdBQVAsT0FBTyxDQUFRO1FBRDVCLG9CQUFlLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO0lBQ2QsQ0FBQztJQUV6QyxLQUFLLENBQUMsR0FBRyxDQUFDLEtBQXNCLEVBQUUsT0FBZTtRQUM3QyxNQUFNLFdBQVcsR0FBRyxJQUFBLHdDQUFrQixFQUNsQyxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsRUFBRTtZQUNoQixJQUFJLENBQUMsT0FBTztpQkFDUCxHQUFHLENBQUMsS0FBSyxFQUFFLE9BQU8sQ0FBQztpQkFDbkIsSUFBSSxDQUNELEdBQUcsQ0FBQyxFQUFFO2dCQUNGLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNqQixDQUFDLEVBQ0QsR0FBRyxDQUFDLEVBQUU7Z0JBQ0YsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ2hCLENBQUMsQ0FDSixDQUFDO1FBQ1YsQ0FBQyxDQUNKLENBQUM7UUFDRixVQUFVLENBQ04sR0FBRyxFQUFFO1lBQ0QsV0FBVyxDQUFDLE1BQU0sQ0FBQyxJQUFJLEtBQUssQ0FBQyw2QkFBNkIsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLE9BQU8sQ0FBQyxDQUFDLENBQUM7UUFDbkcsQ0FBQyxFQUNELElBQUksQ0FBQyxlQUFlLENBQ3ZCLENBQUM7UUFDRixPQUFPLFdBQThCLENBQUM7SUFDMUMsQ0FBQztDQUNKO0FBM0JELG9EQTJCQyJ9