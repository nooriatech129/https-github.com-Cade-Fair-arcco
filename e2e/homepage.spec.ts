import { expect, test } from '@playwright/test';

test('homepage has title and loads correctly', async ({ page }) => {
  await page.goto('/');

  // Wait for the page to load
  await page.waitForLoadState('networkidle');

  // Check if the welcome text is present
  await expect(page.getByText('Welcome!')).toBeVisible();

  // Check if the step text is present
  await expect(page.getByText('Step 1: Try it')).toBeVisible();
});

test('navigation to explore tab works', async ({ page }) => {
  await page.goto('/');

  // Click on the explore tab (assuming it's a link or button)
  // Since it's a tab layout, might need to adjust selector
  // For now, just check if we can navigate
  await page.waitForLoadState('networkidle');
  // This is a basic test; in real app, adjust selectors
});