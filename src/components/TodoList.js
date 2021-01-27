import React from "react";
import Todo from "./Todo";
import { List } from "@material-ui/core";

const TodoList = ({
  items,
  removeItem,
  toggleComplete,
  increaseQuantity,
  decreaseQuantity,
}) => {
  return (
    <List>
      {items.map((item, index) => (
        <Todo
          name={item.name}
          quantity={item.quantity}
          completed={item.completed}
          index={item.index}
          removeItem={removeItem}
          toggleComplete={toggleComplete}
          increaseQuantity={increaseQuantity}
          decreaseQuantity={decreaseQuantity}
        />
      ))}
    </List>
  );
};

export default TodoList;
