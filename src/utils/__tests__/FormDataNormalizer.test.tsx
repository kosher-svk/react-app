import formDataNormalizer from '../FormDataNormalizer';

describe('formDataNormalizer', () => {
  test('Spravne vstupne udaje', () => {
    const formData = {
      standingOrderId: 1,
      amount: 100,
      name: 'Janko Hrasko',
      accountNumber: 'SK1234567890123456789012',
      variableSymbol: '123',
      specificSymbol: '456',
      constantSymbol: '789',
      interval: 'monthly',
      note: 'Sample note',
      intervalId: 2,
      intervalSpecification: 3,
      validFrom: '2022-01-01',
      nextRealizationDate: '2022-02-01',
    };

    const normalizedFormData = formDataNormalizer(formData);

    expect(normalizedFormData).toEqual({
      standingOrderId: 1,
      amount: 100,
      name: 'Janko Hrasko',
      accountNumber: 'SK1234567890123456789012',
      variableSymbol: '123',
      specificSymbol: '456',
      constantSymbol: '789',
      interval: 'monthly',
      note: 'Sample note',
      intervalId: 2,
      intervalSpecification: 3,
      validFrom: '2022-01-01',
      nextRealizationDate: '2022-02-01',
    });
  });

  test('Niektore vstupne udaje chybaju', () => {
    const formData = {
      standingOrderId: 2,
      amount: 200,
    };

    const normalizedFormData = formDataNormalizer(formData);

    expect(normalizedFormData).toEqual({
      standingOrderId: 2,
      amount: 200,
      name: '',
      accountNumber: '',
      variableSymbol: '',
      specificSymbol: '',
      constantSymbol: '',
      interval: '',
      note: '',
      intervalId: 1,
      intervalSpecification: 1,
      validFrom: '',
      nextRealizationDate: '',
    });
  });

  test('Form data su undefined', () => {
    const normalizedFormData = formDataNormalizer();
    expect(normalizedFormData).toEqual({
      name: '',
      accountNumber: '',
      variableSymbol: '',
      specificSymbol: '',
      constantSymbol: '',
      interval: '',
      note: '',
      intervalId: 1,
      intervalSpecification: 1,
      validFrom: '',
      nextRealizationDate: '',
    });
  });
});
