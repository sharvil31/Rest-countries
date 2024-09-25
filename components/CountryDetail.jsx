import { useEffect, useState } from "react";
import "../CountryDetails.css";
import { Link, useLocation, useParams } from "react-router-dom";
import CountryDetailShimmer from "./CountryDetailShimmer";
import { useTheme } from "../hooks/useTheme";



const CountryDetail = () => {

  const [isDark] = useTheme();
  const params = useParams();

  const { state } = useLocation();

  const countryName = params.country

  const [countryData, setCountryData] = useState(null);
  const [countryNotFound, setCountryNotFound] = useState(false);

  // console.log(countryData?.borders);
  // console.log(countryData);

  const updateCountryData = (data) => {
    setCountryData({
      flag: data.flags.svg,
      name: data.name.common,
      nativeName: Object.values(data.name.nativeName || {})[0]?.common,
      population: data.population.toLocaleString('en-IN'),
      region: data.region,
      subRegion: data.subregion,
      capital: data.capital?.join(', '),
      tld: data.tld.join(', '),
      currencies: Object.values(data.currencies || {}).map(currency => currency.name).join(', '),
      languages: Object.values(data.languages || {}).join(', '),
      borders: []
    })


    if(!data.borders) {
      data.borders = [];
    }

    
    Promise.all(data.borders.map((border) => {
      return fetch(`https://restcountries.com/v3.1/alpha/${border}`)
          .then((res) => res.json())
          .then(([borderCountry]) => borderCountry.name.common)
    })).then((borders) => {
      setCountryData((prevState) => ({...prevState, borders}))
    })

  }
  
  useEffect(() => {
    
    if(state) {
      updateCountryData(state);
      return
    }


    fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`)
    .then(res => res.json())
    .then(([data]) => {
     updateCountryData(data)

    }).catch(err => {
      setCountryNotFound(true)
    })
  }, [countryName])


  if(countryNotFound) {
    return <p>Country Not Found!!</p>
  }

  return (
    <>
      <main className={`${isDark ? 'dark' : ''}`}>
      <span className="back-btn" onClick={() => history.back()}>
        <i className="fa-solid fa-arrow-left-long"></i>&nbsp;&nbsp;Back
      </span>

      { countryData === null ? <CountryDetailShimmer /> : (
      <div className="country-container">
        <div className="country-details-container">
          <img className="country-img" src={countryData.flag} alt={`${countryData.name} flag`} />

          <div className="country-info-container">
            <h1>{countryData.name}</h1>

            <div className="country-text-info">
              <p>
                <b>Native Name: {countryData.nativeName || countryData.name} </b>
                <span className="native-name"></span>
              </p>

              <p>
                <b>Population: {countryData.population} </b>
                <span className="population"></span>
              </p>

              <p>
                <b>Region: {countryData.region} </b>
                <span className="region"></span>
              </p>

              {countryData.subRegion &&
              <p>
                <b>Sub Region: {countryData.subRegion} </b>
                <span className="sub-region"></span>
              </p>}

              <p>
                <b>Capital: {countryData.capital} </b>
                <span className="capital"></span>
              </p>

              <p>
                <b>Top Level Domain: {countryData.tld} </b>
                <span className="top-level-domain"></span>
              </p>

              <p>
                <b>Currencies: {countryData.currencies} </b>
                <span className="currencies"></span>
              </p>

              <p>
                <b>Languages: {countryData.languages} </b>
                <div className="languages-container">
                <span className="languages"></span>
                </div>
              </p>
            </div>

           {countryData.borders.length !== 0 && <div className="border-countries">
              <b>Border Countries:</b> &nbsp;
              {
                countryData.borders.map((country) => <Link key={country} to={`/${country}`}>{country}</Link>)
              }
            </div>}
          </div>
        </div>
      </div>
      )}
    </main>
    </>
  );
};

export default CountryDetail;
