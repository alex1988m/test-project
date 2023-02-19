import { string } from 'pg-format';
import { SearchResult } from '../../g-trends/types/SearchResult';
import { selectAll } from '../queries/select-all';

export interface IDB {
    insertIp(ip: string): Promise<void>;
    insertRows(data: SearchResult[], type: 'low' | 'high'): Promise<void>;
    getIpList(): Promise<string[]>;
}
