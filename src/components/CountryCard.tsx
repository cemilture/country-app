import React from "react";
import { Country } from "./CountryList";

interface CountryCardProps {
  country: Country;
}

const CountryCard: React.FC<CountryCardProps> = ({ country }) => {
  return (
    <div className="card">
      <img src={country.flags?.png} alt={`${country.name.common} Flag`} />
      <h2>{country.name.common}</h2>
      <p>
        <strong>Population: </strong> {country.population.toLocaleString()}
      </p>
      <p>
        <strong>Capital: </strong> {country.capital}
      </p>
      <p>
        <strong>Region: </strong> {country.region}
      </p>
      <p>
        <strong>Language: </strong>

        {country.languages
          ? Object.values(country.languages).join(", ")
          : "N/A"}
      </p>
      <p>
        <strong>Currencies: </strong>

        {country.currencies
          ? Object.entries(country.currencies).map(([code, currency]) => (
              <span key={code}>
                {currency.name} ({currency.symbol})
                {Object.keys(country.currencies).length > 1 && <>, </>}
              </span>
            ))
          : "N/A"}
      </p>
    </div>
  );
};

export default CountryCard;
