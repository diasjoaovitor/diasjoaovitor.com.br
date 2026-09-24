import { expect, type Page, test } from '@playwright/test'

const html = (page: Page) => page.locator('html')

for (const colorScheme of ['light', 'dark'] as const) {
  test.describe(`system preference: ${colorScheme}`, () => {
    test.use({ colorScheme })

    test('first visit follows the system preference', async ({ page }) => {
      await page.goto('/')
      await expect(html(page)).toHaveClass(
        new RegExp(String.raw`\b${colorScheme}\b`)
      )
      await expect(html(page)).toHaveCSS('color-scheme', colorScheme)
    })
  })
}

test.describe('chosen theme', () => {
  test.use({ colorScheme: 'light' })

  test('persists across reloads', async ({ page }) => {
    await page.goto('/')
    await expect(html(page)).toHaveClass(/\blight\b/)

    await page.evaluate(() => localStorage.setItem('theme', 'dark'))
    await page.reload()
    await expect(html(page)).toHaveClass(/\bdark\b/)
    await expect(html(page)).not.toHaveClass(/\blight\b/)

    await page.reload()
    await expect(html(page)).toHaveClass(/\bdark\b/)
  })

  test('is applied before the first paint', async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.setItem('theme', 'dark')
      requestAnimationFrame(() => {
        sessionStorage.setItem(
          'first-paint-class',
          document.documentElement.className
        )
      })
    })
    await page.goto('/')
    await expect
      .poll(() =>
        page.evaluate(() => sessionStorage.getItem('first-paint-class'))
      )
      .toMatch(/\bdark\b/)
  })
})

test.describe('theme toggle', () => {
  test.use({ colorScheme: 'light' })

  test('switches the theme from the keyboard and persists it', async ({
    page
  }) => {
    await page.goto('/')
    const toDark = page.getByRole('button', { name: 'Ativar tema escuro' })
    await toDark.focus()
    await page.keyboard.press('Enter')

    await expect(html(page)).toHaveClass(/\bdark\b/)
    await expect(html(page)).toHaveCSS('color-scheme', 'dark')

    await page.reload()
    await expect(html(page)).toHaveClass(/\bdark\b/)

    await page.getByRole('button', { name: 'Ativar tema claro' }).click()
    await expect(html(page)).toHaveClass(/\blight\b/)
    await expect(html(page)).toHaveCSS('color-scheme', 'light')
  })
})
