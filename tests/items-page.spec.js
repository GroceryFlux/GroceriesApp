import { test } from './fixtures/recurrent-list.js';
import { expect } from '@playwright/test';
import { addMinutes } from 'date-fns';

test.describe('adding items', () => {
  test('should add a new item to recurrent list', async ({ pageWithEmptyRecurrentList }) => {
    // open the recurrent list
    await pageWithEmptyRecurrentList.getByRole('button', { name: 'Breaky' }).click();

    // add an item to the recurrent list
    await pageWithEmptyRecurrentList.getByPlaceholder('Strawberries').fill('200 g Strawberries');
    await pageWithEmptyRecurrentList.getByPlaceholder('Strawberries').press('Enter');

    // check if item has been added to the recurrent list
    await expect(pageWithEmptyRecurrentList.getByRole('listitem').getByRole('textbox')).toHaveValue(
      '200 g Strawberries',
    );
  });

  test('should add an item with a different unit', async ({ pageWithRecurrentList }) => {
    // open the recurrent list
    await pageWithRecurrentList.getByRole('button', { name: 'Breaky Strawberries, Oats, Joghurt' }).click();

    // add a new item called '2 Bananas'
    await pageWithRecurrentList.getByPlaceholder('Strawberries').click();
    await pageWithRecurrentList.getByPlaceholder('Strawberries').fill('2 Bananas');
    await pageWithRecurrentList.getByPlaceholder('Strawberries').press('Enter');

    // add the item '2 Bananas' to the shopping list
    await pageWithRecurrentList.locator('li:nth-child(4) > div > div:nth-child(2) > button').first().click();

    // add '200g Bananas'
    await pageWithRecurrentList.getByPlaceholder('Strawberries').click();
    await pageWithRecurrentList.getByPlaceholder('Strawberries').fill('200g Bananas');
    await pageWithRecurrentList.getByPlaceholder('Strawberries').press('Enter');

    // check if the item '200g Bananas' has been added as new item and not merged with the existing '2 Bananas'
    await expect(pageWithRecurrentList.getByRole('list').getByRole('textbox').nth(4)).toHaveValue('200 g Bananas');

    // open shopping list
    await pageWithRecurrentList.locator('.text-primary').first().click();

    // check if the item has also not been merged on the shopping list
    await expect(pageWithRecurrentList.locator('li').filter({ hasText: 'Breaky' }).getByRole('textbox')).toHaveValue(
      '2 Bananas',
    );
  });
});

test.describe('editing items', () => {
  test('should change the name of an item', async ({ pageWithItemInShoppingList }) => {
    // open the recurrent list
    await pageWithItemInShoppingList.getByRole('button', { name: 'Breaky Strawberries, Oats,' }).click();

    // change the name to 'Strawberries ice cream'
    await pageWithItemInShoppingList.getByRole('textbox').nth(2).click();
    await pageWithItemInShoppingList.getByRole('textbox').nth(2).fill('500 g Strawberries ice cream');
    await pageWithItemInShoppingList.getByRole('textbox').nth(2).press('Enter');

    // check if updated in recurrent list
    await expect(pageWithItemInShoppingList.getByRole('textbox').nth(2)).toHaveValue('500 g Strawberries ice cream');

    // open the shopping list
    await pageWithItemInShoppingList.locator('.text-primary').first().click();

    // check if updated in shopping list
    await expect(
      pageWithItemInShoppingList.locator('li').filter({ hasText: 'Breaky' }).getByRole('textbox'),
    ).toHaveValue('500 g Strawberries ice cream');
  });

  test('should change the quantity of an item', async ({ pageWithItemInShoppingList }) => {
    // open the recurrent list
    await pageWithItemInShoppingList.getByRole('button', { name: 'Breaky Strawberries, Oats,' }).click();

    // change the quantity of the item
    await pageWithItemInShoppingList.getByRole('textbox').nth(2).click();
    await pageWithItemInShoppingList.getByRole('textbox').nth(2).fill('200 g Strawberries');
    await pageWithItemInShoppingList.getByRole('textbox').nth(2).press('Enter');

    // check if updated in recurrent list
    await expect(pageWithItemInShoppingList.getByRole('textbox').nth(2)).toHaveValue('200 g Strawberries');

    // open the shopping list
    await pageWithItemInShoppingList.locator('.text-primary').first().click();

    // check if updated correctly in shopping list
    await expect(
      pageWithItemInShoppingList.locator('li').filter({ hasText: 'Breaky' }).getByRole('textbox'),
    ).toHaveValue('200 g Strawberries');
  });

  test('should change the units of an item', async ({ pageWithItemInShoppingList }) => {
    // open the recurrent list
    await pageWithItemInShoppingList.getByRole('button', { name: 'Breaky Strawberries, Oats,' }).click();

    // change the quantity and unit of the item
    await pageWithItemInShoppingList.getByRole('textbox').nth(2).click();
    await pageWithItemInShoppingList.getByRole('textbox').nth(2).fill('500 oz Strawberries');
    await pageWithItemInShoppingList.getByRole('textbox').nth(2).press('Enter');

    // check if updated in recurrent list
    await expect(pageWithItemInShoppingList.getByRole('textbox').nth(2)).toHaveValue('500 oz Strawberries');

    // open the shopping list
    await pageWithItemInShoppingList.locator('.text-primary').first().click();

    // check if updated correctly in shopping list
    await expect(
      pageWithItemInShoppingList.locator('li').filter({ hasText: 'Breaky' }).getByRole('textbox'),
    ).toHaveValue('500 oz Strawberries');
  });

  test('should change the name, quantity and units of an item', async ({ pageWithItemInShoppingList }) => {
    // open the recurrent list
    await pageWithItemInShoppingList.getByRole('button', { name: 'Breaky Strawberries, Oats,' }).click();

    // change the quantity, unit and name of the item
    await pageWithItemInShoppingList.getByRole('textbox').nth(2).click();
    await pageWithItemInShoppingList.getByRole('textbox').nth(2).fill('10 oz Strawberries ice cream');
    await pageWithItemInShoppingList.getByRole('textbox').nth(2).press('Enter');

    // check if updated in recurrent list
    await expect(pageWithItemInShoppingList.getByRole('textbox').nth(2)).toHaveValue('10 oz Strawberries ice cream');

    // open the shopping list
    await pageWithItemInShoppingList.locator('.text-primary').first().click();

    // check if updated correctly in shopping list
    await expect(
      pageWithItemInShoppingList.locator('li').filter({ hasText: 'Breaky' }).getByRole('textbox'),
    ).toHaveValue('10 oz Strawberries ice cream');
  });
});

test.describe('deleting items', () => {
  test('should delete an item', async ({ pageWithItemInShoppingList }) => {
    // open the recurrent list
    await pageWithItemInShoppingList.getByRole('button', { name: 'Breaky Strawberries, Oats,' }).click();

    // check if the item is visible
    await expect(
      pageWithItemInShoppingList.getByRole('textbox').filter({ hasText: '500 g Strawberries' }),
    ).not.toBeVisible();

    // delete the item
    await pageWithItemInShoppingList.locator('.text-red-500\\/70').first().click();

    // check if the item has been deleted
    await expect(
      pageWithItemInShoppingList.getByRole('textbox').filter({ hasText: '500 g Strawberries' }),
    ).not.toBeVisible();
  });
});

test.describe('shopping list interactions', () => {
  test('add item to shopping list', async ({ pageWithRecurrentList }) => {
    // open the recurrent list
    await pageWithRecurrentList.getByRole('button', { name: 'Breaky' }).click();

    // add new item "Bananas" to the recurrent list
    await pageWithRecurrentList.getByPlaceholder('Strawberries').fill('Bananas');
    await pageWithRecurrentList.getByPlaceholder('Strawberries').press('Enter');

    // check if the icon cart arrow icon is visible
    await expect(pageWithRecurrentList.getByTestId('cart-arrow-icon').first()).toBeVisible();

    // add the item to the shopping list
    await pageWithRecurrentList.locator('li:nth-child(4) > div > div:nth-child(2) > button').first().click();

    // check if the icon cart check icon is visible
    await expect(pageWithRecurrentList.getByTestId('cart-check-icon')).toBeVisible();

    // open the shopping list
    await pageWithRecurrentList.locator('.text-primary').first().click();

    // checks if the item has been correctly added to the shopping list
    await expect(pageWithRecurrentList.locator('li').filter({ hasText: 'Breaky' }).getByRole('textbox')).toHaveValue(
      'Bananas',
    );
    await expect(pageWithRecurrentList.getByRole('checkbox')).not.toBeChecked();
  });

  test('should remove an item from the shopping list (when clicking on cart)', async ({
    pageWithItemInShoppingList,
  }) => {
    // open the recurrent list
    await pageWithItemInShoppingList.getByRole('button', { name: 'Breaky Strawberries, Oats,' }).click();

    // remove the item from the shopping list
    await pageWithItemInShoppingList.locator('div:nth-child(2) > button').first().click();
    await pageWithItemInShoppingList.locator('.text-primary').first().click();

    // check is shopping list is empty
    await expect(pageWithItemInShoppingList.getByText('Your shopping list is empty,')).toBeVisible();
  });

  test('should remove an bought item from the shopping list (when deleted from recurrent list)', async ({
    pageWithItemInShoppingList,
  }) => {
    // open the shopping list
    await pageWithItemInShoppingList.locator('.text-primary').first().click();

    // mark item as bought
    await pageWithItemInShoppingList.getByRole('checkbox').check();
    await pageWithItemInShoppingList
      .locator('div')
      .filter({ hasText: /^Shopping List$/ })
      .getByRole('button')
      .click();

    // open the recurrent list
    await pageWithItemInShoppingList.getByRole('button', { name: 'Breaky Strawberries, Oats,' }).click();

    // delete the bought item from shopping list
    await pageWithItemInShoppingList.locator('.text-red-500\\/70').first().click();

    // open the shopping list
    await pageWithItemInShoppingList.locator('.text-primary').first().click();

    // check if shopping list is empty
    await expect(pageWithItemInShoppingList.getByText('Your shopping list is empty,')).toBeVisible();
  });

  test('should remove an unbought item from the shopping list (when deleted from recurrent list)', async ({
    pageWithItemInShoppingList,
  }) => {
    // open the recurrent list
    await pageWithItemInShoppingList.getByRole('button', { name: 'Breaky Strawberries, Oats,' }).click();

    // delete the unbought item from shopping list
    await pageWithItemInShoppingList.locator('.text-red-500\\/70').first().click();

    // open the shopping list
    await pageWithItemInShoppingList.locator('.text-primary').first().click();

    // check if shopping list is empty
    await expect(pageWithItemInShoppingList.getByText('Your shopping list is empty,')).toBeVisible();
  });
});

test.describe('last edited texts', () => {
  test('should show "edited a few seconds ago"', async ({ pageWithEmptyRecurrentList }) => {
    // open the list
    await pageWithEmptyRecurrentList.getByRole('button', { name: 'Breaky' }).click();

    // add an item to the list
    await pageWithEmptyRecurrentList.getByPlaceholder('Strawberries').fill('Bananas');
    await pageWithEmptyRecurrentList.getByPlaceholder('Strawberries').press('Enter');

    // check if last edited time is correct
    await expect(pageWithEmptyRecurrentList.getByRole('heading')).toContainText('edited a few seconds ago');
  });

  test('should show "edited a few minutes ago"', async ({ pageWithEmptyRecurrentList }) => {
    // open the list
    await pageWithEmptyRecurrentList.getByRole('button', { name: 'Breaky' }).click();

    // add an item to the list
    await pageWithEmptyRecurrentList.getByPlaceholder('Strawberries').fill('Bananas');
    await pageWithEmptyRecurrentList.getByPlaceholder('Strawberries').press('Enter');

    // close the list
    await pageWithEmptyRecurrentList.locator('.text-1xl').click();

    // virtually set time 2 minutes ahead
    const twoMinutesLater = addMinutes(new Date(), 2);
    await pageWithEmptyRecurrentList.clock.setFixedTime(twoMinutesLater);

    // re-open the list
    await pageWithEmptyRecurrentList.getByRole('button', { name: 'Breaky' }).click();

    // check if last edited time is correct
    await expect(pageWithEmptyRecurrentList.getByRole('heading')).toContainText('edited a few minutes ago');
  });

  test('should show "edited last hour"', async ({ pageWithEmptyRecurrentList }) => {
    // open the list
    await pageWithEmptyRecurrentList.getByRole('button', { name: 'Breaky' }).click();

    // add an item to the list
    await pageWithEmptyRecurrentList.getByPlaceholder('Strawberries').fill('Bananas');
    await pageWithEmptyRecurrentList.getByPlaceholder('Strawberries').press('Enter');

    // close the list
    await pageWithEmptyRecurrentList.locator('.text-1xl').click();

    // virtually set time 12 minutes ahead
    const twelveMinutesLater = addMinutes(new Date(), 12);
    await pageWithEmptyRecurrentList.clock.setFixedTime(twelveMinutesLater);

    // re-open the list
    await pageWithEmptyRecurrentList.getByRole('button', { name: 'Breaky' }).click();

    // check if last edited text is correct
    await expect(pageWithEmptyRecurrentList.getByRole('heading')).toContainText('edited last hour');
  });

  test('should show "edited today"', async ({ pageWithEmptyRecurrentList }) => {
    // open the list
    await pageWithEmptyRecurrentList.getByRole('button', { name: 'Breaky' }).click();

    // add an item to the list
    await pageWithEmptyRecurrentList.getByPlaceholder('Strawberries').fill('Bananas');
    await pageWithEmptyRecurrentList.getByPlaceholder('Strawberries').press('Enter');

    // close the list
    await pageWithEmptyRecurrentList.locator('.text-1xl').click();

    // virtually set time 62 minutes ahead
    const sixtyTwoMinutesLater = addMinutes(new Date(), 62);
    await pageWithEmptyRecurrentList.clock.setFixedTime(sixtyTwoMinutesLater);

    // re-open the list
    await pageWithEmptyRecurrentList.getByRole('button', { name: 'Breaky' }).click();

    // check if last edited text is correct
    await expect(pageWithEmptyRecurrentList.getByRole('heading')).toContainText('edited today');
  });
});

test.describe('search', () => {
  test('should search for an item in the list', async ({ pageWithRecurrentList }) => {
    // open the list
    await pageWithRecurrentList.getByRole('button', { name: 'Breaky Strawberries, Oats, Joghurt' }).click();

    // add a new item with similar name as existing one
    await pageWithRecurrentList.getByPlaceholder('Strawberries').fill('Strawberry ice cream');
    await pageWithRecurrentList.getByPlaceholder('Strawberries').press('Enter');

    // search for Strawberry and checks if returns correct item
    await pageWithRecurrentList.locator('button:nth-child(3)').first().click();
    await pageWithRecurrentList.getByPlaceholder('Looking for an item ?').click();
    await pageWithRecurrentList.getByPlaceholder('Looking for an item ?').fill('Strawberry');
    await expect(pageWithRecurrentList.getByRole('listitem').getByRole('textbox')).toHaveValue('Strawberry ice cream');

    // search for Strawberries and checks if returns correct item
    await pageWithRecurrentList.getByPlaceholder('Looking for an item ?').click();
    await pageWithRecurrentList.getByPlaceholder('Looking for an item ?').fill('Strawberries');
    await expect(pageWithRecurrentList.getByRole('listitem').getByRole('textbox')).toHaveValue('500 g Strawberries');

    // search for the similar letters in items and checks if returns correct items
    await pageWithRecurrentList.getByPlaceholder('Looking for an item ?').click();
    await pageWithRecurrentList.getByPlaceholder('Looking for an item ?').fill('Strawberr');
    await expect(pageWithRecurrentList.getByRole('textbox').nth(3)).toHaveValue('500 g Strawberries');
    await expect(pageWithRecurrentList.getByRole('textbox').nth(4)).toHaveValue('Strawberry ice cream');
  });
});
