export enum NIFType {
  Unknown = 'Unknown',
  DNI = 'DNI',
  NIE = 'NIE',
  CIF = 'CIF',
}

export interface CustomArgs {
  validTypes: NIFType[];
}
