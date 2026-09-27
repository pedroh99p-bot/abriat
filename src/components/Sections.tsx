import {
  ArrowRight,
  BadgeCheck,
  Building2,
  ChevronDown,
  ClipboardList,
  Clock3,
  FileCheck2,
  GraduationCap,
  IdCard,
  Instagram,
  MessageCircle,
  Network,
  QrCode,
  Send,
  ShieldCheck,
  Target,
  UsersRound,
  X,
} from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { benefits, faqs, pillars, siteConfig } from '../data/content'
import { track } from '../lib/analytics'
import { AssociationCta } from './AssociationCta'
import { SectionHeading } from './SectionHeading'

export function WhySection() {
  return (
    <section className="section why" id="sobre">
      <div className="container">
        <SectionHeading eyebrow="Sobre a ABRIAT" title={<>Uma associação para <em>fortalecer o instrutor.</em></>} description="A ABRIAT conecta instrutores de armamento e tiro no Brasil, fortalecendo sua representatividade, estrutura e valorização." />
        <div className="pillar-grid">
          {pillars.map(({ icon: Icon, title, text }) => (
            <article className="pillar-card" key={title}>
              <Icon className="pillar-card__icon" aria-hidden="true" />
              <div><h3>{title}</h3><p>{text}</p></div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export function BenefitsSection() {
  const tracked = useRef(false)
  const [activeBenefit, setActiveBenefit] = useState(0)
  const trackRef = useRef<HTMLDivElement>(null)
  const handleInteraction = () => {
    if (!tracked.current) {
      track('benefits_interaction', { interaction: 'horizontal_carousel' })
      tracked.current = true
    }
  }
  const updateActiveBenefit = () => {
    const track = trackRef.current
    if (!track) return
    const cards = Array.from(track.children) as HTMLElement[]
    let nearest = 0
    let distance = Number.POSITIVE_INFINITY
    cards.forEach((card, index) => {
      const nextDistance = Math.abs(card.offsetLeft - track.scrollLeft)
      if (nextDistance < distance) {
        nearest = index
        distance = nextDistance
      }
    })
    setActiveBenefit(nearest)
  }
  return (
    <section className="section benefits" id="beneficios">
      <div className="container">
        <SectionHeading eyebrow="Benefícios do associado" title={<>Vantagens reais para <em>sua atuação.</em></>} description="Recursos e condições especiais que acompanham o associado ABRIAT." />
        <p className="swipe-hint">Deslize para ver os benefícios <ArrowRight size={16} aria-hidden="true" /></p>
        <div ref={trackRef} className="benefit-track" onScroll={() => { handleInteraction(); updateActiveBenefit() }} onPointerDown={handleInteraction} tabIndex={0} role="region" aria-roledescription="carrossel" aria-label="Benefícios do associado">
          {benefits.map((benefit, index) => {
            const Icon = 'icon' in benefit ? benefit.icon : undefined
            return (
              <article className={`benefit-card ${'logo' in benefit ? 'benefit-card--partner' : ''}`} key={benefit.title}>
                <span className="benefit-card__number">0{index + 1}</span>
                <span className="benefit-card__visual">
                  {'logo' in benefit ? <img className="benefit-card__partner-logo" src={benefit.logo} alt="Doutor das Armas Assessoria" width="1024" height="1024" loading="lazy" decoding="async" /> : Icon ? <Icon className="benefit-card__icon" aria-hidden="true" /> : null}
                </span>
                <span className="benefit-card__divider" aria-hidden="true" />
                <div className="benefit-card__copy">
                  {benefit.highlight ? <strong className="benefit-card__highlight">{benefit.highlight}</strong> : null}
                  <h3>{benefit.title}</h3><p>{benefit.text}</p>
                </div>
              </article>
            )
          })}
        </div>
        <div className="benefit-indicator" aria-hidden="true">
          {benefits.map((benefit, index) => <span className={index === activeBenefit ? 'is-active' : ''} key={benefit.title} />)}
        </div>
        <AssociationCta source="benefits" className="benefits__cta">Iniciar minha filiação</AssociationCta>
      </div>
    </section>
  )
}

const credentialFeatures = [
  { icon: IdCard, title: 'Número individual', text: 'Identificação única do associado.' },
  { icon: QrCode, title: 'QR Code', text: 'Validação vinculada ao cadastro.' },
  { icon: ShieldCheck, title: 'Status', text: 'Consulta da situação da associação.' },
]

const credentialDetails = [
  { title: 'Como funciona a credencial', text: 'Identifica o associado e seu número individual.' },
  { title: 'Como funciona o QR Code', text: 'Permite consultar a situação da associação.' },
  { title: 'O que pode ser validado', text: 'Status e informações autorizadas do associado.' },
]

export function CredentialSection() {
  const [detailsOpen, setDetailsOpen] = useState(false)
  return (
    <section className="section credential-section" id="carteirinha">
      <div className="container credential-section__layout">
        <header className="credential-section__heading">
          <SectionHeading eyebrow="Credencial ABRIAT" title={<>Identificação e validação <em>em um só lugar.</em></>} description="Carteirinha do associado com número individual e validação por QR Code." />
        </header>
        <figure className="credential-section__visual" data-reveal>
          <img src="/assets/credential-abriat-validation.webp" alt="Representação visual de uma carteirinha ABRIAT e um celular exibindo associação verificada" width="1024" height="1024" loading="lazy" decoding="async" />
          <figcaption>Exemplo visual. A validação depende da implementação do cadastro do associado.</figcaption>
        </figure>
        <div className="credential-section__content">
          <div className="credential-features" aria-label="Recursos da credencial">
            {credentialFeatures.map(({ icon: Icon, title, text }) => (
              <div className="credential-feature" key={title}>
                <Icon aria-hidden="true" />
                <div><h3>{title}</h3><p>{text}</p></div>
              </div>
            ))}
          </div>
          <div className="credential-details">
            <h3>
              <button type="button" aria-expanded={detailsOpen} aria-controls="credential-details-panel" onClick={() => setDetailsOpen((current) => !current)}>
                <span>Saiba mais sobre a credencial e o QR Code</span><ChevronDown aria-hidden="true" />
              </button>
            </h3>
            <div className={`credential-details__panel ${detailsOpen ? 'credential-details__panel--open' : ''}`} id="credential-details-panel" aria-hidden={!detailsOpen}>
              <div><ul>
                {credentialDetails.map((item) => <li key={item.title}><strong>{item.title}</strong><span>{item.text}</span></li>)}
              </ul></div>
            </div>
          </div>
          <AssociationCta source="credential" className="credential-section__cta">Iniciar minha filiação</AssociationCta>
        </div>
      </div>
    </section>
  )
}

const institutionalPillars = [
  { icon: UsersRound, title: 'Representar', text: 'a categoria.' },
  { icon: Network, title: 'Conectar', text: 'instrutores.' },
  { icon: GraduationCap, title: 'Desenvolver', text: 'profissionais.' },
  { icon: BadgeCheck, title: 'Valorizar', text: 'a atuação.' },
]

const contactTopics = [
  { label: 'Quero me filiar', message: 'Olá! Quero saber como iniciar minha filiação à ABRIAT.' },
  { label: 'Quero me tornar instrutor', message: 'Olá! Gostaria de receber orientação sobre o caminho para me tornar instrutor.' },
  { label: 'Documentos da filiação', message: 'Olá! Tenho dúvidas sobre os documentos necessários para a filiação à ABRIAT.' },
  { label: 'Benefícios e credencial', message: 'Olá! Quero entender melhor os benefícios e a credencial ABRIAT.' },
  { label: 'Falar com a equipe', message: 'Olá! Gostaria de falar com a equipe da ABRIAT.' },
]

export function WhoWeAreSection() {
  const [topicsOpen, setTopicsOpen] = useState(false)
  const contactButtonRef = useRef<HTMLButtonElement>(null)
  const closeTopics = () => {
    setTopicsOpen(false)
    window.requestAnimationFrame(() => contactButtonRef.current?.focus())
  }

  return (
    <>
      <section className="who-we-are" id="quem-somos" aria-labelledby="who-we-are-title">
        <div className="container who-we-are__content">
          <div className="who-we-are__editorial" data-reveal>
            <p className="eyebrow eyebrow--light"><span aria-hidden="true" />Quem somos</p>
            <h2 id="who-we-are-title">A voz de quem vive <em>a instrução.</em></h2>
            <p className="who-we-are__description">A ABRIAT reúne instrutores de armamento e tiro para fortalecer a categoria, ampliar conexões e construir novas oportunidades em todo o Brasil.</p>
          </div>
          <div className="who-we-are__pillars" aria-label="O que move a ABRIAT">
            {institutionalPillars.map(({ icon: Icon, title, text }) => (
              <article className="who-we-are__pillar" data-reveal-card key={title}>
                <Icon aria-hidden="true" />
                <span className="who-we-are__pillar-divider" aria-hidden="true" />
                <div><h3>{title}</h3><p>{text}</p></div>
              </article>
            ))}
          </div>
          <div className="who-we-are__social" data-reveal>
            <div><h3>Acompanhe a ABRIAT</h3><p>{siteConfig.contacts.abriatInstagramUsername}</p></div>
            <div className="who-we-are__actions">
              <a className="button button--outline-light" href={siteConfig.contacts.abriatInstagramUrl} target="_blank" rel="noreferrer"><Instagram aria-hidden="true" /> Instagram</a>
              <button className="button button--primary" type="button" ref={contactButtonRef} onClick={() => setTopicsOpen(true)}><MessageCircle aria-hidden="true" /> Falar com a ABRIAT</button>
            </div>
          </div>
        </div>
      </section>
      {topicsOpen ? <TopicSelectorDialog onClose={closeTopics} /> : null}
    </>
  )
}

function TopicSelectorDialog({ onClose }: { onClose: () => void }) {
  const dialogRef = useRef<HTMLDivElement>(null)
  const firstOptionRef = useRef<HTMLAnchorElement>(null)

  useEffect(() => {
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    firstOptionRef.current?.focus()

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
        return
      }
      if (event.key !== 'Tab' || !dialogRef.current) return
      const focusable = Array.from(dialogRef.current.querySelectorAll<HTMLElement>('a[href], button:not(:disabled)'))
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last?.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first?.focus()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [onClose])

  return createPortal(
    <div className="topic-selector__backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose() }}>
      <section className="topic-selector" role="dialog" aria-modal="true" aria-labelledby="topic-selector-title" ref={dialogRef}>
        <div className="topic-selector__heading">
          <div><p className="eyebrow"><span aria-hidden="true" />Atendimento ABRIAT</p><h2 id="topic-selector-title">Sobre o que você quer falar?</h2></div>
          <button type="button" className="topic-selector__close" aria-label="Fechar seletor de assunto" onClick={onClose}><X aria-hidden="true" /></button>
        </div>
        <div className="topic-selector__options">
          {contactTopics.map(({ label, message }, index) => (
            <a
              href={`https://wa.me/${siteConfig.contacts.whatsappWaMe}?text=${encodeURIComponent(message)}`}
              key={label}
              ref={index === 0 ? firstOptionRef : undefined}
              target="_blank"
              rel="noreferrer"
              onClick={onClose}
            >
              <span>{label}</span><ArrowRight aria-hidden="true" />
            </a>
          ))}
        </div>
      </section>
    </div>,
    document.body,
  )
}

const steps = [
  { icon: Send, title: 'Demonstre seu interesse', text: 'Preencha o formulário rápido e informe que deseja conhecer a ABRIAT.' },
  { icon: FileCheck2, title: 'Envie seus dados profissionais', text: 'Após a orientação, compartilhe qualificações e comprovantes pelos canais oficiais.' },
  { icon: UsersRound, title: 'Receba a orientação da equipe', text: 'A equipe responsável analisa as informações e apresenta os próximos passos.' },
]

export function ProcessSection() {
  return (
    <section className="section process" id="como-funciona">
      <div className="container process__layout">
        <SectionHeading eyebrow="Como funciona" title={<>Entrar para a ABRIAT <em>é simples.</em></>} description="Um processo inicial claro e direto para conhecer seu perfil e orientar as próximas etapas." />
        <div>
          <ol className="timeline">
            {steps.map(({ icon: Icon, title, text }, index) => (
              <li key={title}>
                <span className="timeline__number">0{index + 1}</span>
                <span className="icon-box"><Icon aria-hidden="true" /></span>
                <div><h3>{title}</h3><p>{text}</p></div>
              </li>
            ))}
          </ol>
          <div className="process__note"><Clock3 aria-hidden="true" /><div><strong>Processo claro e objetivo.</strong><span>Sem burocracia desnecessária na demonstração inicial de interesse.</span></div></div>
          <AssociationCta source="process" className="button--full">Iniciar meu cadastro</AssociationCta>
        </div>
      </div>
    </section>
  )
}

const instructorMoments = [
  { value: 'starting_zero', label: 'Começando do zero', icon: UsersRound },
  { value: 'attends_range', label: 'Já frequento clube/estande', icon: Target },
  { value: 'has_experience', label: 'Já tenho experiência', icon: Building2 },
  { value: 'wants_requirements', label: 'Quero entender os requisitos', icon: ClipboardList },
] as const

type InstructorMoment = (typeof instructorMoments)[number]['value']

export function FutureInstructorSection() {
  const [moment, setMoment] = useState<InstructorMoment | null>(null)
  const [hasRangeRelationship, setHasRangeRelationship] = useState<boolean | null>(null)
  const selectedMoment = instructorMoments.find((item) => item.value === moment)
  const message = selectedMoment && hasRangeRelationship !== null
    ? `Olá! Gostaria de receber orientação sobre o caminho para me tornar instrutor.\nMeu momento atual: ${selectedMoment.label}.\nVínculo com clube/estande: ${hasRangeRelationship ? 'Sim' : 'Não'}.`
    : null
  const whatsappUrl = message ? `https://wa.me/${siteConfig.contacts.whatsappWaMe}?text=${encodeURIComponent(message)}` : undefined

  return (
    <section className="future-instructor" id="quero-ser-instrutor" aria-labelledby="future-instructor-title">
      <div className="container future-instructor__layout">
        <header className="future-instructor__intro" data-reveal>
          <p className="eyebrow eyebrow--light"><span aria-hidden="true" />Ainda não é instrutor?</p>
          <h2 id="future-instructor-title">Quer entrar para o setor?<em>Comece pelo próximo passo.</em></h2>
          <p>Conte em que momento você está. A ABRIAT orienta os próximos passos e, quando aplicável, direciona você aos canais adequados.</p>
        </header>
        <div className="future-instructor__panel" data-reveal>
          <fieldset className="future-instructor__fieldset">
            <legend>Onde você está hoje?</legend>
            <div className="future-instructor__choices" role="group" aria-label="Selecione seu momento atual">
              {instructorMoments.map(({ value, label, icon: Icon }) => (
                <button className={`future-instructor__choice ${moment === value ? 'future-instructor__choice--selected' : ''}`} data-reveal-card type="button" aria-pressed={moment === value} onClick={() => setMoment(value)} key={value}>
                  <Icon aria-hidden="true" /><span>{label}</span>
                </button>
              ))}
            </div>
          </fieldset>
          <fieldset className="future-instructor__fieldset future-instructor__relationship">
            <legend>Já possui vínculo com clube ou estande?</legend>
            <div className="future-instructor__relationship-options" role="group" aria-label="Vínculo com clube ou estande">
              {[true, false].map((value) => (
                <button className={hasRangeRelationship === value ? 'future-instructor__relationship-choice--selected' : ''} type="button" aria-pressed={hasRangeRelationship === value} onClick={() => setHasRangeRelationship(value)} key={String(value)}>{value ? 'Sim' : 'Não'}</button>
              ))}
            </div>
          </fieldset>
          <a className={`button future-instructor__whatsapp ${whatsappUrl ? '' : 'future-instructor__whatsapp--disabled'}`} href={whatsappUrl} aria-disabled={!whatsappUrl} tabIndex={whatsappUrl ? 0 : -1} target={whatsappUrl ? '_blank' : undefined} rel={whatsappUrl ? 'noreferrer' : undefined}>
            <MessageCircle aria-hidden="true" /> Receber orientação no WhatsApp <ArrowRight aria-hidden="true" />
          </a>
        </div>
        <div className="future-instructor__member-link" data-reveal>
          <p>Já é instrutor certificado?</p>
          <a href="#filiacao">Iniciar filiação à ABRIAT <ArrowRight aria-hidden="true" /></a>
        </div>
      </div>
    </section>
  )
}

export function FaqSection() {
  const [open, setOpen] = useState<number | null>(0)
  const toggle = (index: number) => {
    const next = open === index ? null : index
    setOpen(next)
    if (next !== null) track('faq_open', { question_index: next + 1, question: faqs[next].question })
  }
  return (
    <section className="section faq" id="faq">
      <div className="container faq__layout">
        <div>
          <SectionHeading eyebrow="Dúvidas frequentes" title={<>Informação clara <em>antes de decidir.</em></>} description="Encontre respostas sobre o primeiro contato com a ABRIAT." />
          <div className="faq__trust"><ShieldCheck aria-hidden="true" /><span>O preenchimento demonstra interesse e não representa associação automática.</span></div>
        </div>
        <div className="accordion">
          {faqs.map((item, index) => {
            const isOpen = open === index
            return (
              <div className={`accordion__item ${isOpen ? 'accordion__item--open' : ''}`} key={item.question}>
                <h3><button type="button" aria-expanded={isOpen} aria-controls={`faq-answer-${index}`} onClick={() => toggle(index)}><span>{item.question}</span><ChevronDown aria-hidden="true" /></button></h3>
                <div className={`accordion__answer ${isOpen ? 'accordion__answer--open' : ''}`} id={`faq-answer-${index}`} aria-hidden={!isOpen}><div><p>{item.answer}</p></div></div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export function FinalCta() {
  return (
    <section className="final-cta">
      <div className="final-cta__target" aria-hidden="true"><Target /></div>
      <div className="container final-cta__content">
        <p className="eyebrow eyebrow--light"><span aria-hidden="true" />Próximo passo</p>
        <h2>Sua profissão merece <em>representatividade.</em></h2>
        <p>Faça a demonstração inicial de interesse e conheça os próximos passos da ABRIAT.</p>
        <AssociationCta source="final">Quero demonstrar interesse</AssociationCta>
      </div>
    </section>
  )
}
