function StandingOrderRow(props: any) {
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
              <td>{accountNumber}</td>
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
