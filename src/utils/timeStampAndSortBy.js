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
  const deltaTime = (Date.now() - timeStamp) / 60000;
  const currentDate = new Date(Date.now());
  const lastSaved = new Date(timeStamp);

  if (deltaTime < 1) {
    return 'a few seconds ago';
  }
  if (deltaTime < 10) {
    return 'a few minutes ago';
  }
  if (deltaTime < 60) {
    return 'last hour';
  }

  if (deltaTime < 1440) {
    if (currentDate.getDate() === lastSaved.getDate()) {
      return 'today';
    }
    return 'yesterday';
  }

  if (deltaTime < 2880) {
    if (currentDate.getDate() === lastSaved.getDate() + 1) {
      return 'yesterday';
    }
    return 'a few days ago';
  }

  return `${lastSaved.toLocaleDateString('default')}`;
};
