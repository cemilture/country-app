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
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://restcountries.com/v3.1/all");
        const countriesData = response.data;
        const sortedCountries = [...countriesData].sort((a, b) =>
          a.name.common.localeCompare(b.name.common)
        );
        setCountries(sortedCountries);
        setFilteredCountries(sortedCountries);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleSearch = (searchTerm: string) => {
    setSearchTerm(searchTerm);
    const filtered = countries.filter((country) =>
      country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCountries(filtered);
  };

  const handleSortChange = (selectedOption: string) => {
    setSortOption(selectedOption);
    const sortedCountries = [...filteredCountries].sort((a, b) => {
      if (selectedOption === "name") {
        return a.name.common.localeCompare(b.name.common);
      } else if (selectedOption === "population") {
        return b.population - a.population;
      }
      return 0;
    });
    setFilteredCountries(sortedCountries);
  };
  console.log(sortOption);

  return (
    <div>
      <div className="input-container">
        <SearchInput onSearch={handleSearch} />
        <FilterOptions onSortChange={handleSortChange} />
      </div>
      <div className="card-container">
        {filteredCountries.length === 0 ? (
          <p>There is no country named "{searchTerm}".</p>
        ) : (
          filteredCountries.map((country) => (
            <CountryCard key={country.name.common} country={country} />
          ))
        )}
      </div>
    </div>
  );
};

export default CountryList;
