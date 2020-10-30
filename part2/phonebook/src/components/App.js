import React, { useState, useEffect } from "react";
import Persons from "./Persons";
import Filter from "./Filter";
import PersonForm from "./PersonForm";
import Notification from "./Notification";
import personService from "../services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newFilter, setNewFilter] = useState("");
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [errorMessage, setErrorMessage] = useState([null, true]);

  useEffect(() => {
    console.log("fetching persons...");
    personService.getAll().then((initialPersons) => {
      console.log("persons fetched!");
      setPersons(initialPersons);
    });
  }, []);
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={errorMessage} />
      <Filter newFilter={newFilter} setNewFilter={setNewFilter} />
      <h2>add a new</h2>
      <PersonForm
        persons={persons}
        setPersons={setPersons}
        newName={newName}
        setNewName={setNewName}
        newNumber={newNumber}
        setNewNumber={setNewNumber}
        setErrorMessage={setErrorMessage}
      />
      <h2>Numbers</h2>
      <Persons
        persons={persons}
        setPersons={setPersons}
        newFilter={newFilter}
        setErrorMessage={setErrorMessage}
      />
    </div>
  );
};

export default App;
