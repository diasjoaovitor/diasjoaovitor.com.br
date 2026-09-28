import react from '@vitejs/plugin-react'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  plugins: [react()],
  resolve: {
    tsconfigPaths: true
  },
  test: {
    environment: 'jsdom',
    // A timezone behind UTC, so date-only frontmatter formatted without `timeZone: 'UTC'` shows the
    // previous day on any machine, CI (UTC) included
    env: { TZ: 'America/Sao_Paulo' },
    include: ['src/**/*.test.{ts,tsx}']
  }
})
