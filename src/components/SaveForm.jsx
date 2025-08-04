import { useNavigate } from "react-router-dom";

export const SaveForm = ({
  title,
  onChange,
  handleEdit,
  updateToDo,
  id,
  todo,
}) => {
  const navigate = useNavigate();

  const onSave = () => {
    updateToDo(id, todo).finally(() => handleEdit());
    navigate(0);
  };

  return (
    <div>
      <input value={title} name="title" onChange={onChange} />
      <button onClick={onSave}> save</button>
      <button onClick={handleEdit}> cancel</button>
    </div>
  );
};
