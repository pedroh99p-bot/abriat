import { ArrowLeft, ArrowRight } from 'lucide-react'
import { type KeyboardEvent, type TouchEvent, useEffect, useRef, useState } from 'react'
import { heroSlides } from '../data/content'
import { track } from '../lib/analytics'

export function Hero() {
  const [current, setCurrent] = useState(0)
  const [paused, setPaused] = useState(false)
  const announced = useRef(new Set<number>())
  const touchStartX = useRef<number | null>(null)
  const resumeTimer = useRef<number | undefined>(undefined)
  const slide = heroSlides[current]

  useEffect(() => {
    if (!announced.current.has(current)) {
      track('hero_slide_view', { slide_index: current + 1, slide_name: slide.eyebrow })
      announced.current.add(current)
    }
  }, [current, slide.eyebrow])

  useEffect(() => {
    if (paused || window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return
    const timer = window.setInterval(() => setCurrent((index) => (index + 1) % heroSlides.length), 5500)
    return () => window.clearInterval(timer)
  }, [paused])

  useEffect(() => {
    const syncVisibility = () => setPaused(document.hidden)
    document.addEventListener('visibilitychange', syncVisibility)
    return () => {
      document.removeEventListener('visibilitychange', syncVisibility)
      window.clearTimeout(resumeTimer.current)
    }
  }, [])

  const goTo = (index: number) => setCurrent((index + heroSlides.length) % heroSlides.length)
  const handleTouchStart = (event: TouchEvent<HTMLElement>) => { touchStartX.current = event.changedTouches[0]?.clientX ?? null }
  const handleTouchEnd = (event: TouchEvent<HTMLElement>) => {
    const start = touchStartX.current
    const end = event.changedTouches[0]?.clientX
    touchStartX.current = null
    if (start === null || end === undefined || Math.abs(end - start) < 48) return
    goTo(current + (end < start ? 1 : -1))
    setPaused(true)
    window.clearTimeout(resumeTimer.current)
    resumeTimer.current = window.setTimeout(() => setPaused(false), 5500)
  }
  const handleTabKey = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return
    event.preventDefault()
    const nextIndex = event.key === 'Home' ? 0 : event.key === 'End' ? heroSlides.length - 1 : (index + (event.key === 'ArrowRight' ? 1 : -1) + heroSlides.length) % heroSlides.length
    goTo(nextIndex)
    event.currentTarget.parentElement?.querySelectorAll('button')[nextIndex]?.focus()
  }

  return (
    <section
      className="hero"
      aria-roledescription="carrossel"
      aria-label="Destaques ABRIAT"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={(event) => { if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setPaused(false) }}
    >
      <div className={`hero__media hero__media--${slide.crop}`} key={slide.image}>
        <img src={slide.image} alt={slide.alt} width="1680" height="944" />
        <div className="hero__shade" />
      </div>
      <div className="hero__target" aria-hidden="true"><i /><i /><i /><b /></div>
      <div className="container hero__content" aria-live="polite" aria-atomic="true">
        <div className="hero__copy">
          <p className="eyebrow eyebrow--light"><span aria-hidden="true" />{slide.eyebrow}</p>
          <h1>{slide.title}<strong>{slide.highlight}</strong></h1>
          <p className="hero__description">{slide.description}</p>
          <a
            className="button button--primary"
            href={slide.href}
            onClick={() => track('hero_slide_click', { slide_index: current + 1, destination: slide.href })}
          >
            <span>{slide.cta}</span><ArrowRight aria-hidden="true" size={19} />
          </a>
        </div>
        <div className="hero__controls">
          <button type="button" aria-label="Banner anterior" onClick={() => goTo(current - 1)}><ArrowLeft aria-hidden="true" /></button>
          <div className="hero__dots" role="tablist" aria-label="Selecionar banner">
            {heroSlides.map((item, index) => (
              <button
                key={item.eyebrow}
                type="button"
                role="tab"
                tabIndex={index === current ? 0 : -1}
                aria-selected={index === current}
                aria-label={`Mostrar banner ${index + 1}: ${item.eyebrow}`}
                onKeyDown={(event) => handleTabKey(event, index)}
                onClick={() => goTo(index)}
              ><span>0{index + 1}</span></button>
            ))}
          </div>
          <button type="button" aria-label="Próximo banner" onClick={() => goTo(current + 1)}><ArrowRight aria-hidden="true" /></button>
        </div>
      </div>
    </section>
  )
}
