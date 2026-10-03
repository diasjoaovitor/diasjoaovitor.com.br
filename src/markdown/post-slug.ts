const postFileName = /^(\d{4}-\d{2}-\d{2})-(.+)$/

export const getPostSlug = (fileName: string, date: Date) => {
  const match = postFileName.exec(fileName)
  if (!match) {
    throw new Error(
      `Post file name "${fileName}" must start with its date (YYYY-MM-DD-<slug>)`
    )
  }
  const [, fileDate, slug] = match
  const frontmatterDate = date.toISOString().slice(0, 10)
  if (fileDate !== frontmatterDate) {
    throw new Error(
      `Post file name "${fileName}" starts with ${fileDate}, but its frontmatter date is ${frontmatterDate}`
    )
  }
  return slug
}
