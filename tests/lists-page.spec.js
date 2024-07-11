import { test } from './fixtures/recurrent-list.js';
import { expect } from '@playwright/test';

test('should have one recurrent list with items', async ({ pageWithRecurrentList }) => {
  const recurrentList = pageWithRecurrentList.getByRole('button', { name: 'Breaky Strawberries, Oats, Joghurt' });

  await expect(recurrentList).toBeVisible();
});

test('should change the name of the list Breakie to Breakfast', async ({ pageWithRecurrentList }) => {

  // Opens the recurent list
  await pageWithRecurrentList.getByRole('button', { name: 'Breaky Strawberries, Oats, Joghurt' }).click()

  // Clicks on the title
  await pageWithRecurrentList.getByPlaceholder('Title').click();

  // Changes title to Breakfast
  await pageWithRecurrentList.getByPlaceholder('Title').fill('Breakfast');
  await pageWithRecurrentList.getByPlaceholder('Title').press('Enter');

  // Returns to recurrent lists to save
  await pageWithRecurrentList.locator('.text-1xl').click();
})