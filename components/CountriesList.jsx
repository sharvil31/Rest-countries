// import CountriesData from "../CountriesData";
import { useEffect, useState } from "react";
import CountryCard from "./CountryCard";
import CountriesListShimmer from "./CountriesListShimmer";

const CountriesList = ({query}) => {

const [countriesData, setContriesData] = useState([]);

useEffect(() => {
  fetch("https://restcountries.com/v3.1/all")
  .then((res) => res.json())
  .then((data) => {
    setContriesData(data)
  })
}, [])
  

  return (
    <>
      { !countriesData.length? <CountriesListShimmer /> : <div className="countries-container"> {
      countriesData.filter((country) => country.name.common.toLowerCase().includes(query) || country.region.toLowerCase().includes(query))
        .map((country) => {
          // console.log(country);
          return (
            <CountryCard
              key={country.name.common}
              name={country.name.common}
              flag={country.flags.svg}
              population={country.population}
              region={country.region}
              capital={country.capital?.[0]}
              data={country}
            />
          );
        })
    }
      </div>}
    </>
  );
};

export default CountriesList;
