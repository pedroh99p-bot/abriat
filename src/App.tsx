import { useEffect, useState } from 'react'
import { Assistant } from './components/Assistant'
import { BenefitsSection, CredentialSection, FaqSection, FinalCta, FounderSection, ProcessSection, ProfilesSection, WhySection } from './components/Sections'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { Quiz } from './components/Quiz'
import { siteConfig } from './data/content'
import { track } from './lib/analytics'

export default function App() {
  useEffect(() => { track('page_view', { page_type: 'landing_page', page_name: 'abriat' }) }, [])

  useEffect(() => {
    const sections = document.querySelectorAll<HTMLElement>('.section, .founder, .final-cta, .footer')
    const cards = document.querySelectorAll<HTMLElement>('.pillar-card, .benefit-card, .timeline li')
    sections.forEach((section) => section.setAttribute('data-reveal', ''))
    document.querySelector('.membership-stage__inner')?.setAttribute('data-reveal', '')
    cards.forEach((card, index) => {
      card.setAttribute('data-reveal-card', '')
      card.style.setProperty('--reveal-delay', `${(index % 5) * 70}ms`)
    })
    if (!('IntersectionObserver' in window)) return
    document.documentElement.classList.add('motion-ready')
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
          observer.unobserve(entry.target)
        }
      })
    }, { threshold: 0.01, rootMargin: '0px 0px 100px 0px' })
    document.querySelectorAll<HTMLElement>('[data-reveal], [data-reveal-card]').forEach((item) => observer.observe(item))
    return () => observer.disconnect()
  }, [])

  return (
    <>
      <SitePreloader />
      <Header />
      <main id="conteudo">
        <Hero />
        <section className="membership-stage" id="filiacao" aria-labelledby="membership-heading">
          <div className="container membership-stage__inner">
            <header className="membership-stage__intro">
              <p className="eyebrow"><span aria-hidden="true" />Filiação ABRIAT</p>
              <h2 id="membership-heading" tabIndex={-1}>Comece sua <em>filiação</em></h2>
              <p>Envie seus dados iniciais para começar seu processo de filiação à ABRIAT.</p>
              <span className="membership-stage__step">Etapa inicial <i aria-hidden="true" /></span>
            </header>
            <Quiz />
          </div>
        </section>
        <TextRoller variant="dark" text="REPRESENTATIVIDADE • ESTRUTURA • CONEXÃO • VALORIZAÇÃO • ABRIAT" />
        <WhySection />
        <BenefitsSection />
        <CredentialSection />
        <TextRoller variant="light" text="CONHECIMENTO • DISCIPLINA • INSTRUÇÃO • RESPONSABILIDADE" />
        <FounderSection />
        <ProcessSection />
        <ProfilesSection />
        <FaqSection />
        <FinalCta />
      </main>
      <Footer />
      <Assistant />
    </>
  )
}

function SitePreloader() {
  const [visible, setVisible] = useState(true)
  const [leaving, setLeaving] = useState(false)

  useEffect(() => {
    let pageLoaded = document.readyState === 'complete'
    let minimumTimeElapsed = false
    let exitTimer: number | undefined
    const dismissWhenReady = () => {
      if (!pageLoaded || !minimumTimeElapsed) return
      setLeaving(true)
      exitTimer = window.setTimeout(() => setVisible(false), 320)
    }
    const onLoad = () => {
      pageLoaded = true
      dismissWhenReady()
    }
    window.addEventListener('load', onLoad)
    const minimumTimer = window.setTimeout(() => {
      minimumTimeElapsed = true
      dismissWhenReady()
    }, 520)
    return () => {
      window.removeEventListener('load', onLoad)
      window.clearTimeout(minimumTimer)
      window.clearTimeout(exitTimer)
    }
  }, [])

  if (!visible) return null
  return (
    <div className={`site-preloader ${leaving ? 'site-preloader--leaving' : ''}`} role="status" aria-live="polite">
      <img className="site-preloader__logo" src={siteConfig.assets.logo} alt="ABRIAT" />
      <p>Preparando sua experiência</p>
      <span className="site-preloader__progress" aria-hidden="true"><i /></span>
    </div>
  )
}

function TextRoller({ variant, text }: { variant: 'dark' | 'light'; text: string }) {
  const phrases = text.split(' • ')
  const group = (copy: number) => phrases.map((phrase, index) => <span className="text-roller__phrase" key={`${copy}-${index}`}>{phrase}<i>•</i></span>)
  return (
    <div className={`text-roller text-roller--${variant}`} aria-hidden="true">
      <div className="text-roller__track">
        {[0, 1].map((copy) => <span className="text-roller__group" key={copy}>{group(copy)}</span>)}
      </div>
    </div>
  )
}
