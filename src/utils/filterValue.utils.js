export const filterLists = (value, lists) => {
  if (!value) {
    return [...lists];
  }

  const filteredLists = [...lists].filter(
    (entry) =>
      entry[1].title.includes(value) ||
      [...entry[1].itemsList.entries()].some((item) => item[1].itemName.includes(value)),
  );

  return filteredLists;
};

export const filterItems = (value, items) => {
  if (!value) {
    return [...items];
  }

  return [...items].filter((entry) => entry[1].itemName.includes(value));
};
