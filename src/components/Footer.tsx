import { Instagram, MessageCircle, Target } from 'lucide-react'
import { navItems, siteConfig } from '../data/content'
import { Brand } from './Brand'

export function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__main">
        <div className="footer__brand"><Brand logo={siteConfig.assets.footerLogo} /><p>Instrutores de hoje. Uma sociedade mais segura amanhã.</p></div>
        <div><h2>Navegação</h2><nav aria-label="Links do rodapé">{navItems.map((item) => <a href={item.href} key={item.href}>{item.label}</a>)}</nav></div>
        <div><h2>Institucional</h2><a href="#politica" id="politica">Política de privacidade <small>(pendente)</small></a><a href="#termos" id="termos">Termos de uso <small>(pendente)</small></a></div>
        <div><h2>Contato</h2><a href={siteConfig.contacts.abriatInstagramUrl} target="_blank" rel="noreferrer"><Instagram aria-hidden="true" size={18} /> {siteConfig.contacts.abriatInstagramUsername}</a><a href={`https://wa.me/${siteConfig.contacts.whatsappWaMe}`} target="_blank" rel="noreferrer"><MessageCircle aria-hidden="true" size={18} /> WhatsApp ABRIAT</a></div>
      </div>
      <div className="container footer__bottom"><span><Target aria-hidden="true" size={18} /> ABRIAT</span><p>© {new Date().getFullYear()} ABRIAT. Todos os direitos reservados.</p></div>
    </footer>
  )
}
