/* eslint-disable */

// const array1 = [1,2,3,4,5]

// let array2;

// for (let element = 0; element < array1.length; element++) {
//   array2.push(array1[element]*2);
// }

// console.log(array2);

// function double(number) {
//   return number * 2;
// }

// array2 = array1.map(double);

// const existingLists = new Map();

// const itemsList1 = new Map();
// itemsList1.set('1', { itemName: 'itemName' });

// existingLists.set('1', { title: 'title1', itemsList: itemsList1 });

// const mapEntries = [...existingLists.entries()];

// const final = mapEntries.map(([listId, list]) => {
//   list.itemsList = [...list.itemsList.entries()];

//   return [listId, list];
// })

const array1 = [[1, 2], [3, 4], [5]];

const filtered = array1.filter();

function filterFunction(element) {
  return element.some((subElement) => subElement % 2 === 0);
}
