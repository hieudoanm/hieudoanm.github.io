
import {StockDto} from './stock.entity'


export class StockHistoryDto {
  stock?: StockDto  | null;
symbol: string  | null;
date: Date ;
open: number  | null;
high: number  | null;
low: number  | null;
close: number  | null;
volume: number  | null;
createdAt: Date  | null;
updatedAt: Date  | null;
}
