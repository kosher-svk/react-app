import { StandingOrder } from './standingOrderInterface';
import StandingOrderRow from './standingOrderRow/StandingOrderRow';

function StandingOrderTableList(props: { transactions: StandingOrder[] }) {
  const { transactions } = props;
  console.log(transactions);

  return (
    <tbody>
      {transactions.map((transaction) => {
        return <StandingOrderRow {...transaction} key={transaction.id} />;
      })}
    </tbody>
  );
}

export default StandingOrderTableList;
