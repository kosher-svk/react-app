import ibanFormatter from '../../../utils/IbanFormatter';

const styles = {
  accountNumber: {
    fontSize: '1rem',
  },
};
const AccountNumber = (props: { accountNumber?: string }) => {
  return (
    <span style={styles.accountNumber}>
      {ibanFormatter(props.accountNumber)}
    </span>
  );
};

export default AccountNumber;
