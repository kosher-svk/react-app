const CurrencyFormatter = (amount: number) => {
  let euro = Intl.NumberFormat('en-DE', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 3,
    currencySign: 'accounting',
    useGrouping: false,
  });

  return euro.format(amount);
};
export default CurrencyFormatter;
