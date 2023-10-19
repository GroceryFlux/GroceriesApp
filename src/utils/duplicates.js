export function findItemDuplicates(map) {
  const mapEntries = [...map.entries()];
  const foundDuplicates = new Map();
  mapEntries.forEach((entry) => {
    let ids = [];
    const id = entry[0];
    const itemName = entry[1].itemName;
    if (foundDuplicates.has(itemName)) {
      let newIds = foundDuplicates.get(itemName);
      newIds.push(id);
      ids = newIds;
    } else ids.push(id);
    foundDuplicates.set(itemName, ids);
  });
  return foundDuplicates;
}

//findItemDuplicates will be used later in shoppingList

export function hasItemDuplicates(map, searchValue) {
  const mapEntries = [...map.entries()];
  let foundId = false;
  mapEntries.forEach((entry) => {
    const id = entry[0];
    const value = entry[1];
    if (value.itemName.toLowerCase() === searchValue.toLowerCase()) {
      foundId = id;
      return;
    }
  });
  return { id: foundId };
}
