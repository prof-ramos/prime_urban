"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { toast } from "sonner"
import { MessageCircle, Send, Phone, Mail, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

interface ContactFormProps {
  propertyTitle: string
  propertyId: string
}

const WHATSAPP_NUMBER = "5561999999999"

const contactSchema = z.object({
  name: z.string().min(2, "Informe seu nome completo"),
  email: z.string().email("E-mail inválido"),
  phone: z
    .string()
    .min(10, "Telefone deve ter ao menos 10 dígitos")
    .regex(/^[\d\s()+-]+$/, "Use apenas números, espaços, parênteses, + ou -"),
  message: z.string().optional(),
})

type ContactFormValues = z.infer<typeof contactSchema>

export function ContactForm({ propertyTitle, propertyId: _propertyId }: ContactFormProps) {
  const [submitted, setSubmitted] = useState(false)
  const defaultMessage = `Olá! Tenho interesse no imóvel: ${propertyTitle}. Gostaria de mais informações.`

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: defaultMessage,
    },
  })

  const onSubmit = async (values: ContactFormValues) => {
    try {
      // Simulate form submission
      await new Promise((resolve) => setTimeout(resolve, 1000))
      void values
      toast.success("Mensagem enviada", {
        description: "Em breve entraremos em contato com você.",
      })
      setSubmitted(true)
    } catch {
      toast.error("Não foi possível enviar", {
        description: "Tente novamente em instantes.",
      })
    }
  }

  const handleWhatsApp = () => {
    const message = form.getValues("message") || defaultMessage
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
    window.open(url, "_blank")
  }

  if (submitted) {
    return (
      <Card className="border-[var(--info)]/30">
        <CardContent className="pt-6 text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-100 flex items-center justify-center">
            <Send className="h-8 w-8 text-green-600" />
          </div>
          <h3 className="font-semibold text-lg mb-2">Mensagem enviada!</h3>
          <p className="text-muted-foreground mb-4">
            Em breve entraremos em contato com você.
          </p>
          <Button
            type="button"
            onClick={handleWhatsApp}
            className="bg-[#25D366] hover:bg-[#128C7E] text-white w-full"
          >
            <MessageCircle className="mr-2 h-5 w-5" />
            Falar pelo WhatsApp agora
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="border-[var(--info)]/30 sticky top-24">
      <CardHeader>
        <CardTitle asChild>
          <h2 className="text-lg">Agende uma visita</h2>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* WhatsApp Button */}
        <Button
          type="button"
          onClick={handleWhatsApp}
          className="w-full bg-[#25D366] hover:bg-[#128C7E] text-white h-12"
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

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4" noValidate>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Nome completo <span aria-hidden="true" className="text-destructive">*</span>
                    <span className="sr-only">obrigatório</span>
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <User aria-hidden="true" className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                      <Input
                        autoComplete="name"
                        placeholder="Seu nome"
                        className="pl-10 h-12"
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    E-mail <span aria-hidden="true" className="text-destructive">*</span>
                    <span className="sr-only">obrigatório</span>
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Mail aria-hidden="true" className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                      <Input
                        type="email"
                        autoComplete="email"
                        placeholder="seu@email.com"
                        className="pl-10 h-12"
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Telefone <span aria-hidden="true" className="text-destructive">*</span>
                    <span className="sr-only">obrigatório</span>
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Phone aria-hidden="true" className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                      <Input
                        type="tel"
                        autoComplete="tel"
                        placeholder="(61) 99999-9999"
                        className="pl-10 h-12"
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mensagem</FormLabel>
                  <FormControl>
                    <Textarea
                      rows={4}
                      placeholder="Descreva seu interesse..."
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              disabled={form.formState.isSubmitting}
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground h-12"
            >
              {form.formState.isSubmitting ? "Enviando..." : "Enviar mensagem"}
            </Button>
          </form>
        </Form>

        <p className="text-xs text-muted-foreground text-center">
          Ao enviar, você concorda com nossa política de privacidade.
        </p>
      </CardContent>
    </Card>
  )
}
