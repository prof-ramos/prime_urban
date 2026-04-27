import { NextResponse } from "next/server"
import { z } from "zod"

const leadSchema = z.object({
  name: z.string().trim().min(2),
  email: z.string().trim().email(),
  phone: z.string().trim().min(8),
  message: z.string().trim().min(1),
  propertyId: z.string().trim().optional(),
  propertyTitle: z.string().trim().optional(),
})

export async function POST(request: Request) {
  const body = await request.json().catch(() => null)
  const parsed = leadSchema.safeParse(body)

  if (!parsed.success) {
    return NextResponse.json(
      { error: "ValidationError", message: "Dados inválidos." },
      { status: 422 },
    )
  }

  console.info("[lead:not-persisted]", parsed.data)
  return NextResponse.json({ ok: true }, { status: 201 })
}
