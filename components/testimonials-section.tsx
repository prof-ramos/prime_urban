// TODO: implementar com depoimentos reais de clientes em versão futura
"use client"

import { useCallback } from "react"
import Image from "next/image"
import { Quote, Star } from "lucide-react"
import { testimonials } from "@/lib/testimonials"

export type Testimonial = {
  name: string
  role: string
  neighborhood: string
  quote: string
  imageUrl: string
}

const AVATAR_FALLBACK = "/images/avatar-placeholder.svg"

function TestimonialImage({ src, alt }: { src: string; alt: string }) {
  const handleImageError = useCallback((e: React.SyntheticEvent<HTMLImageElement>) => {
    const img = e.currentTarget
    if (img.src !== AVATAR_FALLBACK) {
      img.src = AVATAR_FALLBACK
    }
  }, [])

  return (
    <Image
      src={src}
      alt={alt}
      width={56}
      height={56}
      className="h-14 w-14 rounded-full object-cover"
      onError={handleImageError}
    />
  )
}

export function TestimonialsSection() {
  return (
    <section className="bg-[var(--background)] py-16 md:py-24" aria-labelledby="testimonials-title">
      <div className="container mx-auto px-4">
        <div className="mb-10 max-w-2xl">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-bronze-700">
            Prova social
          </span>
          <h2
            id="testimonials-title"
            className="mt-3 font-serif text-3xl font-bold text-navy-900 md:text-4xl"
          >
            Clientes que encontraram seu lugar
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-navy-700/80">
            Histórias reais de compra, locação e investimento acompanhadas por uma curadoria humana em Brasília.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {testimonials.map((testimonial) => (
            <article
              key={testimonial.name}
              className="rounded-lg border border-navy-900/10 bg-white p-6 shadow-sm"
            >
              <div className="mb-5 flex items-center gap-4">
                <TestimonialImage
                  src={testimonial.imageUrl}
                  alt={`Foto de ${testimonial.name}`}
                />
                <div>
                  <h3 className="font-semibold text-navy-900">{testimonial.name}</h3>
                  <p className="text-sm text-navy-700/70">
                    {testimonial.role} · {testimonial.neighborhood}
                  </p>
                </div>
              </div>

              <div
                role="img"
                className="mb-4 flex gap-1 text-bronze-700"
                aria-label="Avaliação 5 de 5"
              >
                {[0, 1, 2, 3, 4].map((item) => (
                  <Star key={item} className="h-4 w-4 fill-current" aria-hidden="true" />
                ))}
              </div>

              <Quote className="mb-3 h-5 w-5 text-bronze-700" aria-hidden="true" />
              <p className="text-sm leading-relaxed text-navy-700">"{testimonial.quote}"</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
