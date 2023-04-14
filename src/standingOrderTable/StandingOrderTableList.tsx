import StandingOrderRow from './standingOrderRow/StandingOrderRow';

function StandingOrderTableList(props: any) {
  const { transactions } = props;
  console.log(transactions);

  return (
    <tbody>
      {transactions.map((transaction: { standingOrderId: number }) => {
        return (
          <StandingOrderRow
            {...transaction}
            key={transaction.standingOrderId}
          />
        );
      })}
    </tbody>
  );
}

export default StandingOrderTableList;
