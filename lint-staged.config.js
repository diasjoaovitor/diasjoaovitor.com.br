import path from 'node:path'

const relativeFiles = (filenames) =>
  filenames.map((file) => path.relative(process.cwd(), file)).join(' ')

const prettier = (filenames) =>
  `pnpm exec prettier --write ${relativeFiles(filenames)}`

const eslint = (filenames) =>
  `pnpm exec eslint --fix ${relativeFiles(filenames)}`

export default {
  '*.{js,jsx,ts,tsx,mjs,cjs}': [eslint, prettier],
  '*.{json,md}': [eslint, prettier],
  '*.{yml,yaml}': [prettier]
}
