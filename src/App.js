import React, { useState, useEffect } from "react";
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

const LOCAL_STORAGE_KEY = "123456";

function App() {
  const [items, setItems] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [totalItemCount, setTotalItemCount] = useState(0);

  useEffect(() => {
    // fires when app component mounts to the DOM
    const storageItems = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if (storageItems) {
      setItems(storageItems);
      // setTotalItemCount(storageItems);
    }
  }, []);

  useEffect(() => {
    // fires when todos array gets updated
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const addItem = () => {
    const newItem = {
      id: items.length + 1,
      name: inputValue,
      quantity: 1,
      completed: false,
    };

    const newItems = [...items, newItem];

    setItems(newItems);
    setInputValue("");
    setTotalItemCount(totalItemCount + 1);
  };

  const removeItem = (item) => {
    const id = item.id;

    const newItems = items.filter((item) => item.id !== id);

    setItems(newItems);
    setTotalItemCount(totalItemCount - item.quantity);
  };

  const toggleComplete = (index) => {
    const newItems = [...items];

    newItems[index].completed = !newItems[index].completed;

    setItems(newItems);
  };

  const handleQuantityIncrease = (index) => {
    const newItems = [...items];

    newItems[index].quantity++;

    setItems(newItems);
    calculateTotal();
  };

  const handleQuantityDecrease = (index) => {
    const newItems = [...items];

    if (newItems[index].quantity > 1) {
      newItems[index].quantity--;
    }

    setItems(newItems);
    calculateTotal();
  };

  const calculateTotal = () => {
    const totalItemCount = items.reduce((total, item) => {
      return total + item.quantity;
    }, 0);

    setTotalItemCount(totalItemCount);
  };

  return (
    <div className="app-background">
      <form className="main-container">
        <header className="app-header">
          <h1>Shopping List</h1>
        </header>
        <div className="add-item-box">
          <TextField
            type="text"
            value={inputValue}
            onChange={(event) => setInputValue(event.target.value)}
            className="add-item-input"
            placeholder="Add an item..."
          />
          <Button type="submit" onClick={() => addItem()}>
            <AddBoxIcon style={{ fill: "black" }} />
          </Button>
        </div>
        <div className="item-list">
          {items.map((item, index) => (
            <div className="item-container">
              <div className="item-name">
                <ListItem>
                  <Checkbox
                    style={{ color: "black" }}
                    checked={item.completed}
                    onClick={() => toggleComplete(index)}
                  />
                  <Typography
                    variant="body1"
                    style={{
                      textDecoration: item.completed ? "line-through" : null,
                    }}
                  >
                    {item.name}
                  </Typography>
                </ListItem>
              </div>
              <div className="quantity">
                <IconButton onClick={() => handleQuantityDecrease(index)}>
                  <ChevronLeftIcon style={{ fill: "black" }} />
                </IconButton>
                <span> {item.quantity} </span>
                <IconButton onClick={() => handleQuantityIncrease(index)}>
                  <ChevronRightIcon style={{ fill: "black" }} />
                </IconButton>
              </div>
              <IconButton onClick={() => removeItem(item)}>
                <DeleteForeverIcon style={{ fill: "black" }} />
              </IconButton>
            </div>
          ))}
        </div>
        <div className="total">Total: {totalItemCount}</div>
      </form>
    </div>
  );
}

export default App;
