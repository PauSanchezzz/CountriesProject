"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useCountryStore } from "../store/country.store";

export default function Home() {
  /* Store */
  const storeCountries = useCountryStore((state) => state.countries);
  const { getCountries, filterByRegion, filterByName } = useCountryStore();
  /* Variables */
  const continents = ["Africa", "Americas", "Asia", "Europe", "Oceania", "All"];
  const [value, setValue] = useState("");
  /* Methods */
  useEffect(() => {
    getCountries();
  }, []);

  const filteredContinents = (value: string) => {
    setValue("");
    if (value === "All") {
      getCountries();
      return;
    }
    filterByRegion(value);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    setTimeout(() => {
      if (e.target.value.trim() === "") {
        getCountries();
        return;
      }
      filterByName(e.target.value.trim());
    }, 500);
  };

  return (
    <div className="home-page">
      <div className="home-filters">
        <Input value={value} onChange={handleChange} />
        <div className="general-select">
          <Select onValueChange={(value) => filteredContinents(value)}>
            <SelectTrigger className="general-select-trigger">
              <SelectValue placeholder="Filter by Region" />
            </SelectTrigger>
            <SelectContent className="general-select-content">
              {continents.map((continent) => (
                <SelectItem
                  className="select-item"
                  key={continent}
                  value={continent}
                >
                  {continent}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      {!storeCountries || storeCountries.length === 0 ? (
        <div className="loading">
          <img src="/gif/loading.gif" alt="loading" />
          <p>Currently there is no information available, try another search</p>
        </div>
      ) : null}
      <div className="home-content">
        {storeCountries &&
          storeCountries.map((country, index) => (
            <Link
              key={index}
              className="card"
              href={`/country/${country.ccn3}`}
            >
              <img src={country.flags.png} alt={`${country.flags.alt} flag`} />
              <div className="card-content">
                <h1 className="card-title">{country.name.official}</h1>
                <div className="card-description">
                  <p className="item-text">
                    <span className="title-item-text">Population: </span>
                    {country.population.toLocaleString()}
                  </p>
                  <p className="item-text">
                    <span className="title-item-text">Region: </span>
                    {country.region}
                  </p>
                  <p className="item-text">
                    <span className="title-item-text">Capital: </span>
                    {country.capital?.[0]}
                  </p>
                </div>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
}
