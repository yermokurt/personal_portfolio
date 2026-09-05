import Link from "next/link";
export default function NotFound() { return <main className="os-empty-route"><span className="os-eyebrow">404 / File unavailable</span><h1>Project not found.</h1><p>The project file may have moved or the address is incorrect.</p><Link className="os-button os-primary" href="/work">Return to Work</Link></main>; }
