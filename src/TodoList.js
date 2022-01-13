import React from "react";
import Todo from "./Todo";

export default function TodoList({ todos, toggleTodo }) {
  return todos.map((todo) => {
    // The key has to be unique. This key will allow react to only re-render values that have changed.
    return <Todo key={todo.id} toggleTodo={toggleTodo} todo={todo} />;
  });
}
