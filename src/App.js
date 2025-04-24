import { useState } from "react";

export default function App() {
  const initialTodos = [
    { id: 1, text: "Learn React", completed: false },
    { id: 2, text: "Build a Todo App", completed: false },
    { id: 3, text: "Deploy to Netlify", completed: false },
  ];

  const [todos, setTodos] = useState(initialTodos);
  const [inputValue, setInputValue] = useState("");
  const [editingTodoId, setEditingTodoId] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!inputValue.trim()) return;

    if (editingTodoId !== null) {
      const updatedTodos = todos.map((todo) =>
        todo.id === editingTodoId ? { ...todo, text: inputValue } : todo
      );
      setTodos(updatedTodos);

      setEditingTodoId(null);
    } else {
      const newTodo = {
        id: Date.now(),
        text: inputValue,
        completed: false,
      };

      setTodos([...todos, newTodo]);
    }

    setInputValue("");
  };

  const handleEdit = (todo) => {
    setInputValue(todo.text);
    setEditingTodoId(todo.id);
  };

  const handleDelete = (todoId) => {
    setTodos(todos.filter((todo) => todo.id !== todoId));
  };

  const toggleComplete = (todoId) => {
    setTodos(
      todos.map((todo) =>
        todo.id === todoId ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  return (
    <div className="App">
      {todos.map((todo) => (
        <div key={todo.id}>
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => toggleComplete(todo.id)}
          />
          <label
            style={{ textDecoration: todo.completed ? "line-through" : "none" }}
          >
            {todo.text}
          </label>
          <button onClick={() => handleEdit(todo)}>Edit</button>
          <button onClick={() => handleDelete(todo.id)}>Delete</button>
        </div>
      ))}

      <form onSubmit={handleSubmit}>
        <input
          name="todo"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button type="submit">
          {editingTodoId !== null ? "Update" : "Add"}
        </button>
      </form>
    </div>
  );
}
