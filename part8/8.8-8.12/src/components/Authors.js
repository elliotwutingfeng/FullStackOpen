import React, { useState } from "react";

import { useMutation, useQuery } from "@apollo/client";
import Select from "react-select";

import { ALL_AUTHORS } from "../queries";
import { CHANGE_YEAR } from "../queries";
import { ALL_BOOKS } from "../queries";
const Authors = (props) => {
  const [changeYear] = useMutation(CHANGE_YEAR, {
    refetchQueries: [{ query: ALL_AUTHORS }, { query: ALL_BOOKS }],
  });
  const [year, setYear] = useState("");
  const [authorName, setAuthorName] = useState("");

  const authors = useQuery(ALL_AUTHORS);
  if (!props.show || authors.loading) {
    return null;
  }
  const options = authors.data.allAuthors.map((x) => {
    return { value: x.name, label: x.name };
  });

  const submit = async (event) => {
    event.preventDefault();
    changeYear({
      variables: { authorName, year: Number(year) },
      onError: (error) => {
        props.setError(error.graphQLErrors[0].message);
      },
    });
    setYear("");
    setAuthorName("");
  };

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.data.allAuthors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2>set birthyear</h2>
      <form onSubmit={submit}>
        <div>
          <Select
            defaultValue={authorName}
            onChange={(e) => setAuthorName(e.value)}
            options={options}
          />
        </div>
        <div>
          born
          <input
            value={year}
            onChange={({ target }) => setYear(target.value)}
          />
        </div>
        <button type="submit">update author</button>
      </form>
    </div>
  );
};

export default Authors;
