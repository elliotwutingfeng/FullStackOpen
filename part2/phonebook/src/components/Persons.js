import React from "react";
import Person from "./Person";

const Persons = (props) => {
  return (
    <>
      {props.persons.flatMap((person) =>
        person.name.toLowerCase().includes(props.newFilter.toLowerCase())
          ? [
              <Person
                key={person.name}
                person={person}
                persons={props.persons}
                setPersons={props.setPersons}
                setErrorMessage={props.setErrorMessage}
              />,
            ]
          : []
      )}
    </>
  );
};

export default Persons;
