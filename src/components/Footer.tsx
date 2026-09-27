import { Instagram, Mail, MessageCircle, Phone, Target } from 'lucide-react'
import { footerNavItems, siteConfig } from '../data/content'
import { Brand } from './Brand'

export function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__main">
        <div className="footer__brand"><Brand logo={siteConfig.assets.footerLogo} /><p>Instrutores de hoje. Uma sociedade mais segura amanhã.</p></div>
        <div><h2>Navegação</h2><nav aria-label="Links do rodapé">{footerNavItems.map((item) => <a href={item.href} key={item.href}>{item.label}</a>)}</nav></div>
        <div className="footer__institution"><h2>Institucional</h2><strong>{siteConfig.organization.legalName}</strong><span>CNPJ {siteConfig.organization.cnpj}</span><address>{siteConfig.organization.addressLines.map((line) => <span key={line}>{line}</span>)}</address><a href={`mailto:${siteConfig.contacts.email}`}><Mail aria-hidden="true" size={16}/>{siteConfig.contacts.email}</a><a href={`tel:${siteConfig.contacts.phoneE164}`}><Phone aria-hidden="true" size={16}/>{siteConfig.contacts.phoneDisplay}</a><a href="/politica-de-privacidade">Política de Privacidade</a><a href="/termos-de-uso">Termos de Uso</a></div>
        <div><h2>Contato</h2><a href={siteConfig.contacts.abriatInstagramUrl} target="_blank" rel="noreferrer"><Instagram aria-hidden="true" size={18} /> {siteConfig.contacts.abriatInstagramUsername}</a><a href={`https://wa.me/${siteConfig.contacts.whatsappWaMe}`} target="_blank" rel="noreferrer"><MessageCircle aria-hidden="true" size={18} /> WhatsApp ABRIAT</a></div>
      </div>
      <div className="container footer__bottom"><span><Target aria-hidden="true" size={18} /> ABRIAT</span><p>© {new Date().getFullYear()} ABRIAT. Todos os direitos reservados.</p></div>
    </footer>
  )
}
