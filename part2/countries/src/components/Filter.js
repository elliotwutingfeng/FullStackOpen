import React from "react";

const Filter = (props) => {
  const handleFilterChange = (event) => {
    props.setNewFilter(event.target.value);
    props.setShowAll(false);
  };

  return (
    <div>
      filter shown with{" "}
      <input value={props.newFilter} onChange={handleFilterChange} />
    </div>
  );
};

export default Filter;
