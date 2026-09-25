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

  return (
    <>
      <Header />
      <main id="conteudo">
        <Hero />
        <div className="quiz-stage"><div className="container"><Quiz /></div></div>
        <WhySection />
        <BenefitsSection />
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
