import "./App.css";

import { Routes, Route, Link, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { MainPage } from "./Main-Page";
import { Todo, NotFound } from "./components";
import { searchToDos, sortedToDos } from "./utils";

export const App = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [toDos, setToDos] = useState([]);
  const [todo, setTodo] = useState("");

  const [inputs, setInputs] = useState({
    newToDo: "",
    searchToDo: "",
  });
  const [search, setSearh] = useState(false);
  const [isSearch, setIsSearch] = useState(false);
  const [sort, setSort] = useState(false);
  const [cancel, setCancel] = useState(false);

  const fetchToDos = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("http://localhost:3000/TodoList");
      if (!response.ok) {
        throw new Error("Ошибка в запросе на сервер");
      }
      const data = await response.json();
      if (isSearch) {
        setIsSearch(false);

        setToDos(searchToDos(data, inputs));
      } else {
        if (sort) {
          setToDos(sortedToDos(data));
        } else {
          setToDos(data);
        }
      }

      setIsLoading(false);
    } catch (error) {
      setError(error);
      setIsLoading(false);
    }
  };
  const fetchToDo = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/TodoList/${id}`);
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error("ToDo не найден");
        }
        throw new Error("Ошибка в запросе на сервер");
      }
      const dataTodo = await response.json();

      setTodo(dataTodo);
    } catch (error) {
      setError(error.message);
      setTodo(null);
    }
  };

  const updateToDo = async (id, payload) => {
    try {
      const response = await fetch(`http://localhost:3000/TodoList/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json;charset=utf-8" },
        body: JSON.stringify({
          ...payload,
        }),
      });
      if (!response.ok) {
        throw new Error("Ошибка в запросе на сервер");
      }
      const newTodo = await response.json();
      setToDos((prevToDos) =>
        prevToDos.map((todo) => (todo.id === newTodo.id ? newTodo : todo))
      );
      setTodo(newTodo);
    } catch (error) {
      setError(error);
    }
  };

  const deleteToDo = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/TodoList/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json;charset=utf-8" },
      });
      if (!response.ok) {
        throw new Error("Ошибка в запросе на сервер");
      }
      setTodo("");
      setToDos((prevToDos) => prevToDos.filter((toDos) => toDos.id !== id));
    } catch (error) {
      setError(error);
    }
  };

  const createToDo = async () => {
    try {
      const response = await fetch("http://localhost:3000/TodoList", {
        method: "POST",
        headers: { "Content-Type": "application/json;charset=utf-8" },
        body: JSON.stringify({
          title: inputs.newToDo,
        }),
      });
      if (!response.ok) {
        throw new Error("Ошибка в запросе на сервер");
      }
      const newTodo = await response.json();
      setToDos((prevToDos) => [...prevToDos, newTodo]);
    } catch (error) {
      setError(error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: value });
  };
  const handleSearch = () => {
    setIsSearch(true);
    setCancel(true);
    setSearh((prevState) => !prevState);
  };

  const handleCancel = () => {
    setIsSearch(false);
    setSearh((prevState) => !prevState);
    setInputs({ ...inputs, searchToDo: "" });
    setCancel(false);
  };
  const handleSort = () => {
    setSort((prevState) => !prevState);
  };

  useEffect(() => {
    fetchToDos();
  }, [sort, search]);

  if (error) {
    return <p>Ошибка: {error}</p>;
  }

  return (
    <div>
      <div>
        <h1>ToDos List</h1>
        <li>
          <Link to="/">Главная</Link>
        </li>
      </div>
      <Routes>
        <Route
          path="/"
          element={
            <MainPage
              toDos={toDos}
              createToDo={createToDo}
              inputs={inputs}
              handleChange={handleChange}
              cancel={cancel}
              handleSearch={handleSearch}
              handleCancel={handleCancel}
              handleSort={handleSort}
              isLoading={isLoading}
              error={error}
            />
          }
        >
          <Route
            path="todo/:id"
            element={
              <Todo
                updateToDo={updateToDo}
                todo={todo}
                fetchToDo={fetchToDo}
                deleteToDo={deleteToDo}
                error={error}
              />
            }
          />
        </Route>

        <Route path="/404" element={<NotFound />} />
        <Route path="*" element={<Navigate to="/404" replace />} />
      </Routes>
    </div>
  );
};
