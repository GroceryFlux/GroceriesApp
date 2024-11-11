import { test } from './fixtures/recurrent-list.js';
import { expect } from '@playwright/test';

test.describe('toggle shopping list page', () => {
  test('should open/close the shopping list page properly', async ({ page }) => {
    await page.goto('http://localhost:5173/GroceriesApp/');

    // open the shopping list
    await page.locator('div').filter({ hasText: /^0$/ }).getByRole('button').click();

    // check if the shopping list page has been opened
    await expect(page.getByRole('heading', { name: 'Shopping List' })).toBeVisible();

    // close the shopping list
    await page
      .locator('div')
      .filter({ hasText: /^Shopping List$/ })
      .getByRole('button')
      .click();

    // check if the shopping list page has been closed
    await expect(page.getByRole('heading', { name: 'Shopping List' })).not.toBeVisible();
  });
});

test.describe('toggle bought/unbought items', () => {
  test('should mark an item as bought', async ({ pageWithItemInShoppingList }) => {
    // open the shopping list
    await pageWithItemInShoppingList.locator('div').filter({ hasText: /^1$/ }).getByRole('button').click();

    // mark the item as bought
    await pageWithItemInShoppingList.getByRole('checkbox').check();

    // checks item has correctly been marked as bought
    await expect(
      pageWithItemInShoppingList.locator('li').filter({ hasText: 'Breaky' }).getByRole('textbox'),
    ).toHaveValue('500 g Strawberries');
    await expect(pageWithItemInShoppingList.getByRole('checkbox')).toBeChecked();
    await expect(pageWithItemInShoppingList.locator('#root')).toContainText('Nothing left! 🎉');

    // close the shopping list
    await pageWithItemInShoppingList
      .locator('div')
      .filter({ hasText: /^Shopping List$/ })
      .getByRole('button')
      .click();

    // open the recurrent list
    await pageWithItemInShoppingList.getByRole('button', { name: 'Breaky Strawberries, Oats,' }).click();

    // check if the bag icon is visible
    await expect(pageWithItemInShoppingList.getByTestId('handle-bag-check-icon')).toBeVisible();
  });

  test('should mark an item as unbought', async ({ pageWithItemInShoppingList }) => {
    // open the shopping list
    await pageWithItemInShoppingList.locator('div').filter({ hasText: /^1$/ }).getByRole('button').click();

    // mark the item as bought
    await pageWithItemInShoppingList.getByRole('checkbox').check();

    // check if the item has been marked as bought
    await expect(pageWithItemInShoppingList.getByRole('checkbox')).toBeChecked();

    // mark the item as unbought
    await pageWithItemInShoppingList.getByRole('checkbox').uncheck();

    // check if the correct item has been marked as unbought correctly
    await expect(pageWithItemInShoppingList.getByRole('textbox')).toHaveValue('500 g Strawberries');
    await expect(pageWithItemInShoppingList.getByRole('checkbox')).not.toBeChecked();
  });
});

test.describe('toggle show/hide bought items', () => {
  test('should hide bought items', async ({ pageWithItemInShoppingList }) => {
    // open the recurrent list
    await pageWithItemInShoppingList.getByRole('button', { name: 'Breaky Strawberries, Oats,' }).click();

    // add another item ('Oats') to the shopping list
    await pageWithItemInShoppingList.locator('li:nth-child(2) > div > div:nth-child(2) > button').first().click();

    // open the shopping list
    await pageWithItemInShoppingList.locator('.text-primary').first().click();

    // mark the items as bought
    await pageWithItemInShoppingList.getByRole('checkbox').nth(0).check();
    await pageWithItemInShoppingList.getByRole('checkbox').nth(1).check();

    // hide bought items
    await pageWithItemInShoppingList
      .locator('div')
      .filter({ hasText: /^Purchased$/ })
      .getByRole('button')
      .click();

    // check if bought items are hidden
    await expect(
      pageWithItemInShoppingList
        .locator('div')
        .filter({ hasText: /^PurchasedBreaky$/ })
        .getByRole('textbox'),
    ).toHaveCount(0);
  });

  test('should show bought items', async ({ pageWithItemInShoppingList }) => {
    // open the recurrent list
    await pageWithItemInShoppingList.getByRole('button', { name: 'Breaky Strawberries, Oats,' }).click();

    // add another item ('Oats') to the shopping list
    await pageWithItemInShoppingList.locator('li:nth-child(2) > div > div:nth-child(2) > button').first().click();

    // open the shopping list
    await pageWithItemInShoppingList.locator('.text-primary').first().click();

    // mark the items as bought
    await pageWithItemInShoppingList.getByRole('checkbox').nth(0).check();
    await pageWithItemInShoppingList.getByRole('checkbox').nth(1).check();

    // hide bought items
    await pageWithItemInShoppingList
      .locator('div')
      .filter({ hasText: /^Purchased$/ })
      .getByRole('button')
      .click();

    // check if bought items are hidden
    await expect(
      pageWithItemInShoppingList
        .locator('div')
        .filter({ hasText: /^PurchasedBreaky$/ })
        .getByRole('textbox'),
    ).toHaveCount(0);

    // show bought items
    await pageWithItemInShoppingList
      .locator('div')
      .filter({ hasText: /^Purchased$/ })
      .getByRole('button')
      .click();

    // check if bought items are shown
    await expect(pageWithItemInShoppingList.getByRole('textbox').nth(5)).toHaveValue('500 g Strawberries');
    await expect(pageWithItemInShoppingList.getByRole('textbox').nth(6)).toHaveValue('1 kg Oats');
  });
});

test.describe('clear the shopping list', () => {
  test('should clear the shopping list with one unbought item', async ({ pageWithItemInShoppingList }) => {
    // open the shopping list
    await pageWithItemInShoppingList.locator('.text-primary').first().click();

    // clear the list then checks if correctly cleared
    await pageWithItemInShoppingList.getByRole('button', { name: 'Clear list' }).click();
    await expect(pageWithItemInShoppingList.getByRole('paragraph')).toContainText(
      'Your shopping list is empty, please start adding items in your recurrent lists',
    );
  });

  test('should clear the shopping list with multiple items', async ({ pageWithItemInShoppingList }) => {
    // open the recurrent list
    await pageWithItemInShoppingList.getByRole('button', { name: 'Breaky Strawberries, Oats,' }).click();

    // add another item to shopping list
    await pageWithItemInShoppingList.locator('li:nth-child(2) > div > div:nth-child(2) > button').first().click();

    // open the shopping list
    await pageWithItemInShoppingList.locator('.text-primary').first().click();

    // mark the item as bought
    await pageWithItemInShoppingList.getByRole('checkbox').nth(1).check();

    // clear the list then checks if correctly cleared
    await pageWithItemInShoppingList.getByRole('button', { name: 'Clear list' }).click();
    await expect(pageWithItemInShoppingList.getByRole('paragraph')).toContainText(
      'Your shopping list is empty, please start adding items in your recurrent lists',
    );
  });
});

test.describe('associated lists', () => {
  test('should have one associated list per item', async ({ pageWithTwoRecurrentLists }) => {
    // open the recurrent list 'Lunch'
    await pageWithTwoRecurrentLists.getByRole('button', { name: 'Lunch Pasta' }).click();

    // add the item Pasta to the shopping list
    await pageWithTwoRecurrentLists.getByRole('listitem').getByRole('button').first().click();

    // close the recurrent list 'Lunch'
    await pageWithTwoRecurrentLists.locator('.text-1xl').click();

    // open the recurrent list 'Breaky'
    await pageWithTwoRecurrentLists.getByRole('button', { name: 'Breaky Strawberries' }).click();

    // add the item Strawberries to the shopping list
    await pageWithTwoRecurrentLists.getByRole('listitem').getByRole('button').first().click();

    // open the shopping list
    await pageWithTwoRecurrentLists.locator('.text-primary').first().click();

    // check that the associated list is correct for 'Pasta'
    await expect(pageWithTwoRecurrentLists.locator('li').filter({ hasText: 'Lunch' }).getByRole('textbox')).toHaveValue(
      '300 g Pasta',
    );
    await expect(pageWithTwoRecurrentLists.getByTestId('associated-lists').first()).toContainText('Lunch');

    // check that the associated list is correct for 'Strawberries'
    await expect(
      pageWithTwoRecurrentLists.locator('li').filter({ hasText: 'Breaky' }).getByRole('textbox'),
    ).toHaveValue('500 g Strawberries');
    await expect(pageWithTwoRecurrentLists.getByTestId('associated-lists').nth(1)).toContainText('Breaky');
  });

  test('should have multiple associated lists', async ({ pageWithTwoRecurrentLists }) => {
    // open the recurrent list 'Lunch'
    await pageWithTwoRecurrentLists.getByRole('button', { name: 'Lunch Pasta' }).click();

    // add the item Pasta to the shopping list
    await pageWithTwoRecurrentLists.getByRole('listitem').getByRole('button').first().click();

    // close the recurrent list 'Lunch'
    await pageWithTwoRecurrentLists.locator('.text-1xl').click();

    // open the recurrent list 'Breaky'
    await pageWithTwoRecurrentLists.getByRole('button', { name: 'Breaky Strawberries' }).click();

    // add item '300 g Pasta'
    await pageWithTwoRecurrentLists.getByPlaceholder('Strawberries').click();
    await pageWithTwoRecurrentLists.getByPlaceholder('Strawberries').fill('300 g Pasta');
    await pageWithTwoRecurrentLists.getByPlaceholder('Strawberries').press('Enter');

    // add item '300 g Pasta' to shopping list
    await pageWithTwoRecurrentLists.getByRole('list').getByRole('button').nth(2).click();

    // open the shopping list
    await pageWithTwoRecurrentLists.locator('.text-primary').first().click();

    // check if Pasta item is correctly associated with both 'Lunch' and 'Breaky'
    await expect(
      pageWithTwoRecurrentLists.locator('li').filter({ hasText: 'Lunch, Breaky' }).getByRole('textbox'),
    ).toHaveValue('600 g Pasta');
    await expect(pageWithTwoRecurrentLists.getByTestId('associated-lists')).toContainText('Lunch, Breaky');
  });
});
