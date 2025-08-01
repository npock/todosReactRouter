export const generateRandomId = (length) => {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

export const debounce = (func, delay) => {
  let timeout;
  return function () {
    const context = this;
    const args = arguments;
    const later = function () {
      timeout = null;
      func.apply(context, args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, delay);
  };
};

export const sortedToDos = (data) => {
  return data.slice().sort((a, b) => {
    const aValue = a.title;
    const bValue = b.title;
    return aValue.localeCompare(bValue);
  });
};

export const searchToDos = (data, inputs) => {
  return data.filter(({ title, id }) => {
    let regex = new RegExp(
      `\\b(${inputs.searchToDo}|${inputs.searchToDo}\\w*)\\b`,
      "i"
    );
    let resultRegex = regex.test(title);
    if (resultRegex) {
      return { title, id };
    }
  });
};
