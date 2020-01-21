import { validator, setErrorMessage } from './validator';
import { NIFType } from './validator.model';

const VALIDATOR_TYPE = 'IS_VALID_NIF';
const DEFAULT_MESSAGE = 'The value must be a valid DNI';

describe('fonk-nif-validator specs', () => {
  it('should return succeeded validation when it feeds value equals undefined', () => {
    // Arrange
    const value = void 0;

    // Act
    const result = validator({ value });

    // Assert
    expect(result).toEqual({
      succeeded: true,
      message: '',
      type: VALIDATOR_TYPE,
    });
  });

  it('should return succeeded validation when it feeds value equals null', () => {
    // Arrange
    const value = null;

    // Act
    const result = validator({ value });

    // Assert
    expect(result).toEqual({
      succeeded: true,
      message: '',
      type: VALIDATOR_TYPE,
    });
  });

  it('should return succeeded validation when it feeds value equals empty string', () => {
    // Arrange
    const value = '';

    // Act
    const result = validator({ value });

    // Assert
    expect(result).toEqual({
      succeeded: true,
      message: '',
      type: VALIDATOR_TYPE,
    });
  });

  it('should overwrite default message when it feeds value and message', () => {
    // Arrange
    const value = 'test';
    const message = 'other message';

    // Act
    const result = validator({
      value,
      message,
      customArgs: { validTypes: [NIFType.DNI] },
    });

    // Assert
    expect(result).toEqual({
      succeeded: false,
      message: 'other message',
      type: VALIDATOR_TYPE,
    });
  });

  it('should return failed validation when type of feeds value is number', () => {
    // Arrange
    const value = 1;

    // Act
    const result = validator({
      value,
      customArgs: {
        validTypes: [NIFType.DNI],
      },
    });

    // Assert
    expect(result).toEqual({
      succeeded: false,
      message: DEFAULT_MESSAGE,
      type: VALIDATOR_TYPE,
    });
  });

  it('should return failed validation when it feeds value is true', () => {
    // Arrange
    const value = true;

    // Act
    const result = validator({
      value,
      customArgs: {
        validTypes: [NIFType.DNI],
      },
    });

    // Assert
    expect(result).toEqual({
      succeeded: false,
      message: DEFAULT_MESSAGE,
      type: VALIDATOR_TYPE,
    });
  });

  it('should return failed validation when it feeds value is false', () => {
    // Arrange
    const value = false;

    // Act
    const result = validator({
      value,
      customArgs: {
        validTypes: [NIFType.DNI],
      },
    });

    // Assert
    expect(result).toEqual({
      succeeded: false,
      message: DEFAULT_MESSAGE,
      type: VALIDATOR_TYPE,
    });
  });

  it('should return failed validation when it feeds value is an object', () => {
    // Arrange
    const value = {};

    // Act
    const result = validator({
      value,
      customArgs: {
        validTypes: [NIFType.DNI],
      },
    });

    // Assert
    expect(result).toEqual({
      succeeded: false,
      message: DEFAULT_MESSAGE,
      type: VALIDATOR_TYPE,
    });
  });

  it('should return failed validation when it feeds value is an array', () => {
    // Arrange
    const value = [];

    // Act
    const result = validator({
      value,
      customArgs: {
        validTypes: [NIFType.DNI],
      },
    });

    // Assert
    expect(result).toEqual({
      succeeded: false,
      message: DEFAULT_MESSAGE,
      type: VALIDATOR_TYPE,
    });
  });

  it('should return failed validation when it feeds value is a function', () => {
    // Arrange
    const value = () => null;

    // Act
    const result = validator({
      value,
      customArgs: {
        validTypes: [NIFType.DNI],
      },
    });

    // Assert
    expect(result).toEqual({
      succeeded: false,
      message: DEFAULT_MESSAGE,
      type: VALIDATOR_TYPE,
    });
  });

  it('should return succeeded validation when it feeds value is a valid DNI', () => {
    // Arrange
    const value = '31016922L';

    // Act
    const result = validator({
      value,
      customArgs: {
        validTypes: [NIFType.DNI],
      },
    });

    // Assert
    expect(result).toEqual({
      succeeded: true,
      message: '',
      type: VALIDATOR_TYPE,
    });
  });

  it('should return succeeded validation when it feeds value is a valid NIE', () => {
    // Arrange
    const value = 'Z0141885A';

    // Act
    const result = validator({
      value,
      customArgs: {
        validTypes: [NIFType.NIE],
      },
    });

    // Assert
    expect(result).toEqual({
      succeeded: true,
      message: '',
      type: VALIDATOR_TYPE,
    });
  });

  it('should return failed validation when it feeds value is a not valid NIF', () => {
    // Arrange
    const value = 'XX014188554A';

    // Act
    const result = validator({
      value,
      customArgs: {
        validTypes: [NIFType.CIF, NIFType.NIE, NIFType.DNI],
      },
    });

    // Assert
    expect(result).toEqual({
      succeeded: false,
      message: 'The value must be a valid CIF, NIE, DNI',
      type: VALIDATOR_TYPE,
    });
  });

  it('should return failed validation when it feeds value is a valid DNI but validator does not allow DNI', () => {
    // Arrange
    const value = '31016922L';

    // Act
    const result = validator({
      value,
      customArgs: {
        validTypes: [NIFType.CIF, NIFType.NIE],
      },
    });

    // Assert
    expect(result).toEqual({
      succeeded: false,
      message: 'The value must be a valid CIF, NIE',
      type: VALIDATOR_TYPE,
    });
  });

  it('should return failed validation when it feeds value is a valid NIE but validator does not allow NIE', () => {
    // Arrange
    const value = 'Y0068339C';

    // Act
    const result = validator({
      value,
      customArgs: {
        validTypes: [NIFType.CIF, NIFType.DNI],
      },
    });

    // Assert
    expect(result).toEqual({
      succeeded: false,
      message: 'The value must be a valid CIF, DNI',
      type: VALIDATOR_TYPE,
    });
  });

  it('should return failed validation when it feeds value is a valid CIF but validator does not allow CIF', () => {
    // Arrange
    const value = 'N8462040J';

    // Act
    const result = validator({
      value,
      customArgs: {
        validTypes: [NIFType.NIE, NIFType.DNI],
      },
    });

    // Assert
    expect(result).toEqual({
      succeeded: false,
      message: 'The value must be a valid NIE, DNI',
      type: VALIDATOR_TYPE,
    });
  });

  it('should return failed validation when it feeds value is a valid DNI but validator does not allow NIF', () => {
    // Arrange
    const value = 'N8462040J';

    // Act
    const result = validator({
      value,
      message: 'The value must not be a valid NIF',
      customArgs: {
        validTypes: [],
      },
    });

    // Assert
    expect(result).toEqual({
      succeeded: false,
      message: 'The value must not be a valid NIF',
      type: VALIDATOR_TYPE,
    });
  });

  it('should overwrite default message when it feeds value and calls to setErrorMessage', () => {
    // Arrange
    const value = 'test';

    setErrorMessage('other message');

    // Act
    const result = validator({
      value,
      customArgs: { validTypes: [NIFType.DNI] },
    });

    // Assert
    expect(result).toEqual({
      succeeded: false,
      message: 'other message',
      type: VALIDATOR_TYPE,
    });
  });
});
