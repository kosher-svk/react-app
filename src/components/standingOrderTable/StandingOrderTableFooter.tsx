import { useMemo } from 'react';

import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { Box, TableFooter } from '@mui/material';
import { StandingOrder } from '../../interfaces/standingOrder.interface';
import CurrencyFormatter from '../../utils/CurrencyFormatter';

const Styles = {
  container: {
    backgroundColor: '#50A8C6',
  },
  summary: {
    fontSize: '1.3rem',
    color: 'white',
  },
};

const StandingOrderTableFooter = (props: {
  standingOrderList: StandingOrder[];
}) => {
  const { standingOrderList } = props;
  const numberOfStandingOrders = standingOrderList.length;

  const totalMoney = useMemo(() => {
    const totalAmount = standingOrderList.reduce(
      (totalAmount, standingOrder) => {
        if (standingOrder.amount) return totalAmount + standingOrder.amount;
        else return totalAmount;
      },
      0
    );

    return CurrencyFormatter(totalAmount);
  }, [standingOrderList]);

  return (
    <TableFooter style={Styles.container}>
      <TableRow>
        <TableCell sx={Styles.summary} colSpan={3}>
          <Box display='flex' justifyContent='space-around'>
            <div>Počet trvalých príkazov: {numberOfStandingOrders}</div>
            <div>Celková suma: {totalMoney}</div>
          </Box>
        </TableCell>
      </TableRow>
    </TableFooter>
  );
};

export default StandingOrderTableFooter;
