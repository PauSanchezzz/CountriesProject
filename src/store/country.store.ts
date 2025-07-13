import { create } from "zustand";
import { GetCountriesResponse } from "../interface/countries.interface";
import { GetOneCountryResponse } from "../interface/country.interface";

interface CountryState {
  countries: GetCountriesResponse[];
  country: GetOneCountryResponse | null;
  region?: string;
  getCountries: () => Promise<void>;
  filterByRegion: (region: string) => Promise<void>;
  filterByName: (name: string) => Promise<void>;
  getCountryById: (name: string) => Promise<void>;
}

const moduleUrl = "https://restcountries.com/v3.1";

export const useCountryStore = create<CountryState>((set) => ({
  countries: [],
  country: null,
  getCountries: async () => {
    const response = await fetch(
      `${moduleUrl}/all?fields=name,flags,capital,region,population,ccn3`
    );
    let countries: GetCountriesResponse[] = [];
    if (response.ok) {
      countries = (await response.json()) || [];
    }
    set((state) => ({
      ...state,
      countries,
    }));
  },
  filterByRegion: async (region: string) => {
    const response = await fetch(
      `${moduleUrl}/region/${region}?fields=name,flags,capital,region,population,ccn3`
    );

    let countries: GetCountriesResponse[] = [];
    if (response.ok) {
      countries = (await response.json()) || [];
    }
    set((state) => ({
      ...state,
      countries,
    }));
  },
  filterByName: async (name: string) => {
    const response = await fetch(
      `${moduleUrl}/name/${name}?fields=name,flags,capital,region,population,ccn3`
    );
    console.log("response", response);

    let countries: GetCountriesResponse[] = [];
    if (response.ok) {
      countries = (await response.json()) || [];
    }
    set((state) => ({
      ...state,
      countries,
    }));
  },
  getCountryById: async (id: string) => {
    const response = await fetch(
      `${moduleUrl}/alpha/${id}?fields=name,flags,capital,region,subregion,languages,borders,population,ccn3,tld,currencies,languages`
    );
    let country: GetOneCountryResponse | null = null;
    if (response.ok) {
      const data = await response.json();
      country = Array.isArray(data) ? data[0] : data || null;
    }
    set(() => ({
      country,
    }));
  },
}));
