import { IGTApi } from '../api/IGTApi';
import { SearchResult } from './SearchResult';

export interface IGtrends {
    getTrends(keyWord: string): Promise<SearchResult[] | undefined>;
}
