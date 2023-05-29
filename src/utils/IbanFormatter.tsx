const ibanFormatter = (iban?: string) => {
  if (typeof iban !== 'string') {
    return;
  }
  iban = iban.replace(/\s/g, '');
  if (iban.length !== 24) {
    return iban;
  }
  iban = iban.toUpperCase();

  let newIban = '';
  let fourDigit = 0;
  for (let index = iban.length; index > 0; index--) {
    newIban = iban[index - 1].concat(newIban);
    fourDigit++;
    if (fourDigit === 4 && index > 1) {
      newIban = ' '.concat(newIban);
      fourDigit = 0;
    }
  }
  return newIban;
};
export default ibanFormatter;
