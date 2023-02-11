import { IGTApi } from './IGTApi';
import { SearchResult } from './SearchResult';

export interface IGtrends {
    getTrends(keyWord: string): Promise<SearchResult[] | undefined>;
}
