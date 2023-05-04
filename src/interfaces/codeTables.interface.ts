import { ConstSymbol } from './constSymbol.interface';
import { Interval } from './interval.interface';

export interface CodeTables {
  intervals?: Interval[];
  constSymbols?: ConstSymbol[];
}
