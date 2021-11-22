import React from "react";
import { CoursePart } from "./types";
/**
 * Helper function for exhaustive type checking
 */
const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};
const Part = ({ part }: { part: CoursePart }) => {
  switch (part.type) {
    case "normal":
      return (
        <p>
          <b>
            {part.name} {part.exerciseCount}
          </b>
          <br />
          <i>{part.description}</i>
        </p>
      );
    case "groupProject":
      return (
        <p>
          <b>
            {part.name} {part.exerciseCount}
          </b>
          <br />
          <i>project exercises {part.groupProjectCount}</i>
        </p>
      );
    case "submission":
      return (
        <p>
          <b>
            {part.name} {part.exerciseCount}
          </b>
          <br />
          <i>{part.description}</i>
          <br />
          <i>submit to {part.exerciseSubmissionLink}</i>
        </p>
      );
    case "special":
      return (
        <p>
          <b>
            {part.name} {part.exerciseCount}
          </b>
          <br />
          <i>{part.description}</i>
          <br />
          <i>required skills: {part.requirements.join(", ")}</i>
        </p>
      );
    default:
      return assertNever(part);
  }
};
export default Part;
