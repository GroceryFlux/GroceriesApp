export const filterLists = (value, lists) => {
  if (!value) {
    return [...lists];
  }

  const valueLowerCase = value.toLowerCase()

  const filteredLists = [...lists].filter(
    (entry) =>
      entry[1].title.toLowerCase().includes(valueLowerCase) ||
      [...entry[1].itemsList.entries()].some((item) => item[1].itemName.toLowerCase().includes(valueLowerCase)),
  );

  return filteredLists;
};

export const filterItems = (value, items) => {
  if (!value) {
    return [...items];
  }

  return [...items].filter((entry) => entry[1].itemName.includes(value));
};
