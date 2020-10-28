import React, { useState } from "react";
import ReactDOM from "react-dom";

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleGood = () => {
    setGood(good + 1);
  };

  const handleNeutral = () => {
    setNeutral(neutral + 1);
  };

  const handleBad = () => {
    setBad(bad + 1);
  };

  return (
    <div>
      <Header text="give feedback" />
      <Button label="good" handler={handleGood} />
      <Button label="neutral" handler={handleNeutral} />
      <Button label="bad" handler={handleBad} />
      <Header text="statistics" />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

const Header = ({ text }) => {
  return <h1>{text}</h1>;
};

const Button = ({ label, handler }) => {
  return <button onClick={handler}>{label}</button>;
};

const Statistics = ({ good, neutral, bad }) => {
  const total = good + neutral + bad;
  if (total > 0) {
    const average = (good - bad) / total;
    const positive = (good / total) * 100;
    return (
      <table>
        <tbody>
          <Statistic text="good" value={good} />
          <Statistic text="neutral" value={neutral} />
          <Statistic text="bad" value={bad} />
          <Statistic text="all" value={total} />
          <Statistic text="average" value={average} />
          <Statistic text="positive" value={positive} />
        </tbody>
      </table>
    );
  } else {
    return <div>No feedback given</div>;
  }
};

const Statistic = ({ text, value }) => {
  const value_with_suffix =
    text === "positive" ? value.toString().concat("%") : value;

  return (
    <tr>
      <td>{text}</td>
      <td>{value_with_suffix}</td>
    </tr>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
