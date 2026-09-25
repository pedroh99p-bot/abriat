interface BrandProps {
  inverse?: boolean
  compact?: boolean
}

export function Brand({ inverse = false, compact = false }: BrandProps) {
  return (
    <a className={`brand ${inverse ? 'brand--inverse' : ''} ${compact ? 'brand--compact' : ''}`} href="#top" aria-label="ABRIAT — ir para o início">
      <img src="/assets/logo-abriat.svg" alt="ABRIAT — Associação Brasileira dos Instrutores de Armamento e Tiro" width="520" height="116" />
    </a>
  )
}
