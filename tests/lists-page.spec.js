import { test } from './fixtures/recurrent-list.js';
import { expect } from '@playwright/test';

test('should have one recurrent list with items', async ({ pageWithRecurrentList }) => {
  const recurrentList = pageWithRecurrentList.getByRole('button', { name: 'Breaky Strawberries, Oats, Joghurt' });

  await expect(recurrentList).toBeVisible();
});

test('should change the name of the list Breaky to Breakfast', async ({ pageWithRecurrentList }) => {
  // open the recurrent list
  await pageWithRecurrentList.getByRole('button', { name: 'Breaky Strawberries, Oats, Joghurt' }).click();

  // change title to Breakfast
  await pageWithRecurrentList.getByPlaceholder('Title').click();
  await pageWithRecurrentList.getByPlaceholder('Title').fill('Breakfast');
  await pageWithRecurrentList.getByPlaceholder('Title').press('Enter');

  // return to recurrent lists to save
  await pageWithRecurrentList.locator('.text-1xl').click();

  // check the list name has changed to Breakfast
  await expect(pageWithRecurrentList.getByRole('button', { name: 'Breakfast' })).toBeVisible();
});

test.describe('delete list', () => {
  test('should delete an existing list then cancel the delete', async ({ pageWithRecurrentList }) => {
    // click on button to delete
    await pageWithRecurrentList.getByRole('listitem').getByRole('button').nth(1).click();

    // click on button to cancel delete
    await pageWithRecurrentList.getByRole('listitem').getByRole('button').nth(2).click();

    // check if the list is still there
    await expect(
      pageWithRecurrentList.getByRole('button', { name: 'Breaky Strawberries, Oats, Joghurt' }),
    ).toBeVisible();
  });

  test('should delete an existing list then confirm the delete', async ({ pageWithRecurrentList }) => {
    // click on button to delete
    await pageWithRecurrentList.getByRole('listitem').getByRole('button').nth(1).click();

    // click on button to confirm delete
    await pageWithRecurrentList.getByRole('listitem').getByRole('button').nth(1).click();

    // check if the list has been deleted
    await expect(
      pageWithRecurrentList.getByRole('button', { name: 'Breaky Strawberries, Oats, Joghurt' }),
    ).not.toBeVisible();
  });
});

test('should check the change in colors when setting dark theme', async ({ pageWithRecurrentList }) => {
  // locate the background when in initial (light) theme
  const html = pageWithRecurrentList.locator('html');

  // get the color from the background in light theme
  const initialBackgroundColor = await html.evaluate((e) => {
    return window.getComputedStyle(e).getPropertyValue('background-color');
  });

  // check the color is light
  expect(initialBackgroundColor).toEqual('rgb(241, 244, 242)');

  // change theme to dark
  await pageWithRecurrentList
    .locator('div')
    .filter({ hasText: /^Groceries0$/ })
    .getByRole('button')
    .first()
    .click();

  // get the color from the background in dark theme
  const backgroundColorDark = await html.evaluate((e) => {
    return window.getComputedStyle(e).getPropertyValue('background-color');
  });

  // check the color is dark
  await expect(backgroundColorDark).toEqual('rgb(15, 23, 41)');

  // change theme to light
  await pageWithRecurrentList
    .locator('div')
    .filter({ hasText: /^Groceries0$/ })
    .getByRole('button')
    .first()
    .click();

  // get the color from the background light theme
  const backgroundColorLight = await html.evaluate((e) => {
    return window.getComputedStyle(e).getPropertyValue('background-color');
  });

  // check the theme is back to the same light color as before
  await expect(backgroundColorLight).toEqual('rgb(241, 244, 242)');
});

test.describe('list sorting', () => {
  test('should sort the list by latest edited', async ({ pageWithTwoRecurrentLists }) => {
    // click on button to change to alphabetic sorting
    await pageWithTwoRecurrentLists.locator('.relative > button').click();
    await pageWithTwoRecurrentLists.getByRole('button', { name: 'A-Z' }).click();
    await pageWithTwoRecurrentLists
      .locator('div')
      .filter({ hasText: /^Recurrent listsDateA-Z$/ })
      .getByRole('button')
      .nth(1)
      .click();

    // check if the first item on the list page is the first alphabetically
    await expect(pageWithTwoRecurrentLists.getByRole('listitem').nth(0)).toHaveText(['BreakyStrawberries']);

    // click on button to change to last edited sorting
    await pageWithTwoRecurrentLists.locator('.relative > button').click();
    await pageWithTwoRecurrentLists.getByRole('button', { name: 'Date' }).click();
    await pageWithTwoRecurrentLists
      .locator('div')
      .filter({ hasText: /^Recurrent listsDateA-Z$/ })
      .getByRole('button')
      .nth(1)
      .click();

    // check if first item on the list page is the last created/edited one
    await expect(pageWithTwoRecurrentLists.getByRole('listitem').nth(0)).toHaveText(['LunchPasta']);
  });

  test('should sort the list by alphabetic order', async ({ pageWithTwoRecurrentLists }) => {
    // click on button to change to last edited sorting
    await pageWithTwoRecurrentLists.locator('.relative > button').click();
    await pageWithTwoRecurrentLists.getByRole('button', { name: 'Date' }).click();
    await pageWithTwoRecurrentLists
      .locator('div')
      .filter({ hasText: /^Recurrent listsDateA-Z$/ })
      .getByRole('button')
      .nth(1)
      .click();

    // check if first item on the list page is the last created/edited one
    await expect(pageWithTwoRecurrentLists.getByRole('listitem').nth(0)).toHaveText(['LunchPasta']);

    // click on button to change to alphabetic order
    await pageWithTwoRecurrentLists.locator('.relative > button').click();
    await pageWithTwoRecurrentLists.getByRole('button', { name: 'A-Z' }).click();
    await pageWithTwoRecurrentLists
      .locator('div')
      .filter({ hasText: /^Recurrent listsDateA-Z$/ })
      .getByRole('button')
      .nth(1)
      .click();

    // check if first item on the list page is Breaky (ahead alphabetically of Lunch)
    await expect(pageWithTwoRecurrentLists.getByRole('listitem').nth(0)).toHaveText(['BreakyStrawberries']);
  });
});

test.describe('list searching', () => {
  test('should search for a list called Breaky', async ({ pageWithSimilarRecurrentListsName }) => {
    // open search bar
    await pageWithSimilarRecurrentListsName.locator('button:nth-child(3)').first().click();

    // search for Breaky
    await pageWithSimilarRecurrentListsName.getByPlaceholder('Looking for a list or an item').click();
    await pageWithSimilarRecurrentListsName.getByPlaceholder('Looking for a list or an item').fill('Breaky');

    // check if correct lists have been found via list name
    await expect(pageWithSimilarRecurrentListsName.getByRole('listitem')).toHaveText([
      'BreakyWeekEndCroissant',
      'BreakyStrawberries',
    ]);
  });

  test('should search for an item called Strawberries', async ({ pageWithSameItemInDifferentLists }) => {
    // open search bar
    await pageWithSameItemInDifferentLists.locator('button:nth-child(3)').first().click();

    // search for Strawberry
    await pageWithSameItemInDifferentLists.getByPlaceholder('Looking for a list or an item').click();
    await pageWithSameItemInDifferentLists.getByPlaceholder('Looking for a list or an item').fill('Strawberries');

    // check if correct lists have been found via item name
    await expect(pageWithSameItemInDifferentLists.getByRole('listitem')).toHaveText([
      'FruitsStrawberries',
      'BreakyStrawberries',
    ]);
  });
});
