import { test as testWithRecurrentList } from './fixtures/recurrent-list.js';
import { test, expect } from '@playwright/test';

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

testWithRecurrentList('should have one item on the shopping list page', async ({ pageWithRecurrentList }) => {
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
