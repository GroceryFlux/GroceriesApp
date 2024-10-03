import { test } from './fixtures/recurrent-list.js';
import { expect } from '@playwright/test';

test('should have one recurrent list with items', async ({ pageWithRecurrentList }) => {
  const recurrentList = pageWithRecurrentList.getByRole('button', { name: 'Breaky Strawberries, Oats, Joghurt' });

  await expect(recurrentList).toBeVisible();
});

test('should change the name of the list Breakie to Breakfast', async ({ pageWithRecurrentList }) => {
  // Opens the recurent list
  await pageWithRecurrentList.getByRole('button', { name: 'Breaky Strawberries, Oats, Joghurt' }).click();

  // Clicks on the title
  await pageWithRecurrentList.getByPlaceholder('Title').click();

  // Changes title to Breakfast
  await pageWithRecurrentList.getByPlaceholder('Title').fill('Breakfast');
  await pageWithRecurrentList.getByPlaceholder('Title').press('Enter');

  // Returns to recurrent lists to save
  await pageWithRecurrentList.locator('.text-1xl').click();

  // Checks the list name has changed to Breakfast
  await expect(pageWithRecurrentList.getByRole('button', { name: 'Breakfast' })).toBeVisible();
});

test('should delete an existing list then cancel the delete', async ({ pageWithRecurrentList }) => {
  // Clicks on button to delete
  await pageWithRecurrentList.getByRole('listitem').getByRole('button').nth(1).click();

  //Clicks on button to cancel delete
  await pageWithRecurrentList.getByRole('listitem').getByRole('button').nth(2).click();

  //Checks if the list is still there
  await expect(pageWithRecurrentList.getByRole('button', { name: 'Breaky Strawberries, Oats, Joghurt' })).toBeVisible();
});

test('should delete an existing list then confirm the delete', async ({ pageWithRecurrentList }) => {
  // Clicks on button to delete
  await pageWithRecurrentList.getByRole('listitem').getByRole('button').nth(1).click();

  //Clicks on button to confirm delete
  await pageWithRecurrentList.getByRole('listitem').getByRole('button').nth(1).click();

  //Checks if the list is still there
  await expect(
    pageWithRecurrentList.getByRole('button', { name: 'Breaky Strawberries, Oats, Joghurt' }),
  ).not.toBeVisible();
});

test('should check the change in colors when setting dark theme', async ({ pageWithRecurrentList }) => {
  //locates the background when in initial (light) theme
  const html = pageWithRecurrentList.locator('html');

  //gets the color from the background in light theme
  const initialBackgroundColor = await html.evaluate((e) => {
    return window.getComputedStyle(e).getPropertyValue('background-color');
  });

  //checks the color is light
  expect(initialBackgroundColor).toEqual('rgb(241, 244, 242)');

  //changes theme to dark
  await pageWithRecurrentList
    .locator('div')
    .filter({ hasText: /^Groceries0$/ })
    .getByRole('button')
    .first()
    .click();

  //gets the color from the background in dark theme
  const backgroundColorDark = await html.evaluate((e) => {
    return window.getComputedStyle(e).getPropertyValue('background-color');
  });

  //checks the color is dark
  await expect(backgroundColorDark).toEqual('rgb(15, 23, 41)');

  //changes theme to light
  await pageWithRecurrentList
    .locator('div')
    .filter({ hasText: /^Groceries0$/ })
    .getByRole('button')
    .first()
    .click();

  //gets the color from the background light theme
  const backgroundColorLight = await html.evaluate((e) => {
    return window.getComputedStyle(e).getPropertyValue('background-color');
  });

  //checks the theme is back to the same light color as before
  await expect(backgroundColorLight).toEqual('rgb(241, 244, 242)');
});

test('should sort the list by lastest edited', async ({ pageWithTwoRecurrentLists }) => {
  //Clicks on button to change to alphabetic sorting
  await pageWithTwoRecurrentLists.locator('.relative > button').click();
  await pageWithTwoRecurrentLists.getByRole('button', { name: 'A-Z' }).click();
  await pageWithTwoRecurrentLists
    .locator('div')
    .filter({ hasText: /^Recurrent listsDateA-Z$/ })
    .getByRole('button')
    .nth(1)
    .click();

  //Checks if the first item on the list page is the first alphabetically
  await expect(pageWithTwoRecurrentLists.getByRole('listitem').nth(0)).toHaveText(['BreakyStrawberries']);

  //Clicks on button to change to last edited sorting
  await pageWithTwoRecurrentLists.locator('.relative > button').click();
  await pageWithTwoRecurrentLists.getByRole('button', { name: 'Date' }).click();
  await pageWithTwoRecurrentLists
    .locator('div')
    .filter({ hasText: /^Recurrent listsDateA-Z$/ })
    .getByRole('button')
    .nth(1)
    .click();

  //Checks if first item on the list page is the last created/edited one
  await expect(pageWithTwoRecurrentLists.getByRole('listitem').nth(0)).toHaveText(['LunchPasta']);
});

test('should sort the list by alphabetic order', async ({ pageWithTwoRecurrentLists }) => {

  //Clicks on button to change to last edited sorting
  await pageWithTwoRecurrentLists.locator('.relative > button').click();
  await pageWithTwoRecurrentLists.getByRole('button', { name: 'Date' }).click();
  await pageWithTwoRecurrentLists
    .locator('div')
    .filter({ hasText: /^Recurrent listsDateA-Z$/ })
    .getByRole('button')
    .nth(1)
    .click();

  //Checks if first item on the list page is the last created/edited one
  await expect(pageWithTwoRecurrentLists.getByRole('listitem').nth(0)).toHaveText(['LunchPasta']);

  //Clicks on button to change to alphabetic order
  await pageWithTwoRecurrentLists.locator('.relative > button').click();
  await pageWithTwoRecurrentLists.getByRole('button', { name: 'A-Z' }).click();
  await pageWithTwoRecurrentLists
    .locator('div')
    .filter({ hasText: /^Recurrent listsDateA-Z$/ })
    .getByRole('button')
    .nth(1)
    .click();

  //Checks if first item on the list page is Breaky (ahead alphabetically of Lunch)
  await expect(pageWithTwoRecurrentLists.getByRole('listitem').nth(0)).toHaveText(['BreakyStrawberries']);
});

test('should search for a list called Breaky', async ({ pageWithSimilarRecurrentListsName }) => {
  await pageWithSimilarRecurrentListsName.locator('button:nth-child(3)').first().click();
  await pageWithSimilarRecurrentListsName.getByPlaceholder('Looking for a list or an item').click();
  await pageWithSimilarRecurrentListsName.getByPlaceholder('Looking for a list or an item').fill('Breaky');
  await expect(pageWithSimilarRecurrentListsName.getByRole('listitem')).toHaveText(['BreakyWeekEndCroissant', 'BreakyStrawberries']);
});

test('should search for an item called Strawberries', async ({ pageWithSameItemInDifferentLists }) => {
  await pageWithSameItemInDifferentLists.locator('button:nth-child(3)').first().click();
  await pageWithSameItemInDifferentLists.getByPlaceholder('Looking for a list or an item').click();
  await pageWithSameItemInDifferentLists.getByPlaceholder('Looking for a list or an item').fill('Strawberries');
  await expect(pageWithSameItemInDifferentLists.getByRole('listitem')).toHaveText(['FruitsStrawberries', 'BreakyStrawberries']);
});
