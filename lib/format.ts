const brlFormatter = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
})

export function formatCurrency(value: number): string {
  if (!Number.isFinite(value)) {
    throw new TypeError(`formatCurrency: value must be a finite number, got ${value}`)
  }
  return brlFormatter.format(value)
}
