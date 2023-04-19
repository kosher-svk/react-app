import { TableBody } from '@mui/material';
import { StandingOrder } from './standingOrderInterface';
import StandingOrderRow from './standingOrderRow/StandingOrderRow';

const StandingOrderTableList = ({
  standingOrderList,
}: {
  standingOrderList: StandingOrder[];
}) => {
  return (
    <TableBody>
      {standingOrderList.map((transaction) => {
        return <StandingOrderRow {...transaction} key={transaction.id} />;
      })}
    </TableBody>
  );
};

export default StandingOrderTableList;
