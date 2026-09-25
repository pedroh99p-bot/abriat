import type { ReactNode } from 'react'

interface SectionHeadingProps {
  eyebrow: string
  title: ReactNode
  description?: string
  inverse?: boolean
  align?: 'left' | 'center'
}

export function SectionHeading({ eyebrow, title, description, inverse = false, align = 'left' }: SectionHeadingProps) {
  return (
    <div className={`section-heading section-heading--${align} ${inverse ? 'section-heading--inverse' : ''}`}>
      <p className="eyebrow"><span aria-hidden="true" />{eyebrow}</p>
      <h2>{title}</h2>
      {description ? <p className="section-heading__description">{description}</p> : null}
    </div>
  )
}
