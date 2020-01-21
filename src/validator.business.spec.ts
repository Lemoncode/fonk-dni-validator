import { NIFType } from './validator.model';
import { validateNIF } from './validator.business';

describe('Test Suite NIF Validator', () => {
  it('Should return DNI type with a valid DNI', () => {
    // Arrange
    const items = [
      '31016922L',
      '99738634P',
      '72378455P',
      '78719465X',
      '60025665N',
      '07040056D',
      '93250429B',
      '21766078M',
      '11430509S',
      '15920188W',
      '41397711B',
      '75012896Y',
      '54120373Q',
      '63916306L',
      '56276860T',
      '81683274Q',
      '48248156K',
      '44450712S',
      '68332720L',
      '90233688L',
    ];

    // Act
    const result = items.map(x => validateNIF(x, [NIFType.DNI]));

    // Assert
    result.map(type => expect(type).toBeTruthy());
  });

  it('Should return NIE type with a valid NIE', () => {
    // Arrange
    const items = [
      'Z0141885A',
      'Y3161188J',
      'Y0068339C',
      'Z5964126R',
      'Z7678211B',
      'Z7678211B',
      'Y7247198G',
      'Z3483533G',
      'Z8802275L',
      'Y9882516M',
      'Y9442807X',
      'X9722623V',
      'X3316876T',
      'Z8425155F',
      'Y5874154Z',
      'X9343168Q',
      'Z6648614D',
      'Y7700318R',
      'X5743442C',
      'Y6608630P',
    ];

    // Act
    const result = items.map(x => validateNIF(x, [NIFType.NIE]));

    // Assert
    result.map(type => expect(type).toBeTruthy());
  });

  it('Should return CIF type with a valid CIF', () => {
    // Arrange
    const items = [
      'H29475084',
      'V8850977C',
      'E89518872',
      'A23274004',
      'W9974351J',
      'G27692896',
      'N1736558F',
      'U8556968I',
      'C35034933',
      'J0575281A',
      'N8462040J',
      'W0924071D',
      'P9316179B',
      'Q5307657F',
      'S2471745F',
      'E87819934',
      'C57983371',
      'P7577798G',
      'C17040668',
      'D91268474',
      'D5236891G',
    ];

    // Act
    const result = items.map(x => validateNIF(x, [NIFType.CIF]));

    // Assert
    result.map(type => expect(type).toBeTruthy());
  });

  it('Should return Unkown within valid NIF', () => {
    // Arrange
    const items = [
      '',
      null,
      '78687768679',
      'ABCDEFGHIJK',
      'Test',
      '000000000',
      'G2769289·',
      'N1736558E',
      'U8556968E',
      'C3503493E',
      'P7577798T',
      '31006922L',
      '99738633P',
      '72378425P',
      '78719415X',
      '60025565N',
      '07049056D',
      '93230429B',
      '21776078M',
      '11930509S',
      '14920188W',
      '01397711B',
      'Z0041885A',
      'Y3061188J',
      'Y0168339C',
      'Z5064126R',
      'Z7578211B',
      'Z7478211B',
      'Y7207198G',
      'Z3413533G',
      'Z8822275L',
      'Y0882516M',
      'Y0442807X',
      'X0722623V',
      'N2462040J',
      'W1924071D',
      'P1316179B',
      'Q1307657F',
      'S1471745F',
      'E17819934',
      'C17983371',
      'P1577798G',
      'C27040668',
      'D11268474',
    ];

    // Act
    const result = items.map(x =>
      validateNIF(x, [NIFType.NIE, NIFType.CIF, NIFType.DNI])
    );

    // Assert
    result.map(type => expect(type).toBeFalsy());
  });
});
