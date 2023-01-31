
const setLocalStorage = (state) => {
  const array = [...state.entries()]
  const newArray = []
  for(let i = 0; i < array.length; i++) {
    newArray.push([array[i][0], { title: array[i][1].title, itemsList: [...array[i][1].itemsList] }])
  }
  localStorage.setItem('existingLists', JSON.stringify(newArray))
}

export const getLocalState = () => {
  const localState = new Map()
  const existingLists = JSON.parse(localStorage.getItem('existingLists'));
  if(existingLists) {
    existingLists.map(listDetails => {
      const itemsList = new Map()
      return listDetails[1].itemsList.forEach(
        (itemsDetails) => localState.set(listDetails[0], { title: listDetails[1].title, itemsList: itemsList.set(itemsDetails[0], { itemName: itemsDetails[1].itemName }) })
      )
    })
  }
  return localState 
}

export const updateList = (listID, itemID, value, setState, state) => {
  const newList = state.set(listID, { title: state.get(listID).title, itemsList: state.get(listID).itemsList.set(itemID, 
    value) })
  setState(new Map(newList));
  setLocalStorage(state)
}; 

export const deleteItem = (listID, itemID, setState, state) => {
  const newList = state
  newList.get(listID).itemsList.delete(itemID)
  setState(new Map(newList))
  setLocalStorage(state)
}

export const deleteList = (listID, setState, state) => {
  const newList = state
  newList.delete(listID)
  setState(new Map(newList))
  setLocalStorage(state)
}

export const saveListTitle = (listID, title, setState, state) => {
  const newList = state.set(listID, { title: title, itemsList: state.get(listID).itemsList })
  setState(new Map(newList))
  setLocalStorage(state)
}

export const filterItem = (value, listID, state) => {
  const actualState = new Map()
  const newArray = [...state.get(listID).itemsList.entries()]
  value === '' ? newArray.forEach(e => actualState.set(e[0], { itemName: e[1].itemName })) : null
  const filteredArray = actualState
  newArray.forEach(e => { if(e[1].itemName.includes(value) && value!=''){
    filteredArray.set(e[0], { itemName: e[1].itemName })
  }})
  return filteredArray
}

export const filterList = (value, state) => {
  const actualState = new Map()
  const newArray = [...state.entries()]
  value === '' ? newArray.forEach(e => actualState.set(e[0], { title: e[1].title, itemsList: e[1].itemsList })) : null
  const filteredArray = actualState
  newArray.forEach(e => {if(e[1].title.includes(value) && value!='') {
    filteredArray.set(e[0], { title: e[1].title, itemsList: e[1].itemsList })
  }})
  return filteredArray
}

