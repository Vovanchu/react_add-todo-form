import { TodoInfo } from '../TodoInfo/TodoInfo';

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
}

interface Todo {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
  user: User; // user обов'язковий
}

interface AppProps {
  todos: Todo[]; // тільки todos, без users
}

export const TodoList = ({ todos }: AppProps) => {
  return (
    <section className="TodoList">
      {todos.map(todo => (
        <TodoInfo key={todo.id} todo={todo} />
      ))}
    </section>
  );
};
