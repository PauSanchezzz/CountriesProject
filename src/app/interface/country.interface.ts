export interface GetOneCountryResponse {
  flags: Flags;
  name: Name;
  tld: string[];
  ccn3: string;
  currencies: [];
  capital: string[];
  region: string;
  subregion: string;
  languages: [];
  borders: string[];
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
