'use client'

import Image from 'next/image'
import { useEffect, useMemo, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import films from '../public/assets/films.json'

gsap.registerPlugin(ScrollTrigger)

const whatsappNumber = '919988220605'

const stories = [
  {
    id: 'rose',
    index: '01',
    title: 'A study in red',
    meta: 'Story / Chandigarh',
    cover: '/assets/strip/rose-02.webp',
    images: ['/assets/strip/rose-01.webp', '/assets/strip/rose-02.webp', '/assets/strip/rose-03.webp', '/assets/strip/rose-04.webp'],
  },
  {
    id: 'gold',
    index: '02',
    title: 'Golden hours',
    meta: 'Story / Punjab',
    cover: '/assets/strip/gold-02.webp',
    images: ['/assets/strip/gold-01.webp', '/assets/strip/gold-02.webp', '/assets/strip/gold-03.webp', '/assets/strip/gold-04.webp'],
  },
  {
    id: 'ivory',
    index: '03',
    title: 'The quiet in-between',
    meta: 'Story / Chandigarh',
    cover: '/assets/strip/ivory-02.webp',
    images: ['/assets/strip/ivory-01.webp', '/assets/strip/ivory-02.webp', '/assets/strip/ivory-03.webp', '/assets/strip/ivory-04.webp'],
  },
]

const services = [
  ['01', 'Pre-wedding', 'Sample — intimate portraits, location stories and the little moments before the celebrations begin.'],
  ['02', 'Wedding films', 'Sample — cinematic coverage shaped around the people, rituals and atmosphere of the day.'],
  ['03', 'Destination', 'Sample — story-led coverage for celebrations beyond Chandigarh, wherever the next chapter takes you.'],
  ['04', 'Bridal portraits', 'Sample — quiet, editorial portraits that give the details and the bride their own frame.'],
]

const packages = [
  ['01', 'The Essential', 'Sample — a considered starting point for couples who want the important chapters preserved beautifully.'],
  ['02', 'The Signature', 'Sample — a fuller visual story with more room for atmosphere, details and the in-between moments.'],
  ['03', 'The Heirloom', 'Sample — an expansive story designed for couples who want their celebration remembered in depth.'],
]

function waLink(date, location) {
  const message = `Hi, I'd like to enquire about wedding films for ${date || '[date]'} in ${location || '[location]'}`
  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`
}

function Reveal({ children, className = '' }) {
  return <div className={`reveal ${className}`}>{children}</div>
}

export default function Home() {
  const [story, setStory] = useState(null)
  const [film, setFilm] = useState(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const [date, setDate] = useState('')
  const [location, setLocation] = useState('')
  const whatsapp = useMemo(() => waLink(date, location), [date, location])

  useEffect(() => {
    document.body.style.overflow = story || film || menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [story, film, menuOpen])

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) return

    const ctx = gsap.context(() => {
      gsap.utils.toArray('.reveal').forEach((el) => {
        gsap.fromTo(el, { y: 38, opacity: 0 }, {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 88%', once: true },
        })
      })

      if (window.innerWidth >= 768) {
        gsap.to('.film-track', {
          x: () => `-${Math.max(0, document.querySelector('.film-track')?.scrollWidth - document.querySelector('.film-wrap')?.clientWidth)}px`,
          ease: 'none',
          scrollTrigger: {
            trigger: '.film-wrap',
            start: 'top top',
            end: '+=1200',
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
          },
        })
      }
    })

    return () => ctx.revert()
  }, [])

  useEffect(() => {
    const onKey = (event) => {
      if (event.key === 'Escape') {
        setStory(null)
        setFilm(null)
        setMenuOpen(false)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <main>
      <header className="nav">
        <a href="#top" className="brand" onClick={() => setMenuOpen(false)}>SOULFUL <span>WEDDINGS</span></a>
        <nav className="desktop-nav" aria-label="Primary navigation">
          <a href="#stories">Stories</a>
          <a href="#films">Films</a>
          <a href="#contact">Enquire</a>
        </nav>
        <div className="nav-right">
          <a className="nav-wa" href={whatsapp}>WhatsApp ↗</a>
          <button className="menu-toggle" onClick={() => setMenuOpen(true)} aria-label="Open menu">Menu</button>
        </div>
      </header>

      {menuOpen && (
        <div className="mobile-menu">
          <div className="mobile-menu-top"><span>SOULFUL WEDDINGS</span><button onClick={() => setMenuOpen(false)}>Close ×</button></div>
          <nav>
            <a href="#stories" onClick={() => setMenuOpen(false)}><span>02</span>Selected Stories</a>
            <a href="#films" onClick={() => setMenuOpen(false)}><span>03</span>In Motion</a>
            <a href="#services" onClick={() => setMenuOpen(false)}><span>04</span>What we shoot</a>
            <a href="#packages" onClick={() => setMenuOpen(false)}><span>05</span>Packages</a>
            <a href="#contact" onClick={() => setMenuOpen(false)}><span>06</span>Your story next</a>
          </nav>
          <a className="mobile-menu-wa" href={whatsapp}>Start an enquiry ↗</a>
        </div>
      )}

      <section id="top" className="hero">
        <Image className="hero-image" src="/assets/hero/poster.webp" alt="Wedding celebration" fill priority sizes="100vw" />
        <div className="hero-overlay" />
        <div className="hero-grain" />
        <div className="hero-content">
          <Reveal>
            <p className="eyebrow">01 / SOULFUL WEDDINGS / CHANDIGARH</p>
            <h1>Wedding films,<br />made to be <em>felt.</em></h1>
            <p className="hero-copy">Cinematic wedding films and photography for celebrations full of feeling, detail and the people who make them matter.</p>
            <div className="actions">
              <a className="btn btn-light" href="#films">Watch the films <span>↗</span></a>
              <a className="btn btn-outline" href={whatsapp}>Check availability <span>↗</span></a>
            </div>
          </Reveal>
        </div>
        <div className="hero-foot"><span>Scroll to explore</span><span>01 / 06</span></div>
      </section>

      <section id="stories" className="section stories-section">
        <div className="section-head">
          <Reveal><p className="label">02 / SELECTED STORIES</p></Reveal>
          <Reveal><h2>Frames from <em>forever.</em></h2></Reveal>
        </div>

        <div className="desktop-story">
          <div className="film-wrap">
            <div className="film-track">
              {stories.flatMap((s) => s.images.map((image, i) => (
                <button key={`${s.id}-${i}`} className="film-frame" onClick={() => setStory(s)} aria-label={`Open ${s.title}`}>
                  <Image src={image} alt="Wedding photograph" fill sizes="(max-width: 1200px) 35vw, 420px" />
                  <span className="frame-number">{s.index} / {String(i + 1).padStart(2, '0')}</span>
                </button>
              )))}
            </div>
          </div>
          <aside className="story-index">
            <p className="label">THE STORIES</p>
            {stories.map((s) => (
              <button key={s.id} onClick={() => setStory(s)}>
                <span>{s.index}</span>
                <strong>{s.title}</strong>
                <small>{s.meta}</small>
                <i>↗</i>
              </button>
            ))}
          </aside>
        </div>

        <div className="mobile-story">
          {stories.map((s) => (
            <button className="story-row" key={s.id} onClick={() => setStory(s)}>
              <Image src={s.cover} alt="Wedding photograph" width={100} height={128} loading="lazy" />
              <span><small>{s.index}</small><strong>{s.title}</strong><em>{s.meta}</em></span>
              <b>↗</b>
            </button>
          ))}
        </div>
      </section>

      <section id="films" className="section motion-section">
        <div className="section-head split-head">
          <Reveal><p className="label">03 / IN MOTION</p></Reveal>
          <Reveal><h2>Let the frame <em>breathe.</em></h2></Reveal>
        </div>
        <div className="film-grid">
          {films.map((item) => (
            <button className="film-card reveal" key={item.id} onClick={() => setFilm(item)}>
              <div className="thumb">
                <Image src={item.thumb} alt={item.title} fill sizes="(max-width: 767px) 90vw, 45vw" loading="lazy" />
                <span className="play">Play film ↗</span>
              </div>
              <div className="film-meta"><span>{item.meta}</span><strong>{item.title}</strong></div>
            </button>
          ))}
        </div>
      </section>

      <section id="services" className="section services-section">
        <div className="section-head">
          <Reveal><p className="label">04 / WHAT WE SHOOT</p></Reveal>
          <Reveal><h2>Every chapter, <em>beautifully.</em></h2></Reveal>
        </div>
        <div className="service-list">
          {services.map(([index, title, copy]) => (
            <Reveal key={title} className="service">
              <span>{index}</span><h3>{title}</h3><p>{copy}</p><i>↗</i>
            </Reveal>
          ))}
        </div>
      </section>

      <section id="packages" className="section packages-section">
        <div className="section-head">
          <Reveal><p className="label">05 / PACKAGES</p></Reveal>
          <Reveal><h2>Choose the <em>feeling.</em></h2></Reveal>
        </div>
        <div className="package-grid">
          {packages.map(([index, title, copy]) => (
            <Reveal key={title} className="package">
              <div><span>Sample / {index}</span><h3>{title}</h3><p>{copy}</p></div>
              <a href={whatsapp}>Enquire ↗</a>
            </Reveal>
          ))}
        </div>
        <p className="sample-note">All package names, descriptions and inclusions shown here are Sample content for this concept.</p>
      </section>

      <section id="contact" className="section contact-section">
        <div className="contact-copy">
          <Reveal><p className="label">06 / YOUR STORY NEXT</p></Reveal>
          <Reveal><h2>Maybe the next<br /><em>story is yours.</em></h2></Reveal>
          <Reveal><p>Tell us the date and place. We’ll take it from there.</p></Reveal>
        </div>

        <Reveal className="polaroids">
          <div className="polaroid p1"><Image src="/assets/rose.webp" alt="Wedding portrait" fill sizes="38vw" loading="lazy" /></div>
          <div className="polaroid p2"><Image src="/assets/gold.webp" alt="Wedding celebration" fill sizes="38vw" loading="lazy" /></div>
        </Reveal>

        <Reveal className="enquiry">
          <div className="enquiry-copy"><span>START WITH THE DETAILS</span><p>Your message opens directly in WhatsApp.</p></div>
          <div className="fields">
            <label>Date<input type="date" value={date} onChange={(e) => setDate(e.target.value)} /></label>
            <label>Location<input placeholder="e.g. Chandigarh" value={location} onChange={(e) => setLocation(e.target.value)} /></label>
          </div>
          <a className="btn btn-gold" href={whatsapp}>Message on WhatsApp <span>↗</span></a>
        </Reveal>
      </section>

      <footer className="footer">
        <div className="footer-brand"><strong>SOULFUL WEDDINGS</strong><span>Chandigarh, India</span></div>
        <div className="footer-links"><a href="https://www.instagram.com/soulful_weddings_/" target="_blank" rel="noreferrer">Instagram ↗</a><a href="https://www.youtube.com/@SoulfulWeddings" target="_blank" rel="noreferrer">YouTube ↗</a></div>
        <small>Concept by Copywrk</small>
      </footer>

      {story && (
        <div className="modal" role="dialog" aria-modal="true" onClick={() => setStory(null)}>
          <div className="gallery-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-top"><span>{story.index} / SELECTED STORY</span><button onClick={() => setStory(null)}>Close ×</button></div>
            <div className="gallery-title"><h2>{story.title}</h2><span>{story.meta}</span></div>
            <div className="gallery-grid">
              {story.images.map((src, i) => <Image key={src} src={src} alt={`${story.title} photograph ${i + 1}`} width={900} height={1200} loading="lazy" />)}
            </div>
          </div>
        </div>
      )}

      {film && (
        <div className="modal" role="dialog" aria-modal="true" onClick={() => setFilm(null)}>
          <div className="video-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-top"><span>03 / IN MOTION</span><button onClick={() => setFilm(null)}>Close ×</button></div>
            <div className="video-box"><iframe src={`https://www.youtube.com/embed/${film.id}?autoplay=1&rel=0`} title={film.title} allow="autoplay; encrypted-media; picture-in-picture" allowFullScreen /></div>
            <div className="video-title"><span>{film.meta}</span><strong>{film.title}</strong></div>
          </div>
        </div>
      )}
    </main>
  )
}