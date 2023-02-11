export interface IDB {
    clearTable(): Promise<void>;
    insertProxyList(proxyList: any): Promise<void>;
    setCurrent(): Promise<void>;
    getCurrent(): Promise<string>;
    getCount(): Promise<number>;
    deleteCurrent(): Promise<void>;
}
