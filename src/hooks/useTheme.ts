import { useCallback, useEffect, useState } from 'react'

export type Theme = 'light' | 'dark'

const STORAGE_KEY = 'theme'

/**
 * Reads the theme set by the inline script in index.html (so there's no flash),
 * and lets the visitor switch it. The choice is saved; storage may be blocked,
 * so every access is wrapped in try/catch. (DESIGN.md §2)
 */
export const useTheme = () => {
  const [theme, setTheme] = useState<Theme>(
    () => (document.documentElement.getAttribute('data-theme') as Theme) ?? 'light',
  )

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  const toggleTheme = useCallback(() => {
    setTheme((current) => {
      const next: Theme = current === 'dark' ? 'light' : 'dark'
      try {
        localStorage.setItem(STORAGE_KEY, next)
      } catch {
        // Storage blocked (private mode etc.) — theme still changes for this visit
      }
      return next
    })
  }, [])

  return { theme, toggleTheme }
}
