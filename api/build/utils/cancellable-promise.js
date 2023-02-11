"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cancellablePromise = void 0;
function cancellablePromise(executor) {
    let _reject;
    const _promise = new Promise((resolve, reject) => {
        _reject = reject;
        executor(resolve, reject);
    });
    _promise.cancel = _reject;
    return _promise;
}
exports.cancellablePromise = cancellablePromise;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FuY2VsbGFibGUtcHJvbWlzZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlscy9jYW5jZWxsYWJsZS1wcm9taXNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQVlBLFNBQWdCLGtCQUFrQixDQUFZLFFBQXFCO0lBQy9ELElBQUksT0FBZSxDQUFDO0lBQ3BCLE1BQU0sUUFBUSxHQUEyQixJQUFJLE9BQU8sQ0FBQyxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsRUFBRTtRQUNyRSxPQUFPLEdBQUcsTUFBTSxDQUFDO1FBQ2pCLFFBQVEsQ0FBQyxPQUFPLEVBQUUsTUFBTSxDQUFDLENBQUM7SUFDOUIsQ0FBQyxDQUFDLENBQUM7SUFDSCxRQUFRLENBQUMsTUFBTSxHQUFHLE9BQVEsQ0FBQztJQUUzQixPQUFPLFFBQTRDLENBQUM7QUFDeEQsQ0FBQztBQVRELGdEQVNDIn0=