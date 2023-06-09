import { number, object, string } from 'yup';
const validationSchema = object({
  name: string().required('Please enter a valid account'),

  accountNumber: string()
    .required('Prosim vlozte IBAN')
    .test(
      'IBAN length test',
      'IBAN musi mat dlzku 24 znakov',
      function (value: string) {
        const valueWithoutSpaces = value.replaceAll(/\s+/g, '');
        return valueWithoutSpaces.length === 24;
      }
    )
    .test(
      'IBAN first two characters Alphabetical',
      'Prve dva znaky musia byt pismena a zvysne znaky cisla',
      function (value: string) {
        const valueWithoutSpaces = value.replaceAll(/\s+/g, '');
        const regex = /^[a-zA-Z]{2}[0-9]*$/;
        return regex.test(valueWithoutSpaces);
      }
    ),
  amount: number()
    .required('Prosím vložte čiastku')
    .moreThan(0, 'Prosím zadajte čiastku väčšiu ako 0'),
  variableSymbol: string().max(
    10,
    'Variabilny symbol moze obsahovat max 10 cislic'
  ),

  specificSymbol: string().max(
    10,
    'Specificky symbol moze obsahovat max 10 cislic'
  ),
  constantSymbol: string().max(
    10,
    'Konstantny symbol moze obsahovat max 10 cislic'
  ),
});
export default validationSchema;
