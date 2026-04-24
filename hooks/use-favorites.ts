"use client"

import { useCallback, useEffect, useState } from "react"

const STORAGE_KEY = "primeurban:favorites"
const STORAGE_EVENT = "primeurban:favorites:changed"

function readFavorites(): string[] {
  if (typeof window === "undefined") return []
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed.filter((id): id is string => typeof id === "string") : []
  } catch {
    return []
  }
}

function writeFavorites(ids: string[]) {
  if (typeof window === "undefined") return
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(ids))
  window.dispatchEvent(new CustomEvent(STORAGE_EVENT))
}

export function useFavorites() {
  const [favorites, setFavorites] = useState<string[]>([])
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    setFavorites(readFavorites())
    setHydrated(true)

    const sync = () => setFavorites(readFavorites())
    window.addEventListener(STORAGE_EVENT, sync)
    window.addEventListener("storage", sync)
    return () => {
      window.removeEventListener(STORAGE_EVENT, sync)
      window.removeEventListener("storage", sync)
    }
  }, [])

  const isFavorite = useCallback(
    (id: string) => favorites.includes(id),
    [favorites],
  )

  const toggle = useCallback((id: string) => {
    const current = readFavorites()
    const next = current.includes(id) ? current.filter((x) => x !== id) : [...current, id]
    writeFavorites(next)
    setFavorites(next)
    return next.includes(id)
  }, [])

  return { favorites, isFavorite, toggle, hydrated }
}
