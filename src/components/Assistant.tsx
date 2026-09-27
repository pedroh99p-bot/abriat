import { Bot, Send, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { track } from '../lib/analytics'

const actions = [
  { label: 'Como me associar?', answer: 'Comece preenchendo seus dados iniciais de filiação. A equipe responsável poderá orientar sobre critérios, documentos e próximos passos.', target: '#filiacao' },
  { label: 'Quero me tornar instrutor', answer: 'Conte em que momento você está. A ABRIAT orienta os próximos passos e, quando aplicável, direciona você aos canais adequados.', target: '#quero-ser-instrutor' },
  { label: 'Como funciona para novos instrutores?', answer: 'Selecione seu momento atual e informe se possui vínculo com clube ou estande para receber orientação institucional.', target: '#quero-ser-instrutor' },
  { label: 'Quais são os benefícios?', answer: 'A ABRIAT oferece carteira de identificação, cursos gratuitos de aperfeiçoamento, descontos em clubes parceiros, 50% de desconto na assessoria Doutor das Armas e divulgação para associados.', target: '#beneficios' },
  { label: 'Quero falar com a equipe', answer: 'Preencha seus dados iniciais e revise a mensagem antes de enviar pelo WhatsApp à equipe ABRIAT.', target: '#filiacao' },
]

export function Assistant() {
  const [open, setOpen] = useState(false)
  const [hasEnteredMainContent, setHasEnteredMainContent] = useState(false)
  const [isFooterVisible, setIsFooterVisible] = useState(false)
  const [isFormFocused, setIsFormFocused] = useState(false)
  const [answer, setAnswer] = useState('Olá! Posso ajudar com informações sobre a ABRIAT e o processo de associação.')
  const [selected, setSelected] = useState<(typeof actions)[number]>(actions[0])
  const closeRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const openAssistant = () => setOpen(true)
    window.addEventListener('abriat:open-assistant', openAssistant)
    return () => window.removeEventListener('abriat:open-assistant', openAssistant)
  }, [])

  useEffect(() => {
    const form = document.querySelector<HTMLElement>('#quiz')
    if (!form) return
    const syncEntry = () => {
      const formBottom = form.getBoundingClientRect().bottom + window.scrollY
      if (window.scrollY > formBottom) setHasEnteredMainContent(true)
    }
    syncEntry()
    window.addEventListener('scroll', syncEntry, { passive: true })
    window.addEventListener('resize', syncEntry)
    return () => {
      window.removeEventListener('scroll', syncEntry)
      window.removeEventListener('resize', syncEntry)
    }
  }, [])

  useEffect(() => {
    const footer = document.querySelector<HTMLElement>('.footer')
    if (!footer || !('IntersectionObserver' in window)) return
    const observer = new IntersectionObserver(([entry]) => setIsFooterVisible(entry.isIntersecting), { rootMargin: '0px 0px -96px 0px' })
    observer.observe(footer)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    let frame = 0
    const syncFormFocus = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        const active = document.activeElement
        setIsFormFocused(active instanceof HTMLElement && Boolean(active.closest('.quiz-shell')) && /^(INPUT|SELECT|TEXTAREA)$/.test(active.tagName))
      })
    }
    document.addEventListener('focusin', syncFormFocus)
    document.addEventListener('focusout', syncFormFocus)
    syncFormFocus()
    return () => {
      cancelAnimationFrame(frame)
      document.removeEventListener('focusin', syncFormFocus)
      document.removeEventListener('focusout', syncFormFocus)
    }
  }, [])

  useEffect(() => {
    if (!open) return
    closeRef.current?.focus()
    const closeOnEscape = (event: KeyboardEvent) => { if (event.key === 'Escape') setOpen(false) }
    document.addEventListener('keydown', closeOnEscape)
    return () => document.removeEventListener('keydown', closeOnEscape)
  }, [open])

  const toggle = () => {
    const next = !open
    setOpen(next)
    if (next) track('assistant_open', { state: 'open' })
  }

  const select = (item: typeof actions[number]) => {
    setSelected(item)
    setAnswer(item.answer)
    track('assistant_action', { action: item.label })
  }

  const go = () => {
    document.querySelector(selected.target)?.scrollIntoView({ behavior: window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth', block: 'start' })
    if (selected.target === '#filiacao') window.setTimeout(() => document.getElementById('membership-heading')?.focus({ preventScroll: true }), 450)
    setOpen(false)
  }

  const isVisible = hasEnteredMainContent && !isFooterVisible && !isFormFocused

  return createPortal((
    <aside className={`assistant ${open ? 'assistant--open' : ''} ${isVisible ? 'assistant--visible' : 'assistant--hidden'}`} aria-label="Assistente ABRIAT" aria-hidden={!isVisible}>
      {open ? (
        <div className="assistant__panel" role="dialog" aria-modal="false" aria-labelledby="assistant-title">
          <div className="assistant__header"><span><Bot aria-hidden="true" /></span><div><strong id="assistant-title">Assistente ABRIAT</strong><small>Informações institucionais</small></div><button ref={closeRef} type="button" aria-label="Fechar assistente" onClick={() => setOpen(false)}><X aria-hidden="true" /></button></div>
          <div className="assistant__body">
            <p className="assistant__message">{answer}</p>
            <div className="assistant__options">
              {actions.map((item) => <button type="button" key={item.label} onClick={() => select(item)}>{item.label}</button>)}
            </div>
          </div>
          <button className="assistant__go" type="button" onClick={go}>Ver na página <Send aria-hidden="true" size={16} /></button>
          <p className="assistant__scope">Este assistente não responde questões técnicas sobre armamento.</p>
        </div>
      ) : null}
      <button className="assistant__trigger" type="button" aria-expanded={open} onClick={toggle}>
        <span><Bot aria-hidden="true" /></span><span><strong>Assistente ABRIAT</strong><small>Tire suas dúvidas</small></span>
      </button>
    </aside>
  ), document.body)
}
