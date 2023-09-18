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
  const currentDate = new Date(Date.now());
  const lastSaved = new Date(timeStamp);
  const deltaTime = (Date.now() - timeStamp) / 60000;
  const toEndOfDay = parseInt((24 - currentDate.getHours()) * 60 + currentDate.getMinutes());

  if (deltaTime < 1) {
    return 'a few seconds ago';
  }
  if (deltaTime < 10) {
    return 'a few minutes ago';
  }
  if (deltaTime < 60) {
    return 'last hour';
  }

  if (deltaTime < toEndOfDay) {
    return 'today';
  }

  if (deltaTime < toEndOfDay + 1440) {
    return 'yesterday';
  }

  return `${lastSaved.toLocaleDateString('default')}`;
};
