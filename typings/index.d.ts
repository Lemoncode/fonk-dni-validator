import { FieldValidationFunctionSync } from '@lemoncode/fonk';

export namespace dni {
  export const validator: FieldValidationFunctionSync;
  export function setErrorMessage(message: string | string[]): void;
}
