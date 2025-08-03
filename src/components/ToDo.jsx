import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

export const Todo = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isDeleting, setIsDeleting] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [data, setData] = useState({
    title: "",
  });
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
      //   setToDos((prevToDos) =>
      //     prevToDos.map((todo) => (todo.id === newTodo.id ? newTodo : todo))
      //   );
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

  const onDelete = async () => {
    setIsDeleting(true);
    await deleteToDo(id);
    setIsDeleting(false);
    navigate("/");
  };

  const handleEdit = () => {
    setIsEdit((prevState) => !prevState);
  };

  const onSave = () => {
    updateToDo(id, data).finally(() => handleEdit());
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
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
          <div>
            <input value={data.title} name="title" onChange={onChange} />
            <button onClick={onSave}> save</button>
            <button onClick={handleEdit}> cancel</button>
          </div>
        ) : (
          <div
            style={{
              marginBottom: "15px",
              marginLeft: "50px",
              display: "flex",
            }}
          >
            {isDeleting ? (
              <span>...deleting</span>
            ) : (
              <>
                <button onClick={() => navigate("/")}>← Назад</button>
                <li>{todo.title}</li>
              </>
            )}

            <button onClick={handleEdit}>update</button>

            <button
              style={{
                marginLeft: "10px",
              }}
              onClick={onDelete}
              disabled={isDeleting}
            >
              delete
            </button>
          </div>
        )}
      </div>
    </>
  );
};
