import { test as base } from '@playwright/test';

/**
 * Extend base test with page with a pre-filled recurrent list
 */
export const test = base.test.extend({
  pageWithRecurrentList: async ({ page }, use) => {
    // Go to the main page
    await page.goto('http://localhost:5173/GroceriesApp/ ');

    // Click the button to create a new recurrent list
    await page.getByRole('button').nth(2).click();

    // Write the title
    await page.getByPlaceholder('Title').click();
    await page.getByPlaceholder('Title').fill('Breaky');

    // Add items
    // await page.getByPlaceholder('Strawberries').click();
    await page.getByPlaceholder('Strawberries').fill('500 g Strawberries');
    await page.getByPlaceholder('Strawberries').press('Enter');

    await page.getByPlaceholder('Strawberries').fill('1kg Oats');
    await page.getByPlaceholder('Strawberries').press('Enter');

    await page.getByPlaceholder('Strawberries').fill('4 Joghurts');
    await page.getByPlaceholder('Strawberries').press('Enter');

    // Go back to the main page
    await page.locator('.text-1xl').click();

    // Use the fixture in the test
    await use(page);
  },

  pageWithTwoRecurrentLists: async ({ page }, use) => {
    // Go to the main page
    await page.goto('http://localhost:5173/GroceriesApp/ ');

    // Click the button to create the first recurrent list
    await page.getByRole('button').nth(2).click();

    // Write the title
    await page.getByPlaceholder('Title').click();
    await page.getByPlaceholder('Title').fill('Breaky');

    // Add items
    await page.getByPlaceholder('Strawberries').fill('500 g Strawberries');
    await page.getByPlaceholder('Strawberries').press('Enter');

    // Go back to the main page
    await page.locator('.text-1xl').click();

    // Click the button to create the second recurrent list
    await page.getByRole('button').nth(2).click();

    // Write the title
    await page.getByPlaceholder('Title').click();
    await page.getByPlaceholder('Title').fill('Lunch');

    // Add items
    await page.getByPlaceholder('Strawberries').fill('300 g Pasta');
    await page.getByPlaceholder('Strawberries').press('Enter');

    // Go back to the main page
    await page.locator('.text-1xl').click();

    // Use the fixture in the test
    await use(page);
  },

  pageWithSimilarRecurrentListsName: async ({ page }, use) => {
    // Go to the main page
    await page.goto('http://localhost:5173/GroceriesApp/ ');

    // Click the button to create the first recurrent list
    await page.getByRole('button').nth(2).click();

    // Write the title
    await page.getByPlaceholder('Title').click();
    await page.getByPlaceholder('Title').fill('Breaky');

    // Add items
    await page.getByPlaceholder('Strawberries').fill('500 g Strawberries');
    await page.getByPlaceholder('Strawberries').press('Enter');

    // Go back to the main page
    await page.locator('.text-1xl').click();

    // Click the button to create the first recurrent list
    await page.getByRole('button').nth(2).click();

    // Write the title
    await page.getByPlaceholder('Title').click();
    await page.getByPlaceholder('Title').fill('BreakyWeekEnd');

    // Add items
    await page.getByPlaceholder('Strawberries').fill('5 Croissant');
    await page.getByPlaceholder('Strawberries').press('Enter');

    // Go back to the main page
    await page.locator('.text-1xl').click();

    // Click the button to create the second recurrent list
    await page.getByRole('button').nth(2).click();

    // Write the title
    await page.getByPlaceholder('Title').click();
    await page.getByPlaceholder('Title').fill('Lunch');

    // Add items
    await page.getByPlaceholder('Strawberries').fill('300 g Pasta');
    await page.getByPlaceholder('Strawberries').press('Enter');

    // Go back to the main page
    await page.locator('.text-1xl').click();

    // Use the fixture in the test
    await use(page);
  },

  pageWithSameItemInDifferentLists: async ({ page }, use) => {
    // Go to the main page
    await page.goto('http://localhost:5173/GroceriesApp/ ');

    // Click the button to create the first recurrent list
    await page.getByRole('button').nth(2).click();

    // Write the title
    await page.getByPlaceholder('Title').click();
    await page.getByPlaceholder('Title').fill('Breaky');

    // Add items
    await page.getByPlaceholder('Strawberries').fill('500 g Strawberries');
    await page.getByPlaceholder('Strawberries').press('Enter');

    // Go back to the main page
    await page.locator('.text-1xl').click();

    // Click the button to create the first recurrent list
    await page.getByRole('button').nth(2).click();

    // Write the title
    await page.getByPlaceholder('Title').click();
    await page.getByPlaceholder('Title').fill('Fruits');

    // Add items
    await page.getByPlaceholder('Strawberries').fill('200 g Strawberries');
    await page.getByPlaceholder('Strawberries').press('Enter');

    // Go back to the main page
    await page.locator('.text-1xl').click();

    // Click the button to create the second recurrent list
    await page.getByRole('button').nth(2).click();

    // Write the title
    await page.getByPlaceholder('Title').click();
    await page.getByPlaceholder('Title').fill('Lunch');

    // Add items
    await page.getByPlaceholder('Strawberries').fill('300 g Pasta');
    await page.getByPlaceholder('Strawberries').press('Enter');

    // Go back to the main page
    await page.locator('.text-1xl').click();

    // Use the fixture in the test
    await use(page);
  },

  
});
