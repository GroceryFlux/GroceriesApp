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
  state.forEach((item, itemID) => {
    item.isOnShoppingList ? saveState.push([itemID, item]) : null;
    
  });

  localStorage.setItem('shoppingList', JSON.stringify(saveState));
};

export const getLocalShoppingList = () => {
  const retrievedShoppingList = JSON.parse(localStorage.getItem('shoppingList'));
  const localState = new Map();

  if (!retrievedShoppingList) {
    return localState;
  }

  retrievedShoppingList.forEach(([itemID, item]) => {
    localState.set(itemID, item);
  });

  return localState;
};

export const setTheme = (theme) => {
  document.getElementsByTagName('html')[0].setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
};

export const getTheme = () => {
  const theme = localStorage.getItem('theme');

  if (theme) {
    return theme;
  }

  return 'light';
};

export const getInitialTheme = () => {
  const theme = getTheme();

  setTheme(theme);

  return theme;
};
