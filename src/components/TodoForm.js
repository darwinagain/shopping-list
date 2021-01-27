import React, { useState } from "react";
import "../styles/TodoForm.css";
import { Button, TextField } from "@material-ui/core";
import AddBoxIcon from "@material-ui/icons/AddBox";

const TodoForm = ({ addItem }) => {
  const [inputValue, setInputValue] = useState("");

  const addItemButtonClick = (event) => {
    event.preventDefault();

    if (inputValue !== "") {
      addItem(inputValue);
      setInputValue("");
    }
  };

  return (
    <form>
      <div className="add-item-box">
        <TextField
          type="text"
          value={inputValue}
          onChange={(event) => setInputValue(event.target.value)}
          className="add-item-input"
          placeholder="Add an item..."
        />
        <Button type="submit" onClick={addItemButtonClick}>
          <AddBoxIcon style={{ fill: "black" }} />
        </Button>
      </div>
    </form>
  );
};

export default TodoForm;
