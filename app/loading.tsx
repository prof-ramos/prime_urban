export default function Loading() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header skeleton */}
      <div className="h-16 bg-primary" />

      {/* Hero skeleton */}
      <div className="bg-primary/10 py-24">
        <div className="container mx-auto px-4 max-w-2xl">
          <div className="h-4 bg-muted rounded w-32 mx-auto mb-4 animate-pulse" />
          <div className="h-12 bg-muted rounded w-3/4 mx-auto mb-4 animate-pulse" />
          <div className="h-12 bg-muted rounded w-full animate-pulse" />
        </div>
      </div>

      {/* Content skeleton */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="rounded-xl bg-muted animate-pulse h-64" />
          ))}
        </div>
      </div>
    </div>
  )
}
