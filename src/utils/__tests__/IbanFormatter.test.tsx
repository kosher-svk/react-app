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
    expect(ibanFormatter(5)).toBeUndefined();
    expect(ibanFormatter(null)).toBeUndefined();
    expect(ibanFormatter([])).toBeUndefined();
    expect(ibanFormatter({})).toBeUndefined();
    expect(ibanFormatter('12žžž')).toBe('12žžž');
    expect(ibanFormatter('\n\n\n')).toBe('');
    expect(ibanFormatter('1234561234567891234567891234567890')).toBe(
      '1234561234567891234567891234567890'
    );
  });
});
