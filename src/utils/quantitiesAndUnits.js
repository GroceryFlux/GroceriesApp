import Qty from 'js-quantities/esm';

const acceptedKinds = [].concat(Qty.getUnits('mass'), Qty.getUnits('length'), Qty.getUnits('volume'));

let acceptedUnits = [];
acceptedKinds.forEach((kind) => (acceptedUnits = acceptedUnits.concat(Qty.getAliases(kind))));

export function findItemDetails(value) {
  const array = value.trim().split(' ');

  const foundData = {
    foundItemName: '',
    foundItemQuantity: '',
    foundItemUnit: '',
  };

  const isValueInteger = /^[0-9]*$/;
  for (let i = 0; i < array.length; i++) {
    const value = array[i];
    const valueFirstCharacter = value[0];
    if (isValueInteger.test(valueFirstCharacter) === true) {
      let quantityAndUnit = Qty(value);
      foundData.foundItemUnit =
        quantityAndUnit.numerator[0].slice(1, -1) === 1 ? 'unitless' : quantityAndUnit.numerator[0].slice(1, -1);
      foundData.foundItemQuantity = quantityAndUnit.scalar;
    } else if (acceptedUnits.includes(value)) {
      foundData.foundItemUnit = value;
    } else {
      foundData.foundItemName = `${foundData.foundItemName} ${value}`;
    }
  }
  foundData.foundItemName = foundData.foundItemName.trim();
  return foundData;
}

export function addItems(qty1, unit1, qty2, unit2) {
  const qtyA = Qty(qty1, unit1);
  const qtyB = Qty(qty2, unit2);
  if (qtyA.isCompatible(qtyB)) {
    const updatedQtyA = qtyA.to(qtyB);
    const sum = updatedQtyA.add(qtyB);
    return { quantity: sum.scalar, unit: sum.numerator[0].slice(1, -1) };
  }
  return 'incompatible';
}
