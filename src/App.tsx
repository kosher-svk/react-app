import { createContext, useEffect, useMemo, useState } from 'react';
import Navbar from './components/navbar';
import StandingOrderTable from './components/standingOrderTable';
import axios from 'axios';
import { Interval } from './interfaces/interval.interface';
import { ConstSymbol } from './interfaces/constSymbol.interface';
import { CodeTables } from './interfaces/codeTables.interface';

const urlAPI =
  'http://cvicna-uloha-vzor-api-edge.akademia.apps.oshift4.softec.sk/api';
export const CodeTableContext = createContext<CodeTables>({});

const App = () => {
  const [intervals, setIntervals] = useState<Interval[]>();
  const [constSymbols, setConstSymbols] = useState<ConstSymbol[]>();

  const getIntervals = async () => {
    try {
      const url = urlAPI + '/code-table/intervals';
      const response = await axios.get<Interval[]>(url);
      if (response.data) {
        setIntervals(response.data);
      }
    } catch (error) {}
  };

  const getConstSymbols = async () => {
    try {
      const url = urlAPI + '/code-table/constant-symbols';
      const response = await axios.get<ConstSymbol[]>(url);
      const data = response.data;
      if (data) {
        setConstSymbols(data);
      }
    } catch (error) {}
  };

  const codeTables = useMemo(() => {
    console.log('use memo working');

    return { intervals, constSymbols };
  }, [intervals, constSymbols]);

  useEffect(() => {
    getIntervals();
    getConstSymbols();
  }, []);

  return (
    <div>
      <CodeTableContext.Provider value={codeTables}>
        <Navbar />
        <StandingOrderTable />
      </CodeTableContext.Provider>
    </div>
  );
};

export default App;
