export interface InterestPayload {
  fullName: string
  whatsapp: string
  state: string
  city: string
  isInstructor: string
  credential: string
  roleType: string
  interest: string
  consent: boolean
}

export interface SubmitResult {
  status: 'pending-integration'
  localReference: string
}

export async function submitInterest(_payload: InterestPayload): Promise<SubmitResult> {
  void _payload
  await new Promise((resolve) => window.setTimeout(resolve, 450))
  return {
    status: 'pending-integration',
    localReference: `ABRIAT-${Date.now().toString(36).toUpperCase()}`,
  }
}

export function validateStep(step: 1 | 2, payload: InterestPayload) {
  const errors: Partial<Record<keyof InterestPayload, string>> = {}

  if (step === 1) {
    if (payload.fullName.trim().length < 3) errors.fullName = 'Informe seu nome completo.'
    const digits = payload.whatsapp.replace(/\D/g, '')
    if (digits.length < 10 || digits.length > 11) errors.whatsapp = 'Informe um WhatsApp com DDD.'
    if (!payload.state) errors.state = 'Selecione seu estado.'
    if (payload.city.trim().length < 2) errors.city = 'Informe sua cidade.'
  }

  if (step === 2) {
    if (!payload.isInstructor) errors.isInstructor = 'Selecione uma opção.'
    if (!payload.roleType) errors.roleType = 'Selecione seu tipo de atuação.'
    if (!payload.interest) errors.interest = 'Selecione seu principal interesse.'
    if (!payload.consent) errors.consent = 'Confirme a autorização para prosseguir.'
  }

  return errors
}
