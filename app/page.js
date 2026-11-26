'use client'
import Image from 'next/image'
import {useEffect,useMemo,useState} from 'react'
import {gsap} from 'gsap'
import {ScrollTrigger} from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

const stories=[
 {id:'rose',label:'A study in red',sub:'Ceremony / Chandigarh',cover:'/assets/rose.webp',sheet:'/assets/rose.webp'},
 {id:'gold',label:'Golden hours',sub:'Celebration / Punjab',cover:'/assets/gold.webp',sheet:'/assets/gold.webp'},
 {id:'ivory',label:'The quiet in-between',sub:'Portraits / Chandigarh',cover:'/assets/ivory.webp',sheet:'/assets/ivory.webp'}
]

import films from '../public/assets/films.json'


function waLink(date,location){const msg=`Hi, I'd like to enquire about wedding films for ${date||'[date]'} in ${location||'[location]'}`;return `https://wa.me/919988220605?text=${encodeURIComponent(msg)}`}
function Crop({src,index,alt}){const positions=['0% 0%','100% 0%','0% 100%','100% 100%'];return <span className="crop"><Image src={src} alt={alt} fill sizes="(max-width: 768px) 80vw, 34vw" style={{width:'200%',height:'200%',maxWidth:'none',objectFit:'cover',objectPosition:positions[index%4],transform:'translate('+((index%2)*-50)+'%, '+(index>1?-50:0)+'%)'}}/></span>}

export default function Home(){
 const [story,setStory]=useState(null); const [film,setFilm]=useState(null); const [date,setDate]=useState(''); const [location,setLocation]=useState('')
 useEffect(()=>{const reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches; if(reduced||window.innerWidth<768)return; const ctx=gsap.context(()=>{gsap.utils.toArray('.reveal').forEach(el=>gsap.fromTo(el,{y:40,opacity:0},{y:0,opacity:1,duration:.9,ease:'power3.out',scrollTrigger:{trigger:el,start:'top 85%',once:true}})); gsap.to('.film-track',{xPercent:-24,ease:'none',scrollTrigger:{trigger:'.film-wrap',start:'top top',end:'+=1300',pin:true,scrub:1.1}})},document);return()=>ctx.revert()},[])
 const preview=useMemo(()=>waLink(date,location),[date,location])
 return <main>
  <nav className="nav"><a href="#top" className="brand">SOULFUL <span>WEDDINGS</span></a><div className="navlinks"><a href="#stories">Stories</a><a href="#films">Films</a><a href="#contact">Enquire</a></div><a className="nav-wa" href={preview}>WhatsApp ↗</a></nav>
  <section id="top" className="hero">
   <video className="hero-media" autoPlay muted loop playsInline poster="/assets/hero/poster.webp"><source src="/assets/hero/hero.mp4" type="video/mp4"/></video><div className="hero-overlay"/>
   <div className="hero-content"><p className="eyebrow">01 / SOULFUL WEDDINGS / CHANDIGARH</p><h1>Wedding films,<br/>made to be <em>felt.</em></h1><p className="hero-copy">Cinematic wedding photography and films for the moments you’ll want to return to.</p><div className="actions"><a className="btn light" href="#films">Watch the films <span>↗</span></a><a className="btn outline" href={preview}>Check availability <span>↗</span></a></div></div><div className="hero-foot"><span>Scroll to explore</span><span>02 / 06</span></div>
  </section>

  <section id="stories" className="section stories"><div className="section-head reveal"><p className="label">02 / SELECTED STORIES</p><h2>Frames from <em>forever.</em></h2></div>
   <div className="desktop-story"><div className="film-wrap"><div className="film-track">{stories.flatMap((s)=>[0,1,2,3].map((j)=><button key={s.id+j} className="film-frame" onClick={()=>setStory(s)}><Crop src={s.sheet} index={j} alt="Wedding photograph"/></button>))}</div></div><aside className="story-index"><p className="label">THE STORIES</p>{stories.map((s,i)=><button key={s.id} onClick={()=>setStory(s)}><span>0{i+1}</span><strong>{s.label}</strong><small>{s.sub}</small></button>)}</aside></div>
   <div className="mobile-story">{stories.map((s,i)=><button className="story-row" key={s.id} onClick={()=>setStory(s)}><Crop src={s.sheet} index={i} alt="Wedding story"/><span><small>0{i+1}</small><strong>{s.label}</strong><em>{s.sub}</em></span><b>↗</b></button>)}</div>
  </section>

  <section id="films" className="section motion"><div className="section-head reveal"><p className="label">03 / IN MOTION</p><h2>Let the frame <em>breathe.</em></h2></div><div className="film-grid">{films.map(f=><button className="film-card reveal" key={f.id} onClick={()=>setFilm(f)}><div className="thumb"><Image src={f.thumb} alt={f.title} fill sizes="(max-width: 768px) 90vw, 45vw"/><span className="play">Play film ↗</span></div><div className="film-meta"><span>{f.meta}</span><strong>{f.title}</strong></div></button>)}</div></section>

  <section className="section services"><div className="section-head reveal"><p className="label">04 / WHAT WE SHOOT</p><h2>Every chapter, <em>beautifully.</em></h2></div><div className="service-list">{['Pre-wedding','Wedding films','Destination','Bridal portraits'].map((x,i)=><div className="service reveal" key={x}><span>0{i+1}</span><h3>{x}</h3><p>Sample — tailored visual storytelling for the people, places and rituals that make your celebration yours.</p><i>↗</i></div>)}</div></section>

  <section className="section packages"><div className="section-head reveal"><p className="label">05 / PACKAGES</p><h2>Choose the <em>feeling.</em></h2></div><div className="package-grid">{['The Essential','The Signature','The Heirloom'].map((x,i)=><article className="package reveal" key={x}><div><span>Sample / 0{i+1}</span><h3>{x}</h3><p>Sample — package description, coverage and deliverables.</p></div><a href={preview}>Enquire ↗</a></article>)}</div></section>

  <section id="contact" className="section contact"><div className="contact-copy reveal"><p className="label">06 / YOUR STORY NEXT</p><h2>Maybe the next<br/><em>story is yours.</em></h2><p>Tell us the date and place. We’ll take it from there.</p></div><div className="polaroids reveal"><div className="polaroid p1"><Image src="/assets/rose.webp" alt="Wedding portrait" fill sizes="40vw"/></div><div className="polaroid p2"><Image src="/assets/gold.webp" alt="Wedding celebration" fill sizes="40vw"/></div></div><div className="enquiry reveal"><div className="fields"><label>Date<input type="date" value={date} onChange={e=>setDate(e.target.value)}/></label><label>Location<input placeholder="e.g. Chandigarh" value={location} onChange={e=>setLocation(e.target.value)}/></label></div><a className="btn gold" href={preview}>Message on WhatsApp <span>↗</span></a><p>Opens WhatsApp with your enquiry pre-filled.</p></div></section>

  <footer className="footer"><div><strong>SOULFUL WEDDINGS</strong><span>Chandigarh, India</span></div><div className="footer-links"><a href="https://www.instagram.com/soulful_weddings_/" target="_blank">Instagram ↗</a><a href="https://www.youtube.com/@SoulfulWeddings" target="_blank">YouTube ↗</a></div><small>Concept by Copywrk</small></footer>

  {story&&<div className="modal" onClick={()=>setStory(null)}><div className="gallery" onClick={e=>e.stopPropagation()}><button className="close" onClick={()=>setStory(null)}>Close ×</button><div className="gallery-grid">{[0,1,2,3].map((i)=><div className="gallery-crop" key={i}><Crop src={story.sheet} index={i} alt="Wedding photograph"/></div>)}</div></div></div>}
  {film&&<div className="modal" onClick={()=>setFilm(null)}><div className="video-modal" onClick={e=>e.stopPropagation()}><button className="close" onClick={()=>setFilm(null)}>Close ×</button><div className="video-box"><iframe src={`https://www.youtube.com/embed/${film.id}?autoplay=1&rel=0`} title={film.title} allow="autoplay; encrypted-media; picture-in-picture" allowFullScreen/></div><div className="video-title"><span>{film.meta}</span><strong>{film.title}</strong></div></div></div>}
 </main>
}
