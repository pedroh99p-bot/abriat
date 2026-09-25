import { describe, expect, it } from 'vitest'
import { type InterestPayload, validateStep } from '../src/lib/submit-interest'

const valid: InterestPayload = {
  fullName: 'Maria da Silva',
  whatsapp: '(11) 99999-9999',
  state: 'SP',
  city: 'São Paulo',
  isInstructor: 'Sim',
  credential: '',
  roleType: 'Instrutor independente',
  interest: 'Quero me associar',
  consent: true,
}

describe('validação do quiz', () => {
  it('aceita as duas etapas completas', () => {
    expect(validateStep(1, valid)).toEqual({})
    expect(validateStep(2, valid)).toEqual({})
  })

  it('bloqueia a primeira etapa sem contato e localização', () => {
    const errors = validateStep(1, { ...valid, fullName: '', whatsapp: '123', state: '', city: '' })
    expect(errors).toMatchObject({ fullName: expect.any(String), whatsapp: expect.any(String), state: expect.any(String), city: expect.any(String) })
  })

  it('exige consentimento na segunda etapa', () => {
    expect(validateStep(2, { ...valid, consent: false })).toHaveProperty('consent')
  })
})
