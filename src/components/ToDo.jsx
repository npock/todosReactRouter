import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { SaveForm, ToDoUpdateDeleteForm } from "../components";

export const Todo = () => {
  const { id } = useParams();
  const [isEdit, setIsEdit] = useState(false);
  const [todo, setTodo] = useState("");
  const [error, setError] = useState(false);

  const fetchToDo = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/TodoList/${id}`);
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error("такого ToDo с таким id не найден");
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
    } catch (error) {
      setError(error);
    }
  };

  const handleEdit = () => {
    setIsEdit((prevState) => !prevState);
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    setTodo({ [name]: value });
  };

  useEffect(() => {
    fetchToDo(id);
  }, [id]);

  if (error) {
    return (
      <>
        <p>Ошибка: {error}</p>
      </>
    );
  }
  return (
    <>
      <div>
        {isEdit ? (
          <SaveForm
            title={todo.title}
            onChange={onChange}
            handleEdit={handleEdit}
            updateToDo={updateToDo}
            id={id}
            todo={todo}
          />
        ) : (
          <ToDoUpdateDeleteForm
            id={id}
            title={todo.title}
            handleEdit={handleEdit}
            deleteToDo={deleteToDo}
          />
        )}
      </div>
    </>
  );
};
