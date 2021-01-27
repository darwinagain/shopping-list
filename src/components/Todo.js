import React from "react";
import "../styles/Todo.css";
import { Checkbox, IconButton, ListItem, Typography } from "@material-ui/core";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";

const Todo = ({
  index,
  name,
  quantity,
  completed,
  removeItem,
  toggleComplete,
  increaseQuantity,
  decreaseQuantity,
}) => {
  const handleRemoveButtonClick = () => {
    removeItem(index);
  };
  const handleCompleteButtonClick = () => {
    toggleComplete(index);
  };

  const handleQuantityIncreaseButtonClick = () => {
    increaseQuantity(index);
  };
  const handleQuantityDecreaseButtonClick = () => {
    decreaseQuantity(index);
  };

  return (
    <div className="item-container">
      <div className="item-name">
        <ListItem>
          <Checkbox
            style={{ color: "black" }}
            checked={completed}
            onClick={handleCompleteButtonClick}
          />
          <Typography
            variant="body1"
            className={completed ? "completed" : null}
          >
            {name}
          </Typography>
        </ListItem>
      </div>
      <div className="quantity-box">
        <IconButton onClick={() => handleQuantityDecreaseButtonClick(index)}>
          <ChevronLeftIcon style={{ fill: "black" }} />
        </IconButton>
        <span> {quantity} </span>
        <IconButton onClick={() => handleQuantityIncreaseButtonClick(index)}>
          <ChevronRightIcon style={{ fill: "black" }} />
        </IconButton>
      </div>
      <IconButton onClick={handleRemoveButtonClick}>
        <DeleteForeverIcon style={{ fill: "black" }} />
      </IconButton>
    </div>
  );
};

export default Todo;
