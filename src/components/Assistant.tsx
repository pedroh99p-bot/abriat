import { Bot, Send, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { track } from '../lib/analytics'

const actions = [
  { label: 'Como me associar?', answer: 'Comece preenchendo seus dados iniciais de filiação. A equipe responsável poderá orientar sobre critérios, documentos e próximos passos.', target: '#filiacao' },
  { label: 'Quero me tornar instrutor', answer: 'A ABRIAT pode orientar seu próximo passo e, quando aplicável, direcionar você a um estande ou parceiro para receber as orientações necessárias sobre o processo.', target: '#filiacao' },
  { label: 'Quem pode fazer parte?', answer: 'Instrutores, profissionais autônomos e pessoas que atuam em clubes, estandes, escolas ou centros de treinamento podem demonstrar interesse.', target: '#perfis' },
  { label: 'Quais são os benefícios?', answer: 'A ABRIAT oferece carteira de identificação, cursos gratuitos de aperfeiçoamento, descontos em clubes parceiros, 50% de desconto na assessoria Doutor das Armas e divulgação para associados.', target: '#beneficios' },
  { label: 'Quero falar com a equipe', answer: 'Preencha seus dados iniciais e revise a mensagem antes de enviar pelo WhatsApp à equipe ABRIAT.', target: '#filiacao' },
]

export function Assistant() {
  const [open, setOpen] = useState(false)
  const [hasPassedForm, setHasPassedForm] = useState(false)
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
      const hasPassed = window.scrollY > formBottom
      setHasPassedForm((current) => current === hasPassed ? current : hasPassed)
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
    const assistant = document.querySelector<HTMLElement>('.assistant')
    const trigger = assistant?.querySelector<HTMLElement>('.assistant__trigger')
    if (!assistant || !trigger) return

    let frame = 0
    const updateClearance = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        assistant.style.setProperty('--assistant-lift', '0px')
        if (!hasPassedForm || open) {
          assistant.classList.remove('assistant--content-visible')
          return
        }

        const triggerRect = trigger.getBoundingClientRect()
        const blockers = document.querySelectorAll<HTMLElement>('.pillar-card, .benefits .section-heading, .benefit-track, .benefits__cta, .credential-section__heading, .credential-section__visual, .credential-details, .credential-section__cta')
        let lift = 0
        blockers.forEach((blocker) => {
          const rect = blocker.getBoundingClientRect()
          const overlaps = triggerRect.left < rect.right && triggerRect.right > rect.left && triggerRect.top < rect.bottom && triggerRect.bottom > rect.top
          if (overlaps) lift = Math.max(lift, triggerRect.bottom - rect.top + 14)
        })

        const maxLift = Math.max(0, window.innerHeight - triggerRect.height - 90)
        assistant.classList.toggle('assistant--content-visible', lift > maxLift)
        assistant.style.setProperty('--assistant-lift', `${Math.min(lift, maxLift)}px`)
      })
    }

    updateClearance()
    window.addEventListener('scroll', updateClearance, { passive: true })
    window.addEventListener('resize', updateClearance)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', updateClearance)
      window.removeEventListener('resize', updateClearance)
      assistant.classList.remove('assistant--content-visible')
      assistant.style.removeProperty('--assistant-lift')
    }
  }, [hasPassedForm, open])

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

  return (
    <aside className={`assistant ${open ? 'assistant--open' : ''} ${hasPassedForm ? 'assistant--eligible' : ''}`} aria-label="Assistente ABRIAT" aria-hidden={!hasPassedForm}>
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
  )
}
