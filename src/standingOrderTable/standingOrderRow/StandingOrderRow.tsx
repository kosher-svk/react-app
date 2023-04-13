function StandingOrderRow(props: any) {
  const { name = 'name', iban, amount, date = 'date' } = props;
  return (
    <tr>
      <td>{date || 'date'}</td>
      <td>
        <table>
          <tbody>
            <tr>
              <td>{name || 'name'} </td>
            </tr>
            <tr>
              <td>Tyzdenne</td>
              <td>{iban || 'iban'}</td>
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
