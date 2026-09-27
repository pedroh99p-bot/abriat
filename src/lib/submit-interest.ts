import { siteConfig } from '../data/content'

export interface InterestPayload {
  fullName: string
  whatsapp: string
  email: string
  state: string
  city: string
}

export interface SubmitResult {
  status: 'pending-integration'
  whatsappUrl: string
}

export async function submitInterest(payload: InterestPayload): Promise<SubmitResult> {
  const message = [
    'Olá! Quero iniciar minha filiação à ABRIAT.',
    `Nome completo: ${payload.fullName.trim()}`,
    `WhatsApp: ${payload.whatsapp.trim()}`,
    `E-mail: ${payload.email?.trim() ?? ''}`,
    `Estado: ${payload.state}`,
    `Cidade: ${payload.city.trim()}`,
    'Por favor, orientem os próximos passos.',
  ].join('\n')
  return {
    status: 'pending-integration',
    whatsappUrl: `https://wa.me/${siteConfig.contacts.whatsappWaMe}?text=${encodeURIComponent(message)}`,
  }
}

export function validateStep(payload: InterestPayload) {
  const errors: Partial<Record<keyof InterestPayload, string>> = {}
  if (payload.fullName.trim().length < 3) errors.fullName = 'Informe seu nome completo.'
  const digits = payload.whatsapp.replace(/\D/g, '')
  if (digits.length < 10 || digits.length > 11) errors.whatsapp = 'Informe um WhatsApp com DDD.'
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email.trim())) errors.email = 'Informe um e-mail válido.'
  if (!payload.state) errors.state = 'Selecione seu estado.'
  if (payload.city.trim().length < 2) errors.city = 'Informe sua cidade.'
  return errors
}
