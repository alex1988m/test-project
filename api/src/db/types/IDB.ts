import { string } from 'pg-format';
import { SearchResult } from '../../g-trends/types/SearchResult';
import { selectAll } from '../queries/select-all';

export interface IDB {
    insertRows(data: SearchResult[]): Promise<void>;
}
