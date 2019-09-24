import {
  FieldValidationFunctionSync,
  parseMessageWithCustomArgs,
} from '@lemoncode/fonk';
import { checkNIF, mapCustomArgsToMessageArgs } from './validator.business';
import { CustomArgs } from './validator.model';

const VALIDATOR_TYPE = 'IS_VALID_NIF';

let defaultMessage = 'The value must be a valid {{validTypes}}';
export const setErrorMessage = message => (defaultMessage = message);

const isDefined = value => value !== void 0 && value !== null && value !== '';

const validateType = value => typeof value === 'string';

const validate = (value: string, args: CustomArgs) =>
  args.validTypes.indexOf(checkNIF(value)) >= 0;

export const validator: FieldValidationFunctionSync<
  CustomArgs
> = fieldValidatorArgs => {
  const { value, message = defaultMessage, customArgs } = fieldValidatorArgs;

  const succeeded =
    !isDefined(value) ||
    (validateType(value) && validate(value, customArgs as CustomArgs));

  return {
    succeeded,
    message: succeeded
      ? ''
      : parseMessageWithCustomArgs(
          message as string,
          mapCustomArgsToMessageArgs(customArgs)
        ),
    type: VALIDATOR_TYPE,
  };
};
