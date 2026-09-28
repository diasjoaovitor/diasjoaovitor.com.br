import { expect, test } from '@playwright/test'

// `next dev` serves drafts, so the draft fixture is reachable here
test('renders a post with its title, highlighted code and footnotes', async ({
  page
}) => {
  await page.goto('/blog/markdown-fixture')
  await expect(page).toHaveTitle('Markdown fixture — João Vitor')
  await expect(page.locator('pre[data-language="ts"]')).toBeVisible()
  await expect(
    page.getByRole('link', { name: 'Voltar à referência 1' })
  ).toBeAttached()
})
