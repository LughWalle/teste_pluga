import { useState, useEffect } from 'react'

const STORAGE_KEY = process.env.REACT_APP_STORAGE_KEY

export const useLastViewed = () => {
  const [last, setLast] = useState([])

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) setLast(JSON.parse(raw))
    } catch {}
  }, [])

  function push(tool) {
    try {
      const filtered = [tool, ...last.filter(t => t.id !== tool.id)].slice(0, 10)
      setLast(filtered)
      localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered))
    } catch {}
  }

  return { lastViewed: last, pushLastViewed: push }
}
