import { test } from './fixtures/recurrent-list.js';
import { expect } from '@playwright/test';

test('should open/close the shopping list page properly', async ({ page }) => {
  await page.goto('http://localhost:5173/GroceriesApp/');

  // Open the shopping list
  await page.locator('div').filter({ hasText: /^0$/ }).getByRole('button').click();

  // Check if the shopping list page has been opened
  await expect(page.getByRole('heading', { name: 'Shopping List' })).toBeVisible();

  // Close the shopping list
  await page
    .locator('div')
    .filter({ hasText: /^Shopping List$/ })
    .getByRole('button')
    .click();

  // Check if the shopping list page has been closed
  await expect(page.getByRole('heading', { name: 'Shopping List' })).not.toBeVisible();
});

test('should have one item on the shopping list page', async ({ pageWithRecurrentList }) => {
  // Open the existing recurrent list
  await pageWithRecurrentList.getByRole('button', { name: 'Breaky Strawberries, Oats,' }).click();

  // Add the first item to the shopping list
  await pageWithRecurrentList.locator('div:nth-child(2) > button').first().click();

  // Open the shopping list
  await pageWithRecurrentList.locator('.text-primary').first().click();

  // Check if the item is on the shopping list
  await expect(
    pageWithRecurrentList
      .locator('div')
      .filter({ hasText: /^Breaky$/ })
      .first(),
  ).toBeVisible();
});

test('should mark an item as purshased', async ({ pageWithItemInShoppingList }) => {
  await pageWithItemInShoppingList.locator('div').filter({ hasText: /^1$/ }).getByRole('button').click();

  // adds the item to purshased items in shopping list
  await pageWithItemInShoppingList.getByRole('checkbox').check();

  // checks item has correctly been added
  await expect(pageWithItemInShoppingList.locator('li').filter({ hasText: 'Breaky' }).getByRole('textbox')).toHaveValue(
    '500 g Strawberries',
  );
  await expect(pageWithItemInShoppingList.getByRole('checkbox')).toBeChecked();
  await expect(pageWithItemInShoppingList.locator('#root')).toContainText('Nothing left! 🎉');
});

test('should mark and then unmarke an item as purshased', async ({ pageWithItemInShoppingList }) => {
  await pageWithItemInShoppingList.locator('div').filter({ hasText: /^1$/ }).getByRole('button').click();

  // marks the item as purshased and check correct checkbox
  await pageWithItemInShoppingList.getByRole('checkbox').check();
  await expect(pageWithItemInShoppingList.getByRole('checkbox')).toBeChecked();

  // marks the item as not purshased and checks correct value and checkbox
  await pageWithItemInShoppingList.getByRole('checkbox').uncheck();
  await expect(pageWithItemInShoppingList.getByRole('textbox')).toHaveValue('500 g Strawberries');
  await expect(pageWithItemInShoppingList.getByRole('checkbox')).not.toBeChecked();
});

test('Should hide then show purshased items', async ({ pageWithItemInShoppingList }) => {
  await pageWithItemInShoppingList.getByRole('button', { name: 'Breaky Strawberries, Oats,' }).click();

  // adds the item 'Oats' to shopping list and to purshased items
  await pageWithItemInShoppingList.locator('li:nth-child(2) > div > div:nth-child(2) > button').first().click();
  await pageWithItemInShoppingList.locator('.text-primary').first().click();
  await pageWithItemInShoppingList.getByRole('checkbox').nth(1).check();

  // hides purshased items and verifies hidden
  await pageWithItemInShoppingList
    .locator('div')
    .filter({ hasText: /^Purchased$/ })
    .getByRole('button')
    .click();
  await expect(
    pageWithItemInShoppingList
      .locator('div')
      .filter({ hasText: /^PurchasedBreaky$/ })
      .getByRole('textbox'),
  ).toHaveCount(0);

  // shows purshased items and verifies shows
  await pageWithItemInShoppingList
    .locator('div')
    .filter({ hasText: /^Purchased$/ })
    .getByRole('button')
    .click();
  await expect(
    pageWithItemInShoppingList
      .locator('div')
      .filter({ hasText: /^PurchasedBreaky$/ })
      .getByRole('textbox'),
  ).toHaveValue('1 kg Oats');
});

test('should clear the shopping list', async ({ pageWithItemInShoppingList }) => {
  // adds another item to shopping list then to purshased items
  await pageWithItemInShoppingList.getByRole('button', { name: 'Breaky Strawberries, Oats,' }).click();
  await pageWithItemInShoppingList.locator('li:nth-child(2) > div > div:nth-child(2) > button').first().click();
  await pageWithItemInShoppingList.locator('.text-primary').first().click();
  await pageWithItemInShoppingList.getByRole('checkbox').nth(1).check();

  // clears the list then checks if correctly cleared
  await pageWithItemInShoppingList.getByRole('button', { name: 'Clear list' }).click();
  await expect(pageWithItemInShoppingList.getByRole('paragraph')).toContainText(
    'Your shopping list is empty, please start adding items in your recurrent lists',
  );
});

test('should check the associated list(s) is/are correct', async ({ pageWithTwoRecurrentLists }) => {
  // adds the item Pasta from Lunch list to shopping list
  await pageWithTwoRecurrentLists.getByRole('button', { name: 'Lunch Pasta' }).click();
  await pageWithTwoRecurrentLists.getByRole('listitem').getByRole('button').first().click();
  await pageWithTwoRecurrentLists.locator('.text-1xl').click();

  // adds the item Strawberries from Breaky to shopping list
  await pageWithTwoRecurrentLists.getByRole('button', { name: 'Breaky Strawberries' }).click();
  await pageWithTwoRecurrentLists.getByRole('listitem').getByRole('button').first().click();

  // checks in shopping list that associated lists are correct for each item
  await pageWithTwoRecurrentLists.locator('.text-primary').first().click();
  await expect(pageWithTwoRecurrentLists.locator('li').filter({ hasText: 'Lunch' }).getByRole('textbox')).toHaveValue(
    '300 g Pasta',
  );
  await expect(pageWithTwoRecurrentLists.locator('#root')).toContainText('Lunch');
  await expect(pageWithTwoRecurrentLists.locator('li').filter({ hasText: 'Breaky' }).getByRole('textbox')).toHaveValue(
    '500 g Strawberries',
  );
  await expect(pageWithTwoRecurrentLists.locator('#root')).toContainText('Breaky');
  await pageWithTwoRecurrentLists
    .locator('div')
    .filter({ hasText: /^Shopping List$/ })
    .getByRole('button')
    .click();

  // adds item 300 g Pasta to Breaky then to shopping list
  await pageWithTwoRecurrentLists.getByPlaceholder('Strawberries').click();
  await pageWithTwoRecurrentLists.getByPlaceholder('Strawberries').fill('300 g Pasta');
  await pageWithTwoRecurrentLists.getByPlaceholder('Strawberries').press('Enter');
  await pageWithTwoRecurrentLists.getByRole('list').getByRole('button').nth(2).click();

  // checks in shopping list if Lunch and Breaky lists correcly displayed for Pasta item
  await pageWithTwoRecurrentLists.locator('.text-primary').first().click();
  await expect(
    pageWithTwoRecurrentLists.locator('li').filter({ hasText: 'Lunch, Breaky' }).getByRole('textbox'),
  ).toHaveValue('600 g Pasta');
  await expect(pageWithTwoRecurrentLists.locator('#root')).toContainText('Lunch, Breaky');
});
