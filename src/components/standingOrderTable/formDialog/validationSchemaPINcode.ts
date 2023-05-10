import { object, number } from 'yup';
const validationSchema = object({
  PINcode: number().required('Please enter a PIN code'),
});
export default validationSchema;
