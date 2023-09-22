import { startOfDay, subDays } from 'date-fns';

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
  const lastSaved = new Date(timeStamp);
  const minutesToNow = (Date.now() - timeStamp) / 60000;

  if (minutesToNow < 1) {
    return 'a few seconds ago';
  }

  if (minutesToNow < 10) {
    return 'a few minutes ago';
  }

  if (minutesToNow < 60) {
    return 'last hour';
  }

  const startOfToday = startOfDay(new Date()).getTime();

  if (timeStamp > startOfToday) {
    return 'today';
  }

  const startOfYesterday = subDays(startOfToday, 1);

  if (timeStamp > startOfYesterday) {
    return 'yesterday';
  }

  return `${lastSaved.toLocaleDateString('default')}`;
};
