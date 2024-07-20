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
  //locates the background when in light theme
  const backgroundLight = pageWithRecurrentList.getByText('Groceries0Recurrent');

  //gets the color from the background in light theme
  const backgroundColorLight = await backgroundLight.evaluate((e) => {
    return window.getComputedStyle(e).getPropertyValue('color');
  });

  //changes theme to dark
  await pageWithRecurrentList
    .locator('div')
    .filter({ hasText: /^Groceries0$/ })
    .getByRole('button')
    .first()
    .click();

  //locates the background when in dark theme
  const backgroundDark = pageWithRecurrentList.getByText('Groceries0Recurrent');

  //gets the color from the background in dark theme
  const backgroundColorDark = await backgroundDark.evaluate((e) => {
    return window.getComputedStyle(e).getPropertyValue('color');
  });

  //checks the color has changed
  await expect(backgroundColorLight).not.toEqual(backgroundColorDark);

  //changes theme to light
  await pageWithRecurrentList
    .locator('div')
    .filter({ hasText: /^Groceries0$/ })
    .getByRole('button')
    .first()
    .click();

  //locates the background when back in light theme
  const backgroundLight2 = pageWithRecurrentList.getByText('Groceries0Recurrent');

  //gets the color from the background when back in light theme
  const backgroundColorLight2 = await backgroundLight2.evaluate((e) => {
    return window.getComputedStyle(e).getPropertyValue('color');
  });

  //checks the theme is back to the same light color as before
  await expect(backgroundColorLight).toEqual(backgroundColorLight2);
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

test('should search for a list called Breaky', async ({ pageWithTwoRecurrentLists }) => {
  await pageWithTwoRecurrentLists.locator('button:nth-child(3)').first().click();
  await pageWithTwoRecurrentLists.getByPlaceholder('Looking for a list or an item').click();
  await pageWithTwoRecurrentLists.getByPlaceholder('Looking for a list or an item').fill('Breaky');
  await expect(pageWithTwoRecurrentLists.getByRole('listitem')).toHaveText(['BreakyStrawberries']);
});

test('should search for an item called Strawberries', async ({ pageWithTwoRecurrentLists }) => {
  await pageWithTwoRecurrentLists.locator('button:nth-child(3)').first().click();
  await pageWithTwoRecurrentLists.getByPlaceholder('Looking for a list or an item').click();
  await pageWithTwoRecurrentLists.getByPlaceholder('Looking for a list or an item').fill('Strawberries');
  await expect(pageWithTwoRecurrentLists.getByRole('listitem')).toHaveText(['BreakyStrawberries']);
});
