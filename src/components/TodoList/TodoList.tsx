import { TodoInfo } from '../TodoInfo/TodoInfo';

type User = {
  id: number;
  name: string;
  username: string;
  email: string;
};

type Todo = {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
  user?: User; // Додаємо опціональне поле user
};

interface AppProps {
  todos: Todo[];
  users?: User[]; // Робимо опціональним
}

export const TodoList = ({ todos, users = [] }: AppProps) => {
  return (
    <section className="TodoList">
      {todos.map(todo => {
        // Використовуємо user з todo, якщо він є, інакше шукаємо в users
        const user = todo.user || users.find(userr => userr.id === todo.userId);

        const todoWithUser = {
          ...todo,
          user,
        };

        return <TodoInfo key={todo.id} todo={todoWithUser} />;
      })}
    </section>
  );
};
