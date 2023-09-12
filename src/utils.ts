export async function importMarkdown(id: number, page: number) {
  const file = await import(`./contents/${id}/${page}.md?raw`)
  return file.default as string
}

export function toLocalDateString(date: Date) {
  const year = date.getFullYear()
  const month = date.getMonth()
  const day = date.getDate()
  return `${year} 年 ${month} 月 ${day} 日`
}
