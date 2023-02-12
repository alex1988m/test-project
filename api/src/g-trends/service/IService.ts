import { SearchResult } from '../types/SearchResult';

export interface IService {
    requestTrends(): Promise<boolean>;
    save(): Promise<boolean>;
}
