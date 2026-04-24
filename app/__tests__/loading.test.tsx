import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import Loading from '../../app/loading'

describe('Loading', () => {
  it('renderiza skeleton sem crash', () => {
    render(<Loading />)
    // Verifica que elementos de pulse existem
    const pulses = document.querySelectorAll('.animate-pulse')
    expect(pulses.length).toBeGreaterThan(0)
  })
})
