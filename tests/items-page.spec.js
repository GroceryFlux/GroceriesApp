import { test } from './fixtures/recurrent-list.js';
import { expect } from '@playwright/test';

test('should add a new item to items list', async ({ pageWithEmptyRecurrentList }) => {
  // adds an item to the itemslist
  await pageWithEmptyRecurrentList.getByRole('button', { name: 'Breaky' }).click();
  await pageWithEmptyRecurrentList.getByPlaceholder('Strawberries').fill('200 g Strawberries');
  await pageWithEmptyRecurrentList.getByPlaceholder('Strawberries').press('Enter');

  // checks if added is visible
  await expect(pageWithEmptyRecurrentList.getByRole('listitem').getByRole('textbox')).toBeVisible();
});

test('should add an existing item and update it items list and shopping list', async ({ pageWithRecurrentList }) => {
  // adds quantities to existing items (Joghurts, Strawberries, Oats) and creates a new item (bananas) and more after
  await pageWithRecurrentList.getByRole('button', { name: 'Breaky Strawberries, Oats, Joghurt' }).click();
  await pageWithRecurrentList.getByPlaceholder('Strawberries').fill('2 Joghurts');
  await pageWithRecurrentList.getByPlaceholder('Strawberries').press('Enter');
  await pageWithRecurrentList.getByPlaceholder('Strawberries').fill('50 g Strawberries');
  await pageWithRecurrentList.getByPlaceholder('Strawberries').press('Enter');
  await pageWithRecurrentList.getByPlaceholder('Strawberries').fill('200g Oats');
  await pageWithRecurrentList.getByPlaceholder('Strawberries').press('Enter');
  await pageWithRecurrentList.getByPlaceholder('Strawberries').fill('Bananas');
  await pageWithRecurrentList.getByPlaceholder('Strawberries').press('Enter');

  // checks if the quantities have changed in the item list
  await expect(pageWithRecurrentList.getByRole('textbox').nth(2)).toHaveValue('550 g Strawberries');
  await expect(pageWithRecurrentList.getByRole('textbox').nth(3)).toHaveValue('1.2 kg Oats');
  await expect(pageWithRecurrentList.getByRole('textbox').nth(4)).toHaveValue('6 Joghurts');

  // checks  if the item 'Bananas has been added to the Shopping list and is not checked
  await pageWithRecurrentList.locator('li:nth-child(4) > div > div:nth-child(2) > button').first().click();
  await pageWithRecurrentList.locator('.text-primary').first().click();
  await expect(pageWithRecurrentList.locator('li').filter({ hasText: 'Breaky' }).getByRole('textbox')).toHaveValue(
    'Bananas',
  );
  await expect(pageWithRecurrentList.getByRole('checkbox')).not.toBeChecked();
  await pageWithRecurrentList
    .locator('div')
    .filter({ hasText: /^Shopping List$/ })
    .getByRole('button')
    .click();

  // Adds '3 bananas' and checks if this has been correctly updated in the Shopping list
  await pageWithRecurrentList.getByPlaceholder('Strawberries').click();
  await pageWithRecurrentList.getByPlaceholder('Strawberries').fill('3 bananas');
  await pageWithRecurrentList.getByPlaceholder('Strawberries').press('Enter');
  await expect(pageWithRecurrentList.getByRole('textbox').nth(5)).toHaveValue('4 Bananas');
  await pageWithRecurrentList.locator('.text-primary').first().click();
  await expect(pageWithRecurrentList.locator('li').filter({ hasText: 'Breaky' }).getByRole('textbox')).toHaveValue(
    '4 Bananas',
  );
  await expect(pageWithRecurrentList.getByRole('checkbox')).not.toBeChecked();

  // checks if the associated list to the item in Shopping list is correct
  await expect(pageWithRecurrentList.locator('#root')).toContainText('Breaky');
});

test('should check the last edited text changes', async ({ pageWithEmptyRecurrentList }) => {
  await pageWithEmptyRecurrentList.getByRole('button', { name: 'Breaky' }).click();

  // checks if last edited time is correct
  await expect(pageWithEmptyRecurrentList.getByRole('heading')).toContainText('edited a few seconds ago');

  // exits list and virtually moves times 2 minutes ahead and re-enters to check if edited time is correct
  await pageWithEmptyRecurrentList.getByRole('button').first().click();
  await pageWithEmptyRecurrentList.clock.setFixedTime(new Date(Date.now() + 2 * 60000));
  await pageWithEmptyRecurrentList.getByRole('button', { name: 'Breaky' }).click();
  await expect(pageWithEmptyRecurrentList.getByRole('heading')).toContainText('edited a few minutes ago');

  // checks if last edited time is correct after adding an item to the list
  await pageWithEmptyRecurrentList.getByPlaceholder('Strawberries').fill('Bananas');
  await pageWithEmptyRecurrentList.getByPlaceholder('Strawberries').press('Enter');
  await expect(pageWithEmptyRecurrentList.getByRole('heading')).toContainText('edited a few seconds ago');

  // exits list and virtually moves times 12 minutes ahead and re-enters to check if edited time is correct
  await pageWithEmptyRecurrentList.getByRole('button').first().click();
  await pageWithEmptyRecurrentList.clock.setFixedTime(new Date(Date.now() + 12 * 60000));
  await pageWithEmptyRecurrentList.getByRole('button', { name: 'Breaky' }).click();
  await expect(pageWithEmptyRecurrentList.getByRole('heading')).toContainText('edited last hour');

  // exits list and virtually moves times 62 minutes ahead and re-enters to check if edited time is correct
  await pageWithEmptyRecurrentList.getByRole('button').first().click();
  await pageWithEmptyRecurrentList.clock.setFixedTime(new Date(Date.now() + 62 * 60000));
  await pageWithEmptyRecurrentList.getByRole('button', { name: 'Breaky' }).click();
  await expect(pageWithEmptyRecurrentList.getByRole('heading')).toContainText('edited today');

  // checks if last edited time is correct after changing the list's name
  await pageWithEmptyRecurrentList.getByPlaceholder('Title').fill('Breakies');
  await pageWithEmptyRecurrentList.getByPlaceholder('Title').press('Enter');
  await expect(pageWithEmptyRecurrentList.getByRole('heading')).toContainText('edited a few seconds ago');
});

test('should add an item with a different unit', async ({ pageWithRecurrentList }) => {
  // adds 200 g Joghurts to the already existing 4 Joghurts
  await pageWithRecurrentList.getByRole('button', { name: 'Breaky Strawberries, Oats, Joghurt' }).click();
  await pageWithRecurrentList.getByPlaceholder('Strawberries').fill('200 g Joghurts');
  await pageWithRecurrentList.getByPlaceholder('Strawberries').press('Enter');

  // checks if the 200 g and 4 Joghurts are separates
  await expect(pageWithRecurrentList.getByRole('textbox').nth(4)).toHaveValue('4 Joghurts');
  await expect(pageWithRecurrentList.getByRole('textbox').nth(5)).toHaveValue('200 g Joghurts');

  // adds a new item called '2 Bananas' then added to shopping list and checks if correctly added
  await pageWithRecurrentList.locator('form > div > button').first().click();
  await pageWithRecurrentList.getByPlaceholder('Strawberries').click();
  await pageWithRecurrentList.getByPlaceholder('Strawberries').fill('2 Bananas');
  await pageWithRecurrentList.getByPlaceholder('Strawberries').press('Enter');
  await pageWithRecurrentList.locator('li:nth-child(5) > div > div:nth-child(2) > button').first().click();

  // adds '200g Bananas' and checks that new item is created and not merged in neither items list or shopping list
  await pageWithRecurrentList.getByPlaceholder('Strawberries').click();
  await pageWithRecurrentList.getByPlaceholder('Strawberries').fill('200g Bananas');
  await pageWithRecurrentList.getByPlaceholder('Strawberries').press('Enter');
  await pageWithRecurrentList.locator('.text-primary').first().click();
  await expect(pageWithRecurrentList.locator('li').filter({ hasText: 'Breaky' }).getByRole('textbox')).toHaveValue(
    '2 Bananas',
  );
  await expect(pageWithRecurrentList.getByRole('checkbox')).not.toBeChecked();
});

test('should search for an item in the list', async ({ pageWithRecurrentList }) => {
  await pageWithRecurrentList.getByRole('button', { name: 'Breaky Strawberries, Oats, Joghurt' }).click();

  // adds a new item with similar name as existing one
  await pageWithRecurrentList.getByPlaceholder('Strawberries').fill('Strawberry ice cream');
  await pageWithRecurrentList.getByPlaceholder('Strawberries').press('Enter');

  // Searches for Strawberry and checks if returns correct item
  await pageWithRecurrentList.locator('button:nth-child(3)').first().click();
  await pageWithRecurrentList.getByPlaceholder('Looking for an item ?').click();
  await pageWithRecurrentList.getByPlaceholder('Looking for an item ?').fill('Strawberry');
  await expect(pageWithRecurrentList.getByRole('listitem').getByRole('textbox')).toHaveValue('Strawberry ice cream');

  // Searches for Strawberries and checks if returns correct item
  await pageWithRecurrentList.getByPlaceholder('Looking for an item ?').click();
  await pageWithRecurrentList.getByPlaceholder('Looking for an item ?').fill('Strawberries');
  await expect(pageWithRecurrentList.getByRole('listitem').getByRole('textbox')).toHaveValue('500 g Strawberries');

  // Searches for the similar letters in items and checks if returns correct items
  await pageWithRecurrentList.getByPlaceholder('Looking for an item ?').click();
  await pageWithRecurrentList.getByPlaceholder('Looking for an item ?').fill('Strawberr');
  await expect(pageWithRecurrentList.getByRole('textbox').nth(3)).toHaveValue('500 g Strawberries');
  await expect(pageWithRecurrentList.getByRole('textbox').nth(4)).toHaveValue('Strawberry ice cream');
});

test('should change the name only of an item', async ({ pageWithItemInShoppingList }) => {
  await pageWithItemInShoppingList.getByRole('button', { name: 'Breaky Strawberries, Oats,' }).click();

  // changes the name to 'Strawberries ice cream' and check if updated in items list and shopping list
  await pageWithItemInShoppingList.getByRole('textbox').nth(2).click();
  await pageWithItemInShoppingList.getByRole('textbox').nth(2).fill('500 g Strawberries ice cream');
  await pageWithItemInShoppingList.getByRole('textbox').nth(2).press('Enter');
  await expect(pageWithItemInShoppingList.getByRole('textbox').nth(2)).toHaveValue('500 g Strawberries ice cream');
  await pageWithItemInShoppingList.locator('.text-primary').first().click();
  await expect(pageWithItemInShoppingList.locator('li').filter({ hasText: 'Breaky' }).getByRole('textbox')).toHaveValue(
    '500 g Strawberries ice cream',
  );
});

test('should change the name, quantity and units of an item', async ({ pageWithItemInShoppingList }) => {
  await pageWithItemInShoppingList.getByRole('button', { name: 'Breaky Strawberries, Oats,' }).click();

  // changed the quantity, unit and name of the item
  await pageWithItemInShoppingList.getByRole('textbox').nth(2).click();
  await pageWithItemInShoppingList.getByRole('textbox').nth(2).fill('10 oz Strawberries ice cream');

  // checks if updated correctly in shopping list
  await pageWithItemInShoppingList.locator('.text-primary').first().click();
  await expect(pageWithItemInShoppingList.locator('li').filter({ hasText: 'Breaky' }).getByRole('textbox')).toHaveValue(
    '10 oz Strawberries ice cream',
  );
  await expect(pageWithItemInShoppingList.getByRole('checkbox')).not.toBeChecked();
});

test('should change the quantity and units of an item', async ({ pageWithItemInShoppingList }) => {
  await pageWithItemInShoppingList.getByRole('button', { name: 'Breaky Strawberries, Oats,' }).click();

  // changed the quantity and unit of the item
  await pageWithItemInShoppingList.getByRole('textbox').nth(2).click();
  await pageWithItemInShoppingList.getByRole('textbox').nth(2).fill('10 oz Strawberries');

  // checks if updated correctly in shopping list
  await pageWithItemInShoppingList.locator('.text-primary').first().click();
  await expect(pageWithItemInShoppingList.locator('li').filter({ hasText: 'Breaky' }).getByRole('textbox')).toHaveValue(
    '10 oz Strawberries',
  );
  await expect(pageWithItemInShoppingList.getByRole('checkbox')).not.toBeChecked();
});

test('shoud remove an item from the shopping list when deleted from items list', async ({
  pageWithItemInShoppingList,
}) => {
  // adds the item to the shopping list
  await pageWithItemInShoppingList.getByRole('button', { name: 'Breaky Strawberries, Oats,' }).click();

  // removes the unbought item from the shopping list and checks is shopping list is empty
  await pageWithItemInShoppingList.locator('div:nth-child(2) > button').first().click();
  await pageWithItemInShoppingList.locator('.text-primary').first().click();
  await expect(pageWithItemInShoppingList.getByText('Your shopping list is empty,')).toBeVisible();
  await pageWithItemInShoppingList
    .locator('div')
    .filter({ hasText: /^Shopping List$/ })
    .getByRole('button')
    .click();

  // adds the item to the shopping list
  await pageWithItemInShoppingList.locator('div:nth-child(2) > button').first().click();

  // marks item as bought
  await pageWithItemInShoppingList.locator('.text-primary').first().click();
  await pageWithItemInShoppingList.getByRole('checkbox').check();
  await pageWithItemInShoppingList
    .locator('div')
    .filter({ hasText: /^Shopping List$/ })
    .getByRole('button')
    .click();

  // deletes the bought item from shopping list and checks if shopping list is empty
  await pageWithItemInShoppingList.locator('div:nth-child(2) > button').first().click();
  await pageWithItemInShoppingList.locator('.text-primary').first().click();
  await expect(pageWithItemInShoppingList.getByText('Your shopping list is empty,')).toBeVisible();
});

test('should delete an item', async ({ pageWithRecurrentList }) => {
  await pageWithRecurrentList.getByRole('button', { name: 'Breaky Strawberries, Oats,' }).click();

  // deletes item and checks if list updated correctly
  await pageWithRecurrentList.locator('.text-red-500\\/70').first().click();
  await expect(pageWithRecurrentList.getByRole('textbox').nth(2)).toHaveValue('1 kg Oats');
  await expect(pageWithRecurrentList.getByRole('textbox').nth(3)).toHaveValue('4 Joghurts');

  // adds next item to shopping list
  await pageWithRecurrentList.getByRole('list').getByRole('button').first().click();

  // deletes next item and checks if removed from shopping list
  await pageWithRecurrentList.getByRole('list').getByRole('button').nth(1).click();
  await expect(pageWithRecurrentList.getByRole('listitem').getByRole('textbox')).toHaveValue('4 Joghurts');
  await pageWithRecurrentList.locator('.text-primary').first().click();
  await expect(pageWithRecurrentList.getByText('Your shopping list is empty,')).toBeVisible();
  await pageWithRecurrentList
    .locator('div')
    .filter({ hasText: /^Shopping List$/ })
    .getByRole('button')
    .click();

  // adds next item to shopping list and marks it as bought
  await pageWithRecurrentList.getByRole('listitem').getByRole('button').first().click();
  await pageWithRecurrentList.locator('.text-primary').first().click();
  await pageWithRecurrentList.getByRole('checkbox').check();

  await pageWithRecurrentList
    .locator('div')
    .filter({ hasText: /^Shopping List$/ })
    .getByRole('button')
    .click();

  // deletes the item and checks if removed from shopping list
  await pageWithRecurrentList.getByRole('listitem').getByRole('button').nth(1).click();
  await expect(
    pageWithRecurrentList.locator('div').filter({ hasText: '0edited a few seconds ago' }).nth(1),
  ).toBeVisible();
  await pageWithRecurrentList.getByRole('button').nth(1).click();
  await expect(pageWithRecurrentList.getByText('Your shopping list is empty,')).toBeVisible();
});
