import { SearchResult } from './types/SearchResult';
import { AbstractGTrendsAdapter } from './AbstractGTrends';

export
    class HighGTrendsClient extends AbstractGTrendsAdapter {
    protected isValidData(data: SearchResult[]): boolean {
        return data.every(({ value }) => true);
        // return data.every(({ value }) => value === 100 || value < 40);
    }
}
