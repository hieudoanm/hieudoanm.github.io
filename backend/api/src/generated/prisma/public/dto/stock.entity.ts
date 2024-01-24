
import {Market} from '@prisma/client'
import {StockHistoryDto} from './stockHistory.entity'


export class StockDto {
  symbol: string ;
name: string ;
market: Market ;
createdAt: Date  | null;
updatedAt: Date  | null;
history?: StockHistoryDto[] ;
}
