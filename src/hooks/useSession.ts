export const useSession = () => {
  let session: ChatGPT.Session | undefined

  const getSession = async () => {
    if (session && new Date(session.expires).valueOf() < Date.now()) {
      return session
    }
    try {
      const response = await fetch("https://chat.openai.com/api/auth/session", {
        credentials: "include"
      })
      if (response.ok) {
        session = await response.json()
        return session
      } else {
        return { error: "Failed to fetch access token." }
      }
    } catch (error) {
      return { error: error.message }
    }
  }

  return { getSession }
}
