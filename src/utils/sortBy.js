export const sortBy = (sortType, lists) => {

  const sortedLists = [...lists.entries()].sort((a, b) => {

    if(sortType === 'last_modified') {
      if(a[1].timeStamp > b[1].timeStamp){
        return -1
      } 
  
      if(a[1].timeStamp < b[1].timeStamp){
        return 1
      }
    }


    if(sortType === 'alphabetical') {
      if(a[1].title < b[1].title){
        return -1
      }

      if(a[1].title > b[1].title){
        return 1
      }
    }

    return 0
  })

  return sortedLists
}