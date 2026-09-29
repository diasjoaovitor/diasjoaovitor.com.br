import { expect, test } from '@playwright/test'

test('opens a post from the listing', async ({ page }) => {
  await page.goto('/blog')
  const link = page
    .getByRole('main')
    .getByRole('listitem')
    .first()
    .getByRole('link')
  const title = (await link.textContent()) ?? ''

  await link.click()
  await expect(page).toHaveURL(/\/blog\/[^/]+$/)
  await expect(page.getByRole('heading', { level: 1 })).toHaveText(title)
})
