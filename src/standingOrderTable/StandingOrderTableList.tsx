import { StandingOrder } from './standingOrderInterface';
import StandingOrderRow from './standingOrderRow/StandingOrderRow';

function StandingOrderTableList({
  standingOrderList,
}: {
  standingOrderList: StandingOrder[];
}) {
  return (
    <tbody>
      {standingOrderList.map((transaction) => {
        return <StandingOrderRow {...transaction} key={transaction.id} />;
      })}
    </tbody>
  );
}

export default StandingOrderTableList;
