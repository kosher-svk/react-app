import { ConstSymbol } from './constSymbolInterface';
import { Interval } from './intervalInterface';

export interface CodeTables {
  intervals?: Interval[];
  constSymbols?: ConstSymbol[];
}
