import { FormCreateToDo, FormSearchSortToDo } from "./components";

import { Link, Outlet } from "react-router-dom";

export const MainPage = ({
  toDos,
  createToDo,
  inputs,
  handleChange,
  cancel,
  handleSearch,
  handleCancel,
  handleSort,
  isLoading,
  error,
}) => {
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
