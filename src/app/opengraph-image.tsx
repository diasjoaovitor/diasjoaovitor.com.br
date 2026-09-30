import { ImageResponse } from 'next/og'

import { ogImageSize, siteName } from '@/app/helpers/site'

// Hex equivalents of the dark theme tokens in globals.css: ImageResponse doesn't resolve CSS variables or oklch()
const colors = {
  background: '#0a0a0a',
  foreground: '#fafafa',
  muted: '#a1a1a1',
  primary: '#00d5be'
}

export const size = ogImageSize

export const contentType = 'image/png'

const OpengraphImage = () =>
  new ImageResponse(
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        gap: 24,
        width: '100%',
        height: '100%',
        padding: 96,
        background: colors.background,
        color: colors.foreground
      }}
    >
      <div style={{ display: 'flex', gap: 16, fontSize: 32 }}>
        <span style={{ color: colors.primary }}>$</span>
        <span style={{ color: colors.muted }}>whoami</span>
      </div>
      <div style={{ display: 'flex', fontSize: 40, color: colors.muted }}>
        Olá! Meu nome é&nbsp;
        <span style={{ color: colors.primary }}>João Vitor</span>&nbsp;e sou
      </div>
      <div style={{ display: 'flex', gap: 32, fontSize: 76 }}>
        <span style={{ color: colors.primary }}>&gt;</span>
        <span>Desenvolvedor Fullstack</span>
      </div>
      <div
        style={{
          display: 'flex',
          marginTop: 48,
          fontSize: 32,
          color: colors.muted
        }}
      >
        {siteName}
      </div>
    </div>,
    size
  )

export default OpengraphImage

export { siteTitle as alt } from '@/app/helpers/site'
