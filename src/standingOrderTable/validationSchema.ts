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
    .required('Please enter a valid account')
    .moreThan(0, 'Musite zadat ciastku vacsiu ako 0'),
  variableSymbol: string()
    .required('Variabilny symbol moze obsahovat max 10 cislic')
    .max(10),
  specificSymbol: string()
    .required('Specificky symbol moze obsahovat max 10 cislic')
    .max(10),
  constantSymbol: string()
    .required('Konstantny symbol moze obsahovat max 10 cislic')
    .max(10),
});
export default validationSchema;
