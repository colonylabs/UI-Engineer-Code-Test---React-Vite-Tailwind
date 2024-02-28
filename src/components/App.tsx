import React, { useState } from 'react';

// Define an interface for a single todo item
interface TodoItem {
  id: number;
  task: string;
  finished: boolean;
}

// Define an interface for the todos collections
interface Todos {
  work: TodoItem[];
  home: TodoItem[];
  other: TodoItem[];
}

// Define an interface for the TodoLists component props
interface TodoListsProps {
  todos: Todos;
}

const TodoLists: React.FC<TodoListsProps> = ({ todos }) => {
  return (
    <div className="todo-lists flex gap-10 w-[920px] mx-auto mt-14">
      <TodoList title="Work" todos={todos.work} />
      <TodoList title="Home" todos={todos.home} />
      <TodoList title="Other" todos={todos.other} />
    </div>
  );
};

// Define an interface for the TodoList component props
interface TodoListProps {
  title: string;
  todos: TodoItem[];
}

const TodoList: React.FC<TodoListProps> = ({ title, todos }) => {
  const [todoItems, setTodoItems] = useState<TodoItem[]>(todos);

  const toggleTodo = (id: number) => {
    const newTodos = todoItems.map(todo => {
      if (todo.id === id) {
        return { ...todo, finished: !todo.finished };
      }
      return todo;
    });
    setTodoItems(newTodos);
  };

  return (
    <article className="todo-list bg-white flex-grow rounded-2xl shadow-lg flex-1">
      <header className="todo-list-header p-4 pl-6">
        <h2 className="todo-list-title">{title}</h2>
        
      </header>

      <ul className="todo-list-container border-t border-slate-200 py-4">
        {todoItems.map(todo => (
          <li className={`px-5 py-3 todo-list-item ${todo.finished ? "todo-list-item--finished" : ""}`} key={todo.id} style={{ textDecoration: todo.finished ? 'line-through' : 'none' }}>
            <label>
              <input className='mr-3' type="checkbox" checked={todo.finished} onChange={() => toggleTodo(todo.id)} />
              {todo.task}
            </label>
          </li>
        ))}
      </ul>
    </article>
  );
};

const App: React.FC = () => {
  const todos: Todos = {
    work: [
      { id: 1, task: "Meeting at 10am", finished: true },
      { id: 2, task: "Review project plan", finished: false },
      { id: 3, task: "Update website", finished: false },
      { id: 4, task: "Call with client", finished: true }
    ],
    home: [
      { id: 1, task: "Grocery shopping", finished: true },
      { id: 2, task: "Clean kitchen", finished: false },
      { id: 3, task: "Water plants", finished: true },
      { id: 4, task: "Read book", finished: false }
    ],
    other: [
      { id: 1, task: "Gym at 6pm", finished: true },
      { id: 2, task: "Call mom", finished: false },
      { id: 3, task: "Book dentist appointment", finished: true },
      { id: 4, task: "Plan weekend trip", finished: false }
    ]
  };

  return (
    <div className="app bg-slate-50 h-screen w-screen pt-20 flex flex-col justify-items-center bg-gradient-to-b from-slate-200 to-slate-300">
      <h1 className='align-center text-center text-4xl font-black text-slate-800'>My Todo List</h1>
      <TodoLists todos={todos} />
    </div>
  );
};

export default App;
