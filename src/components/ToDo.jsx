import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

export const Todo = ({ updateToDo, deleteToDo, fetchToDo, todo, error }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isDeleting, setIsDeleting] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [data, setData] = useState({
    title: "",
  });

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
        <p>Ошибка: {error}</p>;
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
