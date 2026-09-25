import { ArrowLeft, ArrowRight, Check, LockKeyhole, Target, UserRoundCheck } from 'lucide-react'
import { FormEvent, type ReactNode, useRef, useState } from 'react'
import { track } from '../lib/analytics'
import { InterestPayload, submitInterest, validateStep } from '../lib/submit-interest'

const states = ['AC','AL','AP','AM','BA','CE','DF','ES','GO','MA','MT','MS','MG','PA','PB','PR','PE','PI','RJ','RN','RS','RO','RR','SC','SP','SE','TO']

const initialData: InterestPayload = {
  fullName: '', whatsapp: '', state: '', city: '', isInstructor: '', credential: '', roleType: '', interest: '', consent: false,
}

export function Quiz() {
  const [step, setStep] = useState<1 | 2>(1)
  const [data, setData] = useState<InterestPayload>(initialData)
  const [errors, setErrors] = useState<Partial<Record<keyof InterestPayload, string>>>({})
  const [status, setStatus] = useState<'idle' | 'sending' | 'success'>('idle')
  const [reference, setReference] = useState('')
  const started = useRef(false)
  const formRef = useRef<HTMLFormElement>(null)

  const update = <K extends keyof InterestPayload>(key: K, value: InterestPayload[K]) => {
    setData((current) => ({ ...current, [key]: value }))
    setErrors((current) => ({ ...current, [key]: undefined }))
  }

  const markStart = () => {
    if (started.current) return
    started.current = true
    track('quiz_start', { location: 'hero_followup' })
  }

  const focusFirstError = () => {
    window.setTimeout(() => formRef.current?.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus(), 0)
  }

  const next = () => {
    const nextErrors = validateStep(1, data)
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length) return focusFirstError()
    track('quiz_step_complete', { step: 1 })
    setStep(2)
    window.setTimeout(() => document.getElementById('quiz-step-title')?.focus(), 0)
  }

  const submit = async (event: FormEvent) => {
    event.preventDefault()
    const nextErrors = validateStep(2, data)
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length) return focusFirstError()
    setStatus('sending')
    track('quiz_step_complete', { step: 2 })
    try {
      const result = await submitInterest(data)
      setReference(result.localReference)
      setStatus('success')
      track('quiz_submit', { status: result.status })
    } catch {
      setStatus('idle')
    }
  }

  if (status === 'success') {
    return (
      <section className="quiz-shell" id="quiz" aria-labelledby="quiz-success-title">
        <div className="quiz-success">
          <span className="quiz-success__icon"><Check aria-hidden="true" /></span>
          <p className="eyebrow"><span aria-hidden="true" />Formulário concluído</p>
          <h2 id="quiz-success-title">Seu interesse está pronto para o próximo passo.</h2>
          <p>O fluxo foi concluído com a referência <strong>{reference}</strong>. A integração de envio à equipe ainda precisa ser conectada antes da publicação.</p>
          <button className="button button--dark" type="button" onClick={() => window.dispatchEvent(new Event('abriat:open-assistant'))}>
            Abrir Assistente ABRIAT <ArrowRight aria-hidden="true" size={19} />
          </button>
        </div>
      </section>
    )
  }

  return (
    <section className="quiz-shell" id="quiz" aria-labelledby="quiz-step-title">
      <div className="quiz-shell__topline"><span style={{ width: `${step * 50}%` }} /></div>
      <div className="quiz-shell__meta"><span>Interesse em associação</span><b>Etapa {step} de 2</b></div>
      <div className="quiz-shell__intro">
        <Target aria-hidden="true" />
        <div>
          <h2 id="quiz-step-title" tabIndex={-1}>{step === 1 ? 'Demonstre seu interesse' : 'Conte sobre sua atuação'}</h2>
          <p>{step === 1 ? 'Preencha seus dados para receber as orientações iniciais.' : 'Seu perfil ajuda a direcionar o próximo contato.'}</p>
        </div>
      </div>
      <form ref={formRef} onSubmit={submit} onFocusCapture={markStart} noValidate>
        {step === 1 ? (
          <div className="form-grid">
            <Field label="Nome completo" error={errors.fullName} errorId="fullName-error" full>
              <input value={data.fullName} onChange={(event) => update('fullName', event.target.value)} autoComplete="name" aria-invalid={Boolean(errors.fullName)} aria-describedby={errors.fullName ? 'fullName-error' : undefined} />
            </Field>
            <Field label="WhatsApp com DDD" error={errors.whatsapp} errorId="whatsapp-error">
              <input value={data.whatsapp} onChange={(event) => update('whatsapp', event.target.value)} inputMode="tel" autoComplete="tel" placeholder="(00) 00000-0000" aria-invalid={Boolean(errors.whatsapp)} aria-describedby={errors.whatsapp ? 'whatsapp-error' : undefined} />
            </Field>
            <Field label="Estado" error={errors.state} errorId="state-error">
              <select value={data.state} onChange={(event) => update('state', event.target.value)} aria-invalid={Boolean(errors.state)} aria-describedby={errors.state ? 'state-error' : undefined}>
                <option value="">Selecione</option>{states.map((state) => <option key={state}>{state}</option>)}
              </select>
            </Field>
            <Field label="Cidade" error={errors.city} errorId="city-error" full>
              <input value={data.city} onChange={(event) => update('city', event.target.value)} autoComplete="address-level2" aria-invalid={Boolean(errors.city)} aria-describedby={errors.city ? 'city-error' : undefined} />
            </Field>
            <button className="button button--primary button--full" type="button" onClick={next}>Continuar <ArrowRight aria-hidden="true" size={19} /></button>
          </div>
        ) : (
          <div className="form-grid">
            <fieldset className="field field--full" aria-describedby={errors.isInstructor ? 'isInstructor-error' : undefined}>
              <legend>Você atua como instrutor?</legend>
              <div className="choice-row">
                {['Sim', 'Não', 'Em formação'].map((option) => <Choice key={option} name="isInstructor" value={option} checked={data.isInstructor === option} onChange={() => update('isInstructor', option)} />)}
              </div>
              {errors.isInstructor ? <em className="field-error" id="isInstructor-error">{errors.isInstructor}</em> : null}
            </fieldset>
            {data.isInstructor === 'Sim' ? <Field label="Registro ou credencial (opcional)" full><input value={data.credential} onChange={(event) => update('credential', event.target.value)} /></Field> : null}
            <Field label="Tipo de atuação" error={errors.roleType} errorId="roleType-error" full>
              <select value={data.roleType} onChange={(event) => update('roleType', event.target.value)} aria-invalid={Boolean(errors.roleType)} aria-describedby={errors.roleType ? 'roleType-error' : undefined}>
                <option value="">Selecione</option><option>Instrutor independente</option><option>Clube ou estande</option><option>Escola ou centro de treinamento</option><option>Outra atuação profissional</option>
              </select>
            </Field>
            <Field label="Principal interesse" error={errors.interest} errorId="interest-error" full>
              <select value={data.interest} onChange={(event) => update('interest', event.target.value)} aria-invalid={Boolean(errors.interest)} aria-describedby={errors.interest ? 'interest-error' : undefined}>
                <option value="">Selecione</option><option>Quero me associar</option><option>Quero conhecer os benefícios</option><option>Quero falar com a equipe</option><option>Quero entender os critérios</option>
              </select>
            </Field>
            <label className="consent">
              <input type="checkbox" checked={data.consent} onChange={(event) => update('consent', event.target.checked)} aria-invalid={Boolean(errors.consent)} aria-describedby={errors.consent ? 'consent-error' : undefined} />
              <span>Autorizo o uso destes dados exclusivamente para contato sobre a ABRIAT e o processo de associação.</span>
            </label>
            {errors.consent ? <p className="field-error" id="consent-error">{errors.consent}</p> : null}
            <div className="quiz-actions">
              <button className="button button--ghost" type="button" onClick={() => setStep(1)}><ArrowLeft aria-hidden="true" size={18} />Voltar</button>
              <button className="button button--primary" type="submit" disabled={status === 'sending'}>{status === 'sending' ? 'Preparando…' : 'Concluir interesse'}<ArrowRight aria-hidden="true" size={19} /></button>
            </div>
          </div>
        )}
      </form>
      <p className="privacy-note"><LockKeyhole aria-hidden="true" size={16} /> Dados usados somente para contato institucional. <a href="#politica">Privacidade</a>.</p>
      <div className="quiz-shell__stamp"><UserRoundCheck aria-hidden="true" /><span>Etapa inicial rápida, segura e sem envio de documentos.</span></div>
    </section>
  )
}

function Field({ label, error, errorId, full = false, children }: { label: string; error?: string; errorId?: string; full?: boolean; children: ReactNode }) {
  return <label className={`field ${full ? 'field--full' : ''}`}><span>{label}</span>{children}{error ? <em className="field-error" id={errorId}>{error}</em> : null}</label>
}

function Choice({ name, value, checked, onChange }: { name: string; value: string; checked: boolean; onChange: () => void }) {
  return <label className={`choice ${checked ? 'choice--selected' : ''}`}><input type="radio" name={name} value={value} checked={checked} onChange={onChange} /><span>{value}</span></label>
}
