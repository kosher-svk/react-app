import { StandingOrder } from '../standingOrderInterface';
import AccountNumber from './AccountNumber';

function StandingOrderRow(props: StandingOrder) {
  const {
    name = 'name',
    accountNumber = 'account number',
    interval = 'interval',
    amount = 0,
    nextRealizationDate = 'date',
  } = props;

  let euro = Intl.NumberFormat('en-DE', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 3,
    currencySign: 'accounting',
    useGrouping: false,
  });
  return (
    <tr>
      <td>{nextRealizationDate}</td>
      <td>
        <table>
          <tbody>
            <tr>
              <td>{name} </td>
            </tr>
            <tr>
              <td>{interval}</td>
              <AccountNumber accountNumber={accountNumber} />
            </tr>
          </tbody>
        </table>
      </td>
      <td>
        <>
          <button>Update</button>
          <button>Delete</button>
        </>
      </td>
      <td>{euro.format(amount)}</td>
    </tr>
  );
}

export default StandingOrderRow;
