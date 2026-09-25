import { ArrowRight } from 'lucide-react'
import { track } from '../lib/analytics'

interface AssociationCtaProps {
  children: string
  source: string
  className?: string
  tabIndex?: number
}

export function AssociationCta({ children, source, className = '', tabIndex }: AssociationCtaProps) {
  return (
    <a
      className={`button button--primary ${className}`}
      href="#quiz"
      tabIndex={tabIndex}
      onClick={() => {
        window.dispatchEvent(new CustomEvent('abriat:quiz-interest', { detail: 'association' }))
        track('hero_slide_click', { cta_context: source, destination: 'quiz' })
      }}
    >
      <span>{children}</span>
      <ArrowRight aria-hidden="true" size={19} />
    </a>
  )
}
