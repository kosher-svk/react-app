import { useEffect, useState } from 'react';
import StandingOrderTableFooter from './StandingOrderTableFooter';
import StandingOrderTableHeader from './StandingOrderTableHeader';
import StandingOrderTableList from './StandingOrderTableList';
import { StandingOrder } from './standingOrderInterface';
import axios from 'axios';

import Table from '@mui/material/Table';

const url =
  'http://cvicna-uloha-vzor-api-edge.akademia.apps.oshift4.softec.sk/api/standingOrder';

const StandingOrderTable = () => {
  const [data, setData] = useState<StandingOrder[]>([]);

  const fetchData = async () => {
    try {
      const response = await axios.get<StandingOrder[]>(url);
      const data = response.data;
      setData(data);
    } catch (error) {}
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <Table className='table'>
        <StandingOrderTableHeader />
        <StandingOrderTableList standingOrderList={data} />
        <StandingOrderTableFooter standingOrderList={data} />
      </Table>
    </div>
  );
};

export default StandingOrderTable;
