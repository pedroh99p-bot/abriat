import {
  ArrowRight,
  Check,
  ChevronDown,
  Clock3,
  FileCheck2,
  Send,
  ShieldCheck,
  Target,
  UsersRound,
} from 'lucide-react'
import { type KeyboardEvent, useRef, useState } from 'react'
import { benefits, faqs, pillars, profiles, siteConfig } from '../data/content'
import { track } from '../lib/analytics'
import { AssociationCta } from './AssociationCta'
import { SectionHeading } from './SectionHeading'

export function WhySection() {
  return (
    <section className="section why" id="sobre">
      <div className="container">
        <div className="why__intro">
          <SectionHeading eyebrow="Sobre a ABRIAT" title={<>Por que a ABRIAT <em>existe?</em></>} description="Para fortalecer a atuação dos instrutores de armamento e tiro no Brasil, promovendo representatividade, integração e desenvolvimento profissional." />
          <blockquote>“Instruir é construir um Brasil mais seguro.”</blockquote>
        </div>
        <div className="pillar-grid">
          {pillars.map(({ icon: Icon, title, text }) => (
            <article className="pillar-card" key={title}>
              <span className="icon-box"><Icon aria-hidden="true" /></span>
              <h3>{title}</h3><p>{text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export function BenefitsSection() {
  const tracked = useRef(false)
  const handleInteraction = () => {
    if (!tracked.current) {
      track('benefits_interaction', { interaction: 'horizontal_carousel' })
      tracked.current = true
    }
  }
  return (
    <section className="section benefits" id="beneficios">
      <div className="container benefits__top">
        <SectionHeading eyebrow="Benefícios ABRIAT" title={<>Mais que benefícios. <em>Estrutura para o IAT.</em></>} description="Conexão, presença e apoio para fortalecer sua atuação profissional." />
        <CredentialMockup />
      </div>
      <div className="container">
        <p className="swipe-hint" aria-hidden="true">Deslize para conhecer <ArrowRight size={16} /></p>
        <div className="benefit-track" onScroll={handleInteraction} onPointerDown={handleInteraction} tabIndex={0} aria-label="Benefícios, lista horizontal">
          {benefits.map(({ icon: Icon, title, text }, index) => (
            <article className="benefit-card" key={title}>
              <span className="benefit-card__number">0{index + 1}</span>
              <span className="icon-box"><Icon aria-hidden="true" /></span>
              <h3>{title}</h3><p>{text}</p>
            </article>
          ))}
        </div>
        <AssociationCta source="benefits" className="benefits__cta">Quero fazer parte dessa estrutura</AssociationCta>
      </div>
    </section>
  )
}

function CredentialMockup() {
  return (
    <div className="credential" aria-label="Representação ilustrativa de credencial ABRIAT">
      <div className="credential__brand"><Target aria-hidden="true" /><strong>ABRIAT</strong></div>
      <span className="credential__label">CREDENCIAL ILUSTRATIVA</span>
      <div className="credential__body">
        <div className="credential__photo" aria-hidden="true"><UsersRound /></div>
        <div><small>NOME</small><b>ASSOCIADO ABRIAT</b><small>CATEGORIA</small><b>INSTRUTOR</b><small>VALIDADE</small><b>— / —</b></div>
        <div className="credential__qr" aria-hidden="true" />
      </div>
      <p>TÉCNICA · DISCIPLINA · RESPONSABILIDADE</p>
    </div>
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
          <p className="founder__copy">Instrutor de armamento e tiro e despachante de armas, com atuação nacional.</p>
          <ul className="founder__highlights"><li>Instrutor de armamento e tiro</li><li>Despachante de armas</li><li>Atuação nacional</li></ul>
          <div className="founder__actions">
            <a className="button button--outline-light" href={siteConfig.contacts.founderInstagramUrl} target="_blank" rel="noreferrer" onClick={() => track('founder_instagram_click', { destination: 'instagram' })}>Instagram {siteConfig.contacts.founderInstagramUsername} <ArrowRight aria-hidden="true" size={19} /></a>
            <AssociationCta source="founder">Quero fazer parte da ABRIAT</AssociationCta>
          </div>
        </div>
      </div>
    </section>
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
