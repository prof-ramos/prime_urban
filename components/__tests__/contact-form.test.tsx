import { describe, it, expect } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ContactForm } from '../contact-form'

describe('ContactForm', () => {
  it('renderiza formulário com campos obrigatórios', () => {
    render(<ContactForm propertyTitle="Apartamento Teste" propertyId="1" />)
    expect(screen.getByLabelText('Nome completo')).toBeInTheDocument()
    expect(screen.getByLabelText('E-mail')).toBeInTheDocument()
    expect(screen.getByLabelText('Telefone')).toBeInTheDocument()
    expect(screen.getByLabelText('Mensagem')).toBeInTheDocument()
  })

  it('renderiza botão WhatsApp', () => {
    render(<ContactForm propertyTitle="Apartamento Teste" propertyId="1" />)
    expect(screen.getByRole('button', { name: /Chamar no WhatsApp/i })).toBeInTheDocument()
  })

  it('preenche mensagem com título do imóvel', () => {
    render(<ContactForm propertyTitle="Apartamento Teste" propertyId="1" />)
    const textarea = screen.getByLabelText('Mensagem') as HTMLTextAreaElement
    expect(textarea.value).toContain('Apartamento Teste')
  })

  it('submete formulário e exibe estado de sucesso', async () => {
    const user = userEvent.setup()
    render(<ContactForm propertyTitle="Apartamento Teste" propertyId="1" />)

    await user.type(screen.getByLabelText('Nome completo'), 'João Silva')
    await user.type(screen.getByLabelText('E-mail'), 'joao@teste.com')
    await user.type(screen.getByLabelText('Telefone'), '61988888888')

    await user.click(screen.getByRole('button', { name: /Enviar mensagem/i }))

    await waitFor(() => {
      expect(screen.getByText('Mensagem enviada!')).toBeInTheDocument()
    })
    expect(screen.getByRole('button', { name: /Falar pelo WhatsApp agora/i })).toBeInTheDocument()
  })
})
