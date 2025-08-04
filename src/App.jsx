import "./App.css";

import { Routes, Route, Link, Navigate } from "react-router-dom";

import { MainPage } from "./Main-Page";
import { Todo, NotFound } from "./components";

export const App = () => {
  return (
    <div>
      <div>
        <h1>ToDos List</h1>
        <li>
          <Link to="/">Главная</Link>
        </li>
      </div>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="todo/:id" element={<Todo />} />
        <Route path="/404" element={<NotFound />} />
        <Route path="*" element={<Navigate to="/404" replace />} />
      </Routes>
    </div>
  );
};
