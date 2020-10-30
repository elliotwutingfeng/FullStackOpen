import React from "react";
import personService from "../services/persons";

const Person = (props) => {
  const removePerson = () => {
    if (
      window.confirm(`Are you sure you want to delete ${props.person.name}?`)
    ) {
      personService
        .remove(props.person.id)
        .then(() => {
          props.setPersons(
            props.persons.filter((p) => p.id !== props.person.id)
          );
          // Message for Remove
          props.setErrorMessage([`Removed ${props.person.name}`, true]);
          setTimeout(() => {
            props.setErrorMessage([null, true]);
          }, 5000);
        })
        .catch((error) => {
          props.setErrorMessage([
            `Information of ${props.person.name} has already been removed from server`,
            false,
          ]);
          setTimeout(() => {
            props.setErrorMessage([null, true]);
          }, 5000);
        });
    }
  };

  return (
    <div>
      {props.person.name} {props.person.number}{" "}
      <button onClick={removePerson}>delete</button>
    </div>
  );
};

export default Person;
