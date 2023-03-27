import { useCallback } from "react"
import { useConversationId } from "./useConversationId"
import { useSession } from "./useSession"

export const useConversationData = () => {
  const conversationId = useConversationId()

  const { getSession } = useSession()

  const getConversationData = useCallback(async () => {
    const sessionResp = await getSession()
    if ("error" in sessionResp) {
      return
    }
    const data = await fetch(
      `https://chat.openai.com/backend-api/conversation/${conversationId}`,
      {
        headers: {
          Authorization: `Bearer ${sessionResp.accessToken}`
        }
      }
    ).then((res) => res.json() as Promise<ChatGPT.Conversation>)
    return data
  }, [conversationId])

  return {
    conversationId,
    getConversationData
  }
}
