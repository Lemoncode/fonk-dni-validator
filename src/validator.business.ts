import { NIFType, CustomArgs } from './validator.model';

const getExtra = (char: string) => (char != 'Z' ? (char != 'Y' ? 0 : 1) : 2);

const validateDNIControlLetter = (letter: string, num: number) =>
  letter === 'TRWAGMYFPDXBNJZSQVHLCKE'.charAt(num % 23);

const checkDNI = (nif: string): NIFType => {
  const extra = getExtra(nif.charAt(0));
  const num = Number(`${extra}${nif.match(/\d+/)}`);

  return validateDNIControlLetter(nif.charAt(8), num)
    ? /^\d/.test(nif)
      ? NIFType.DNI
      : NIFType.NIE
    : NIFType.Unknown;
};

const getSum = (nif: string) =>
  nif
    .substr(1, 7)
    .split('')
    .reduce((accum, current, index) => {
      const num = Number(current) << (index + 1) % 2;
      const uni = num % 10;
      return accum + (num - uni) / 10 + uni;
    }, 0);

const validateCIFControlLetter = (char: string, control: number) =>
  Number(char) == control || char === 'JABCDEFGHI'.charAt(control);

const checkCIF = (nif: string): NIFType => {
  const sum = getSum(nif);

  const control = (10 - (sum % 10)) % 10;

  return validateCIFControlLetter(nif.charAt(8), control)
    ? /^[KLM]/.test(nif)
      ? NIFType.DNI
      : NIFType.CIF
    : NIFType.Unknown;
};

export const checkNIF = (nif: string): NIFType => {
  nif = nif ? nif.toUpperCase().replace(/[\s\-]+/g, '') : '';

  return /^(\d|[XYZ])\d{7}[A-Z]$/.test(nif)
    ? checkDNI(nif)
    : /^[ABCDEFGHJKLMNPQRSUVW]\d{7}[\dA-J]$/.test(nif)
    ? checkCIF(nif)
    : NIFType.Unknown;
};

export const mapCustomArgsToMessageArgs = (args: CustomArgs) => ({
  validTypes: args.validTypes.join(', '),
});
