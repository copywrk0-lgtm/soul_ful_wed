'use client'

import Image from 'next/image'
import { useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const stories=[
 {id:'01',slug:'rose',title:'A study in red',category:'Wedding',location:'Chandigarh',cover:'/assets/strip/rose-02.webp',images:['/assets/stories/rose/01.webp','/assets/stories/rose/02.webp','/assets/stories/rose/03.webp','/assets/stories/rose/04.webp']},
 {id:'02',slug:'gold',title:'Golden hours',category:'Celebration',location:'Punjab',cover:'/assets/strip/gold-02.webp',images:['/assets/stories/gold/01.webp','/assets/stories/gold/02.webp','/assets/stories/gold/03.webp','/assets/stories/gold/04.webp']},
 {id:'03',slug:'ivory',title:'The quiet in-between',category:'Portraits',location:'Chandigarh',cover:'/assets/strip/ivory-02.webp',images:['/assets/stories/ivory/01.webp','/assets/stories/ivory/02.webp','/assets/stories/ivory/03.webp','/assets/stories/ivory/04.webp']}
]
const films=[
 {id:'hEh09FqV4es',title:'Deepak + Ira',meta:'Wedding film / 01',thumb:'/assets/films/01.webp'},
 {id:'Yx_IowrGskQ',title:'Rahul + Reetu',meta:'Wedding film / 02',thumb:'/assets/films/02.webp'},
 {id:'YzzxU1stH0o',title:'Rahul + Rupali',meta:'Wedding film / 03',thumb:'/assets/films/03.webp'}
]
const collections=[['01','Weddings','The day everything becomes a memory.'],['02','Pre-weddings','The chapter before the chapter.'],['03','Destination','Stories that travel with you.'],['04','Bridal portraits','The quiet before everyone arrives.']]

export default function Home(){
 useEffect(()=>{
  if(window.matchMedia('(prefers-reduced-motion: reduce)').matches)return
  const ctx=gsap.context(()=>{
   gsap.utils.toArray('.reveal').forEach(el=>gsap.fromTo(el,{y:35,opacity:0},{y:0,opacity:1,duration:.85,ease:'power3.out',scrollTrigger:{trigger:el,start:'top 88%',once:true}}))
   if(innerWidth>=768){
    gsap.to('.spiral-track',{y:()=>-(document.querySelector('.spiral-track').scrollHeight-760),ease:'none',scrollTrigger:{trigger:'.stories-stage',start:'top top',end:'+=1350',pin:true,scrub:1,invalidateOnRefresh:true}})
   }
  })
  return()=>ctx.revert()
 },[])
 return <main>
  <div className="viewfinder" aria-hidden="true"><i/><i/><i/><i/></div>
  <header className="site-header"><a className="brand" href="#top">SOULFUL WEDDINGS<span>PHOTOGRAPHY & FILM</span></a><nav className="desktop-nav"><a href="#stories">Stories</a><a href="#films">Films</a><a href="#collections">About</a><a href="#contact">Enquire</a></nav><a className="mobile-menu-button" href="#contact">Enquire</a></header>
  <div className="hud"><span>01 / THE STUDIO</span><span>CHANDIGARH / SELECTED MOMENTS</span></div>

  <section id="top" className="hero">
   <video className="hero-video" src="/assets/hero/hero.mp4" poster="/assets/hero/poster.webp" autoPlay muted loop playsInline preload="metadata"/>
   <div className="hero-shade"/>
   <div className="hero-heading reveal"><p className="eyebrow">SOULFUL WEDDINGS / PHOTOGRAPHY & FILM</p><h1>Wedding films,<br/><em>made to be felt.</em></h1></div>
   <div className="hero-side"><span className="eyebrow">THE MOMENTS YOU KEEP.</span><p>Weddings · Pre-weddings<br/>Destination · Portraits</p></div>
   <div className="hero-actions"><a className="text-button" href="#stories">Explore the stories</a><a className="quiet-link" href="#contact">Check availability</a></div>
   <div className="scroll-cue">SCROLL TO DEVELOP THE STORY<div className="scroll-line"/></div>
  </section>

  <section id="stories" className="stories-section">
   <div className="stories-stage">
    <div className="stories-head reveal"><span className="eyebrow">02 / SELECTED STORIES</span><span className="eyebrow right">CHANDIGARH / SELECTED MOMENTS</span></div>
    <aside className="remember reveal"><span className="eyebrow">THE THINGS WE REMEMBER</span><p>The anticipation.<br/>The first look. The people who made the day yours.</p><small>The setting changes.<br/>The feeling stays.</small></aside>
    <div className="spiral-wrap" aria-label="Selected wedding stories">
      <div className="spiral-track">
       {stories.concat(stories).map((s,i)=><a href={'/stories/'+s.slug} className={'spiral-frame f'+(i%8)} key={i} aria-label={'Open '+s.title}><Image src={s.cover} alt={s.title} fill sizes="220px"/><span className="frame-caption">{s.id} / SOULFUL / 35MM</span></a>)}
      </div>
    </div>
    <div className="story-open reveal"><span>01 / A STUDY IN RED</span><a href="/stories/rose">OPEN STORY</a><small>SCROLL TO TURN · SELECT A FRAME</small></div>
    <aside className="story-index reveal"><span className="eyebrow">THE STORY INDEX</span><div className="index-head"><span>Story</span><span>Collection</span></div>{stories.map(s=><a className="index-row" href={'/stories/'+s.slug} key={s.id}><small>{s.id}.</small><strong>{s.title}</strong><span>{s.category}</span></a>)}<p>A photograph is an invitation.<br/>There is always more to the story.</p></aside>
   </div>
  </section>

  <section id="films" className="films-section section">
   <div className="section-top reveal"><div><p className="eyebrow">03 / IN MOTION</p><h2>A moment,<br/><em>in motion.</em></h2></div><p>Select a film to bring it closer.<br/><span className="media-note">Films by Soulful Weddings.</span></p></div>
   <div className="video-panels">{films.map((f,i)=><a className="video-panel reveal" key={f.id} href={'https://www.youtube.com/watch?v='+f.id} target="_blank" rel="noreferrer"><div className="video-thumb"><Image src={f.thumb} alt={f.title} fill sizes="(max-width:700px) 90vw, 40vw"/><span className="play-label">WATCH ↗</span></div><div className="film-meta"><span>FILM {String(i+1).padStart(2,'0')}</span><span>{f.meta}</span></div><h3>{f.title}</h3></a>)}</div>
  </section>

  <section id="collections" className="collections-section section">
   <div className="section-top reveal"><div><p className="eyebrow">04 / THROUGH THE LENS</p><h2>Life, in all<br/><em>its forms.</em></h2></div><p>Wedding days. Family milestones.<br/>A destination. A portrait worth remembering.</p></div>
   <div className="collection-editorial"><div className="collection-image reveal"><Image src="/assets/rose.webp" alt="Soulful Weddings portrait" fill sizes="(max-width:700px) 92vw, 46vw"/><span className="media-note">SOULFUL WEDDINGS / CHANDIGARH</span></div><div className="collection-links">{collections.map(([n,t,d])=><a href="#contact" key={n}><span>{n}</span><h3>{t}</h3><small>{d}</small></a>)}</div></div>
  </section>

  <section id="contact" className="contact-section section">
   <div className="contact-copy reveal"><p className="eyebrow">05 / YOUR STORY, NEXT</p><h2>Some days<br/><em>stay with you.</em></h2><p>Tell us about yours.</p><a className="text-button" href="https://wa.me/919988220605?text=Hi%2C%20I%27d%20like%20to%20enquire%20about%20wedding%20films%20for%20%5Bdate%5D%20in%20%5Blocation%5D">Check availability ↗</a></div>
   <div className="print-composition reveal"><div className="print p1"><Image src="/assets/rose.webp" alt="Wedding portrait" fill sizes="260px"/></div><div className="print p2"><Image src="/assets/gold.webp" alt="Wedding celebration" fill sizes="260px"/></div><span>A moment becomes a memory.</span></div>
   <div className="contact-links"><a href="https://wa.me/919988220605">WhatsApp</a><a href="https://www.instagram.com/soulful_weddings_/" target="_blank" rel="noreferrer">Instagram</a><a href="https://www.youtube.com/@SoulfulWeddings" target="_blank" rel="noreferrer">YouTube</a></div>
   <footer><span>SOULFUL WEDDINGS / PHOTOGRAPHY & FILM</span><span>CONCEPT BY COPYWRK</span><a href="#top">Back to the beginning</a></footer>
  </section>
 </main>
}