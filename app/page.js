'use client'

import Image from 'next/image'
import { useEffect, useMemo, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const whatsappNumber = '919988220605'
const stories = [
  { id:'01', title:'A study in red', category:'Wedding', cover:'/assets/strip/rose-02.webp', images:['/assets/strip/rose-01.webp','/assets/strip/rose-02.webp','/assets/strip/rose-03.webp','/assets/strip/rose-04.webp'] },
  { id:'02', title:'Golden hours', category:'Celebration', cover:'/assets/strip/gold-02.webp', images:['/assets/strip/gold-01.webp','/assets/strip/gold-02.webp','/assets/strip/gold-03.webp','/assets/strip/gold-04.webp'] },
  { id:'03', title:'The quiet in-between', category:'Portraits', cover:'/assets/strip/ivory-02.webp', images:['/assets/strip/ivory-01.webp','/assets/strip/ivory-02.webp','/assets/strip/ivory-03.webp','/assets/strip/ivory-04.webp'] },
]
const films = [
  {id:'hEh09FqV4es', title:'Deepak + Ira', meta:'Wedding film / 01', thumb:'/assets/films/01.webp'},
  {id:'Yx_IowrGskQ', title:'Rahul + Reetu', meta:'Wedding film / 02', thumb:'/assets/films/02.webp'},
  {id:'YzzxU1stH0o', title:'Rahul + Rupali', meta:'Wedding film / 03', thumb:'/assets/films/03.webp'},
]
const collections = [
  ['01','Weddings','The day everything becomes a memory.'],
  ['02','Pre-weddings','The chapter before the chapter.'],
  ['03','Destination','Stories that travel with you.'],
  ['04','Bridal portraits','The quiet before everyone arrives.'],
]

function waLink(date='', location='') {
  const message = `Hi, I'd like to enquire about wedding films for ${date || '[date]'} in ${location || '[location]'}`
  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`
}

export default function Home() {
  const [story, setStory] = useState(null)
  const [film, setFilm] = useState(null)
  const [date, setDate] = useState('')
  const [location, setLocation] = useState('')
  const [menu, setMenu] = useState(false)
  const whatsapp = useMemo(() => waLink(date, location), [date, location])

  useEffect(() => {
    document.body.style.overflow = story || film || menu ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [story, film, menu])

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) return
    const ctx = gsap.context(() => {
      gsap.utils.toArray('.reveal').forEach(el => gsap.fromTo(el,{y:42,opacity:0},{y:0,opacity:1,duration:.9,ease:'power3.out',scrollTrigger:{trigger:el,start:'top 88%',once:true}}))
      if (window.innerWidth >= 768) {
        gsap.to('.film-ribbon', { x: () => `-${Math.max(0, document.querySelector('.ribbon-viewport')?.scrollWidth - document.querySelector('.ribbon-stage')?.clientWidth)}px`, ease:'none', scrollTrigger:{trigger:'.ribbon-stage',start:'top top',end:'+=1500',pin:true,scrub:1,invalidateOnRefresh:true} })
      }
    })
    return () => ctx.revert()
  }, [])

  useEffect(() => {
    const onKey = e => { if(e.key==='Escape'){setStory(null);setFilm(null);setMenu(false)} }
    window.addEventListener('keydown',onKey)
    return () => window.removeEventListener('keydown',onKey)
  }, [])

  return <main>
    <div className="viewfinder" aria-hidden="true"><i/><i/><i/><i/></div>
    <header className="site-header">
      <a className="brand" href="#top">SOULFUL WEDDINGS<span>PHOTOGRAPHY & FILM</span></a>
      <nav className="desktop-nav"><a href="#stories">Stories</a><a href="#films">Films</a><a href="#collections">About</a><a href="#contact">Enquire</a></nav>
      <button className="mobile-menu-button" onClick={()=>setMenu(true)}>Menu</button>
    </header>

    {menu && <div className="mobile-menu"><div className="menu-top"><span>SOULFUL WEDDINGS</span><button onClick={()=>setMenu(false)}>Close ×</button></div><nav><a href="#stories" onClick={()=>setMenu(false)}>Stories</a><a href="#films" onClick={()=>setMenu(false)}>Films</a><a href="#collections" onClick={()=>setMenu(false)}>Through the lens</a><a href="#contact" onClick={()=>setMenu(false)}>Enquire</a></nav><a className="menu-wa" href={whatsapp}>Start an enquiry ↗</a></div>}

    <div className="hud"><span id="chapter">01 / THE STUDIO</span><span>CHANDIGARH / SELECTED MOMENTS</span></div>

    <section id="top" className="hero joseph-like-section">
      <video className="hero-video" src="/assets/hero/hero.mp4" poster="/assets/hero/poster.webp" autoPlay muted loop playsInline preload="metadata" aria-hidden="true" />
      <div className="hero-shade" />
      <div className="hero-heading reveal"><p className="eyebrow">SOULFUL WEDDINGS / PHOTOGRAPHY & FILM</p><h1>Wedding films,<br/><em>made to be felt.</em></h1></div>
      <div className="hero-side"><span className="eyebrow">THE MOMENTS YOU KEEP.</span><p>Weddings · Pre-weddings<br/>Destination · Portraits</p></div>
      <div className="hero-actions"><a className="text-button" href="#stories">Explore the stories</a><a className="quiet-link" href={whatsapp}>Check availability</a></div>
      <div className="scroll-cue">SCROLL TO DEVELOP THE STORY<div className="scroll-line"/></div>
    </section>

    <section id="stories" className="work-section section">
      <div className="section-intro reveal"><p className="eyebrow">02 / SELECTED STORIES</p><h2>Every frame.<br/><em>A feeling.</em></h2><p>A considered collection of celebrations, portraits and the moments between them. <span className="media-note">Soulful Weddings / Chandigarh.</span></p></div>
      <div className="filmstrip-layout">
        <aside className="work-aside reveal"><span className="eyebrow">THE THINGS WE REMEMBER</span><p>The anticipation. The first look. The people who made the day yours.</p><p className="secondary">The setting changes.<br/>The feeling stays.</p></aside>
        <div className="ribbon-stage">
          <div className="ribbon-viewport"><div className="film-ribbon">{stories.concat(stories).map((s,i)=><button key={i} className="ribbon-frame" onClick={()=>setStory(s)}><span className="film-hole top"/><Image src={s.cover} alt={s.title} fill sizes="360px"/><span className="film-hole bottom"/><small>{s.id} / SOULFUL / 35MM</small></button>)}</div></div>
          <button className="ribbon-label" onClick={()=>setStory(stories[0])}>01 / {stories[0].title}<span>OPEN STORY</span></button>
          <p className="ribbon-hint">SCROLL TO TURN · SELECT A FRAME</p>
        </div>
        <aside className="case-list reveal"><p className="eyebrow">THE STORY INDEX</p><div className="case-head"><span>Story</span><span>Collection</span></div>{stories.map(s=><button key={s.id} className="case-row" onClick={()=>setStory(s)}><small>{s.id}.</small><span>{s.title}</span><span>{s.category}</span></button>)}<p className="secondary">A photograph is an invitation.<br/>There is always more to the story.</p></aside>
      </div>
    </section>

    <section id="films" className="films-section section">
      <div className="section-top reveal"><div><p className="eyebrow">03 / IN MOTION</p><h2>A moment,<br/><em>in motion.</em></h2></div><p>Select a film to bring it closer.<br/><span className="media-note">Films by Soulful Weddings.</span></p></div>
      <div className="video-panels">{films.map((f,i)=><button className="video-panel reveal" key={f.id} onClick={()=>setFilm(f)}><div className="video-thumb"><Image src={f.thumb} alt={f.title} fill sizes="(max-width:700px) 90vw, 40vw"/><span className="play-label">SELECT TO PLAY</span></div><div className="film-meta"><span>FILM {String(i+1).padStart(2,'0')}</span><span>WATCH ↗</span></div><h3>{f.title}</h3></button>)}</div>
    </section>

    <section id="collections" className="collections-section section">
      <div className="section-top reveal"><div><p className="eyebrow">04 / THROUGH THE LENS</p><h2>Life, in all<br/><em>its forms.</em></h2></div><p>Wedding days. Family milestones.<br/>A destination. A portrait worth remembering.</p></div>
      <div className="collection-editorial"><div className="collection-image reveal"><Image src="/assets/rose.webp" alt="Soulful Weddings portrait" fill sizes="(max-width:700px) 92vw, 46vw"/><span className="media-note">SOULFUL WEDDINGS / CHANDIGARH</span></div><div className="collection-links">{collections.map(([n,t,d])=><a key={n} href="#contact"><span>{n}</span><h3>{t}</h3><small>{d}</small></a>)}</div></div>
    </section>

    <section id="contact" className="contact-section section">
      <div className="contact-copy reveal"><p className="eyebrow">05 / YOUR STORY, NEXT</p><h2>Some days<br/><em>stay with you.</em></h2><p>Tell us about yours.</p><a className="text-button" href={whatsapp}>Check availability ↗</a></div>
      <div className="print-composition reveal"><div className="print p1"><Image src="/assets/rose.webp" alt="Wedding portrait" fill sizes="260px"/></div><div className="print p2"><Image src="/assets/gold.webp" alt="Wedding celebration" fill sizes="260px"/></div><span>A moment becomes a memory.</span></div>
      <div className="contact-links"><a href={whatsapp}>WhatsApp</a><a href="https://www.instagram.com/soulful_weddings_/" target="_blank" rel="noreferrer">Instagram</a><a href="https://www.youtube.com/@SoulfulWeddings" target="_blank" rel="noreferrer">YouTube</a></div>
      <div className="enquiry-bar"><div><span className="eyebrow">START WITH THE DETAILS</span><p>Your message opens directly in WhatsApp.</p></div><div className="fields"><label>Date<input type="date" value={date} onChange={e=>setDate(e.target.value)}/></label><label>Location<input placeholder="City or venue" value={location} onChange={e=>setLocation(e.target.value)}/></label></div><a className="solid-button" href={whatsapp}>Message on WhatsApp ↗</a></div>
      <footer><span>SOULFUL WEDDINGS / PHOTOGRAPHY & FILM</span><span>CONCEPT BY COPYWRK</span><a href="#top">Back to the beginning</a></footer>
    </section>

    <div className="timeline" aria-hidden="true"><span/></div>

    {story && <div className="modal" onClick={()=>setStory(null)}><div className="story-dialog" onClick={e=>e.stopPropagation()}><div className="modal-top"><span>{story.id} / SELECTED STORY</span><button onClick={()=>setStory(null)}>Close ×</button></div><div className="story-title"><h2>{story.title}</h2><span>{story.category}</span></div><div className="story-grid">{story.images.map((src,i)=><Image key={src} src={src} alt={`${story.title} photograph ${i+1}`} width={1000} height={1300}/>)}</div></div></div>}
    {film && <div className="modal" onClick={()=>setFilm(null)}><div className="film-dialog" onClick={e=>e.stopPropagation()}><div className="modal-top"><span>03 / IN MOTION</span><button onClick={()=>setFilm(null)}>Close ×</button></div><div className="player"><iframe src={`https://www.youtube.com/embed/${film.id}?autoplay=1&rel=0`} title={film.title} allow="autoplay; encrypted-media; picture-in-picture" allowFullScreen/></div><div className="player-caption"><span>{film.meta}</span><strong>{film.title}</strong></div></div></div>}
  </main>
}