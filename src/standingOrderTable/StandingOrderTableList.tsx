import { TableBody } from '@mui/material';
import { StandingOrder } from './standingOrderInterface';
import StandingOrderRow from './standingOrderRow/StandingOrderRow';

const StandingOrderTableList = ({
  standingOrderList,
  handleClickOpen,
}: {
  standingOrderList: StandingOrder[];
  handleClickOpen: (id: number) => void;
}) => {
  return (
    <TableBody>
      {standingOrderList.map((transaction) => {
        return (
          <StandingOrderRow
            transaction={transaction}
            key={transaction.standingOrderId}
            handleClickOpen={handleClickOpen}
          />
        );
      })}
    </TableBody>
  );
};

export default StandingOrderTableList;
