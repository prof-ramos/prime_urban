"use client"

import { useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, X, Expand } from "lucide-react"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

interface PropertyGalleryProps {
  images: string[]
  title: string
}

export function PropertyGallery({ images, title }: PropertyGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isFullscreen, setIsFullscreen] = useState(false)

  const displayImages = images.length > 0 ? images : ["/placeholder-property.jpg"]

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? displayImages.length - 1 : prev - 1))
  }

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === displayImages.length - 1 ? 0 : prev + 1))
  }

  return (
    <>
      {/* Main Gallery */}
      <div className="relative">
        {/* Main Image */}
        <div className="relative aspect-[16/10] md:aspect-[16/9] rounded-xl overflow-hidden bg-muted">
          <Image
            src={displayImages[currentIndex] || "/placeholder.svg"}
            alt={`${title} - Foto ${currentIndex + 1}`}
            fill
            className="object-cover"
            priority
          />

          {/* Navigation Arrows */}
          {displayImages.length > 1 && (
            <>
              <button
                type="button"
                onClick={goToPrevious}
                className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/90 hover:bg-white shadow-lg transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center focus-ring"
                aria-label="Foto anterior"
              >
                <ChevronLeft className="h-6 w-6 text-primary" />
              </button>
              <button
                type="button"
                onClick={goToNext}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/90 hover:bg-white shadow-lg transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center focus-ring"
                aria-label="Próxima foto"
              >
                <ChevronRight className="h-6 w-6 text-primary" />
              </button>
            </>
          )}

          {/* Fullscreen Button */}
          <Dialog open={isFullscreen} onOpenChange={setIsFullscreen}>
            <DialogTrigger
              type="button"
              className="absolute bottom-3 right-3 p-2 rounded-lg bg-white/90 hover:bg-white shadow-lg transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center focus-ring"
              aria-label="Ver em tela cheia"
            >
              <Expand className="h-5 w-5 text-primary" />
            </DialogTrigger>

            <DialogContent
              showCloseButton={false}
              className="top-0 left-0 translate-x-0 translate-y-0 w-screen h-screen max-w-none rounded-none border-0 p-0 bg-black/95 grid-cols-1 grid-rows-1"
            >
              <DialogTitle className="sr-only">Galeria de fotos: {title}</DialogTitle>
              <DialogDescription className="sr-only">
                Foto {currentIndex + 1} de {displayImages.length}
              </DialogDescription>

              <div className="relative w-full h-full flex items-center justify-center p-4">
                <Image
                  src={displayImages[currentIndex] || "/placeholder.svg"}
                  alt={`${title} - Foto ${currentIndex + 1}`}
                  fill
                  className="object-contain"
                />

                <DialogClose
                  className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white min-h-[44px] min-w-[44px] flex items-center justify-center z-10 focus-ring"
                  aria-label="Fechar galeria"
                >
                  <X className="h-6 w-6" />
                </DialogClose>

                {displayImages.length > 1 && (
                  <>
                    <button
                      type="button"
                      onClick={goToPrevious}
                      className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white min-h-[44px] min-w-[44px] flex items-center justify-center focus-ring"
                      aria-label="Foto anterior"
                    >
                      <ChevronLeft className="h-8 w-8" />
                    </button>
                    <button
                      type="button"
                      onClick={goToNext}
                      className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white min-h-[44px] min-w-[44px] flex items-center justify-center focus-ring"
                      aria-label="Próxima foto"
                    >
                      <ChevronRight className="h-8 w-8" />
                    </button>
                  </>
                )}

                <div
                  className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 rounded-lg bg-white/10 text-white"
                  aria-hidden="true"
                >
                  {currentIndex + 1} / {displayImages.length}
                </div>
              </div>
            </DialogContent>
          </Dialog>

          {/* Image Counter */}
          <div className="absolute bottom-3 left-3 px-3 py-1.5 rounded-lg bg-black/60 text-white text-sm">
            {currentIndex + 1} / {displayImages.length}
          </div>
        </div>

        {/* Thumbnails */}
        {displayImages.length > 1 && (
          <div className="flex gap-2 mt-3 overflow-x-auto pb-2">
            {displayImages.map((image, index) => (
              <button
                key={index}
                type="button"
                onClick={() => setCurrentIndex(index)}
                className={`relative flex-shrink-0 w-20 h-16 rounded-lg overflow-hidden transition-all min-h-[44px] focus-ring ${
                  currentIndex === index
                    ? "ring-2 ring-[var(--info)] opacity-100"
                    : "opacity-60 hover:opacity-100"
                }`}
                aria-label={`Ver foto ${index + 1}`}
                aria-current={currentIndex === index ? 'true' : undefined}
              >
                <Image
                  src={image || "/placeholder.svg"}
                  alt={`${title} - Miniatura ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        )}
      </div>
    </>
  )
}
