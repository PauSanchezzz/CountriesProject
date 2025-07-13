"use client";

import * as React from "react";
import { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import Link from "next/link";
import { useCountryStore } from "@/store/country.store";
import { use } from "react";

type Props = {
  params: Promise<{ id: string }>;
};

export default function CountryDetail({ params }: Props) {
  /* Store */
  const storeCountry = useCountryStore((state) => state.country);
  const { getCountryById } = useCountryStore();
  /* Variables */
  const { id } = use(params);
  /* Methods */
  useEffect(() => {
    getCountryById(id);
  }, []);
  return (
    <div className="detail-content">
      <Link className="general-button back-button" href={`/`}>
        <Icon className="icon" icon="fluent-mdl2:back" />
        Back
      </Link>
      <div className="general-content">
        <img
          className="flag"
          src={storeCountry?.flags?.png}
          alt={storeCountry?.flags?.alt}
        />
        <div className="all-content">
          <p className="title-text">
            {storeCountry?.name ? String(storeCountry.name.official) : ""}
          </p>
          <div className="description-content">
            <div>
              <p className="item-text">
                <span className="title-item-text">Native Name: </span>
                {storeCountry?.name?.nativeName
                  ? Object.values(storeCountry.name.nativeName).at(-1)?.common
                  : ""}
              </p>
              <p className="item-text">
                <span className="title-item-text">Population: </span>
                {storeCountry?.name
                  ? storeCountry.population.toLocaleString()
                  : ""}
              </p>
              <p className="item-text">
                <span className="title-item-text">Region: </span>
                {storeCountry?.region ? String(storeCountry.region) : ""}
              </p>
              <p className="item-text">
                <span className="title-item-text">Sub Region: </span>
                {storeCountry?.name ? String(storeCountry.subregion) : ""}
              </p>
              <p className="item-text">
                <span className="title-item-text">Capital: </span>
                {storeCountry?.name ? String(storeCountry.capital) : ""}
              </p>
            </div>
            <div>
              <p className="item-text">
                <span className="title-item-text">Top Level Domain: </span>
                {storeCountry?.name ? String(storeCountry.tld) : ""}
              </p>
              <p className="item-text">
                <span className="title-item-text">Currencies: </span>
                {storeCountry?.currencies
                  ? Object.values(storeCountry.currencies)
                      .map((currency: { name: string }) => currency.name)
                      .join(", ")
                  : ""}
              </p>
              <p className="item-text">
                <span className="title-item-text">Languages: </span>
                {storeCountry?.languages
                  ? Object.values(storeCountry.languages).join(", ")
                  : ""}
              </p>
            </div>
          </div>
          <div className="additional-info">
            <p className="title-item-text">Border Countries:</p>
            <div className="tags-content">
              {storeCountry?.borders && storeCountry.borders.length > 0 ? (
                Object.values(storeCountry.borders).map((border, index) => (
                  <div className="tag-item" key={index}>
                    <p>{border}</p>
                  </div>
                ))
              ) : (
                <div className="tag-item">
                  <p>No border countries</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
