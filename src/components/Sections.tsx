import {
  ArrowRight,
  Check,
  ChevronDown,
  Clock3,
  FileCheck2,
  IdCard,
  QrCode,
  Send,
  ShieldCheck,
  Target,
  UsersRound,
} from 'lucide-react'
import { type KeyboardEvent, useEffect, useRef, useState } from 'react'
import { benefits, faqs, pillars, profiles, siteConfig } from '../data/content'
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

export function FounderSection() {
  return (
    <section className="founder" id="fundador">
      <div className="founder__visual"><img src={siteConfig.assets.founder} alt="Paulo Dornelas, fundador da ABRIAT" width="1122" height="1402" /></div>
      <div className="founder__shade" />
      <div className="container founder__content">
        <div>
          <p className="eyebrow eyebrow--light"><span aria-hidden="true" />Conheça o fundador</p>
          <h2>Paulo <em>Dornelas</em></h2>
          <p className="founder__alias">Dr das Armas</p>
          <p className="founder__role">Fundador da ABRIAT</p>
          <p className="founder__copy">Sua experiência no setor orienta a construção de uma associação conectada às necessidades de quem vive a instrução.</p>
          <FounderAuthority />
          <div className="founder__actions">
            <a className="button button--outline-light" href={siteConfig.contacts.founderInstagramUrl} target="_blank" rel="noreferrer" onClick={() => track('founder_instagram_click', { destination: 'instagram' })}>Instagram {siteConfig.contacts.founderInstagramUsername} <ArrowRight aria-hidden="true" size={19} /></a>
            <AssociationCta source="founder">Quero fazer parte da ABRIAT</AssociationCta>
          </div>
        </div>
      </div>
    </section>
  )
}

function FounderAuthority() {
  const [count, setCount] = useState(0)
  const blockRef = useRef<HTMLDivElement>(null)
  const started = useRef(false)

  useEffect(() => {
    const block = blockRef.current
    if (!block) return
    const reducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false
    if (reducedMotion || !('IntersectionObserver' in window)) {
      setCount(533)
      return
    }

    let frame = 0
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting || started.current) return
      started.current = true
      observer.disconnect()
      const duration = 1500
      const begin = performance.now()
      const update = (now: number) => {
        const progress = Math.min((now - begin) / duration, 1)
        setCount(Math.round(533 * (1 - (1 - progress) ** 3)))
        if (progress < 1) frame = requestAnimationFrame(update)
      }
      frame = requestAnimationFrame(update)
    }, { threshold: 0.35 })
    observer.observe(block)
    return () => {
      observer.disconnect()
      cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <div className="founder-authority" ref={blockRef} aria-label="Indicadores sobre o fundador e a ABRIAT">
      <div className="founder-authority__item founder-authority__item--followers">
        <strong aria-hidden="true">{count}K+</strong><span className="sr-only">533 mil</span>
        <span>Seguidores</span>
      </div>
      <div className="founder-authority__item"><strong>Atuação</strong><span>Nacional</span></div>
      <div className="founder-authority__item"><strong>Fundador</strong><span>ABRIAT</span></div>
    </div>
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

export function ProfilesSection() {
  const [active, setActive] = useState(profiles[0].id)
  const profile = profiles.find((item) => item.id === active) ?? profiles[0]
  const Icon = profile.icon
  const selectProfile = (id: string) => {
    setActive(id)
    track('profile_interaction', { profile: id })
  }
  const handleTabKey = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return
    event.preventDefault()
    const nextIndex = event.key === 'Home' ? 0 : event.key === 'End' ? profiles.length - 1 : (index + (event.key === 'ArrowRight' ? 1 : -1) + profiles.length) % profiles.length
    selectProfile(profiles[nextIndex].id)
    event.currentTarget.parentElement?.querySelectorAll('button')[nextIndex]?.focus()
  }
  return (
    <section className="section profiles" id="perfis">
      <div className="container">
        <SectionHeading eyebrow="Quem pode fazer parte" title={<>A ABRIAT é para quem <em>vive a instrução.</em></>} description="Escolha seu perfil para ver os detalhes." />
        <div className="profile-tabs" role="tablist" aria-label="Perfis de interesse">
          {profiles.map((item, index) => (
            <button key={item.id} type="button" role="tab" tabIndex={active === item.id ? 0 : -1} aria-selected={active === item.id} aria-controls={`panel-${item.id}`} id={`tab-${item.id}`} onKeyDown={(event) => handleTabKey(event, index)} onClick={() => selectProfile(item.id)}>{item.label}</button>
          ))}
        </div>
        <div className="profile-panel" role="tabpanel" id={`panel-${profile.id}`} aria-labelledby={`tab-${profile.id}`}>
          <span className="profile-panel__icon"><Icon aria-hidden="true" /></span>
          <div><p>Perfil selecionado</p><h3>{profile.title}</h3><span>{profile.text}</span></div>
          <Check aria-hidden="true" className="profile-panel__check" />
        </div>
        <AssociationCta source="profiles" className="profiles__cta">Quero demonstrar interesse</AssociationCta>
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
