"use client"

import { useState } from "react"
import { MessageCircle, Send, Phone, Mail, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { buildWhatsAppUrl, siteConfig } from "@/lib/site-config"

export function ContactPageForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    await new Promise((resolve) => setTimeout(resolve, 100))
    setIsSubmitting(false)
    setSubmitted(true)
  }

  const handleWhatsApp = () => {
    const message = formData.message || siteConfig.whatsapp.defaultMessage
    window.open(buildWhatsAppUrl(message), "_blank")
  }

  if (submitted) {
    return (
      <Card>
        <CardContent className="pt-6 text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-100 flex items-center justify-center">
            <Send className="h-8 w-8 text-green-600" />
          </div>
          <h3 className="font-semibold text-lg mb-2">Mensagem enviada!</h3>
          <p className="text-muted-foreground mb-4">
            Em breve entraremos em contato com você.
          </p>
          <Button
            onClick={handleWhatsApp}
            className="bg-[var(--whatsapp)] hover:bg-[var(--whatsapp-hover)] text-white w-full"
          >
            <MessageCircle className="mr-2 h-5 w-5" />
            Falar pelo WhatsApp agora
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Envie sua mensagem</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Button
          onClick={handleWhatsApp}
          className="w-full bg-[var(--whatsapp)] hover:bg-[var(--whatsapp-hover)] text-white h-12"
        >
          <MessageCircle className="mr-2 h-5 w-5" />
          Chamar no WhatsApp
        </Button>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-border" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-card px-2 text-muted-foreground">ou envie uma mensagem</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nome completo</Label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="name"
                required
                placeholder="Seu nome"
                value={formData.name}
                onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                className="pl-10 h-12"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">E-mail</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="email"
                type="email"
                required
                placeholder="seu@email.com"
                value={formData.email}
                onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                className="pl-10 h-12"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Telefone</Label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="phone"
                type="tel"
                required
                placeholder="(61) 99999-9999"
                value={formData.phone}
                onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
                className="pl-10 h-12"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">Mensagem</Label>
            <Textarea
              id="message"
              rows={5}
              placeholder="Como podemos ajudá-lo?"
              value={formData.message}
              onChange={(e) => setFormData((prev) => ({ ...prev, message: e.target.value }))}
              className="resize-none"
            />
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-[var(--navy-700)] hover:bg-[var(--navy-900)] text-white h-12"
          >
            {isSubmitting ? "Enviando..." : "Enviar mensagem"}
          </Button>
        </form>

        <p className="text-xs text-muted-foreground text-center">
          Ao enviar, você concorda com nossa política de privacidade.
        </p>
      </CardContent>
    </Card>
  )
}
