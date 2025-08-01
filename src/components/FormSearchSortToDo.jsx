export const FormSearchSortToDo = ({
  handleSearch,
  handleCancel,
  handleSort,
  cancel,
  ...props
}) => {
  return (
    <>
      <input name={name} {...props} />
      <button onClick={handleSearch}>search</button>
      {cancel ? (
        <button onClick={handleCancel}>cancel</button>
      ) : (
        <button style={{ marginLeft: "20px" }} onClick={handleSort}>
          sort
        </button>
      )}
    </>
  );
};
