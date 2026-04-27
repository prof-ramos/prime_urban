"use client"

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html lang="pt-BR">
      <body>
        <div
          style={{
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            gap: "16px",
            fontFamily: "system-ui, sans-serif",
          }}
        >
          <h2>Algo deu errado</h2>
          <button onClick={reset}>Tentar novamente</button>
        </div>
      </body>
    </html>
  )
}
