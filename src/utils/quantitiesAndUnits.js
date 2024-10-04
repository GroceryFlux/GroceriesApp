import Qty from 'js-quantities/esm';

const acceptedKinds = [].concat(Qty.getUnits('mass'), Qty.getUnits('length'), Qty.getUnits('volume'));

let acceptedUnits = [];
acceptedKinds.forEach((kind) => (acceptedUnits = acceptedUnits.concat(Qty.getAliases(kind))));

const isValueInteger = /^[0-9]*$/;

function removeBracketsFromUnit(value) {
  return value.slice(1, -1);
}

function convertUnitToAbbreviation(unit) {
  const abreviatedUnit = Qty.getAliases(unit)[0];
  return abreviatedUnit;
}

function extractItemName(value, extractedItemName) {
  if (!extractedItemName) {
    return value;
  }

  return `${extractedItemName} ${value}`;
}

function hasQuantity(value) {
  const firstCharacter = value[0];
  return isValueInteger.test(firstCharacter);
}

function extractQuantity(value) {
  const quantityAndUnit = Qty(value.replaceAll(',', '.'));
  return quantityAndUnit.scalar;
}

function extractUnit(value) {
  const quantitiesAndUnits = Qty(value);
  const rawUnit = quantitiesAndUnits.numerator[0];
  const fullUnit = removeBracketsFromUnit(rawUnit);
  const unit = convertUnitToAbbreviation(fullUnit);

  if (acceptedUnits.includes(unit)) {
    return unit;
  }

  return '1';
}

export function extractItemDetails(input) {
  const array = input.trim().split(' ');

  const extractedItemDetails = {
    itemName: '',
    quantity: 1,
    unit: '1',
  };

  for (let i = 0; i < array.length; i++) {
    const value = array[i];

    if (hasQuantity(value)) {
      extractedItemDetails.quantity = extractQuantity(value);
      extractedItemDetails.unit = extractUnit(value);
      continue;
    }

    if (acceptedUnits.includes(value)) {
      extractedItemDetails.unit = extractUnit(value);
      continue;
    }

    extractedItemDetails.itemName = extractItemName(value, extractedItemDetails.itemName);
  }

  return extractedItemDetails;
}

export function addItems(qty1, unit1, qty2, unit2) {
  if (qty1 === '' && qty2 === '') {
    return { quantity: '', unit: '1' };
  }

  if (unit1 === '1' && unit2 === '1') {
    return { quantity: qty1 + qty2, unit: '1' };
  }

  const qtyA = Qty(qty1, unit1);
  const qtyB = Qty(qty2, unit2);

  const precision = qtyA.baseScalar < qtyB.baseScalar ? qtyA.baseScalar : qtyB.baseScalar;

  const rawSum = qtyA.add(qtyB);
  const sum = rawSum.toPrec(precision);
  const quantity = sum.scalar;
  const fullUnit = removeBracketsFromUnit(sum.numerator[0]);
  const unit = convertUnitToAbbreviation(fullUnit);

  return { quantity, unit };
}

export function subtractItems(qty1, unit1, qty2, unit2) {
  if (qty1 === '' && qty2 === '') {
    return { quantity: '', unit: '1' };
  }

  if (unit1 === '1' && unit2 === '1') {
    return { quantity: qty1 - qty2, unit: '1' };
  }

  const qtyA = Qty(qty1, unit1);
  const qtyB = Qty(qty2, unit2);

  const precision = qtyA.baseScalar < qtyB.baseScalar ? qtyA.baseScalar : qtyB.baseScalar;

  const rawSub = qtyA.sub(qtyB);
  const sub = rawSub.toPrec(precision);
  const quantity = sub.scalar;
  const fullUnit = removeBracketsFromUnit(sub.numerator[0]);
  const unit = convertUnitToAbbreviation(fullUnit);

  return { quantity, unit };
}

export function areItemsCompatible(qty1, unit1, qty2, unit2) {
  if (unit1 === '1' && unit2 === '1') {
    return true;
  }

  const qtyA = Qty(qty1, unit1);
  const qtyB = Qty(qty2, unit2);

  if (!qtyA.isCompatible(qtyB)) {
    return false;
  }

  return true;
}

export function stringifyItemNameQuantityUnit(item) {
  const hasQuantity = item.quantity === 1 ? false : true;
  const hasUnit = item.unit !== '1';

  if (!hasQuantity && !hasUnit) {
    return item.itemName;
  }

  if (!hasUnit) {
    return `${item.quantity} ${item.itemName}`;
  }

  return `${item.quantity} ${item.unit} ${item.itemName}`;
}
