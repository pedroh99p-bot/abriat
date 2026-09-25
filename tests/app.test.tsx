import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import App from '../src/App'

describe('landing page ABRIAT', () => {
  it('renderiza a proposta e todos os pontos de conversão principais', () => {
    render(<App />)
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(/Fortaleça sua atuação/i)
    expect(screen.getByRole('heading', { level: 2, name: /Demonstre seu interesse/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /Por que a ABRIAT/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /Sua profissão merece/i })).toBeInTheDocument()
  })
})
