export const setLocalExistingLists = (state) => {
  const savedState = [...state.entries()].map(([listID, list]) => {
    const itemsList = [...list.itemsList.entries()];
      
    return [listID, { ...list, itemsList: itemsList }];

  });

  localStorage.setItem('existingLists', JSON.stringify(savedState));
};

export const getLocalExistingLists = () => {
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

export const setLocalShoppingList = (state) => {
  const saveState = [];
  [...state.entries()].forEach(([listID, list]) => {
    list ? saveState.push([listID, list]) : null
  })
  
  localStorage.setItem('shoppingList', JSON.stringify(saveState))
}

export const getLocalShoppingList = () => {
  const retrievedShoppingList = JSON.parse(localStorage.getItem('shoppingList'));
  const localState = new Map();

  if(!retrievedShoppingList) {
    return localState
  }

  retrievedShoppingList.forEach(([listID, list]) => localState.set(listID, list))

  return localState
}