"use client"

import { Share2, Heart } from "lucide-react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { useFavorites } from "@/hooks/use-favorites"

interface PropertyDetailActionsProps {
  propertyId: string
  propertyTitle: string
}

export function PropertyDetailActions({ propertyId, propertyTitle }: PropertyDetailActionsProps) {
  const { isFavorite, toggle, hydrated } = useFavorites()
  const favorited = hydrated && isFavorite(propertyId)

  const handleShare = async () => {
    if (typeof window === "undefined") return
    const shareData = {
      title: propertyTitle,
      text: `Confira este imóvel: ${propertyTitle}`,
      url: window.location.href,
    }

    if (typeof navigator.share === "function") {
      try {
        await navigator.share(shareData)
        return
      } catch (err) {
        if ((err as DOMException)?.name === "AbortError") return
        // fall through to clipboard
      }
    }

    try {
      await navigator.clipboard.writeText(shareData.url)
      toast.success("Link copiado", {
        description: "Cole onde quiser compartilhar.",
      })
    } catch {
      toast.error("Não foi possível copiar o link")
    }
  }

  const handleFavorite = () => {
    const nowFavorited = toggle(propertyId)
    if (nowFavorited) {
      toast.success("Adicionado aos favoritos")
    } else {
      toast("Removido dos favoritos")
    }
  }

  return (
    <div className="flex items-center gap-2">
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={handleShare}
        className="border-border/50 min-h-[44px] bg-transparent"
      >
        <Share2 className="h-4 w-4 mr-2" />
        Compartilhar
      </Button>
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={handleFavorite}
        aria-pressed={favorited}
        className="border-border/50 min-h-[44px] bg-transparent"
      >
        <Heart
          className={`h-4 w-4 mr-2 ${favorited ? "fill-current text-secondary" : ""}`}
        />
        {favorited ? "Favoritado" : "Favoritar"}
      </Button>
    </div>
  )
}
