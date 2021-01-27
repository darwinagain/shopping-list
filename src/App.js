import React, { useState } from "react";
import {
  Checkbox,
  IconButton,
  ListItem,
  Typography,
  Button,
  TextField,
} from "@material-ui/core";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import AddBoxIcon from "@material-ui/icons/AddBox";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import "./App.css";

function App() {
  const initialItems = [
    { index: 0, name: "bananas", quantity: 4, completed: false },
    { index: 1, name: "oranges", quantity: 2, completed: true },
    { index: 2, name: "paper towels", quantity: 1, completed: false },
  ];

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
              style={{
                textDecoration: completed ? "line-through" : null,
              }}
            >
              {name}
            </Typography>
          </ListItem>
        </div>
        <div className="quantity">
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

  const TodoApp = () => {
    const [items, setItems] = useState(initialItems);
    const [totalItemCount, setTotalItemCount] = useState(7);

    const addItem = (name) => {
      const newItem = {
        index: items.length,
        name,
        quantity: 1,
        completed: false,
      };

      const newItems = [...items, newItem];

      setItems(newItems);
      setTotalItemCount(totalItemCount + 1);
    };

    const removeItem = (index) => {
      const newItems = items.filter((item) => item.index !== index);

      setItems(newItems);
      calculateTotal(newItems);
    };

    const toggleComplete = (index) => {
      const newItems = [...items];

      newItems[index].completed = !newItems[index].completed;

      setItems(newItems);
    };

    const increaseQuantity = (index) => {
      const newItems = [...items];

      newItems[index].quantity++;

      setItems(newItems);
      calculateTotal(newItems);
    };

    const decreaseQuantity = (index) => {
      const newItems = [...items];

      if (newItems[index].quantity > 1) {
        newItems[index].quantity--;
      }

      setItems(newItems);
      calculateTotal(newItems);
    };

    const calculateTotal = (items) => {
      const totalItemCount = items.reduce((total, item) => {
        return total + item.quantity;
      }, 0);

      setTotalItemCount(totalItemCount);
    };

    return (
      <p>
        <TodoForm addItem={addItem} />
        <div className="item-list">
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
        </div>
        <div className="total">Total: {totalItemCount}</div>
      </p>
    );
  };

  return (
    <div className="app-background">
      <div className="main-container">
        <header className="app-header">
          <h1>Shopping List</h1>
        </header>
        <TodoApp />
      </div>
    </div>
  );
}

export default App;
