import { describe, expect, it } from 'vitest'
import { type InterestPayload, validateStep } from '../src/lib/submit-interest'

const valid: InterestPayload = {
  fullName: 'Maria da Silva',
  whatsapp: '(11) 99999-9999',
  email: 'maria@example.com',
  state: 'SP',
  city: 'São Paulo',
}

describe('validação dos dados iniciais de filiação', () => {
  it('aceita dados completos', () => {
    expect(validateStep(valid)).toEqual({})
  })

  it('bloqueia a etapa inicial sem dados de contato e localização válidos', () => {
    const errors = validateStep({ ...valid, fullName: '', whatsapp: '123', email: 'inválido', state: '', city: '' })
    expect(errors).toMatchObject({ fullName: expect.any(String), whatsapp: expect.any(String), email: expect.any(String), state: expect.any(String), city: expect.any(String) })
  })

})
