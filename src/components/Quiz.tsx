import { ArrowRight, Check, LockKeyhole } from 'lucide-react'
import { type FormEvent, useRef, useState } from 'react'
import { track } from '../lib/analytics'
import { type InterestPayload, submitInterest, validateStep } from '../lib/submit-interest'

const states = ['AC','AL','AP','AM','BA','CE','DF','ES','GO','MA','MT','MS','MG','PA','PB','PR','PE','PI','RJ','RN','RS','RO','RR','SC','SP','SE','TO']
const initialData: InterestPayload = {
  fullName: '', whatsapp: '', email: '', state: '', city: '',
}

export function Quiz() {
  const [data, setData] = useState<InterestPayload>(initialData)
  const [errors, setErrors] = useState<Partial<Record<keyof InterestPayload, string>>>({})
  const [resultUrl, setResultUrl] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const started = useRef(false)
  const formRef = useRef<HTMLFormElement>(null)

  const update = <K extends keyof InterestPayload>(key: K, value: InterestPayload[K]) => {
    setData((current) => ({ ...current, [key]: value }))
    setErrors((current) => ({ ...current, [key]: undefined }))
  }

  const markStart = () => {
    if (started.current) return
    started.current = true
    track('quiz_start', { form_type: 'initial_affiliation' })
  }

  const focusFirstError = () => {
    window.setTimeout(() => formRef.current?.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus(), 0)
  }

  const submit = async (event: FormEvent) => {
    event.preventDefault()
    markStart()
    const nextErrors = validateStep(data)
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length) return focusFirstError()
    setIsSubmitting(true)
    try {
      const result = await submitInterest(data)
      setResultUrl(result.whatsappUrl)
      track('quiz_submit', { status: result.status, form_type: 'initial_affiliation' })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (resultUrl) {
    return (
      <section className="quiz-shell quiz-shell--success" id="quiz" aria-labelledby="quiz-success-title">
        <span className="quiz-success__icon"><Check aria-hidden="true" /></span>
        <p className="eyebrow"><span aria-hidden="true" />Etapa inicial pronta</p>
        <h3 id="quiz-success-title">Confira seus dados e continue.</h3>
        <p className="quiz-success__copy">O WhatsApp abrirá com seus dados em uma mensagem para você revisar e enviar à equipe ABRIAT.</p>
        <a className="button button--primary button--full" href={resultUrl} target="_blank" rel="noreferrer" onClick={() => track('whatsapp_click', { form_type: 'initial_affiliation' })}>
          Revisar e enviar pelo WhatsApp <ArrowRight aria-hidden="true" size={19} />
        </a>
        <p className="quiz-shell__privacy"><LockKeyhole aria-hidden="true" size={15} /> Seus dados só serão compartilhados quando você enviar a mensagem pelo WhatsApp.</p>
      </section>
    )
  }

  return (
    <section className="quiz-shell" id="quiz" aria-labelledby="membership-heading">
      <div className="quiz-shell__meta"><span>Filiação ABRIAT</span><b>Etapa inicial</b></div>
      <form ref={formRef} onSubmit={submit} onFocusCapture={() => markStart()} noValidate>
        <div className="form-grid">
          <label className="field field--full">
            <span>Nome completo</span>
            <input value={data.fullName} onChange={(event) => update('fullName', event.target.value)} autoComplete="name" aria-invalid={Boolean(errors.fullName)} aria-describedby={errors.fullName ? 'fullName-error' : undefined} />
            {errors.fullName ? <em className="field-error" id="fullName-error">{errors.fullName}</em> : null}
          </label>
          <label className="field">
            <span>WhatsApp</span>
            <input value={data.whatsapp} onChange={(event) => update('whatsapp', event.target.value)} inputMode="tel" autoComplete="tel" placeholder="(00) 00000-0000" aria-invalid={Boolean(errors.whatsapp)} aria-describedby={errors.whatsapp ? 'whatsapp-error' : undefined} />
            {errors.whatsapp ? <em className="field-error" id="whatsapp-error">{errors.whatsapp}</em> : null}
          </label>
          <label className="field">
            <span>E-mail</span>
            <input type="email" value={data.email} onChange={(event) => update('email', event.target.value)} inputMode="email" autoComplete="email" aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? 'email-error' : undefined} />
            {errors.email ? <em className="field-error" id="email-error">{errors.email}</em> : null}
          </label>
          <label className="field">
            <span>Estado</span>
            <select value={data.state} onChange={(event) => update('state', event.target.value)} aria-invalid={Boolean(errors.state)} aria-describedby={errors.state ? 'state-error' : undefined}>
              <option value="">Selecione</option>{states.map((state) => <option key={state}>{state}</option>)}
            </select>
            {errors.state ? <em className="field-error" id="state-error">{errors.state}</em> : null}
          </label>
          <label className="field">
            <span>Cidade</span>
            <input value={data.city} onChange={(event) => update('city', event.target.value)} autoComplete="address-level2" aria-invalid={Boolean(errors.city)} aria-describedby={errors.city ? 'city-error' : undefined} />
            {errors.city ? <em className="field-error" id="city-error">{errors.city}</em> : null}
          </label>
          <div className="quiz-actions quiz-actions--single">
            <button className="button button--primary button--full" type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Preparando…' : 'Continuar minha filiação'} <ArrowRight aria-hidden="true" size={19} />
            </button>
          </div>
        </div>
      </form>
      <p className="quiz-shell__privacy"><LockKeyhole aria-hidden="true" size={15} /> Seus dados aparecem apenas na mensagem do WhatsApp, após sua revisão.</p>
    </section>
  )
}
