export interface IProxy {
    get(): Promise<string>,
    update(): Promise<void>;
}
