import { NIFType, CustomArgs } from './validator.model';

const getExtra = (char: string) => (char != 'Z' ? (char != 'Y' ? 0 : 1) : 2);

// Left shift operator documentation: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Bitwise_Operators
const getSum = (nif: string) =>
  nif
    .substr(1, 7)
    .split('')
    .reduce((accum, current, index) => {
      const num = Number(current) << (index + 1) % 2;
      const uni = num % 10;
      return accum + (num - uni) / 10 + uni;
    }, 0);

const validateDNIControlLetter = (letter: string, num: number) =>
  letter === 'TRWAGMYFPDXBNJZSQVHLCKE'.charAt(num % 23);

const validateCIFControlLetter = (char: string, control: number) =>
  Number(char) == control || char === 'JABCDEFGHI'.charAt(control);

const checkSpecialDNI = (nif: string): boolean => {
  const sum = getSum(nif);
  const control = (10 - (sum % 10)) % 10;

  return (
    /^[KLM]\d{7}[\dA-J]$/.test(nif) &&
    validateCIFControlLetter(nif.charAt(8), control)
  );
};

const checkDNI = (nif: string): boolean => {
  const extra = getExtra(nif.charAt(0));
  const num = Number(`${extra}${nif.match(/\d+/)}`);

  return (
    (/^(\d|[XYZ])\d{7}[A-Z]$/.test(nif) &&
      validateDNIControlLetter(nif.charAt(8), num) &&
      /^\d/.test(nif)) ||
    checkSpecialDNI(nif)
  );
};

const checkNIE = (nif: string): boolean => {
  const extra = getExtra(nif.charAt(0));
  const num = Number(`${extra}${nif.match(/\d+/)}`);

  return (
    /^([XYZ])\d{7}[A-Z]$/.test(nif) &&
    validateDNIControlLetter(nif.charAt(8), num)
  );
};

const checkCIF = (nif: string): boolean => {
  const sum = getSum(nif);
  const control = (10 - (sum % 10)) % 10;

  return (
    /^[ABCDEFGHJNPQRSUVW]\d{7}[\dA-J]$/.test(nif) &&
    validateCIFControlLetter(nif.charAt(8), control)
  );
};

const validationMethods = {
  [NIFType.DNI]: checkDNI,
  [NIFType.CIF]: checkCIF,
  [NIFType.NIE]: checkNIE,
};

const sanitizeValue = value =>
  value ? value.toUpperCase().replace(/[\s\-]+/g, '') : '';

export const validateNIF = (nif: string, allowTypes: NIFType[]): boolean =>
  nif &&
  allowTypes.some(
    type =>
      validationMethods[type] && validationMethods[type](sanitizeValue(nif))
  );

export const mapCustomArgsToMessageArgs = (args: CustomArgs) => ({
  validTypes: args.validTypes.join(', '),
});
