import { useMemo } from "react"
import { usePathnameChangeListener } from "./usePathnameChangeListener"

export const useConversationId = () => {
  const pathname = usePathnameChangeListener()
  return useMemo(() => {
    if (!pathname.startsWith("/chat/")) {
      return null
    }

    const path = pathname.split("/chat/").pop()

    if (!path || path.startsWith("?")) {
      return null
    }

    return path
  }, [pathname])
}
