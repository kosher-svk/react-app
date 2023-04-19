import { StandingOrder } from './standingOrderInterface';

function StandingOrderTableFooter(props: {
  standingOrderList: StandingOrder[];
}) {
  const { standingOrderList } = props;
  const numberOfStandingOrders = standingOrderList.length;
  const totalAmount = standingOrderList.reduce((totalAmount, StandingOrder) => {
    return totalAmount + StandingOrder.amount;
  }, 0);
  let euro = Intl.NumberFormat('en-DE', {
    style: 'currency',
    currency: 'EUR',
    useGrouping: false,
  });

  return (
    <tr>
      <td>Pocet trvalych prikazov: {numberOfStandingOrders}</td>
      <td>Celkova suma: {euro.format(totalAmount)}</td>
    </tr>
  );
}

export default StandingOrderTableFooter;
