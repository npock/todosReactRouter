import { FormCreateToDo, FormSearchSortToDo } from "./components";
import { Link, Outlet } from "react-router-dom";
import { searchToDos, sortedToDos } from "./utils";
import { useState, useEffect } from "react";

export const MainPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [toDos, setToDos] = useState([]);
  const [search, setSearh] = useState(false);
  const [isSearch, setIsSearch] = useState(false);
  const [sort, setSort] = useState(false);
  const [cancel, setCancel] = useState(false);
  const [inputs, setInputs] = useState({
    newToDo: "",
    searchToDo: "",
  });

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

  const lengthTodo = (title) => {
    if (title.length > 15) {
      return title.slice(0, 15) + "...";
    } else {
      return title;
    }
  };

  if (isLoading) {
    return (
      <>
        <h1>...loading</h1>
      </>
    );
  }
  if (error) {
    return (
      <>
        <h1>{error}</h1>
      </>
    );
  }

  return (
    <div>
      <ul>
        <FormCreateToDo
          createToDo={createToDo}
          inputs={inputs}
          handleChange={handleChange}
        />
        <FormSearchSortToDo
          name="searchToDo"
          placeholder="search"
          value={inputs.searchToDo}
          cancel={cancel}
          onChange={handleChange}
          handleSearch={handleSearch}
          handleCancel={handleCancel}
          handleSort={handleSort}
        />

        {toDos.map((todo) => (
          <li key={todo.id}>
            <Link to={`todo/${todo.id}`}>{lengthTodo(todo.title)}</Link>
          </li>
        ))}
      </ul>
      <Outlet />
    </div>
  );
};
