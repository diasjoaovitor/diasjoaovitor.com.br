export const siteUrl = process.env.SITE_URL || 'https://diasjoaovitor.com.br'

export const siteName = 'diasjoaovitor.com.br'

export const siteTitle = 'João Vitor — Desenvolvedor Fullstack'

export const siteDescription =
  'Anotações técnicas sobre desenvolvimento fullstack, escritas por João Vitor.'

export const ogImageSize = { width: 1200, height: 630 }

export const ogImage = {
  url: '/opengraph-image',
  ...ogImageSize,
  alt: siteTitle
}

// Next.js merges `openGraph` shallowly and a page's `openGraph` drops the file-based image, so each page spreads these instead of inheriting them
export const openGraphDefaults = {
  siteName,
  locale: 'pt_BR',
  images: [ogImage]
}
