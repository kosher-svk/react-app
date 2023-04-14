import { StandingOrder } from '../standingOrderInterface';
import AccountNumber from './AccountNumber';

function StandingOrderRow(props: StandingOrder) {
  const {
    name = 'name',
    accountNumber = 'account number',
    interval = 'interval',
    amount = 'amount',
    nextRealizationDate = 'date',
  } = props;
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
      <td>{amount || 'amount'}</td>
    </tr>
  );
}

export default StandingOrderRow;
