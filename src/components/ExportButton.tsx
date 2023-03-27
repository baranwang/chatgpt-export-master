import { useCallback, useState } from "react"
import { useConversationData } from "~hooks"
import { convertConversationToMarkdown, download } from "~utils"
import { ExportDropdown } from "./ExportDropdown"

const exportTypes = ["Markdown", "JSON"] as const

export const ExportButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)

  const toggleDropdown = () => {
    setIsOpen((value) => !value)
  }

  const { conversationId, getConversationData } = useConversationData()

  const handleExport = useCallback(
    async (type: (typeof exportTypes)[number]) => {
      toggleDropdown()
      const data = await getConversationData()
      if (type === "JSON") {
        download(`${conversationId}.json`, JSON.stringify(data))
      } else if (type === "Markdown") {
        download(`${conversationId}.md`, convertConversationToMarkdown(data))
      }
    },
    [conversationId]
  )

  if (!conversationId) {
    return null
  }

  return (
    <div className="relative">
      {isOpen && (
        <ExportDropdown exportTypes={exportTypes} onExport={handleExport} />
      )}
      <button
        className="btn  btn-neutral border-0 md:border"
        onClick={toggleDropdown}>
        <div className="flex w-full items-center justify-center gap-2">
          <svg
            stroke="currentColor"
            fill="none"
            strokeWidth="1.5"
            viewBox="0 0 24 24"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-3 w-3"
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg">
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
            <polyline points="15 3 21 3 21 9" />
            <line x1="10" y1="14" x2="21" y2="3" />
          </svg>
          Export conversation
        </div>
      </button>
    </div>
  )
}
