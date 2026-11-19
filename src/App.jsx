import React, { useMemo, useState } from 'react';
import emailjs from '@emailjs/browser';
import {
  ArrowUpRight, Github, Linkedin, Mail, MapPin, Phone, Download, ExternalLink,
  Menu, X, Sparkles, Code2, BriefcaseBusiness, GraduationCap, Award,
  FolderGit2, Sun, Moon, Play, FileText, Send, ChevronRight, Eye,
  Image as ImageIcon, Trophy, CalendarDays, Globe2, CheckCircle2
} from 'lucide-react';
import {
  profile, socials, education, skillGroups, internships, projects,
  certificates, achievements
} from './data/portfolio';

const nav = ['About','Education','Skills','Experience','Projects','Certifications','Achievements','Contact'];
const iconFor = (name) => ({ GitHub, LinkedIn, Email: Mail }[name] || ExternalLink);

function SectionTitle({ eyebrow, title, description }) {
  return <div className="section-title">
    <span className="eyebrow">{eyebrow}</span>
    <h2>{title}</h2>
    {description && <p>{description}</p>}
  </div>;
}

function App() {
  const [light, setLight] = useState(false); // Dark mode is the default theme
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedCert, setSelectedCert] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedAchievement, setSelectedAchievement] = useState(null);
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [sending, setSending] = useState(false);
  const [notice, setNotice] = useState('');
  const [filter, setFilter] = useState('All');

  const categories = useMemo(() => ['All', ...new Set(projects.map(p => p.category))], []);
  const visibleProjects = filter === 'All' ? projects : projects.filter(p => p.category === filter);

  const submitContact = async (e) => {
    e.preventDefault();
    const service = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const template = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const key = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
    if (!service || !template || !key) {
      setNotice('The contact form is not configured yet. Please add your EmailJS credentials in .env.local.');
      return;
    }
    setSending(true);
    setNotice('');
    try {
      await emailjs.send(service, template, {
        from_name: form.name,
        reply_to: form.email,
        subject: form.subject,
        message: form.message,
        to_email: profile.email
      }, key);
      setNotice('Thank you! Your message has been sent to my inbox.');
      setForm({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      setNotice('Sorry, the message could not be sent. Please email me directly.');
    } finally {
      setSending(false);
    }
  };

  const closeModals = () => {
    setSelectedCert(null);
    setSelectedProject(null);
    setSelectedAchievement(null);
  };

  return <div className={light ? 'app light' : 'app'}>
    <header className="header">
      <a className="brand" href="#home" onClick={() => setMenuOpen(false)}>
        <span className="brand-mark">T</span><span>TIVARSHNA<span className="brand-dot">.</span></span>
      </a>
      <nav className={menuOpen ? 'nav open' : 'nav'}>
        {['Home', ...nav].map(item => <a key={item} href={item === 'Home' ? '#home' : `#${item.toLowerCase()}`} onClick={() => setMenuOpen(false)}>{item}</a>)}
      </nav>
      <div className="header-actions">
        <a className="credly-top" href={profile.credly} target="_blank" rel="noreferrer">
          <img src="/assets/logos/companies/Credly/Credly.png" alt=""/> Credly badges <ArrowUpRight size={14}/>
        </a>
        <button className="icon-button" onClick={() => setLight(!light)} aria-label="Toggle colour theme">{light ? <Moon size={18}/> : <Sun size={18}/>}</button>
        <a className="hire-button" href="#contact">Let's talk <ArrowUpRight size={16}/></a>
        <button className="icon-button mobile-menu" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">{menuOpen ? <X/> : <Menu/>}</button>
      </div>
    </header>

    <main>
      <section className="hero section-wrap" id="home">
        <div className="hero-copy">
          <div className="availability"><span className="pulse"></span> OPEN TO LEARNING & OPPORTUNITIES</div>
          <p className="hero-kicker">HELLO, I'M</p>
          <h1>Tivarshna <span>M.</span></h1>
          <h2 className="hero-role"><span>{profile.role}</span><span className="cursor">_</span></h2>
          <p className="hero-description">I build user-focused applications, explore AI-powered solutions, and turn ideas into practical digital experiences.</p>
          <div className="hero-actions">
            <a className="primary-button" href="#projects">Explore my work <ArrowUpRight size={17}/></a>
            <a className="secondary-button" href={profile.resume} target="_blank" rel="noreferrer"><Eye size={16}/> View resume</a>
            <a className="secondary-button" href={profile.resume} download><Download size={16}/> Download CV</a>
          </div>
          <div className="social-row">
            {socials.map(s => <a key={s.name} href={s.url} target="_blank" rel="noreferrer" title={s.name} aria-label={s.name}><img src={s.logo} alt={s.name}/></a>)}
          </div>
          <a className="credly-inline" href={profile.credly} target="_blank" rel="noreferrer"><img src="/assets/logos/companies/Credly/Credly.png" alt="Credly"/> Explore my verified badges on Credly <ArrowUpRight size={14}/></a>
        </div>
        <div className="hero-visual">
          <div className="orbit orbit-one"></div><div className="orbit orbit-two"></div><div className="hero-glow"></div>
          <div className="photo-frame">
  <img
    src={profile.photo}
    alt="Portrait of Tivarshna M"
    className="profile-photo"
  />
</div>
          <div className="floating-card card-code"><Code2 size={18}/><span><b>Developer</b><small>Always building</small></span></div>
          <div className="floating-card card-location"><MapPin size={17}/><span>Sattur, Tamil Nadu</span></div>
          <div className="sparkle s1">✦</div><div className="sparkle s2">✧</div>
        </div>
        <div className="hero-bottom"><span>SCROLL TO EXPLORE</span><span className="scroll-line"></span><span>01 / 08</span></div>
      </section>

      <section className="section-wrap section" id="about">
        <SectionTitle eyebrow="A LITTLE INTRODUCTION" title="About me" description="Curious mind. Practical builder. Always learning."/>
        <div className="about-grid">
          <div className="about-main glass-card"><span className="quote-mark">“</span><p>{profile.about}</p><p className="objective">{profile.objective}</p><div className="about-tags"><span>Full Stack Development</span><span>AI & Machine Learning</span><span>DevOps</span><span>AR / VR</span></div></div>
          <div className="about-side">
            <div className="stat-card"><Sparkles/><strong>2027</strong><span>Expected graduation</span></div>
            <div className="stat-card"><MapPin/><strong>Sattur</strong><span>Tamil Nadu, India</span></div>
            <div className="stat-card"><Globe2/><strong>Tamil · English</strong><span>Languages</span></div>
            <div className="stat-card"><Mail/><strong>Let's connect</strong><a href={`mailto:${profile.email}`}>{profile.email}</a></div>
          </div>
        </div>
      </section>

      <section className="section-wrap section" id="education">
        <SectionTitle eyebrow="MY LEARNING JOURNEY" title="Education" description="The academic foundation behind my technical journey."/>
        <div className="timeline">{education.map(e => <div className="timeline-item" key={e.course}><div className="timeline-dot"><GraduationCap size={17}/></div><div className="timeline-card"><div className="timeline-top"><span>{e.period}</span><b>{e.result}</b></div><h3>{e.course}</h3><p>{e.institution}</p></div></div>)}</div>
      </section>

      <section className="section-wrap section" id="skills">
        <SectionTitle eyebrow="WHAT I WORK WITH" title="Skills & technologies" description="A growing toolkit across programming, web development, databases and modern tools."/>
        <div className="skills-grid">{skillGroups.map((g, i) => <div className="skill-card" key={g.title}><div className="skill-number">0{i + 1}</div><h3>{g.title}</h3><div className="skill-list">{g.skills.map(s => <div className="skill-item" key={s.name}>{s.logo ? <img src={s.logo} alt=""/> : <span className="skill-initial">{s.name.slice(0,1)}</span>}<span><b>{s.name}</b><small>{s.level}</small></span></div>)}</div></div>)}</div>
      </section>

      <section className="section-wrap section" id="experience">
        <SectionTitle eyebrow="WHERE I'VE LEARNED" title="Internship experience" description="Practical exposure, collaboration and learning across different technology areas."/>
        <div className="experience-grid">{internships.map(x => <article className="experience-card" key={x.company + x.role}>
          <div className="experience-heading">{x.logo ? <img src={x.logo} alt={`${x.company} logo`}/> : <div className="experience-icon"><BriefcaseBusiness size={20}/></div>}<span className="date-label">{x.period}</span></div>
          <h3>{x.role}</h3><h4>{x.company}</h4><p>{x.detail}</p>
          {x.proof?.length > 0 && <div className="proof-row">{x.proof.map(src => <button key={src} onClick={() => setSelectedCert({title: x.role, issuer: x.company, file: src})}><Eye size={14}/> View supporting document</button>)}</div>}
        </article>)}</div>
      </section>

      <section className="section-wrap section" id="projects">
        <SectionTitle eyebrow="SELECTED WORK" title="Projects that make ideas real" description="Explore project screenshots, demos and reports. Repository links can be added as you publish each project to GitHub."/>
        <div className="filter-row">{categories.map(c => <button className={filter === c ? 'filter active' : 'filter'} key={c} onClick={() => setFilter(c)}>{c}</button>)}</div>
        <div className="projects-grid">{visibleProjects.map((p, i) => <article className="project-card" key={p.title}>
          <button className="project-media" onClick={() => setSelectedProject(p)} aria-label={`View ${p.title}`}>
            {p.image ? <img src={p.image} alt={`${p.title} screenshot`}/> : <div className="media-placeholder"><FolderGit2 size={36}/><span>PROJECT IN PROGRESS</span><small>Project preview will be added</small></div>}
            {p.video && <span className="play-button"><Play fill="currentColor"/></span>}<span className="project-index">{String(i + 1).padStart(2,'0')}</span>
          </button>
          <div className="project-body"><span className="project-category">{p.category}</span><h3>{p.title}</h3><p>{p.description}</p><div className="stack-text">{p.stack}</div>
            <div className="project-links"><button onClick={() => setSelectedProject(p)}><ImageIcon size={15}/> Explore project</button>{p.github && <a href={p.github} target="_blank" rel="noreferrer"><Github size={15}/> GitHub</a>}{p.report && <a href={p.report} target="_blank" rel="noreferrer"><FileText size={15}/> Report</a>}</div>
          </div>
        </article>)}</div>
      </section>

      <section className="section-wrap section" id="certifications">
        <SectionTitle eyebrow="CONTINUOUS LEARNING" title="Certifications & badges" description="Select any certificate to view the actual uploaded document and download it."/>
        <div className="cert-grid">{certificates.map(c => <button className="cert-card" key={c.title} onClick={() => setSelectedCert(c)}>
          <div className="cert-logo">{c.logo ? <img src={c.logo} alt={`${c.issuer} logo`}/> : <Award size={24}/>}</div>
          <div className="cert-info"><span>{c.issuer}{c.year ? ` · ${c.year}` : ''}</span><h3>{c.title}</h3><small>{c.file ? 'View certificate ↗' : 'Document pending'}</small></div>
          {c.featured && <span className="featured-label">AWARD</span>}<ChevronRight className="cert-arrow"/>
        </button>)}</div>
        <div className="badge-strip"><div><span className="eyebrow">DIGITAL BADGES</span><h3>Skills you can verify</h3><p>Selected badge images supplied with the portfolio files.</p></div>
          <div className="badge-items">{certificates.filter(c => c.badgeFile).map(c => <button key={c.title} onClick={() => setSelectedCert(c)}><img src={c.badgeFile} alt={`${c.title} badge`}/><span>{c.title}</span></button>)}
          <button onClick={() => window.open(profile.credly, '_blank', 'noopener,noreferrer')}><img src="/assets/logos/companies/Credly/Credly.png" alt="Credly"/><span>More on Credly</span></button></div>
        </div>
      </section>

      <section className="section-wrap section" id="achievements">
        <SectionTitle eyebrow="MILESTONES & RECOGNITION" title="Achievements" description="Awards, presentations and participation moments — with the photographs you uploaded."/>
        <div className="achievement-grid">{achievements.map((a, i) => <article className="achievement-card" key={a.title}>
          <div className="achievement-art"><Trophy size={32}/><span>{String(i + 1).padStart(2,'0')}</span></div>
          <div className="achievement-content"><h3>{a.title}</h3><p>{a.detail}</p>
            <div className="achievement-photos">{a.images.map((src, j) => <button key={src} onClick={() => setSelectedAchievement({ ...a, start: j })}><img src={src} alt={`${a.title} ${j + 1}`}/></button>)}</div>
            <button className="text-action" onClick={() => setSelectedAchievement({ ...a, start: 0 })}>View photo collection <ArrowUpRight size={14}/></button>
          </div>
        </article>)}</div>
      </section>

      <section className="section-wrap section contact-section" id="contact">
        <SectionTitle eyebrow="HAVE A PROJECT OR OPPORTUNITY?" title="Let's create something meaningful." description="Have a question, opportunity or feedback? Send me a message."/>
        <div className="contact-grid"><div className="contact-details">
          <a href={`mailto:${profile.email}`}><Mail/><span><small>Personal email</small>{profile.email}</span><ArrowUpRight/></a>
          <a href={`mailto:${profile.collegeEmail}`}><Mail/><span><small>College email</small>{profile.collegeEmail}</span><ArrowUpRight/></a>
          <a href={`tel:${profile.phone}`}><Phone/><span><small>Phone</small>+91 {profile.phone}</span><ArrowUpRight/></a>
          <a
  className="contact-detail-link"
  href="https://www.google.com/maps/place/Sattur,+Tamil+Nadu"
  target="_blank"
  rel="noreferrer"
>
  <MapPin />
  <span>
    <small>Location</small>
    <strong>{profile.location}</strong>
  </span>
  <ArrowUpRight />
</a>
          <div className="contact-socials">{socials.map(s => <a key={s.name} href={s.url} target="_blank" rel="noreferrer"><img src={s.logo} alt={s.name}/></a>)}</div>
        </div>
        <form className="contact-form" onSubmit={submitContact}>
          <div className="form-row"><label>Your name<input required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Enter your name"/></label><label>Your email<input required type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="you@example.com"/></label></div>
          <label>Subject<input required value={form.subject} onChange={e => setForm({ ...form, subject: e.target.value })} placeholder="What is this about?"/></label>
          <label>Message<textarea required rows="5" value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} placeholder="Write your message..."/></label>
          <button className="primary-button" disabled={sending}>{sending ? 'Sending...' : 'Send message'} <Send size={16}/></button>
          {notice && <p className="form-notice">{notice}</p>}
          <small className="privacy-note">Your message is sent to my email after the contact form is configured.</small>
        </form></div>
      </section>
    </main>

    <footer className="footer"><a className="brand" href="#home"><span className="brand-mark">T</span><span>TIVARSHNA<span className="brand-dot">.</span></span></a><span>Designed & built with curiosity by Tivarshna M.</span><a href="#home" className="back-top">Back to top ↑</a></footer>

    {selectedCert && <div className="modal-backdrop" onClick={closeModals}><div className="certificate-modal" onClick={e => e.stopPropagation()}>
      <button className="modal-close" onClick={closeModals}><X/></button><span className="eyebrow">CERTIFICATE / BADGE PREVIEW</span><h2>{selectedCert.title}</h2><p>{selectedCert.issuer}{selectedCert.year ? ` · ${selectedCert.year}` : ''}</p>
      {selectedCert.file ? <>{selectedCert.file.toLowerCase().endsWith('.pdf') ? <iframe className="certificate-pdf" src={selectedCert.file} title={selectedCert.title}/> : <img className="certificate-preview" src={selectedCert.file} alt={selectedCert.title}/>}<a className="primary-button" href={selectedCert.file} download><Download size={16}/> Download certificate</a></> : <div className="empty-certificate"><Award size={42}/><p>This document has not been uploaded yet.</p><small>It is marked as pending so the portfolio does not show a broken link.</small></div>}
      {selectedCert.badgeFile && <div className="badge-modal"><h3>Associated digital badge</h3><img src={selectedCert.badgeFile} alt="Digital badge"/></div>}
    </div></div>}

    {selectedProject && <div className="modal-backdrop" onClick={closeModals}><div className="project-modal" onClick={e => e.stopPropagation()}>
      <button className="modal-close" onClick={closeModals}><X/></button><span className="eyebrow">{selectedProject.category}</span><h2>{selectedProject.title}</h2><p>{selectedProject.description}</p><div className="project-modal-stack">{selectedProject.stack}</div>
      {selectedProject.video && <div className="video-wrap"><video controls preload="metadata" src={selectedProject.video}>Your browser does not support video playback.</video></div>}
      {selectedProject.gallery?.length > 0 && <div className="project-gallery">{selectedProject.gallery.map((src, i) => <a key={src} href={src} target="_blank" rel="noreferrer"><img src={src} alt={`${selectedProject.title} screenshot ${i + 1}`}/></a>)}</div>}
      {selectedProject.note && <p className="pending-note">{selectedProject.note}</p>}
      <div className="modal-actions">{selectedProject.report && <a className="primary-button" href={selectedProject.report} target="_blank" rel="noreferrer"><FileText size={16}/> Open project report</a>}{selectedProject.github && <a className="secondary-button" href={selectedProject.github} target="_blank" rel="noreferrer"><Github size={16}/> GitHub repository</a>}</div>
    </div></div>}

    {selectedAchievement && <div className="modal-backdrop" onClick={closeModals}><div className="achievement-modal" onClick={e => e.stopPropagation()}>
      <button className="modal-close" onClick={closeModals}><X/></button><span className="eyebrow">ACHIEVEMENT GALLERY</span><h2>{selectedAchievement.title}</h2><p>{selectedAchievement.detail}</p>
      <div className="achievement-gallery">{selectedAchievement.images.map((src, i) => <a key={src} href={src} target="_blank" rel="noreferrer"><img src={src} alt={`${selectedAchievement.title} image ${i + 1}`}/></a>)}</div>
    </div></div>}
  </div>;
}

export default App;
