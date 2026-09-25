import { Menu, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { navItems } from '../data/content'
import { Brand } from './Brand'
import { AssociationCta } from './AssociationCta'

export function Header() {
  const [open, setOpen] = useState(false)
  const firstLinkRef = useRef<HTMLAnchorElement>(null)

  useEffect(() => {
    if (!open) return
    firstLinkRef.current?.focus()
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }
    document.addEventListener('keydown', closeOnEscape)
    return () => document.removeEventListener('keydown', closeOnEscape)
  }, [open])

  return (
    <header className="site-header" id="top">
      <div className="container site-header__inner">
        <Brand compact />
        <nav className="desktop-nav" aria-label="Navegação principal">
          {navItems.map((item) => <a key={item.href} href={item.href}>{item.label}</a>)}
        </nav>
        <div className="desktop-cta"><AssociationCta source="header">Quero fazer parte</AssociationCta></div>
        <button
          className="menu-toggle"
          type="button"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? 'Fechar menu' : 'Abrir menu'}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>
      </div>
      <div className={`mobile-menu ${open ? 'mobile-menu--open' : ''}`} id="mobile-menu" aria-hidden={!open}>
        <nav className="container" aria-label="Navegação móvel">
          {navItems.map((item, index) => (
            <a
              key={item.href}
              href={item.href}
              ref={index === 0 ? firstLinkRef : undefined}
              tabIndex={open ? 0 : -1}
              onClick={() => setOpen(false)}
            >
              <span>0{index + 1}</span>{item.label}
            </a>
          ))}
          <AssociationCta source="mobile_menu" className="button--full" tabIndex={open ? 0 : -1}>Quero fazer parte</AssociationCta>
        </nav>
      </div>
    </header>
  )
}
