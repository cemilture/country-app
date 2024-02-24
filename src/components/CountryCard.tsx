import React from "react";

interface CountryCardProps {
  country: any; // Adjust the type based on the API response structure
}

const CountryCard: React.FC<CountryCardProps> = ({ country }) => {
  //   console.log("country.name.common", country.name.common);
  return (
    <div>
      <img src={country.flags?.png} alt={`${country.name.common} Flag`} />
      <h2>{country.name.common}</h2>
      <p>Population: {country.population}</p>
      <p>Capital: {country.capital}</p>
      <p>Region: {country.region}</p>
      <p>
        Language:{" "}
        {country.languages
          ? Object.values(country.languages).join(", ")
          : "N/A"}
      </p>
      <p>
        Currencies:{" "}
        {country.currencies
          ? Object.values(country.currencies).join(", ")
          : "N/A"}
      </p>
    </div>
  );
};

export default CountryCard;
