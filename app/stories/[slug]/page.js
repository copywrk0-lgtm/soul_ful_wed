import Image from 'next/image'
import Link from 'next/link'

const data={
 rose:{id:'01',title:'A study in red',category:'Wedding',location:'Chandigarh',intro:'The anticipation. The first look. The people who made the day yours.',images:['/assets/stories/rose/01.webp','/assets/stories/rose/02.webp','/assets/stories/rose/03.webp','/assets/stories/rose/04.webp']},
 gold:{id:'02',title:'Golden hours',category:'Celebration',location:'Punjab',intro:'Warm light, crowded rooms and the little moments that become the ones you remember.',images:['/assets/stories/gold/01.webp','/assets/stories/gold/02.webp','/assets/stories/gold/03.webp','/assets/stories/gold/04.webp']},
 ivory:{id:'03',title:'The quiet in-between',category:'Portraits',location:'Chandigarh',intro:'The quiet before everyone arrives. A portrait of everything happening just beneath the surface.',images:['/assets/stories/ivory/01.webp','/assets/stories/ivory/02.webp','/assets/stories/ivory/03.webp','/assets/stories/ivory/04.webp']}
}

export function generateStaticParams(){return Object.keys(data).map(slug=>({slug}))}

export default async function StoryPage({params}){
 const {slug}=await params
 const story=data[slug]||data.rose
 return <main className="story-page">
  <div className="viewfinder" aria-hidden="true"><i/><i/><i/><i/></div>
  <header className="site-header story-header"><Link className="brand" href="/">SOULFUL WEDDINGS<span>PHOTOGRAPHY & FILM</span></Link><nav className="desktop-nav"><Link href="/">Home</Link><Link href="/#stories">Stories</Link><Link href="/#films">Films</Link><Link href="/#contact">Enquire</Link></nav></header>
  <div className="hud"><span>02 / SELECTED STORY</span><span>{story.location.toUpperCase()} / {story.category.toUpperCase()}</span></div>
  <section className="story-hero">
   <div className="story-hero-copy"><p className="eyebrow">{story.id} / SELECTED STORY</p><h1>{story.title}<br/><em>preserved.</em></h1><p className="story-intro">{story.intro}</p><Link className="text-button" href="#gallery">Enter the story ↘</Link></div>
   <div className="story-hero-meta"><span>{story.category}</span><span>{story.location}</span><span>SOULFUL WEDDINGS</span></div>
  </section>
  <section id="gallery" className="story-gallery-section">
   <div className="gallery-aside"><span className="eyebrow">THE STORY, FRAME BY FRAME</span><p>Nothing staged beyond the moment. Nothing added after.</p><small>Scroll to move through the story.</small></div>
   <div className="story-filmstrip">{story.images.concat(story.images).map((src,i)=><div className={'story-photo sf'+(i%6)} key={i}><Image src={src} alt={story.title+' photograph '+(i+1)} fill sizes="(max-width:767px) 72vw, 330px"/><span>{String(i%story.images.length+1).padStart(2,'0')} / SOULFUL / 35MM</span></div>)}</div>
  </section>
  <section className="story-closing">
   <div><p className="eyebrow">THE FEELING STAYS</p><h2>Some stories<br/><em>deserve to linger.</em></h2></div>
   <Link className="solid-button" href="https://wa.me/919988220605?text=Hi%2C%20I%27d%20like%20to%20enquire%20about%20wedding%20films">Enquire on WhatsApp ↗</Link>
  </section>
  <footer className="story-footer"><Link href="/">← Back to Soulful Weddings</Link><span>CONCEPT BY COPYWRK</span><span>PHOTOGRAPHY & FILM / CHANDIGARH</span></footer>
 </main>
}