import { useMemo } from 'react';
import { StandingOrder } from '../interfaces/standingOrderInterface';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { TableFooter } from '@mui/material';
import CurrencyFormatter from '../utils/CurrencyFormatter';

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
    <TableFooter>
      <TableRow>
        <TableCell>Pocet trvalych prikazov: {numberOfStandingOrders}</TableCell>
        <TableCell colSpan={2}>Celkova suma: {totalMoney}</TableCell>
      </TableRow>
    </TableFooter>
  );
};

export default StandingOrderTableFooter;
