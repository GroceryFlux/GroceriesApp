import {
  addItems,
  areItemsCompatible,
  extractItemDetails,
  stringifyItemNameQuantityUnit,
  substractItems,
} from './quantitiesAndUnits';

describe('quantitiesAndUnits.js', () => {
  describe('extractItemDetails()', () => {
    it('should extract only the name of the item', () => {
      const givenInput = 'bananas';

      const expectedResult = {
        itemName: givenInput,
        quantity: '',
        unit: '1',
      };

      const actualResult = extractItemDetails(givenInput);

      expect(actualResult).toEqual(expectedResult);
    });

    it('should extract the name and the quantity of the item', () => {
      const givenInput = '2 bananas';

      const expectedResult = {
        itemName: 'bananas',
        quantity: 2,
        unit: '1',
      };

      const actualResult = extractItemDetails(givenInput);

      expect(actualResult).toEqual(expectedResult);
    });

    it('should extract the name, the quantity and the unit of the item', () => {
      const givenInput = '20 kg bananas';

      const expectedResult = {
        itemName: 'bananas',
        quantity: 20,
        unit: 'kg',
      };

      const actualResult = extractItemDetails(givenInput);

      expect(actualResult).toEqual(expectedResult);
    });

    it('should extract the name, the quantity and the unit of the item', () => {
      const givenInput = '20 kg yellow bananas';

      const expectedResult = {
        itemName: 'yellow bananas',
        quantity: 20,
        unit: 'kg',
      };

      const actualResult = extractItemDetails(givenInput);

      expect(actualResult).toEqual(expectedResult);
    });

    it('should extract the name, the quantity and the unit of the item', () => {
      const givenInput = '20kg yellow bananas';

      const expectedResult = {
        itemName: 'yellow bananas',
        quantity: 20,
        unit: 'kg',
      };

      const actualResult = extractItemDetails(givenInput);

      expect(actualResult).toEqual(expectedResult);
    });

    it('should extract the name, the quantity and the unit of the item', () => {
      const givenInput = '20 kilograms yellow bananas';

      const expectedResult = {
        itemName: 'yellow bananas',
        quantity: 20,
        unit: 'kg',
      };

      const actualResult = extractItemDetails(givenInput);

      expect(actualResult).toEqual(expectedResult);
    });
  });

  describe('areItemsCompatible()', () => {
    it('should return true as the items are compatible', () => {
      const givenQty1 = 100;
      const givenUnit1 = 'kg';
      const givenQty2 = 200;
      const givenUnit2 = 'lbs';

      const expectedResult = true;

      const actualResult = areItemsCompatible(givenQty1, givenUnit1, givenQty2, givenUnit2);

      expect(actualResult).toEqual(expectedResult);
    });

    it('should return false as the items are not compatible', () => {
      const givenQty1 = 100;
      const givenUnit1 = 'kg';
      const givenQty2 = 200;
      const givenUnit2 = 'm';

      const expectedResult = false;

      const actualResult = areItemsCompatible(givenQty1, givenUnit1, givenQty2, givenUnit2);

      expect(actualResult).toEqual(expectedResult);
    });

    it('should return true for two items that both have no unit (unit = 1)', () => {
      const givenQty1 = 1;
      const givenUnit1 = '1';
      const givenQty2 = 2;
      const givenUnit2 = '1';

      const expectedResult = true;

      const actualResult = areItemsCompatible(givenQty1, givenUnit1, givenQty2, givenUnit2);

      expect(actualResult).toEqual(expectedResult);
    });
  });

  describe('addItems()', () => {
    it('should return a round value from a sum 190.72 of items with different unit in the intial unit entered kg to precision 0,01', () => {
      const givenQty1 = 100;
      const givenUnit1 = 'kg';
      const givenQty2 = 200;
      const givenUnit2 = 'lbs';

      const expectedResult = {
        quantity: 190.72,
        unit: 'kg',
      };

      const actualResult = addItems(givenQty1, givenUnit1, givenQty2, givenUnit2);

      expect(actualResult).toEqual(expectedResult);
    });

    it('should return a round value from a sum 301.19 of items with same unit to precision 0,01', () => {
      const givenQty1 = 100.281293812;
      const givenUnit1 = 'kg';
      const givenQty2 = 200.912391231;
      const givenUnit2 = 'kg';

      const expectedResult = {
        quantity: 301.19,
        unit: 'kg',
      };

      const actualResult = addItems(givenQty1, givenUnit1, givenQty2, givenUnit2);

      expect(actualResult).toEqual(expectedResult);
    });

    it('should return a round value from a sum 301.19 of items with same unit but spelled differently to precision 0,01 and unit kg', () => {
      const givenQty1 = 100.281293812;
      const givenUnit1 = 'kilogram';
      const givenQty2 = 200.912391231;
      const givenUnit2 = 'kg';

      const expectedResult = {
        quantity: 301.19,
        unit: 'kg',
      };

      const actualResult = addItems(givenQty1, givenUnit1, givenQty2, givenUnit2);

      expect(actualResult).toEqual(expectedResult);
    });

    it('should return an empty string for quantity and a unit of 1', () => {
      const givenQty1 = '';
      const givenQty2 = '';
      const givenUnit1 = '1';
      const givenUnit2 = '1';

      const expectedResult = {
        quantity: '',
        unit: '1',
      };

      const actualResult = addItems(givenQty1, givenUnit1, givenQty2, givenUnit2);

      expect(expectedResult).toEqual(actualResult);
    });

    it('should return an some of the quantities and a unit of 1', () => {
      const givenQty1 = 2;
      const givenQty2 = 1;
      const givenUnit1 = '1';
      const givenUnit2 = '1';

      const expectedResult = {
        quantity: 3,
        unit: '1',
      };

      const actualResult = addItems(givenQty1, givenUnit1, givenQty2, givenUnit2);

      expect(expectedResult).toEqual(actualResult);
    });
  });

  describe('substractItems()', () => {
    it('should return a round value from a substraction 154.64 of items with different unit in the intial unit entered kg to precision 0,01', () => {
      const givenQty1 = 200;
      const givenUnit1 = 'kg';
      const givenQty2 = 100;
      const givenUnit2 = 'lbs';

      const expectedResult = {
        quantity: 154.64,
        unit: 'kg',
      };

      const actualResult = substractItems(givenQty1, givenUnit1, givenQty2, givenUnit2);

      expect(actualResult).toEqual(expectedResult);
    });

    it('should return a round value from a substraction 100.63 of items with same unit to precision 0,01', () => {
      const givenQty1 = 200.912391231;
      const givenUnit1 = 'kg';
      const givenQty2 = 100.281293812;
      const givenUnit2 = 'kg';

      const expectedResult = {
        quantity: 100.63,
        unit: 'kg',
      };

      const actualResult = substractItems(givenQty1, givenUnit1, givenQty2, givenUnit2);

      expect(actualResult).toEqual(expectedResult);
    });

    it('should return a round value from a subtraction 100.63 of items with same unit but spelled differently to precision 0,01 and unit kg', () => {
      const givenQty1 = 200.912391231;
      const givenUnit1 = 'kilogram';
      const givenQty2 = 100.281293812;
      const givenUnit2 = 'kg';

      const expectedResult = {
        quantity: 100.63,
        unit: 'kg',
      };

      const actualResult = substractItems(givenQty1, givenUnit1, givenQty2, givenUnit2);

      expect(actualResult).toEqual(expectedResult);
    });

    it('should return an empty string for quantity and a unit of 1', () => {
      const givenQty1 = '';
      const givenQty2 = '';
      const givenUnit1 = '1';
      const givenUnit2 = '1';

      const expectedResult = {
        quantity: '',
        unit: '1',
      };

      const actualResult = substractItems(givenQty1, givenUnit1, givenQty2, givenUnit2);

      expect(expectedResult).toEqual(actualResult);
    });

    it('should return a substraction of the quantities and a unit of 1', () => {
      const givenQty1 = 2;
      const givenQty2 = 1;
      const givenUnit1 = '1';
      const givenUnit2 = '1';

      const expectedResult = {
        quantity: 1,
        unit: '1',
      };

      const actualResult = substractItems(givenQty1, givenUnit1, givenQty2, givenUnit2);

      expect(expectedResult).toEqual(actualResult);
    });
  });

  describe('stringifyItemNameQuantityUnit()', () => {
    it('should return only a name', () => {
      const givenItem = {
        itemName: 'item',
        quantity: '',
        unit: '1',
      };

      const expectedResult = 'item';

      const actualResult = stringifyItemNameQuantityUnit(givenItem);

      expect(expectedResult).toEqual(actualResult);
    });

    it('should return a quantity and a name', () => {
      const givenItem = {
        itemName: 'item',
        quantity: 1,
        unit: '1',
      };

      const expectedResult = '1 item';

      const actualResult = stringifyItemNameQuantityUnit(givenItem);

      expect(expectedResult).toEqual(actualResult);
    });

    it('should return a quantity, a unit and a name', () => {
      const givenItem = {
        itemName: 'item',
        quantity: 1,
        unit: 'kg',
      };

      const expectedResult = '1 kg item';

      const actualResult = stringifyItemNameQuantityUnit(givenItem);

      expect(expectedResult).toEqual(actualResult);
    });
  });
});
