export default function Loading() {
  return (
    <div className="min-h-screen bg-background">
      <div className="h-16 bg-primary" />

      <div className="container mx-auto px-4 py-8">
        {/* Filters skeleton */}
        <div className="hidden lg:flex gap-3 mb-8">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="h-10 w-36 bg-muted rounded-md animate-pulse" />
          ))}
        </div>

        {/* Count skeleton */}
        <div className="h-5 w-40 bg-muted rounded animate-pulse mb-6" />

        {/* Grid skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="rounded-xl overflow-hidden bg-muted animate-pulse">
              <div className="h-52 bg-muted-foreground/10" />
              <div className="p-4 space-y-3">
                <div className="h-5 bg-muted-foreground/10 rounded w-3/4" />
                <div className="h-4 bg-muted-foreground/10 rounded w-1/2" />
                <div className="h-6 bg-muted-foreground/10 rounded w-1/3" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
