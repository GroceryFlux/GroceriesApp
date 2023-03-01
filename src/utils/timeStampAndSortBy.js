export const sortBy = (sortType, lists) => {

  const compareValues = (value1, value2) => {
    if(value1 > value2) {
      return -1
    }

    if(value1 < value2) {
      return 1
    }
    return 0
  }

  const sortedLists = [...lists.entries()].sort((a, b) => {

    const listA = a[1]
    const listB = b[1]

    if(sortType === 'last_modified') {
      return compareValues(listA.timeStamp, listB.timeStamp)
    }


    if(sortType === 'alphabetical') {
      return compareValues(listB.title, listA.title)
    }

    return 0
  })

  return sortedLists
}



export const timeToHuman = (timeStamp) => {

  let lastModified = new Date(timeStamp)
  return { 
    date: lastModified.toLocaleDateString("default"),
    time: lastModified.toLocaleTimeString("default")
  }
}