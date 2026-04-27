"use client"

import { useState, useEffect } from "react"
import { MessageCircle } from "lucide-react"
import { buildWhatsAppUrl } from "@/lib/site-config"

export function WhatsAppFloat() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 200)
    }

    window.addEventListener("scroll", handleScroll)
    handleScroll()

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  const handleClick = () => {
    window.open(buildWhatsAppUrl(), "_blank")
  }

  if (!isVisible) return null

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-6 right-6 z-50 group w-14 h-14 md:w-16 md:h-16 bg-[var(--whatsapp)] hover:bg-[var(--whatsapp-hover)] rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110"
      aria-label="Falar pelo WhatsApp"
    >
      <MessageCircle className="h-7 w-7 md:h-8 md:w-8 text-white" />
      <span className="absolute inset-0 rounded-full bg-[var(--whatsapp)] animate-ping opacity-25" />
    </button>
  )
}
