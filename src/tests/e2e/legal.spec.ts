import { expect, test } from '@playwright/test'

const pages = [
  { link: 'Termos de uso', heading: 'Termos de Uso', url: '/termos-de-uso' },
  {
    link: 'Privacidade',
    heading: 'Política de Privacidade',
    url: '/politica-de-privacidade'
  }
]

for (const { link, heading, url } of pages) {
  test(`reaches the ${url} page from the footer`, async ({ page }) => {
    await page.goto('/')
    const footerLink = page
      .getByRole('contentinfo')
      .getByRole('navigation', { name: 'Legal' })
      .getByRole('link', { name: link })
    await footerLink.click()
    await page.waitForURL(url)
    await expect(footerLink).toHaveAttribute('aria-current', 'page')
    await expect(
      page.getByRole('heading', { level: 1, name: heading })
    ).toBeVisible()
  })
}
