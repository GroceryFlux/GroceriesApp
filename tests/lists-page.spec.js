import { test, expect } from './fixtures/recurrent-list.spec.js';

test('should have one recurrent list with items', async ({ pageWithRecurrentList }) => {
  const recurrentList = pageWithRecurrentList.getByRole('button', { name: 'Breaky Strawberries, Oats, Joghurt' });

  await expect(recurrentList).toBeVisible();
});
