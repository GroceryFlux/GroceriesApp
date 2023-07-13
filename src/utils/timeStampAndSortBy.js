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
  const actualTime = new Date(Date.now());
  const actualDay = actualTime.getDay();
  const actualMonth = actualTime.getMonth();
  const actualYear = actualTime.getFullYear();

  if (deltaTime < 10) {
    return ': Few seconds ago';
  }
  if (deltaTime < 150) {
    return ': Few minutes ago';
  }
  if (deltaTime < 600) {
    return ': Last hour';
  }

  if (actualYear === lastSaved.getFullYear() && actualMonth === lastSaved.getMonth()) {
    if (actualDay === lastSaved.getDay()) {
      return ': Today';
    }
    if (actualDay - lastSaved.getDay() === 1) {
      return ': Testerday';
    }
  }

  return `: ${lastSaved.toLocaleDateString('default')}`;
};
