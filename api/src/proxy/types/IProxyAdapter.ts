export interface IProxyAdapter {
    get(): Promise<string>;
    update(): Promise<void>;
}
