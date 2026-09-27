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
      href="#filiacao"
      tabIndex={tabIndex}
      onClick={() => {
        window.setTimeout(() => document.getElementById('membership-heading')?.focus({ preventScroll: true }), 450)
        track('hero_slide_click', { cta_context: source, destination: 'filiacao' })
      }}
    >
      <span>{children}</span>
      <ArrowRight aria-hidden="true" size={19} />
    </a>
  )
}
