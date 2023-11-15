import { addItems, areItemsCompatible } from './quantitiesAndUnits';

function retrieveData(foundEntry) {
  const data = {
    itemID: foundEntry[0],
    itemName: foundEntry[1].itemName.toLowerCase(),
    associatedIDs: foundEntry[1].associatedIDs,
    quantity: foundEntry[1].quantity,
    unit: foundEntry[1].unit,
    isBought: foundEntry[1].isBought,
  };

  return data;
}

export function combineShoppingList(mapEntries) {
  const foundItemNames = new Map();

  const combinedShoppingList = new Map();

  mapEntries.forEach((foundEntry) => {
    const { itemID, itemName, associatedIDs, quantity, unit, isBought } = retrieveData(foundEntry);

    if (!foundItemNames.has(itemName)) {
      foundItemNames.set(itemName, itemID);

      combinedShoppingList.set(itemID, {
        associatedIDs: [{ itemID: itemID, listID: associatedIDs[0].listID }],
        itemName: itemName,
        quantity: quantity,
        unit: unit,
        isBought: isBought,
        isOnShoppingList: true,
      });

      return;
    }

    const firstID = foundItemNames.get(itemName);
    const itemDetails = combinedShoppingList.get(firstID);

    const requiresNewEntry =
      isBought !== itemDetails.isBought || !areItemsCompatible(itemDetails.quantity, itemDetails.unit, quantity, unit);

    if (requiresNewEntry) {
      combinedShoppingList.set(itemID, {
        associatedIDs: [{ itemID: itemID, listID: associatedIDs[0].listID }],
        itemName: itemName,
        quantity: quantity,
        unit: unit,
        isBought: isBought,
        isOnShoppingList: true,
      });

      return;
    }

    const updatedIDs = [...itemDetails.associatedIDs, { itemID: itemID, listID: associatedIDs[0].listID }];

    const sum = addItems(itemDetails.quantity, itemDetails.unit, quantity, unit);

    combinedShoppingList.set(firstID, {
      ...itemDetails,
      associatedIDs: updatedIDs,
      quantity: sum.quantity,
      unit: sum.unit,
    });
  });

  return combinedShoppingList;
}

export function findItemDuplicateId(map, searchValue) {
  const mapEntries = [...map.entries()];

  const foundEntry = mapEntries.find(([, value]) => value.itemName.toLowerCase() === searchValue.toLowerCase());

  if (foundEntry) {
    const id = foundEntry[0];
    return id;
  }

  return undefined;
}
