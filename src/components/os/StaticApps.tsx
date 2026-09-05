import Image from "next/image";
import Link from "next/link";
import portrait from "@/assets/profile.jpeg";
import { profile } from "@/data/portfolio";
import { experiences } from "@/data/experience";
import { contactInfo, getEnabledLinks } from "@/data/socialLinks";
import { services } from "@/data/services";

export function AboutApp() {
  return <div className="os-about-app">
    <Image src={portrait} alt="Kurt Yermo" width={240} className="os-portrait" sizes="(max-width: 640px) 160px, 240px" />
    <div className="os-prose"><span className="os-eyebrow">Profile / Kurt Yermo</span><h2>From idea to usable product.</h2>
      {profile.about.map((text) => <p key={text}>{text}</p>)}
      <div className="os-tags">{profile.practices.map((practice) => <span key={practice}>{practice}</span>)}</div>
      <h3>Ways I can help</h3><ul>{services.map((service) => <li key={service.id}>{service.title}</li>)}</ul>
      <div className="os-link-row">{getEnabledLinks().map((link) => <a href={link.url} key={link.platform} target="_blank" rel="noopener noreferrer">{link.platform} ↗</a>)}</div>
    </div>
  </div>;
}

export function ExperienceApp() {
  return <div className="os-prose"><span className="os-eyebrow">Career log</span><h2>Work, practice & progress.</h2>
    <div className="os-timeline">{experiences.map((entry) => <article key={entry.id}>
      <div className="os-eyebrow">{entry.period} · {entry.companyType}</div><h3>{entry.role}</h3><p className="os-accent">{entry.company}</p><p>{entry.description}</p>
      <ul>{entry.highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}</ul>
    </article>)}</div>
  </div>;
}

export function ResumeApp() {
  return <div className="os-prose os-document"><span className="os-document-icon" aria-hidden="true">PDF</span><span className="os-eyebrow">Professional document</span><h2>Resume.pdf</h2><p>{profile.name}<br />{profile.role}</p><p>Read the current resume in Google Drive. Its document viewer also provides a download option.</p><a className="os-button os-primary" href={contactInfo.resumeUrl} target="_blank" rel="noopener noreferrer">Open resume ↗</a></div>;
}

export function BrowserApp() {
  return <div className="os-prose"><span className="os-eyebrow">Directory / Foundation</span><h2>A small corner of the web.</h2><p>This first version is a directory of portfolio destinations. Tabs, address entry and browsing history are planned.</p><div className="os-directory"><Link href="/">Desktop ↗</Link><Link href="/work">Work ↗</Link><Link href="/playground">Playground ↗</Link><Link href="/legacy">Portfolio V1 ↗</Link><a href={contactInfo.resumeUrl} target="_blank" rel="noopener noreferrer">Resume ↗</a></div></div>;
}

export function TerminalApp() {
  return <div className="os-prose"><span className="os-eyebrow">Utilities / Planned</span><h2>Terminal</h2><p>A keyboard command interface is planned for a future release. All portfolio content is available through the desktop and search today.</p><Link className="os-button" href="/work">Browse project files →</Link></div>;
}
