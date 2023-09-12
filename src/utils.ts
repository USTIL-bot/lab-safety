export async function importMarkdown(id: number, page: number) {
  const file = await import(`./contents/${id}/${page}.md?raw`)
  return file.default as string
}
