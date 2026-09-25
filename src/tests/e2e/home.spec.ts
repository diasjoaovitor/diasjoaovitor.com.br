import { expect, test } from '@playwright/test'

test('renders the introduction', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByText('João Vitor', { exact: true })).toBeVisible()
  const heading = page.getByRole('heading', { level: 1 })
  await expect(heading).toHaveCount(1)
  await expect(heading).toHaveAccessibleName('Desenvolvedor Fullstack')
  await expect(
    page
      .locator('h1 [aria-hidden]')
      .getByText('Desenvolvedor Fullstack', { exact: true })
      .filter({ visible: true })
  ).toBeVisible()
})

test('renders the skills section', async ({ page }) => {
  await page.goto('/')
  const section = page.getByRole('region', { name: 'skills' })
  await expect(section.getByRole('heading', { level: 2 })).toBeVisible()
  await expect(section.getByRole('listitem').first()).toHaveText('Next')
})

test('shows the full role without typing when motion is reduced', async ({
  page
}) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.goto('/')
  await expect(
    page
      .locator('h1 [aria-hidden]')
      .getByText('Desenvolvedor Fullstack', { exact: true })
      .filter({ visible: true })
  ).toBeVisible()
  await expect(
    page.getByRole('region', { name: 'skills' }).getByRole('list')
  ).toBeVisible()
})

test('exposes Open Graph metadata', async ({ page }) => {
  await page.goto('/')
  await expect(page.locator('meta[property="og:url"]')).toHaveAttribute(
    'content',
    'https://diasjoaovitor.com.br'
  )
  await expect(page.locator('meta[property="og:locale"]')).toHaveAttribute(
    'content',
    'pt_BR'
  )
})
