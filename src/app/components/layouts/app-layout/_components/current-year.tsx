'use client'

// Pages are prerendered at build time, so a server-side year would stay frozen
// until the next deploy; the client re-evaluates it on hydration
// (https://react.dev/reference/react-dom/client/hydrateRoot#suppressing-unavoidable-hydration-mismatch-errors)
export const CurrentYear = () => (
  <span suppressHydrationWarning>{new Date().getFullYear()}</span>
)
