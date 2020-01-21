export enum NIFType {
  DNI = 'DNI',
  NIE = 'NIE',
  CIF = 'CIF',
}

export interface CustomArgs {
  validTypes: NIFType[];
}
