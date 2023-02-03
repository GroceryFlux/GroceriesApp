export const setLocalStorage = (state) => {
  const savedState = [...state.entries()].map(([listID, list]) => {
    const itemsList = [...list.itemsList.entries()];

    return [listID, { ...list, itemsList: itemsList }];
  });

  localStorage.setItem('existingLists', JSON.stringify(savedState));
};

export const getLocalState = () => {
  const retrievedLists = JSON.parse(localStorage.getItem('existingLists'));
  const localState = new Map();

  if (!retrievedLists) {
    return localState;
  }

  retrievedLists.forEach(([listID, list]) => {
    const itemsList = new Map();

    list.itemsList.forEach(([itemID, item]) => {
      itemsList.set(itemID, item);
    });

    list.itemsList = itemsList;

    localState.set(listID, list);
  });

  return localState;
};
