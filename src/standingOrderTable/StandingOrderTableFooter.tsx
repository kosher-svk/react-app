import { useMemo } from 'react';
import { StandingOrder } from './standingOrderInterface';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { TableFooter } from '@mui/material';

const StandingOrderTableFooter = (props: {
  standingOrderList: StandingOrder[];
}) => {
  const { standingOrderList } = props;
  const numberOfStandingOrders = standingOrderList.length;

  const totalMoney = useMemo(() => {
    const totalAmount = standingOrderList.reduce(
      (totalAmount, StandingOrder) => {
        return totalAmount + StandingOrder.amount;
      },
      0
    );
    let euro = Intl.NumberFormat('en-DE', {
      style: 'currency',
      currency: 'EUR',
      useGrouping: false,
    });
    return euro.format(totalAmount);
  }, [standingOrderList]);

  return (
    <TableFooter>
      <TableRow>
        <TableCell>Pocet trvalych prikazov: {numberOfStandingOrders}</TableCell>
        <TableCell colSpan={2}>Celkova suma: {totalMoney}</TableCell>
      </TableRow>
    </TableFooter>
  );
};

export default StandingOrderTableFooter;
