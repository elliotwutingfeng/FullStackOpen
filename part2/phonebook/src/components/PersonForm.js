import React from "react";
import personService from "../services/persons";

const PersonForm = (props) => {
  const handlePersonChange = (event) => {
    props.setNewName(event.target.value);
  };
  const handleNumberChange = (event) => {
    props.setNewNumber(event.target.value);
  };
  const addPerson = (event) => {
    event.preventDefault();
    const personObject = {
      name: props.newName,
      number: props.newNumber,
    };
    if (!props.persons.map((person) => person.name).includes(props.newName)) {
      personService.create(personObject).then((returnedPerson) => {
        props.setPersons(props.persons.concat(returnedPerson));
        props.setNewName("");
        props.setNewNumber("");
        // Message for Create
        props.setErrorMessage([`Added ${returnedPerson.name}`, true]);
        setTimeout(() => {
          props.setErrorMessage([null, true]);
        }, 5000);
      });
    } else {
      if (
        window.confirm(
          `${props.newName} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        personService
          .update(
            props.persons.filter(
              (person) => person.name === personObject.name
            )[0].id,
            personObject
          )
          .then((returnedPerson) => {
            props.setPersons(
              props.persons.map((person) =>
                person.name === returnedPerson.name ? returnedPerson : person
              )
            );
            props.setNewName("");
            props.setNewNumber("");
            // Message for Update
            props.setErrorMessage([`Updated ${returnedPerson.name}`, true]);
            setTimeout(() => {
              props.setErrorMessage([null, true]);
            }, 5000);
          })
          .catch((error) => {
            props.setErrorMessage([
              `Information of ${personObject.name} has already been removed from server`,
              false,
            ]);
            setTimeout(() => {
              props.setErrorMessage([null, true]);
            }, 5000);
          });
      }
    }
  };

  return (
    <form onSubmit={addPerson}>
      <div>
        name: <input value={props.newName} onChange={handlePersonChange} />
      </div>
      <div>
        number: <input value={props.newNumber} onChange={handleNumberChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

export default PersonForm;
