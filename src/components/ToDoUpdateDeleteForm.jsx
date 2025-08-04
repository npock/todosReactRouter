import { useState } from "react";
import { useNavigate } from "react-router-dom";
export const ToDoUpdateDeleteForm = ({ id, title, handleEdit, deleteToDo }) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const navigate = useNavigate();

  const onDelete = async () => {
    setIsDeleting(true);
    await deleteToDo(id);
    setIsDeleting(false);
    navigate("/");
  };

  const mainBack = () => {
    navigate("/");
  };

  return (
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
          <button onClick={mainBack}>← Назад</button>
          <li>{title}</li>
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
  );
};
