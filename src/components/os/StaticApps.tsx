import Image from "next/image";
import portrait from "@/assets/profile.jpeg";
import { profile } from "@/data/portfolio";
import { experiences } from "@/data/experience";
import { getEnabledLinks } from "@/data/socialLinks";
import { services } from "@/data/services";

export function AboutApp() {
  return <div className="os-content-frame os-about-frame"><div className="os-about-app">
    <Image src={portrait} alt="Kurt Yermo" width={240} className="os-portrait" sizes="(max-width: 640px) 160px, 240px" />
    <div className="os-prose"><span className="os-eyebrow">Profile / Kurt Yermo</span><h2>From idea to usable product.</h2>
      {profile.about.map((text) => <p key={text}>{text}</p>)}
      <div className="os-tags">{profile.practices.map((practice) => <span key={practice}>{practice}</span>)}</div>
      <h3>Ways I can help</h3><ul>{services.map((service) => <li key={service.id}>{service.title}</li>)}</ul>
      <div className="os-link-row">{getEnabledLinks().map((link) => <a href={link.url} key={link.platform} target="_blank" rel="noopener noreferrer">{link.platform} ↗</a>)}</div>
    </div>
  </div></div>;
}

export function ExperienceApp() {
  return <div className="os-content-frame os-experience-frame"><div className="os-prose"><span className="os-eyebrow">Career log</span><h2>Work, practice & progress.</h2>
    <div className="os-timeline">{experiences.map((entry) => <article key={entry.id}>
      <div className="os-eyebrow">{entry.period} · {entry.companyType}</div><h3>{entry.role}</h3><p className="os-accent">{entry.company}</p><p>{entry.description}</p>
      <ul>{entry.highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}</ul>
    </article>)}</div>
  </div></div>;
}
