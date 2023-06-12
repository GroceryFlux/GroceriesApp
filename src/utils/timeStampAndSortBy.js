const compare = (value1, value2) => {
  if (value1 > value2) {
    return -1;
  }

  if (value1 < value2) {
    return 1;
  }
  return 0;
};

export const sortBy = (sortType, lists) => {
  return [...lists.entries()].sort((a, b) => {
    const listA = a[1];
    const listB = b[1];

    if (sortType === 'last_modified') {
      return compare(listA.timeStamp, listB.timeStamp);
    }

    if (sortType === 'alphabetical') {
      return compare(listB.title.toLowerCase(), listA.title.toLowerCase());
    }

    return 0;
  });
};

export const toDate = (timeStamp) => {
  return new Date(timeStamp).toLocaleDateString('default');
};

export const toTime = (timeStamp) => {
  return new Date(timeStamp).toLocaleTimeString('default');
};
