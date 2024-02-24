import React, { useEffect, useState } from "react";
import axios from "axios";
import CountryCard from "./CountryCard";
import SearchInput from "./SearchInput";
import FilterOptions from "./FilterOptions";

interface Language {
  [key: string]: string;
}

interface Currency {
  name: string;
  symbol: string;
}

export interface Country {
  name: {
    common: string;
    official: string;
    nativeName: Language;
  };
  population: number;
  capital: string[];
  region: string;
  languages: Language;
  currencies: {
    [code: string]: Currency;
  };
  flags: {
    png: string;
  };
}

const CountryList: React.FC = () => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [filteredCountries, setFilteredCountries] = useState<Country[]>([]);
  const [sortOption, setSortOption] = useState<string>("name");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://restcountries.com/v3.1/all");
        setCountries(response.data);
        setFilteredCountries(response.data);
        // console.log(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleSearch = (searchTerm: string) => {
    const filtered = countries.filter((country) =>
      country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCountries(filtered);
  };

  const handleSortChange = (selectedOption: string) => {
    setSortOption(selectedOption);
    const sortedCountries = [...filteredCountries].sort((a, b) => {
      if (sortOption === "name") {
        return a.name.common.localeCompare(b.name.common);
      } else if (sortOption === "population") {
        return b.population - a.population;
      }
      return 0;
    });
    setFilteredCountries(sortedCountries);
    console.log(sortOption);
  };

  return (
    <div>
      <SearchInput onSearch={handleSearch} />
      <FilterOptions onSortChange={handleSortChange} />
      {filteredCountries.map((country) => (
        <CountryCard key={country.name.common} country={country} />
      ))}
    </div>
  );
};

export default CountryList;
