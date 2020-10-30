import React, { useState, useEffect } from "react";
import axios from "axios";
import Filter from "./Filter";
import Countries from "./Countries";
const App = () => {
  const [countries, setCountries] = useState([]);
  const [newFilter, setNewFilter] = useState("");
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    console.log("effect");
    axios.get(`https://restcountries.eu/rest/v2/all/`).then((response) => {
      console.log("promise fulfilled");
      setCountries(response.data);
    });
  }, []);
  return (
    <>
      <Filter
        newFilter={newFilter}
        setNewFilter={setNewFilter}
        setShowAll={setShowAll}
      />
      <Countries
        countries={countries}
        newFilter={newFilter}
        showAll={showAll}
        setShowAll={setShowAll}
      />
    </>
  );
};
export default App;
