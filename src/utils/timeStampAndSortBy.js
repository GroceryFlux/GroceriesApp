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
  const deltaTime = (Date.now() - timeStamp) / 6000;
  const lastSaved = new Date(timeStamp);

  if (deltaTime < 10) {
    return 'a few seconds ago';
  }
  if (deltaTime < 150) {
    return 'a few minutes ago';
  }
  if (deltaTime < 600) {
    return 'last hour';
  }

  if (deltaTime < 14400) {
    return 'today';
  }

  if (deltaTime < 28800) {
    return 'yesterday';
  }

  return `${lastSaved.toLocaleDateString('default')}`;
};
