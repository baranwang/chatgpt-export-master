import { useState, useEffect } from "react"

export const usePathnameChangeListener = () => {
  const [pathname, setPathname] = useState(window.location.pathname)

  useEffect(() => {
    function handleUrlChange() {
      setPathname(window.location.pathname)
    }

    window.addEventListener("popstate", handleUrlChange)

    return () => {
      window.removeEventListener("popstate", handleUrlChange)
    }
  }, [])

  return pathname
}
