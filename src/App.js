import React, { useState } from "react";
import "./styles/App.css";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";

function App() {
  const initialItems = [
    { index: 0, name: "bananas", quantity: 4, completed: false },
    { index: 1, name: "oranges", quantity: 2, completed: true },
    { index: 2, name: "paper towels", quantity: 1, completed: false },
  ];

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
    <div className="app-background">
      <div className="main-container">
        <header className="app-header">
          <h1>Shopping List</h1>
        </header>
        <TodoForm addItem={addItem} />
        <TodoList
          items={items}
          removeItem={removeItem}
          toggleComplete={toggleComplete}
          increaseQuantity={increaseQuantity}
          decreaseQuantity={decreaseQuantity}
        />
        <div className="total">Total: {totalItemCount}</div>
      </div>
    </div>
  );
}

export default App;
