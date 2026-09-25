import { siteConfig } from '../data/content'

interface BrandProps {
  inverse?: boolean
  compact?: boolean
  logo?: string
}

export function Brand({ inverse = false, compact = false, logo = siteConfig.assets.logo }: BrandProps) {
  return (
    <a className={`brand ${inverse ? 'brand--inverse' : ''} ${compact ? 'brand--compact' : ''}`} href="#top" aria-label="ABRIAT — ir para o início">
      <img src={logo} alt="ABRIAT — Associação Brasileira dos Instrutores de Armamento e Tiro" />
    </a>
  )
}
