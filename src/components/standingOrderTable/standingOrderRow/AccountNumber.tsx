import ibanFormatter from '../../../utils/IbanFormatter';

const AccountNumber = (props: { accountNumber?: string }) => {
  return <span>{ibanFormatter(props.accountNumber)}</span>;
};

export default AccountNumber;
