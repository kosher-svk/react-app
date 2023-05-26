import ibanFormatter from '../IbanFormatter';

describe('ibanFormatter', () => {
  test('should format IBAN correctly', () => {
    // Test s platným IBAN
    expect(ibanFormatter('SK1234567890123456789012')).toBe(
      'SK12 3456 7890 1234 5678 9012'
    );

    // Test s platným IBAN, ale veľa medzier
    expect(ibanFormatter('   SK1234   567890123  456789012   ')).toBe(
      'SK12 3456 7890 1234 5678 9012'
    );

    // Test s prázdny IBAN
    expect(ibanFormatter('')).toBe('');

    // Test s neplatným IBAN (undefined)
    expect(ibanFormatter()).toBeUndefined();
  });
});
