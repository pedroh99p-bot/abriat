import { beforeEach, describe, expect, it } from 'vitest'
import { getDataLayer, track } from '../src/lib/analytics'

describe('dataLayer', () => {
  beforeEach(() => { window.dataLayer = [] })

  it('registra evento com parâmetros sem incluir dados pessoais', () => {
    track('hero_slide_click', { slide_index: 1, destination: '#quiz' })
    expect(getDataLayer()).toEqual([{ event: 'hero_slide_click', slide_index: 1, destination: '#quiz' }])
  })
})
