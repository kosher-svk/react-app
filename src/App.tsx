import {
  createContext,
  useEffect,
  useMemo,
  useState,
  lazy,
  Suspense,
} from 'react';
import axios from 'axios';
import { Interval } from './interfaces/interval.interface';
import { ConstSymbol } from './interfaces/constSymbol.interface';
import { CodeTables } from './interfaces/codeTables.interface';
import { INTERVALS_URL, SYMBOLS_URL } from './constants/url';
import CircularIndeterminate from './components/lazyLoading/LazyLoad';

export const CodeTableContext = createContext<CodeTables>({});

const NavbarLazy = lazy(() => import('./components/navbar'));
const StandingOrderTableLazy = lazy(
  () => import('./components/standingOrderTable')
);

const App = () => {
  const [intervals, setIntervals] = useState<Interval[]>();
  const [constSymbols, setConstSymbols] = useState<ConstSymbol[]>();

  const getIntervals = async () => {
    try {
      const response = await axios.get<Interval[]>(INTERVALS_URL);
      if (response.data) {
        setIntervals(response.data);
      }
    } catch (error) {}
  };

  const getConstSymbols = async () => {
    try {
      const response = await axios.get<ConstSymbol[]>(SYMBOLS_URL);
      const data = response.data;
      if (data) {
        setConstSymbols(data);
      }
    } catch (error) {}
  };

  const codeTables = useMemo(() => {
    return { intervals, constSymbols };
  }, [intervals, constSymbols]);

  useEffect(() => {
    getIntervals();
    getConstSymbols();
  }, []);

  return (
    <div>
      <CodeTableContext.Provider value={codeTables}>
        <Suspense fallback={<CircularIndeterminate />}>
          <NavbarLazy />
          <StandingOrderTableLazy />
        </Suspense>
      </CodeTableContext.Provider>
    </div>
  );
};

export default App;
