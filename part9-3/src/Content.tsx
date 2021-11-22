import React from "react";
import Part from "./Part";
import { CoursePart } from "./types";

const Content = ({ courseParts }: { courseParts: CoursePart[] }) => (
  <>
    {courseParts.map((part, idx) => (
      <Part key={part.name + idx} {...{ part }} />
    ))}
  </>
);

export default Content;
