import { siteConfig } from '../data/content'

export type InterestType = 'association' | 'become_instructor'

export interface InterestPayload {
  interestType?: InterestType | ''
  fullName: string
  whatsapp: string
  state: string
  city: string
  credential: string
  roleType: string
  interest: string
  moment?: string
  hasClubLink?: string
  isInstructor?: string
  consent: boolean
}

export interface SubmitResult {
  status: 'pending-integration'
  whatsappUrl: string
}

export async function submitInterest(payload: InterestPayload): Promise<SubmitResult> {
  const message = payload.interestType === 'association'
    ? 'Olá! Preenchi o pré-cadastro no site da ABRIAT e tenho interesse em conhecer a associação.'
    : 'Olá! Preenchi o formulário da ABRIAT e gostaria de receber orientação sobre o caminho para me tornar instrutor.'
  return {
    status: 'pending-integration',
    whatsappUrl: `https://wa.me/${siteConfig.contacts.whatsappWaMe}?text=${encodeURIComponent(message)}`,
  }
}

export function validateStep(step: 1 | 2 | 3, payload: InterestPayload) {
  const errors: Partial<Record<keyof InterestPayload, string>> = {}
  const legacySecondStep = step === 2 && payload.isInstructor !== undefined
  if (step === 1 || (step === 2 && !legacySecondStep)) {
    if (payload.fullName.trim().length < 3) errors.fullName = 'Informe seu nome completo.'
    const digits = payload.whatsapp.replace(/\D/g, '')
    if (digits.length < 10 || digits.length > 11) errors.whatsapp = 'Informe um WhatsApp com DDD.'
    if (!payload.state) errors.state = 'Selecione seu estado.'
    if (payload.city.trim().length < 2) errors.city = 'Informe sua cidade.'
  }
  if (legacySecondStep) {
    if (!payload.isInstructor) errors.isInstructor = 'Selecione uma opção.'
    if (!payload.roleType) errors.roleType = 'Selecione seu tipo de atuação.'
    if (!payload.interest) errors.interest = 'Selecione seu principal interesse.'
    if (!payload.consent) errors.consent = 'Confirme a autorização para prosseguir.'
  }
  if (step === 3) {
    if (payload.interestType === 'association') {
      if (!payload.roleType) errors.roleType = 'Informe seu tipo ou local de atuação.'
      if (!payload.interest) errors.interest = 'Selecione seu principal interesse.'
    } else {
      if (!payload.moment) errors.moment = 'Selecione seu momento atual.'
      if (!payload.hasClubLink) errors.hasClubLink = 'Selecione uma opção.'
    }
    if (!payload.consent) errors.consent = 'Confirme a autorização para prosseguir.'
  }
  return errors
}
