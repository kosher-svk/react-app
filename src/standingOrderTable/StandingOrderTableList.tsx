import StandingOrderRow from './standingOrderRow/StandingOrderRow';

function StandingOrderTableList(props: any) {
  const { transactions } = props;
  console.log(transactions);

  return (
    <tbody>
      {transactions.map((transaction: { id: number }) => {
        return <StandingOrderRow {...transaction} key={transaction.id} />;
      })}
    </tbody>
  );
}

export default StandingOrderTableList;
