import { Instagram, Mail, Target } from 'lucide-react'
import { navItems } from '../data/content'
import { Brand } from './Brand'

export function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__main">
        <div className="footer__brand"><Brand inverse /><p>Instrutores de hoje. Uma sociedade mais segura amanhã.</p></div>
        <div><h2>Navegação</h2><nav aria-label="Links do rodapé">{navItems.map((item) => <a href={item.href} key={item.href}>{item.label}</a>)}</nav></div>
        <div><h2>Institucional</h2><a href="#politica" id="politica">Política de privacidade <small>(pendente)</small></a><a href="#termos" id="termos">Termos de uso <small>(pendente)</small></a></div>
        <div><h2>Contato</h2><span><Instagram aria-hidden="true" size={18} /> Instagram oficial: pendente</span><span><Mail aria-hidden="true" size={18} /> E-mail institucional: pendente</span></div>
      </div>
      <div className="container footer__bottom"><span><Target aria-hidden="true" size={18} /> ABRIAT</span><p>© {new Date().getFullYear()} ABRIAT. Todos os direitos reservados.</p></div>
    </footer>
  )
}
