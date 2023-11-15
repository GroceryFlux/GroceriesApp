import { combineShoppingList, findItemDuplicateId } from './duplicates';

describe('duplicates.js', () => {
  describe('combineShoppingList()', () => {
    it('should return a map of 2 items that have different names', () => {
      const givenMapEntries = [
        [
          'PumpkinID1',
          {
            isBought: true,
            isOnShoppingList: true,
            itemName: 'Pumpkin',
            associatedIDs: [{ itemID: 'PumpkinID1', listID: 'ListID1' }],
            quantity: 1,
            unit: 'kg',
          },
        ],
        [
          'WaterID1',
          {
            isBought: true,
            isOnShoppingList: true,
            itemName: 'Water',
            associatedIDs: [{ itemID: 'WaterID1', listID: 'ListID2' }],
            quantity: 1,
            unit: 'l',
          },
        ],
      ];

      const expectedResult = new Map();
      expectedResult.set('PumpkinID1', {
        associatedIDs: [{ itemID: 'PumpkinID1', listID: 'ListID1' }],
        itemName: 'pumpkin',
        quantity: 1,
        unit: 'kg',
        isBought: true,
        isOnShoppingList: true,
      });
      expectedResult.set('WaterID1', {
        associatedIDs: [{ itemID: 'WaterID1', listID: 'ListID2' }],
        itemName: 'water',
        quantity: 1,
        unit: 'l',
        isBought: true,
        isOnShoppingList: true,
      });

      const actualResult = combineShoppingList(givenMapEntries);

      expect(actualResult).toEqual(expectedResult);
    });

    it('should return a map with 2 different entries for bought and unbought items with the same itemName', () => {
      const givenMapEntries = [
        [
          'PumpkinID1',
          {
            isBought: true,
            isOnShoppingList: true,
            itemName: 'Pumpkin',
            associatedIDs: [{ itemID: 'PumpkinID1', listID: 'ListID1' }],
            quantity: 1,
            unit: 'kg',
          },
        ],
        [
          'PumpkinID2',
          {
            isBought: false,
            isOnShoppingList: true,
            itemName: 'Pumpkin',
            associatedIDs: [{ itemID: 'PumpkinID2', listID: 'ListID2' }],
            quantity: 2,
            unit: 'kg',
          },
        ],
      ];

      const expectedResult = new Map();
      expectedResult.set('PumpkinID1', {
        associatedIDs: [{ itemID: 'PumpkinID1', listID: 'ListID1' }],
        itemName: 'pumpkin',
        quantity: 1,
        unit: 'kg',
        isBought: true,
        isOnShoppingList: true,
      });
      expectedResult.set('PumpkinID2', {
        associatedIDs: [{ itemID: 'PumpkinID2', listID: 'ListID2' }],
        itemName: 'pumpkin',
        quantity: 2,
        unit: 'kg',
        isBought: false,
        isOnShoppingList: true,
      });

      const actualResult = combineShoppingList(givenMapEntries);

      expect(actualResult).toEqual(expectedResult);
    });

    it('should return a map with 2 different entries for incompatible items with the same itemName', () => {
      const givenMapEntries = [
        [
          'PumpkinID1',
          {
            isBought: true,
            isOnShoppingList: true,
            itemName: 'Pumpkin',
            associatedIDs: [{ itemID: 'PumpkinID1', listID: 'ListID1' }],
            quantity: 1,
            unit: 'l',
          },
        ],
        [
          'PumpkinID2',
          {
            isBought: true,
            isOnShoppingList: true,
            itemName: 'Pumpkin',
            associatedIDs: [{ itemID: 'PumpkinID2', listID: 'ListID2' }],
            quantity: 2,
            unit: 'kg',
          },
        ],
      ];

      const expectedResult = new Map();
      expectedResult.set('PumpkinID1', {
        associatedIDs: [{ itemID: 'PumpkinID1', listID: 'ListID1' }],
        itemName: 'pumpkin',
        quantity: 1,
        unit: 'l',
        isBought: true,
        isOnShoppingList: true,
      });
      expectedResult.set('PumpkinID2', {
        associatedIDs: [{ itemID: 'PumpkinID2', listID: 'ListID2' }],
        itemName: 'pumpkin',
        quantity: 2,
        unit: 'kg',
        isBought: true,
        isOnShoppingList: true,
      });

      const actualResult = combineShoppingList(givenMapEntries);

      expect(actualResult).toEqual(expectedResult);
    });

    it('should return a map of shoppingList with duplicated items', () => {
      const givenMapEntries = [
        [
          'PumpkinID1',
          {
            isBought: true,
            isOnShoppingList: true,
            itemName: 'Pumpkin',
            associatedIDs: [{ itemID: 'PumpkinID1', listID: 'ListID1' }],
            quantity: 1,
            unit: 'kg',
          },
        ],
        [
          'PumpkinID2',
          {
            isBought: true,
            isOnShoppingList: true,
            itemName: 'Pumpkin',
            associatedIDs: [{ itemID: 'PumpkinID2', listID: 'ListID2' }],
            quantity: 2,
            unit: 'kg',
          },
        ],
        [
          'PumpkinID3',
          {
            isBought: true,
            isOnShoppingList: true,
            itemName: 'pUmpKin',
            associatedIDs: [{ itemID: 'PumpkinID3', listID: 'ListID3' }],
            quantity: 3,
            unit: 'kg',
          },
        ],
      ];

      const expectedResult = new Map();
      expectedResult.set('PumpkinID1', {
        associatedIDs: [
          { itemID: 'PumpkinID1', listID: 'ListID1' },
          { itemID: 'PumpkinID2', listID: 'ListID2' },
          { itemID: 'PumpkinID3', listID: 'ListID3' },
        ],
        itemName: 'pumpkin',
        quantity: 6,
        unit: 'kg',
        isBought: true,
        isOnShoppingList: true,
      });

      const actualResult = combineShoppingList(givenMapEntries);

      expect(actualResult).toEqual(expectedResult);
    });
  });

  describe('findItemDuplicateId()', () => {
    it('should return undefined as there are no duplicates', () => {
      const givenMap = new Map();
      const givenSearchValue = 'item';

      givenMap.set('id1', {
        itemName: 'item1',
        quantity: 1,
        unit: 'kg',
        isBought: true,
        isOnShoppingList: true,
      });

      const expectedResult = undefined;

      const actualResult = findItemDuplicateId(givenMap, givenSearchValue);

      expect(actualResult).toEqual(expectedResult);
    });

    it('should return id1 as there is a duplicate with this id for searchValue = item1', () => {
      const givenMap = new Map();
      const givenSearchValue = 'item1';

      givenMap.set('id1', {
        itemName: 'item1',
        quantity: 1,
        unit: 'kg',
        isBought: true,
        isOnShoppingList: true,
      });

      const expectedResult = 'id1';

      const actualResult = findItemDuplicateId(givenMap, givenSearchValue);

      expect(actualResult).toEqual(expectedResult);
    });
  });
});
