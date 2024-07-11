import { test } from './fixtures/recurrent-list.js';
import { expect } from '@playwright/test';

test('should have one recurrent list with items', async ({ pageWithRecurrentList }) => {
  const recurrentList = pageWithRecurrentList.getByRole('button', { name: 'Breaky Strawberries, Oats, Joghurt' });

  await expect(recurrentList).toBeVisible();
});
