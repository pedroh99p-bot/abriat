import { Bot, Send, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { track } from '../lib/analytics'

const actions = [
  { label: 'Como me associar?', answer: 'Comece preenchendo o formulário de interesse. Depois, a equipe responsável poderá orientar sobre critérios, documentos e próximos passos.', target: '#quiz', interestType: 'association' as const },
  { label: 'Quero me tornar instrutor', answer: 'A ABRIAT pode orientar seu próximo passo e, quando aplicável, direcionar você a um estande ou parceiro para receber as orientações necessárias sobre o processo.', target: '#quiz', interestType: 'become_instructor' as const },
  { label: 'Quem pode fazer parte?', answer: 'Instrutores, profissionais autônomos e pessoas que atuam em clubes, estandes, escolas ou centros de treinamento podem demonstrar interesse.', target: '#perfis' },
  { label: 'Quais são os benefícios?', answer: 'A proposta reúne representatividade, rede profissional, visibilidade, conteúdo e estrutura para futuras parcerias.', target: '#beneficios' },
  { label: 'Quero falar com a equipe', answer: 'Preencha o formulário para receber orientação da equipe ABRIAT pelo WhatsApp.', target: '#quiz', interestType: 'association' as const },
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
    if (selected.target === '#quiz' && selected.interestType) {
      window.dispatchEvent(new CustomEvent('abriat:quiz-interest', { detail: selected.interestType }))
    }
    document.querySelector(selected.target)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
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
