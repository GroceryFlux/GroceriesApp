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
      foundData.foundItemUnit = quantityAndUnit._units === undefined ? 'unitless' : quantityAndUnit._units;
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
