interface BrandProps {
  inverse?: boolean
  compact?: boolean
}

export function Brand({ inverse = false, compact = false }: BrandProps) {
  return (
    <a className={`brand ${inverse ? 'brand--inverse' : ''} ${compact ? 'brand--compact' : ''}`} href="#top" aria-label="ABRIAT — ir para o início">
      <span className="brand__name" aria-hidden="true">ABRIAT</span>
      <span className="brand__description">Associação Brasileira dos Instrutores de Armamento e Tiro</span>
    </a>
  )
}
