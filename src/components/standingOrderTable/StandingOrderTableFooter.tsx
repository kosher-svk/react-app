import { useMemo } from 'react';

import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { Grid, TableFooter } from '@mui/material';
import { StandingOrder } from '../../interfaces/standingOrder.interface';
import CurrencyFormatter from '../../utils/CurrencyFormatter';

const Styles = {
  container: {
    color: 'rgba(250, 250, 250)',
    padding: '20px',
    backgroundColor: 'rgba(150, 150, 150)',
    alignItems: 'center',
  },
  summary: {
    width: '400px',
    padding: '20px',
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
        <TableCell style={Styles.summary} colSpan={3}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              Pocet trvalych prikazov: {numberOfStandingOrders}
            </Grid>
            <Grid item xs={6}>
              Celkova suma: {totalMoney}
            </Grid>
          </Grid>
        </TableCell>
      </TableRow>
    </TableFooter>
  );
};

export default StandingOrderTableFooter;
