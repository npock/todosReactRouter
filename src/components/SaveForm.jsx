export const SaveForm = ({
  title,
  onChange,
  handleEdit,
  updateToDo,
  id,
  todo,
}) => {
  const onSave = () => {
    updateToDo(id, todo).finally(() => handleEdit());
  };

  return (
    <div>
      <input value={title} name="title" onChange={onChange} />
      <button onClick={onSave}> save</button>
      <button onClick={handleEdit}> cancel</button>
    </div>
  );
};
