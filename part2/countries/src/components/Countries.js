import { React } from "react";
import Country from "./Country";
import CountryDetailed from "./CountryDetailed";

const Countries = (props) => {
  const filteredCountries = props.countries.flatMap((country) =>
    country.name.toLowerCase().includes(props.newFilter.toLowerCase())
      ? country
      : []
  );

  if (props.showAll === false) {
    if (filteredCountries.length >= 2 && filteredCountries.length <= 10) {
      return filteredCountries.map((country) => (
        <div key={country.name}>
          <Country country={country} />{" "}
          <button onClick={() => props.setShowAll(country)}>show</button>
        </div>
      ));
    } else if (filteredCountries.length === 1) {
      return <CountryDetailed country={filteredCountries[0]} />;
    } else {
      return <>Too many matches, specify another filter</>;
    }
  } else {
    return <CountryDetailed country={props.showAll} />;
  }
};

export default Countries;
