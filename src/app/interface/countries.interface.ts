export interface GetCountriesResponse {
  flags: Flags;
  name: Name;
  capital: string[];
  region: string;
  ccn3: string;
  population: number;
}

export interface Flags {
  png: string;
  svg: string;
  alt: string;
}

export interface Name {
  common: string;
  official: string;
  nativeName: NativeName;
}
export interface NativeName {
  official: string;
  common: string;
}
