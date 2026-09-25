import { useEffect } from 'react'
import { Assistant } from './components/Assistant'
import { BenefitsSection, FaqSection, FinalCta, FounderSection, ProcessSection, ProfilesSection, WhySection } from './components/Sections'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { Quiz } from './components/Quiz'
import { track } from './lib/analytics'

export default function App() {
  useEffect(() => { track('page_view', { page_type: 'landing_page', page_name: 'abriat' }) }, [])

  useEffect(() => {
    const sections = document.querySelectorAll<HTMLElement>('.section, .founder, .final-cta, .footer')
    const cards = document.querySelectorAll<HTMLElement>('.pillar-card, .benefit-card, .timeline li')
    sections.forEach((section) => section.setAttribute('data-reveal', ''))
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
    }, { threshold: 0.08 })
    document.querySelectorAll<HTMLElement>('[data-reveal], [data-reveal-card]').forEach((item) => observer.observe(item))
    return () => observer.disconnect()
  }, [])

  return (
    <>
      <Header />
      <main id="conteudo">
        <Hero />
        <div className="quiz-stage"><div className="container"><Quiz /></div></div>
        <TextRoller variant="dark" text="REPRESENTATIVIDADE • ESTRUTURA • CONEXÃO • VALORIZAÇÃO • ABRIAT" />
        <WhySection />
        <BenefitsSection />
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
