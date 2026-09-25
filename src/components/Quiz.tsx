import { ArrowLeft, ArrowRight, Check, LockKeyhole, Target, UserRoundCheck } from 'lucide-react'
import { type FormEvent, type ReactNode, useEffect, useRef, useState } from 'react'
import { track } from '../lib/analytics'
import { type InterestPayload, type InterestType, submitInterest, validateStep } from '../lib/submit-interest'

const states = ['AC','AL','AP','AM','BA','CE','DF','ES','GO','MA','MT','MS','MG','PA','PB','PR','PE','PI','RJ','RN','RS','RO','RR','SC','SP','SE','TO']
const initialData: InterestPayload = {
  interestType: '', fullName: '', whatsapp: '', state: '', city: '', credential: '', roleType: '', interest: '', moment: '', hasClubLink: '', consent: false,
}
const moments = ['Estou começando do zero', 'Já frequento clube ou estande', 'Já tenho experiência com tiro', 'Quero entender os requisitos']

export function Quiz() {
  const [step, setStep] = useState<1 | 2 | 3>(1)
  const [data, setData] = useState<InterestPayload>(initialData)
  const [errors, setErrors] = useState<Partial<Record<keyof InterestPayload, string>>>({})
  const [resultUrl, setResultUrl] = useState('')
  const [selectedInterest, setSelectedInterest] = useState<InterestType | ''>('')
  const started = useRef(false)
  const formRef = useRef<HTMLFormElement>(null)
  const interestType = data.interestType as InterestType | ''

  const update = <K extends keyof InterestPayload>(key: K, value: InterestPayload[K]) => {
    setData((current) => ({ ...current, [key]: value }))
    setErrors((current) => ({ ...current, [key]: undefined }))
  }

  const markStart = (type: InterestType | '' = interestType) => {
    if (started.current) return
    started.current = true
    track('quiz_start', { interest_type: type || 'not_selected' })
  }

  useEffect(() => {
    const selectInterest = (event: Event) => {
      const type = (event as CustomEvent<InterestType>).detail
      if (type !== 'association' && type !== 'become_instructor') return
      if (!started.current) {
        started.current = true
        track('quiz_start', { interest_type: type })
      }
      update('interestType', type)
      setSelectedInterest('')
      setStep(2)
      setResultUrl('')
    }
    window.addEventListener('abriat:quiz-interest', selectInterest)
    return () => window.removeEventListener('abriat:quiz-interest', selectInterest)
  }, [])

  const focusFirstError = () => {
    window.setTimeout(() => formRef.current?.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus(), 0)
  }
  const chooseInterest = (type: InterestType) => {
    markStart(type)
    update('interestType', type)
    track('quiz_step_complete', { step: 1, interest_type: type })
    setSelectedInterest(type)
    window.setTimeout(() => {
      setStep(2)
      setSelectedInterest('')
      window.setTimeout(() => document.getElementById('quiz-step-title')?.focus(), 0)
    }, 180)
  }
  const next = () => {
    const nextErrors = validateStep(2, data)
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length) return focusFirstError()
    track('quiz_step_complete', { step: 2, interest_type: interestType })
    setStep(3)
    window.setTimeout(() => document.getElementById('quiz-step-title')?.focus(), 0)
  }
  const submit = async (event: FormEvent) => {
    event.preventDefault()
    const nextErrors = validateStep(3, data)
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length) return focusFirstError()
    const result = await submitInterest(data)
    setResultUrl(result.whatsappUrl)
    track('quiz_submit', { status: result.status, interest_type: interestType })
  }

  if (resultUrl) {
    return (
      <section className="quiz-shell" id="quiz" aria-labelledby="quiz-success-title">
        <div className="quiz-success">
          <span className="quiz-success__icon"><Check aria-hidden="true" /></span>
          <p className="eyebrow"><span aria-hidden="true" />Próximo passo</p>
          <h2 id="quiz-success-title">Seu interesse está pronto.</h2>
          <p>Continue a conversa com a equipe ABRIAT pelo WhatsApp. A mensagem inicial não inclui seus dados pessoais.</p>
          <a className="button button--primary" href={resultUrl} target="_blank" rel="noreferrer" onClick={() => track('whatsapp_click', { interest_type: interestType })}>Continuar pelo WhatsApp <ArrowRight aria-hidden="true" size={19} /></a>
        </div>
      </section>
    )
  }

  return (
    <section className="quiz-shell" id="quiz" aria-labelledby="quiz-step-title">
      <div className="quiz-shell__topline"><span style={{ width: `${step * 33.333}%` }} /></div>
      <div className="quiz-shell__meta"><span>{interestType === 'become_instructor' ? 'Orientação para novos instrutores' : 'Interesse na ABRIAT'}</span><b>Etapa {step} de 3</b></div>
      <div className="quiz-shell__intro">
        <Target aria-hidden="true" />
        <div><h2 id="quiz-step-title" tabIndex={-1}>{step === 1 ? 'Como podemos te ajudar?' : step === 2 ? 'Seus dados para contato' : interestType === 'become_instructor' ? 'Qual é seu momento hoje?' : 'Conte sobre sua atuação'}</h2>
          <p>{step === 1 ? 'Escolha a opção que melhor representa seu interesse.' : step === 2 ? 'Precisamos apenas do básico para orientar o próximo passo.' : interestType === 'become_instructor' ? 'A ABRIAT pode orientar seu próximo passo e, quando aplicável, direcionar você a um estande ou parceiro para receber as orientações necessárias sobre o processo.' : 'Compartilhe um pouco sobre seu trabalho e o que busca na associação.'}</p></div>
      </div>
      <form ref={formRef} onSubmit={submit} onFocusCapture={() => markStart()} noValidate>
        {step === 1 ? (
          <div className="quiz-profiles">
            <button type="button" className={`quiz-profile ${selectedInterest === 'association' ? 'quiz-profile--selected' : ''}`} onClick={() => chooseInterest('association')}>
              <span>JÁ SOU INSTRUTOR</span><small>Quero conhecer a ABRIAT e saber como me associar.</small><ArrowRight aria-hidden="true" />
            </button>
            <button type="button" className={`quiz-profile ${selectedInterest === 'become_instructor' ? 'quiz-profile--selected' : ''}`} onClick={() => chooseInterest('become_instructor')}>
              <span>QUERO ME TORNAR INSTRUTOR</span><small>Quero orientação para começar esse caminho corretamente.</small><ArrowRight aria-hidden="true" />
            </button>
          </div>
        ) : step === 2 ? (
          <div className="form-grid">
            <Field label="Nome completo" error={errors.fullName} errorId="fullName-error" full><input value={data.fullName} onChange={(event) => update('fullName', event.target.value)} autoComplete="name" aria-invalid={Boolean(errors.fullName)} aria-describedby={errors.fullName ? 'fullName-error' : undefined} /></Field>
            <Field label="WhatsApp com DDD" error={errors.whatsapp} errorId="whatsapp-error"><input value={data.whatsapp} onChange={(event) => update('whatsapp', event.target.value)} inputMode="tel" autoComplete="tel" placeholder="(00) 00000-0000" aria-invalid={Boolean(errors.whatsapp)} aria-describedby={errors.whatsapp ? 'whatsapp-error' : undefined} /></Field>
            <Field label="Estado" error={errors.state} errorId="state-error"><select value={data.state} onChange={(event) => update('state', event.target.value)} aria-invalid={Boolean(errors.state)} aria-describedby={errors.state ? 'state-error' : undefined}><option value="">Selecione</option>{states.map((state) => <option key={state}>{state}</option>)}</select></Field>
            <Field label="Cidade" error={errors.city} errorId="city-error" full><input value={data.city} onChange={(event) => update('city', event.target.value)} autoComplete="address-level2" aria-invalid={Boolean(errors.city)} aria-describedby={errors.city ? 'city-error' : undefined} /></Field>
            <div className="quiz-actions"><button className="button button--ghost" type="button" onClick={() => setStep(1)}><ArrowLeft aria-hidden="true" size={18} />Voltar</button><button className="button button--primary" type="button" onClick={next}>Continuar <ArrowRight aria-hidden="true" size={19} /></button></div>
          </div>
        ) : (
          <div className="form-grid">
            {interestType === 'association' ? <>
              <Field label="Registro profissional (opcional)" full><input value={data.credential} onChange={(event) => update('credential', event.target.value)} autoComplete="off" /></Field>
              <Field label="Tipo ou local de atuação" error={errors.roleType} errorId="roleType-error" full><select value={data.roleType} onChange={(event) => update('roleType', event.target.value)} aria-invalid={Boolean(errors.roleType)} aria-describedby={errors.roleType ? 'roleType-error' : undefined}><option value="">Selecione</option><option>Instrutor independente</option><option>Clube ou estande</option><option>Escola ou centro de treinamento</option><option>Outra atuação profissional</option></select></Field>
              <Field label="Principal interesse na ABRIAT" error={errors.interest} errorId="interest-error" full><select value={data.interest} onChange={(event) => update('interest', event.target.value)} aria-invalid={Boolean(errors.interest)} aria-describedby={errors.interest ? 'interest-error' : undefined}><option value="">Selecione</option><option>Quero me associar</option><option>Quero conhecer os benefícios</option><option>Quero falar com a equipe</option><option>Quero entender os critérios</option></select></Field>
            </> : <>
              <fieldset className="field field--full" aria-describedby={errors.moment ? 'moment-error' : undefined}><legend>Qual é seu momento hoje?</legend><div className="quiz-option-list">{moments.map((item) => <Choice key={item} name="moment" value={item} checked={data.moment === item} onChange={() => update('moment', item)} />)}</div>{errors.moment ? <em className="field-error" id="moment-error">{errors.moment}</em> : null}</fieldset>
              <fieldset className="field field--full" aria-describedby={errors.hasClubLink ? 'club-error' : undefined}><legend>Já possui vínculo com algum clube ou estande?</legend><div className="choice-row choice-row--two">{['Sim', 'Não'].map((item) => <Choice key={item} name="club" value={item} checked={data.hasClubLink === item} onChange={() => update('hasClubLink', item)} />)}</div>{errors.hasClubLink ? <em className="field-error" id="club-error">{errors.hasClubLink}</em> : null}</fieldset>
            </>}
            <label className="consent"><input type="checkbox" checked={data.consent} onChange={(event) => update('consent', event.target.checked)} aria-invalid={Boolean(errors.consent)} aria-describedby={errors.consent ? 'consent-error' : undefined} /><span>Autorizo o uso destes dados para contato sobre a ABRIAT e a orientação solicitada.</span></label>
            {errors.consent ? <p className="field-error" id="consent-error">{errors.consent}</p> : null}
            <div className="quiz-actions"><button className="button button--ghost" type="button" onClick={() => setStep(2)}><ArrowLeft aria-hidden="true" size={18} />Voltar</button><button className="button button--primary" type="submit">Continuar <ArrowRight aria-hidden="true" size={19} /></button></div>
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
