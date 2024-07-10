import { test, expect } from './fixtures/recurrent-list.spec.js';

test.todo('should open/close the shopping list page properly', async ({ pageWithRecurrentList }) => {});

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
