import React, { useState, useRef, useEffect } from "react";
import TodoList from "./TodoList";
import { v4 as uuidv4 } from "uuid";

function App() {
  // useSTate is an array in which we can save data and it will be rerender everytime it changes. since it's an array it can be destructured
  // todos: every single todo, setTodos: the function we will use to update our todos
  const [todos, setTodos] = useState([]);
  const todoNameRef = useRef();

  const LOCAL_STORAGE_KEY = "todoApp.todos";

  // Calls this function only once as we pass an empty array. Retrieves stored todos.
  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if (storedTodos) setTodos(storedTodos);
  }, []);

  // Any time the todos array changes, we we sill save todos into local storage
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  // To use this function we need to pass it to the todolist
  function toggleTodo(id) {
    // Copy of our current todos. In React you should never directly modify a state variable, always make a copy.
    const newTodos = [...todos];
    const todo = newTodos.find((todo) => todo.id === id);
    todo.complete = !todo.complete;
    setTodos(newTodos);
  }

  function handleAddTodo(e) {
    const name = todoNameRef.current.value;
    if (name === "") return;
    setTodos((prevTodos) => {
      return [...prevTodos, { id: uuidv4(), name: name, complete: false }];
    });
    todoNameRef.current.value = null;
  }

  function handleClearTodos(e) {
    const newTodos = todos.filter((todo) => !todo.complete);
    setTodos(newTodos);
  }

  function setRandomText() {
    const welcomeTexts = [
      "You can do it!",
      "Go get them!",
      "Play Eye of the Tiger and do this",
      "One checkbox at a time..",
      "You got this",
      "You rock",
      "Work hard, play hard",
      "You have what it takes, go!",
      "Looking good!",
    ];

    return welcomeTexts[Math.floor(Math.random() * welcomeTexts.length)];
  }

  return (
    // This is a fragment; the return can only return one thing; so it returns a fragment which inside has the things we want
    <>
      {/* This is called props, esentially all of our components, like app.js or todolist.js are going to have props that we can pass to them and we pass them just like a pass attributes to an html element. so we are saying that we have a prop todos on our todolist and we want to pass the todos variable to that prop todos*/}
      <div class="container position-absolute top-50 start-50 translate-middle">
        <h1 class="py-5">{setRandomText()}</h1>
        <TodoList todos={todos} toggleTodo={toggleTodo} />
        <input class="form-control my-3" ref={todoNameRef} type="text" />
        <button class="btn btn-primary" onClick={handleAddTodo}>
          {" "}
          Add Todo
        </button>
        <button class="btn btn-primary mx-3 my-4" onClick={handleClearTodos}>
          {" "}
          Clear Complete
        </button>
        <div>{todos.filter((todo) => !todo.complete).length} left to do</div>
      </div>
    </>
  );
}

export default App;
