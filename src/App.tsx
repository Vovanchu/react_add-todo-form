import './App.scss';
import React, { useState } from 'react';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';

// Типізація для Todo
interface Todo {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
}

export const App = () => {
  const [todos, setTodos] = useState<Todo[]>(todosFromServer);

  const [titleError, setTitleError] = useState('');
  const [userError, setUserError] = useState('');
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState('0');

  // Обробники зміни значень
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    // Одразу скидаємо помилку, якщо поле більше не порожнє
    if (e.target.value.trim()) {
      setTitleError('');
    }
  };

  const handleUserChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(e.target.value);
    if (e.target.value !== '0') {
      setUserError('');
    }
  };

  // Валідація при відправленні форми
  const validateForm = () => {
    let isValid = true;

    if (!title.trim()) {
      setTitleError('Please enter a title');
      isValid = false;
    }

    if (!title.trim()) {
      setTitleError('Please enter a title');
      isValid = false;
    }

    // Змінено з '0' на '' для коректної перевірки
    if (userId === '0') {
      setUserError('Please choose a user');
      isValid = false;
    }

    return isValid;
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (validateForm()) {
      const newTodoId =
        todos.length > 0 ? Math.max(...todos.map(todo => todo.id)) + 1 : 1;

      // Створюємо новий todo
      const newTodo = {
        id: newTodoId,
        title,
        completed: false,
        userId: Number(userId),
      };

      // Оновлюємо стан, додаючи новий todo
      setTodos(prevTodos => [...prevTodos, newTodo]);

      // Скидаємо поля форми
      setTitle('');
      setUserId('0');
    }
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/todos"
        method="POST"
        data-cy="addTodoForm"
        onSubmit={handleFormSubmit}
      >
        <div className="field">
          <label htmlFor="titleInput">Title: </label>
          <input
            type="text"
            data-cy="titleInput"
            value={title}
            onChange={handleTitleChange}
            placeholder="Enter a title"
          />
          {titleError && <span className="error">{titleError}</span>}
        </div>

        <div className="field">
          <label htmlFor="userSelect">User: </label>

          <select
            data-cy="userSelect"
            value={userId}
            onChange={handleUserChange}
          >
            <option value="0" disabled selected>
              Choose a user
            </option>

            {usersFromServer.map(user => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>

          {userError && <span className="error">{userError}</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todos} users={usersFromServer} />
    </div>
  );
};
