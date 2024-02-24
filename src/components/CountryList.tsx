import React, { useEffect, useState } from "react";
import axios from "axios";
import CountryCard from "./CountryCard";
import SearchInput from "./SearchInput";
import FilterOptions from "./FilterOptions";

const CountryList: React.FC = () => {
  const [countries, setCountries] = useState<any>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://restcountries.com/v3.1/all");
        setCountries(response.data);
        console.log("response.data", response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  console.log("countries", countries);

  return (
    <div>
      <SearchInput />
      <FilterOptions />
      {countries.map((country) => (
        <CountryCard key={country.ccn3} country={country} />
      ))}
    </div>
  );
};

export default CountryList;
