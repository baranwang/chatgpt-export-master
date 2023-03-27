declare namespace ChatGPT {
  interface User {
    id: string
    name: string
    email: string
    image: string
    picture: string
    groups: unknown[]
  }

  interface Session {
    user: User
    expires: string
    accessToken: string
  }

  type Metadata = any

  interface Author {
    role: "system" | "assistant" | "user"
    metadata: Metadata
  }

  interface MessageContent {
    content_type: string
    parts: string[]
  }

  interface Message {
    id: string
    author: Author
    create_time: number
    content: MessageContent
    end_turn: boolean
    weight: number
    metadata: Metadata
    recipient: string
  }

  interface ConversationItem {
    id: string
    message?: Message
    parent?: string
    children: string[]
  }

  interface Conversation {
    title: string
    create_time: number
    mapping: Record<string, ConversationItem>
    moderation_results: any[]
    current_node: string
  }
}
