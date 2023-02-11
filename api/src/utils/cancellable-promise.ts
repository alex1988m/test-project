type ICancellablePromise<T> = Promise<T> & { cancel?: Reject; };
interface Reject {
    (reason?: any): void;
}
interface Resolve<T> {
    (value: T | PromiseLike<T>): void;
}
type Executor<T> = (
    resolve: Resolve<T>,
    reject: Reject,
) => void;

export function cancellablePromise<T=unknown>(executor: Executor<T>): Required<ICancellablePromise<T>> {
    let _reject: Reject;
    const _promise: ICancellablePromise<T> = new Promise((resolve, reject) => {
        _reject = reject;
        executor(resolve, reject);
    });
    _promise.cancel = _reject!;

    return _promise as Required<ICancellablePromise<T>>;
}
