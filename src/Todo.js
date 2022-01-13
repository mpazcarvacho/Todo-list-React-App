import React from "react";

export default function Todo({ todo, toggleTodo }) {
  function handleTodoClick() {
    toggleTodo(todo.id);
  }

  return (
    <div class="form-check">
      <input
        class="form-check-input"
        type="checkbox"
        checked={todo.complete}
        onChange={handleTodoClick}
      ></input>
      <label class="form-check-label">{todo.name}</label>
    </div>
  );
}
