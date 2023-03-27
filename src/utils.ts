export const download = (filename: string, text: string) => {
  const element = document.createElement("a")
  const blob = new Blob([text], { type: "text/plain;charset=utf-8" })
  element.href = URL.createObjectURL(blob)
  element.download = filename
  element.click()
  URL.revokeObjectURL(element.href)
}

export const convertConversationToMarkdown = (
  conversation: ChatGPT.Conversation
) => {
  let result = `# ${conversation.title}\n\n`

  for (const item of Object.values(conversation.mapping)) {
    if (!item.message) {
      continue
    }
    const { author, content } = item.message
    if (content.content_type === "text") {
      const contentText = content.parts.join("\n\n")
      if (contentText) {
        result += `## ${author.role}\n\n`
        result += `${contentText}\n\n`
      }
    }
  }

  return result
}
