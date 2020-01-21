import { FieldValidationFunctionSync } from '@lemoncode/fonk';

export namespace nif {
  export const validator: FieldValidationFunctionSync;
  export function setErrorMessage(message: string | string[]): void;
  export enum types {
    DNI = 'DNI',
    NIE = 'NIE',
    CIF = 'CIF',
  }
}
