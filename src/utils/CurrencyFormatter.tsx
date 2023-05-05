const currencyFormatter = (amount?: number) => {
  let euro = Intl.NumberFormat('en-DE', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 2,
    currencySign: 'accounting',
    useGrouping: true,
  });

  return amount ? euro.format(amount) : '';
};
export default currencyFormatter;
