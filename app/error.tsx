"use client"

import Link from "next/link"
import { useEffect } from "react"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="min-h-screen bg-background flex items-center justify-center py-24">
      <div className="container mx-auto px-4 text-center max-w-lg">
        <p className="font-serif text-6xl font-bold text-secondary mb-4">Ops</p>
        <h2 className="font-serif text-2xl font-bold text-foreground mb-4">
          Algo deu errado
        </h2>
        <p className="text-muted-foreground mb-8">
          Ocorreu um erro inesperado. Tente novamente ou volte para a página inicial.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={reset}
            className="inline-flex items-center justify-center h-12 px-6 rounded-md bg-primary text-primary-foreground font-medium hover:bg-accent transition-colors"
          >
            Tentar novamente
          </button>
          <Link
            href="/"
            className="inline-flex items-center justify-center h-12 px-6 rounded-md border border-border text-foreground font-medium hover:bg-muted transition-colors"
          >
            Voltar ao início
          </Link>
        </div>
      </div>
    </div>
  )
}
