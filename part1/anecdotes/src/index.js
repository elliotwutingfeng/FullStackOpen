import React, { useState } from "react";
import ReactDOM from "react-dom";

const App = (props) => {
  const [selected, setSelected] = useState(0);
  const [points, setPoints] = useState(
    new Array(props.anecdotes.length).fill(0)
  );
  const [most, setMost] = useState(0);

  const nextHandler = () => {
    setSelected(Math.floor(Math.random() * props.anecdotes.length));
  };
  const voteHandler = () => {
    const copy = [...points];
    copy[selected] += 1;
    setPoints(copy);
    setMost(
      copy.map((x, i) => [x, i]).reduce((r, a) => (a[0] > r[0] ? a : r))[1]
    );
  };

  return (
    <>
      <Header text="Anecdote of the day" />
      <div>{props.anecdotes[selected]}</div>
      <div>has {points[selected]} votes</div>
      <button onClick={voteHandler}>vote</button>
      <button onClick={nextHandler}>next anecdote</button>

      <Header text="Anecdote with most votes" />
      <div>{props.anecdotes[most]}</div>
      <div>has {points[most]} votes</div>
    </>
  );
};

const Header = ({ text }) => {
  return <h1>{text}</h1>;
};

const anecdotes = [
  "If it hurts, do it more often",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
];

ReactDOM.render(<App anecdotes={anecdotes} />, document.getElementById("root"));
