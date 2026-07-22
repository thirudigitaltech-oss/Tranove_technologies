import React, { useState } from "react";
import {
  Globe2,
  Megaphone,
  Search,
  Share2,
  PenTool,
  ArrowRight,
  ArrowUpRight,
  Menu,
  X,
  Phone,
  Mail,
  MapPin,
  ChevronDown,
  Star,
  CheckCircle2,
  TrendingUp,
  Smartphone,
  Server,
  TestTube2,
  Briefcase,
} from "lucide-react";
import Godist from "../assets/godist.png";

/* lucide-react dropped brand/logo icons, so the social marks are
   small inline SVGs instead of a package import that can vanish. */
function IgIcon(props) {
  return (
    <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}
function FbIcon(props) {
  return (
    <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
      <path d="M15 3h-2a5 5 0 0 0-5 5v3H6v4h2v6h4v-6h3l1-4h-4V8a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}
function XIcon(props) {
  return (
    <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
      <path d="M4 4l16 16M20 4L4 20" />
    </svg>
  );
}
function YtIcon(props) {
  return (
    <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
      <rect x="2.5" y="6" width="19" height="12" rx="4" />
      <path d="M11 10l4 2-4 2z" fill="currentColor" stroke="none" />
    </svg>
  );
}
function InIcon(props) {
  return (
    <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
      <rect x="3" y="3" width="18" height="18" rx="3" />
      <line x1="7.5" y1="10" x2="7.5" y2="17" />
      <circle cx="7.5" cy="6.7" r="1" fill="currentColor" stroke="none" />
      <path d="M11.5 17v-4.2c0-1.4 1-2.3 2.3-2.3s2.2.9 2.2 2.3V17" />
    </svg>
  );
}

/* ---------------------------------------------------------
   DIGITAL CAMPAIGN SOLUTIONS — marketing agency landing page
   Design language borrowed from the client's reference shot:
   peach hero field, coral accent, rounded portrait blob,
   floating stat chips, colourful service cards.
--------------------------------------------------------- */

const HERO_PHOTO =
  "https://images.unsplash.com/photo-1752118464953-74e7ddb9c74f?fm=jpg&q=80&w=1000&auto=format&fit=crop";
const TEAM_PHOTO =
  "https://images.unsplash.com/photo-1636647677481-f134fda3f408?fm=jpg&q=80&w=1200&auto=format&fit=crop";

const NAV_LINKS = [
  { label: "Services", href: "#services" },
  { label: "Process", href: "#process" },
  { label: "Team", href: "#team" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
];

const TEAM = [
  {
    name: "Thirupathi Kodaganti",
    role: "Senior SDET cum Technical Marketing Architect",
    tag: "Quality & Tech Strategy",
    icon: TestTube2,
    tint: "coral",
  },
  {
    name: "Sardar Harpreet Singh",
    role: "Digital Marketer cum Strategist",
    tag: "Growth & Campaigns",
    icon: Megaphone,
    tint: "teal",
  },
  {
    name: "Rana Prathap Kodaganti",
    role: "Project Manager",
    tag: "Delivery & Planning",
    icon: Briefcase,
    tint: "purple",
  },
];

function initials(name) {
  return name
    .split(" ")
    .filter((w) => w.length > 1)
    .slice(0, 2)
    .map((w) => w[0])
    .join("");
}

const SERVICES = [
  {
    icon: Globe2,
    tint: "coral",
    title: "Website Development",
    copy:
      "Front-end and back-end builds, from a 5-page brochure site to a fully custom platform.",
  },
  {
    icon: Megaphone,
    tint: "teal",
    title: "Digital Marketing",
    copy:
      "Brand awareness, SEO and content that turns organic reach into a steady pipeline.",
  },
  {
    icon: Search,
    tint: "purple",
    title: "Google Ads",
    copy:
      "Search, Display and YouTube campaigns built around a bid strategy that actually converts.",
  },
  {
    icon: Share2,
    tint: "yellow",
    title: "Social Media Campaigns",
    copy:
      "Facebook, Instagram, YouTube and X programs engineered for lead generation.",
  },
  {
    icon: PenTool,
    tint: "coral",
    title: "Creative Services",
    copy:
      "Posters, reels, video editing and motion graphics that keep every channel on-brand.",
  },
  {
    icon: Smartphone,
    tint: "teal",
    title: "Mobile App Development",
    copy:
      "Cross-platform iOS and Android apps built in React Native from one shared codebase.",
  },
  {
    icon: Server,
    tint: "purple",
    title: "Full-Stack & Backend Engineering",
    copy:
      "Python FastAPI services on PostgreSQL, powering full-stack web and mobile apps end to end.",
  },
  {
    icon: TestTube2,
    tint: "yellow",
    title: "Automation Testing",
    copy:
      "Playwright with TypeScript test suites that catch regressions before your users do.",
  },
];

const PROCESS = [
  { n: "01", label: "Discuss", copy: "We map your goals, audience and budget." },
  { n: "02", label: "Plan", copy: "A channel-by-channel roadmap, timeline and budget." },
  { n: "03", label: "Build", copy: "Sites, creative and campaigns go into production." },
  { n: "04", label: "Launch", copy: "Everything ships, tracked from day one." },
  { n: "05", label: "Optimize", copy: "We tune spend and content against real results." },
];

const REASONS = [
  "Full-stack team — one contact for site, ads and social",
  "Data-driven strategy, not guesswork",
  "Transparent, ad-budget-friendly pricing",
  "Fast turnaround without cutting creative corners",
  "Dedicated support from discuss to optimize",
];

const PRICING_TABS = {
  Website: {
    unit: "one-time",
    plans: [
      { name: "Basic Website", detail: "5 pages", price: "₹15,000" },
      { name: "Standard Website", detail: "8–10 pages", price: "₹25,000", featured: true },
      { name: "Premium Website", detail: "Custom design + SEO", price: "₹40,000" },
    ],
  },
  "Social Media": {
    unit: "per month",
    plans: [
      { name: "Starter Package", detail: "Core posting + engagement", price: "₹12,000" },
      { name: "Professional Package", detail: "Full calendar + reporting", price: "₹20,000", featured: true },
      { name: "Premium Package", detail: "Multi-platform + strategy", price: "₹35,000" },
    ],
  },
  "Google Ads": {
    unit: "management fee",
    plans: [
      { name: "Ad Budget ₹10,000", detail: "Search or Display", price: "₹4,000" },
      { name: "Ad Budget ₹25,000", detail: "Search + Display", price: "₹7,000", featured: true },
      { name: "Ad Budget ₹50,000+", detail: "Full-funnel campaigns", price: "₹12,000" },
    ],
  },
  "Add-ons": {
    unit: "starting at",
    plans: [
      { name: "Google Business Profile", detail: "Setup + optimization", price: "₹2,999" },
      { name: "SEO Optimization", detail: "Per month, onwards", price: "₹8,000", featured: true },
      { name: "Graphic Design", detail: "Per asset, onwards", price: "₹500" },
      { name: "Social Post Design", detail: "Per post, onwards", price: "₹300" },
      { name: "Video Editing / Reels", detail: "Per edit, onwards", price: "₹1,500" },
      { name: "Motion Graphics", detail: "Per video, onwards", price: "₹3,000" },
    ],
  },
};

const FAQS = [
  {
    q: "How long does a website build take?",
    a: "A basic 5-page site is usually ready in 10–14 days. Standard and premium builds run 3–5 weeks depending on custom design and SEO scope.",
  },
  {
    q: "Can I mix services into one package?",
    a: "Yes — most clients combine a website build with ongoing social media management and Google Ads. We'll quote it as one combo package with a single monthly touchpoint.",
  },
  {
    q: "Do you manage the ad budget or just the strategy?",
    a: "Our management fee covers strategy, setup, creative and optimization. Your ad spend is billed separately and directly to Google, so you always see exactly where it goes.",
  },
  {
    q: "Is there a minimum contract length?",
    a: "Website builds are one-time projects. Social media and ads management run month-to-month — you can pause or scale after the first 30 days.",
  },
];

function cx(...c) {
  return c.filter(Boolean).join(" ");
}

function Header({ menuOpen, setMenuOpen }) {
  return (
    <header className="dcs-header">
      <div className="dcs-container dcs-header-row">
        <a href="#top" className="dcs-logo">
          <span className="dcs-logo-mark"><img src={Godist} alt="Go District" /></span>
         
        </a>

        <nav className="dcs-nav">
          {NAV_LINKS.map((l) => (
            <a key={l.label} href={l.href}>
              {l.label}
            </a>
          ))}
        </nav>

        <div className="dcs-header-actions">
          <a href="tel:+917306636916" className="dcs-header-phone">
            <Phone size={15} strokeWidth={2.4} />
            +91 73066 36916
          </a>
          <a href="#contact" className="dcs-btn dcs-btn-primary">
            Get a Free Quote
          </a>
        </div>

        <button
          className="dcs-menu-btn"
          aria-label="Toggle menu"
          onClick={() => setMenuOpen((v) => !v)}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {menuOpen && (
        <div className="dcs-mobile-nav">
          {NAV_LINKS.map((l) => (
            <a key={l.label} href={l.href} onClick={() => setMenuOpen(false)}>
              {l.label}
            </a>
          ))}
          <a href="#contact" className="dcs-btn dcs-btn-primary" onClick={() => setMenuOpen(false)}>
            Get a Free Quote
          </a>
        </div>
      )}
    </header>
  );
}

function Hero() {
  return (
    <section className="dcs-hero" id="top">
      <div className="dcs-container dcs-hero-grid">
        <div className="dcs-hero-copy">
          <span className="dcs-badge">
            <span className="dcs-badge-dot" />
            Website · Marketing · Google Ads
          </span>

          <h1 className="dcs-hero-title">
            Smart Growth for Your Business
            <br />
            <span className="dcs-highlight">
              Online &amp; Beyond
              <svg
                className="dcs-squiggle"
                viewBox="0 0 300 20"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <path
                  d="M2 14 C 40 2, 80 20, 120 10 S 200 2, 240 12 S 280 18, 298 8"
                  stroke="var(--coral)"
                  strokeWidth="5"
                  fill="none"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </h1>

          <p className="dcs-hero-sub">
            We build the website, run the ads and manage the socials — one team
            handling everything your brand needs to be found, trusted and chosen.
          </p>

          <div className="dcs-hero-cta">
            <a href="#pricing" className="dcs-btn dcs-btn-primary dcs-btn-lg">
              See Pricing <ArrowRight size={18} />
            </a>
            <a href="#services" className="dcs-btn dcs-btn-ghost dcs-btn-lg">
              Explore Services
            </a>
          </div>

          <div className="dcs-hero-stats">
            <div>
              <strong>25+</strong>
              <span>Projects Delivered</span>
            </div>
            <div>
              <strong>50K+</strong>
              <span>Audience Reached</span>
            </div>
            <div>
              <strong>170+</strong>
              <span>Happy Clients</span>
            </div>
          </div>
        </div>

        <div className="dcs-hero-art">
          <div className="dcs-hero-blob">
            <img src={HERO_PHOTO} alt="Digital Campaign Solutions strategist" />
          </div>

          <div className="dcs-float-card dcs-float-top">
            <TrendingUp size={18} strokeWidth={2.4} />
            <div>
              <strong>46K+</strong>
              <span>People Reached</span>
            </div>
          </div>

          <div className="dcs-float-card dcs-float-bottom">
            <div className="dcs-stars">
              <Star size={13} fill="currentColor" strokeWidth={0} />
              <Star size={13} fill="currentColor" strokeWidth={0} />
              <Star size={13} fill="currentColor" strokeWidth={0} />
              <Star size={13} fill="currentColor" strokeWidth={0} />
              <Star size={13} fill="currentColor" strokeWidth={0} />
            </div>
            <div>
              <strong>4.9 / 5</strong>
              <span>Client Rating</span>
            </div>
          </div>

          <span className="dcs-dot dcs-dot-1" />
          <span className="dcs-dot dcs-dot-2" />
          <span className="dcs-ring" />
        </div>
      </div>
    </section>
  );
}

function Services() {
  return (
    <section className="dcs-section" id="services">
      <div className="dcs-container">
        <div className="dcs-section-head">
          <span className="dcs-eyebrow">What we do</span>
          <h2>Explore Our Services</h2>
          <p>Five disciplines, one team — pick a single service or bundle them all.</p>
        </div>

        <div className="dcs-service-grid">
          {SERVICES.map((s) => {
            const Icon = s.icon;
            return (
              <div key={s.title} className={cx("dcs-service-card", `tint-${s.tint}`)}>
                <div className="dcs-service-icon">
                  <Icon size={22} strokeWidth={2.1} />
                </div>
                <h3>{s.title}</h3>
                <p>{s.copy}</p>
                <a href="#pricing" className="dcs-service-link">
                  See pricing <ArrowUpRight size={15} />
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Process() {
  return (
    <section className="dcs-section dcs-section-tint" id="process">
      <div className="dcs-container">
        <div className="dcs-section-head">
          <span className="dcs-eyebrow">How it works</span>
          <h2>Our Process</h2>
          <p>The same five steps, every project, from first call to ongoing optimization.</p>
        </div>

        <div className="dcs-process-row">
          {PROCESS.map((p, i) => (
            <React.Fragment key={p.n}>
              <div className="dcs-process-step">
                <span className="dcs-process-n">{p.n}</span>
                <h4>{p.label}</h4>
                <p>{p.copy}</p>
              </div>
              {i < PROCESS.length - 1 && <span className="dcs-process-line" />}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}

function WhyUs() {
  return (
    <section className="dcs-section">
      <div className="dcs-container dcs-whyus-grid">
        <div className="dcs-whyus-art">
          <div className="dcs-whyus-photo">
            <img src={TEAM_PHOTO} alt="Digital Campaign Solutions team at work" />
          </div>
          <div className="dcs-float-card dcs-whyus-card">
            <div className="dcs-stars">
              <Star size={13} fill="currentColor" strokeWidth={0} />
              <Star size={13} fill="currentColor" strokeWidth={0} />
              <Star size={13} fill="currentColor" strokeWidth={0} />
              <Star size={13} fill="currentColor" strokeWidth={0} />
              <Star size={13} fill="currentColor" strokeWidth={0} />
            </div>
            <div>
              <strong>170+ businesses</strong>
              <span>trust us with their growth</span>
            </div>
          </div>
        </div>

        <div className="dcs-whyus-copy">
          <span className="dcs-eyebrow">Why choose us</span>
          <h2>
            One Team Behind Your Website, Ads &amp; Socials
          </h2>
          <p>
            Most agencies hand you off between three vendors. We keep your site,
            your ad accounts and your social calendar under one roof — so nothing
            gets lost in translation.
          </p>
          <ul className="dcs-reasons">
            {REASONS.map((r) => (
              <li key={r}>
                <CheckCircle2 size={18} strokeWidth={2.2} />
                {r}
              </li>
            ))}
          </ul>
          <a href="#contact" className="dcs-btn dcs-btn-primary">
            Start a Project <ArrowRight size={16} />
          </a>
        </div>
      </div>
    </section>
  );
}

function Team() {
  return (
    <section className="dcs-section dcs-section-tint" id="team">
      <div className="dcs-container">
        <div className="dcs-section-head">
          <span className="dcs-eyebrow">The people behind it</span>
          <h2>Meet the Team</h2>
          <p>Small enough to know your project by name, senior enough to run it end to end.</p>
        </div>

        <div className="dcs-team-grid">
          {TEAM.map((m) => (
            <div key={m.name} className="dcs-team-card">
              <div className={cx("dcs-team-avatar", `tint-${m.tint}`)}>{initials(m.name)}</div>
              <h4>{m.name}</h4>
              <p>{m.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Pricing() {
  const tabs = Object.keys(PRICING_TABS);
  const [active, setActive] = useState(tabs[0]);
  const data = PRICING_TABS[active];

  return (
    <section className="dcs-section dcs-section-tint" id="pricing">
      <div className="dcs-container">
        <div className="dcs-section-head">
          <span className="dcs-eyebrow">Combo packages available</span>
          <h2>Pricing Summary</h2>
          <p>Transparent rates by service — combine any two and we'll bundle the fee.</p>
        </div>

        <div className="dcs-pricing-tabs">
          {tabs.map((t) => (
            <button
              key={t}
              className={cx("dcs-tab", t === active && "is-active")}
              onClick={() => setActive(t)}
            >
              {t}
            </button>
          ))}
        </div>

        <div className={cx("dcs-pricing-grid", data.plans.length > 3 && "is-wide")}>
          {data.plans.map((p) => (
            <div key={p.name} className={cx("dcs-price-card", p.featured && "is-featured")}>
              {p.featured && <span className="dcs-price-tag">Most picked</span>}
              <h4>{p.name}</h4>
              <p className="dcs-price-detail">{p.detail}</p>
              <div className="dcs-price-value">
                {p.price}
                <span>/ {data.unit}</span>
              </div>
              <a href="#contact" className="dcs-btn dcs-btn-block">
                Choose plan
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQ() {
  const [open, setOpen] = useState(0);
  return (
    <section className="dcs-section" id="faq">
      <div className="dcs-container dcs-faq-grid">
        <div className="dcs-section-head dcs-faq-head">
          <span className="dcs-eyebrow">Good to know</span>
          <h2>Frequently Asked Questions</h2>
          <p>Still unsure about something? Call us at +91 73066 36916 and we'll walk you through it.</p>
        </div>

        <div className="dcs-faq-list">
          {FAQS.map((f, i) => (
            <div key={f.q} className={cx("dcs-faq-item", open === i && "is-open")}>
              <button onClick={() => setOpen(open === i ? -1 : i)}>
                {f.q}
                <ChevronDown size={18} className="dcs-faq-chevron" />
              </button>
              {open === i && <p>{f.a}</p>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section className="dcs-cta" id="contact">
      <div className="dcs-container dcs-cta-inner">
        <div>
          <span className="dcs-eyebrow dcs-eyebrow-light">Ready when you are</span>
          <h2>Let's Build Your Next Campaign</h2>
          <p>Tell us where the business needs to grow — we'll bring the website, the ads and the audience.</p>
        </div>
        <div className="dcs-cta-actions">
          <a href="tel:+917306636916" className="dcs-btn dcs-btn-light dcs-btn-lg">
            <Phone size={17} /> +91 73066 36916
          </a>
          <a href="mailto:hello@digitalcampaignsolutions.in" className="dcs-btn dcs-btn-outline-light dcs-btn-lg">
            <Mail size={17} /> Email Us
          </a>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="dcs-footer">
      <div className="dcs-container dcs-footer-grid">
        <div className="dcs-footer-brand">
          <div className="dcs-logo">
            <span className="dcs-logo-mark dcs-logo-mark-light">DC</span>
            <span className="dcs-logo-text dcs-logo-text-light">
              Digital Campaign <em>Solutions</em>
            </span>
          </div>
          <p>
            Websites, digital marketing and Google Ads — planned, built and
            optimized by one team.
          </p>
          <div className="dcs-socials">
            <a href="#" aria-label="Instagram"><IgIcon /></a>
            <a href="#" aria-label="Facebook"><FbIcon /></a>
            <a href="#" aria-label="X / Twitter"><XIcon /></a>
            <a href="#" aria-label="YouTube"><YtIcon /></a>
            <a href="#" aria-label="LinkedIn"><InIcon /></a>
          </div>
        </div>

        <div className="dcs-footer-col">
          <h5>Services</h5>
          <a href="#services">Website Development</a>
          <a href="#services">Digital Marketing</a>
          <a href="#services">Google Ads</a>
          <a href="#services">Social Media Campaigns</a>
          <a href="#services">Creative Services</a>
        </div>

        <div className="dcs-footer-col">
          <h5>Company</h5>
          <a href="#process">Our Process</a>
          <a href="#pricing">Pricing</a>
          <a href="#faq">FAQ</a>
          <a href="#contact">Contact</a>
        </div>

        <div className="dcs-footer-col">
          <h5>Get in touch</h5>
          <a href="tel:+917306636916"><Phone size={14} /> +91 73066 36916</a>
          <a href="mailto:hello@digitalcampaignsolutions.in"><Mail size={14} /> hello@digitalcampaignsolutions.in</a>
          <span className="dcs-footer-addr"><MapPin size={14} /> India, remote-friendly</span>
        </div>
      </div>

      <div className="dcs-container dcs-footer-bottom">
        <span>© {new Date().getFullYear()} Digital Campaign Solutions. All rights reserved.</span>
        <span>Designed by Dittu Ravali</span>
      </div>
    </footer>
  );
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="dcs-root">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800&family=Inter:wght@400;500;600;700&display=swap');

        .dcs-root {
          --cream: #FFF3EA;
          --cream-deep: #FFE8D6;
          --coral: #FF6B4A;
          --coral-dark: #E85331;
          --teal: #12B3A0;
          --purple: #6E62E5;
          --yellow: #FFC24B;
          --ink: #241C34;
          --ink-soft: #6B6478;
          --white: #FFFFFF;
          --navy: #1B1530;

          font-family: 'Inter', sans-serif;
          color: var(--ink);
          background: var(--white);
          -webkit-font-smoothing: antialiased;
        }
        .dcs-root * { box-sizing: border-box; }
        .dcs-root h1, .dcs-root h2, .dcs-root h3, .dcs-root h4 {
          font-family: 'Sora', sans-serif;
          margin: 0;
          color: var(--ink);
          letter-spacing: -0.01em;
        }
        .dcs-root p { margin: 0; color: var(--ink-soft); line-height: 1.65; }
        .dcs-root a { text-decoration: none; color: inherit; }
        .dcs-root ul { list-style: none; margin: 0; padding: 0; }
        .dcs-root button { font-family: inherit; cursor: pointer; border: none; background: none; }

        .dcs-container {
          max-width: 1180px;
          margin: 0 auto;
          padding: 0 24px;
        }

        /* Buttons */
        .dcs-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 11px 22px;
          border-radius: 999px;
          font-weight: 600;
          font-size: 14.5px;
          white-space: nowrap;
          transition: transform 0.15s ease, box-shadow 0.15s ease, background 0.15s ease;
        }
        .dcs-btn-primary { background: var(--coral); color: var(--white); box-shadow: 0 10px 24px -10px rgba(255,107,74,0.65); }
        .dcs-btn-primary:hover { background: var(--coral-dark); transform: translateY(-1px); }
        .dcs-btn-ghost { background: var(--white); color: var(--ink); border: 1.5px solid #EDE3DA; }
        .dcs-btn-ghost:hover { border-color: var(--coral); color: var(--coral-dark); }
        .dcs-btn-lg { padding: 14px 28px; font-size: 15.5px; }
        .dcs-btn-block { width: 100%; background: var(--ink); color: var(--white); margin-top: 18px; padding: 12px; }
        .dcs-btn-light { background: var(--white); color: var(--navy); }
        .dcs-btn-outline-light { border: 1.5px solid rgba(255,255,255,0.35); color: var(--white); }

        /* Header */
        .dcs-header { position: sticky; top: 0; z-index: 50; background: rgba(255,243,234,0.9); backdrop-filter: blur(10px); border-bottom: 1px solid rgba(36,28,52,0.06); }
        .dcs-header-row { display: flex; align-items: center; justify-content: space-between; gap: 24px; height: 76px; }
        .dcs-logo { display: flex; align-items: center; gap: 10px; }
        .dcs-logo-mark { width: 38px; height: 38px; border-radius: 12px; background: var(--ink); color: var(--white); display: flex; align-items: center; justify-content: center; font-family: 'Sora'; font-weight: 700; font-size: 14px; }
        .dcs-logo-mark-light { background: var(--coral); }
        .dcs-logo-text { font-family: 'Sora'; font-weight: 700; font-size: 15.5px; line-height: 1.15; }
        .dcs-logo-text em { display: block; font-style: normal; color: var(--coral-dark); font-size: 12.5px; font-weight: 600; }
        .dcs-logo-text-light em { color: var(--coral); }
        .dcs-nav { display: flex; gap: 30px; font-weight: 600; font-size: 14.5px; }
        .dcs-nav a { color: var(--ink-soft); transition: color 0.15s; }
        .dcs-nav a:hover { color: var(--coral-dark); }
        .dcs-header-actions { display: flex; align-items: center; gap: 18px; }
        .dcs-header-phone { display: flex; align-items: center; gap: 6px; font-weight: 600; font-size: 14px; color: var(--ink); }
        .dcs-menu-btn { display: none; }
        .dcs-mobile-nav { display: none; }

        /* Hero */
        .dcs-hero { background: radial-gradient(120% 100% at 100% 0%, var(--cream-deep) 0%, var(--cream) 55%); padding: 76px 0 90px; overflow: hidden; }
        .dcs-hero-grid { display: grid; grid-template-columns: 1.05fr 0.95fr; gap: 40px; align-items: center; }
        .dcs-badge { display: inline-flex; align-items: center; gap: 8px; background: var(--white); border: 1px solid #F0DFCF; padding: 7px 16px; border-radius: 999px; font-size: 13px; font-weight: 600; color: var(--ink-soft); margin-bottom: 22px; }
        .dcs-badge-dot { width: 7px; height: 7px; border-radius: 50%; background: var(--coral); }
        .dcs-hero-title { font-size: 47px; line-height: 1.12; font-weight: 800; }
        .dcs-highlight { position: relative; color: var(--coral-dark); display: inline-block; }
        .dcs-squiggle { position: absolute; left: 0; bottom: -12px; width: 100%; height: 16px; }
        .dcs-hero-sub { margin-top: 26px; font-size: 17px; max-width: 480px; }
        .dcs-hero-cta { display: flex; gap: 14px; margin-top: 34px; flex-wrap: wrap; }
        .dcs-hero-stats { display: flex; gap: 34px; margin-top: 46px; padding-top: 30px; border-top: 1px solid rgba(36,28,52,0.1); }
        .dcs-hero-stats div { display: flex; flex-direction: column; }
        .dcs-hero-stats strong { font-family: 'Sora'; font-size: 26px; font-weight: 800; color: var(--ink); }
        .dcs-hero-stats span { font-size: 13px; color: var(--ink-soft); margin-top: 2px; }

        .dcs-hero-art { position: relative; display: flex; justify-content: center; align-items: center; height: 460px; }
        .dcs-hero-blob { width: 340px; height: 400px; border-radius: 44% 56% 62% 38% / 48% 42% 58% 52%; overflow: hidden; background: var(--coral); position: relative; z-index: 2; box-shadow: 0 30px 60px -25px rgba(255,107,74,0.5); }
        .dcs-hero-blob img { width: 100%; height: 100%; object-fit: cover; }
        .dcs-ring { position: absolute; width: 400px; height: 400px; border: 2px dashed rgba(255,107,74,0.35); border-radius: 50%; z-index: 1; }
        .dcs-dot { position: absolute; border-radius: 50%; z-index: 1; }
        .dcs-dot-1 { width: 22px; height: 22px; background: var(--purple); top: 10px; left: 20px; }
        .dcs-dot-2 { width: 14px; height: 14px; background: var(--yellow); bottom: 30px; right: 10px; }

        .dcs-float-card { position: absolute; z-index: 3; background: var(--white); border-radius: 16px; padding: 12px 16px; display: flex; align-items: center; gap: 10px; box-shadow: 0 18px 40px -18px rgba(36,28,52,0.35); font-size: 13px; }
        .dcs-float-card strong { display: block; font-family: 'Sora'; font-size: 14.5px; font-weight: 700; }
        .dcs-float-card span { color: var(--ink-soft); font-size: 12px; }
        .dcs-float-card svg { color: var(--teal); flex-shrink: 0; }
        .dcs-float-top { top: 10px; left: -10px; }
        .dcs-float-bottom { bottom: 20px; right: -20px; }
        .dcs-stars { display: flex; gap: 2px; color: var(--yellow); }

        /* Section shared */
        .dcs-section { padding: 92px 0; }
        .dcs-section-tint { background: #FBF7F3; }
        .dcs-section-head { max-width: 560px; margin: 0 auto 52px; text-align: center; }
        .dcs-eyebrow { display: inline-block; font-size: 12.5px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; color: var(--coral-dark); margin-bottom: 12px; }
        .dcs-eyebrow-light { color: var(--yellow); }
        .dcs-section-head h2 { font-size: 33px; font-weight: 800; margin-bottom: 12px; }
        .dcs-section-head p { font-size: 15.5px; }

        /* Services */
        .dcs-service-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 22px; }
        .dcs-service-card { border-radius: 22px; padding: 30px 26px; background: var(--white); border: 1px solid #F0E9E1; transition: transform 0.2s ease, box-shadow 0.2s ease; }
        .dcs-service-card:hover { transform: translateY(-6px); box-shadow: 0 24px 40px -24px rgba(36,28,52,0.25); }
        .dcs-service-card h3 { font-size: 18.5px; font-weight: 700; margin: 18px 0 8px; }
        .dcs-service-card p { font-size: 14px; }
        .dcs-service-icon { width: 48px; height: 48px; border-radius: 14px; display: flex; align-items: center; justify-content: center; }
        .tint-coral .dcs-service-icon { background: #FFE4DA; color: var(--coral-dark); }
        .tint-teal .dcs-service-icon { background: #D6F5F0; color: var(--teal); }
        .tint-purple .dcs-service-icon { background: #E7E4FB; color: var(--purple); }
        .tint-yellow .dcs-service-icon { background: #FFF1D4; color: #C4881A; }
        .dcs-service-link { display: inline-flex; align-items: center; gap: 5px; margin-top: 18px; font-weight: 700; font-size: 13.5px; color: var(--ink); }
        .dcs-service-card:hover .dcs-service-link { color: var(--coral-dark); }

        /* Process */
        .dcs-process-row { display: flex; align-items: flex-start; gap: 0; }
        .dcs-process-step { flex: 1; text-align: center; padding: 0 10px; }
        .dcs-process-n { font-family: 'Sora'; font-weight: 800; font-size: 15px; color: var(--white); background: var(--coral); width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 16px; }
        .dcs-process-step h4 { font-size: 16px; font-weight: 700; margin-bottom: 8px; }
        .dcs-process-step p { font-size: 13.5px; }
        .dcs-process-line { flex: 0.6; height: 2px; background: repeating-linear-gradient(90deg, #E4B7A6 0 8px, transparent 8px 14px); margin-top: 20px; }

        /* Why us */
        .dcs-whyus-grid { display: grid; grid-template-columns: 0.85fr 1.15fr; gap: 60px; align-items: center; }
        .dcs-whyus-art { position: relative; }
        .dcs-whyus-photo { border-radius: 28px; overflow: hidden; box-shadow: 0 30px 60px -30px rgba(36,28,52,0.4); }
        .dcs-whyus-photo img { width: 100%; display: block; aspect-ratio: 4/3.1; object-fit: cover; }
        .dcs-whyus-card { position: static; margin-top: -34px; margin-left: 24px; width: fit-content; }
        .dcs-whyus-copy h2 { font-size: 32px; margin-bottom: 16px; }
        .dcs-whyus-copy > p { font-size: 15.5px; margin-bottom: 26px; }
        .dcs-reasons { display: flex; flex-direction: column; gap: 14px; margin-bottom: 30px; }
        .dcs-reasons li { display: flex; align-items: center; gap: 10px; font-weight: 600; font-size: 14.5px; color: var(--ink); }
        .dcs-reasons svg { color: var(--teal); flex-shrink: 0; }

        /* Team */
        .dcs-team-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 22px; }
        .dcs-team-card { background: var(--white); border: 1px solid #F0E9E1; border-radius: 22px; padding: 32px 24px; text-align: center; }
        .dcs-team-avatar { width: 64px; height: 64px; border-radius: 50%; margin: 0 auto 18px; display: flex; align-items: center; justify-content: center; font-family: 'Sora'; font-weight: 700; font-size: 18px; }
        .dcs-team-avatar.tint-coral { background: #FFE4DA; color: var(--coral-dark); }
        .dcs-team-avatar.tint-teal { background: #D6F5F0; color: var(--teal); }
        .dcs-team-avatar.tint-purple { background: #E7E4FB; color: var(--purple); }
        .dcs-team-avatar.tint-yellow { background: #FFF1D4; color: #C4881A; }
        .dcs-team-card h4 { font-size: 16.5px; font-weight: 700; margin-bottom: 6px; }
        .dcs-team-card p { font-size: 13.5px; }

        /* Pricing */
        .dcs-pricing-tabs { display: flex; justify-content: center; gap: 8px; margin-bottom: 44px; flex-wrap: wrap; }
        .dcs-tab { padding: 10px 20px; border-radius: 999px; font-weight: 600; font-size: 14px; background: var(--white); color: var(--ink-soft); border: 1px solid #EDE3DA; }
        .dcs-tab.is-active { background: var(--ink); color: var(--white); border-color: var(--ink); }
        .dcs-pricing-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 22px; }
        .dcs-pricing-grid.is-wide { grid-template-columns: repeat(3, 1fr); }
        .dcs-price-card { position: relative; background: var(--white); border: 1px solid #F0E9E1; border-radius: 22px; padding: 30px 26px; }
        .dcs-price-card.is-featured { border-color: var(--coral); box-shadow: 0 20px 40px -24px rgba(255,107,74,0.4); }
        .dcs-price-tag { position: absolute; top: -12px; right: 22px; background: var(--coral); color: var(--white); font-size: 11.5px; font-weight: 700; padding: 5px 12px; border-radius: 999px; }
        .dcs-price-card h4 { font-size: 17px; font-weight: 700; }
        .dcs-price-detail { font-size: 13.5px; margin-top: 6px; }
        .dcs-price-value { font-family: 'Sora'; font-size: 27px; font-weight: 800; margin-top: 18px; color: var(--ink); }
        .dcs-price-value span { font-family: 'Inter'; font-size: 13px; font-weight: 500; color: var(--ink-soft); margin-left: 4px; }

        /* FAQ */
        .dcs-faq-grid { display: grid; grid-template-columns: 0.85fr 1.15fr; gap: 50px; }
        .dcs-faq-head { text-align: left; margin: 0; }
        .dcs-faq-list { display: flex; flex-direction: column; gap: 12px; }
        .dcs-faq-item { border: 1px solid #F0E9E1; border-radius: 16px; padding: 6px 22px; background: var(--white); }
        .dcs-faq-item button { width: 100%; display: flex; justify-content: space-between; align-items: center; text-align: left; padding: 16px 0; font-weight: 700; font-size: 15px; color: var(--ink); }
        .dcs-faq-chevron { transition: transform 0.2s ease; color: var(--coral-dark); flex-shrink: 0; margin-left: 12px; }
        .dcs-faq-item.is-open .dcs-faq-chevron { transform: rotate(180deg); }
        .dcs-faq-item p { padding-bottom: 18px; font-size: 14px; }

        /* CTA */
        .dcs-cta { background: var(--navy); padding: 70px 0; }
        .dcs-cta-inner { display: flex; justify-content: space-between; align-items: center; gap: 30px; flex-wrap: wrap; }
        .dcs-cta h2 { color: var(--white); font-size: 30px; margin: 10px 0 10px; }
        .dcs-cta p { color: rgba(255,255,255,0.65); max-width: 420px; }
        .dcs-cta-actions { display: flex; gap: 14px; flex-wrap: wrap; }

        /* Footer */
        .dcs-footer { background: var(--navy); padding-top: 60px; }
        .dcs-footer-grid { display: grid; grid-template-columns: 1.4fr 1fr 1fr 1.2fr; gap: 40px; padding-bottom: 50px; border-bottom: 1px solid rgba(255,255,255,0.08); }
        .dcs-footer-brand p { color: rgba(255,255,255,0.55); font-size: 13.5px; margin: 16px 0 20px; max-width: 260px; }
        .dcs-socials { display: flex; gap: 10px; }
        .dcs-socials a { width: 34px; height: 34px; border-radius: 50%; background: rgba(255,255,255,0.08); color: var(--white); display: flex; align-items: center; justify-content: center; }
        .dcs-socials a:hover { background: var(--coral); }
        .dcs-footer-col h5 { color: var(--white); font-family: 'Sora'; font-size: 14px; margin-bottom: 18px; }
        .dcs-footer-col a, .dcs-footer-addr { display: flex; align-items: center; gap: 8px; color: rgba(255,255,255,0.55); font-size: 13.5px; margin-bottom: 12px; }
        .dcs-footer-col a:hover { color: var(--white); }
        .dcs-footer-bottom { display: flex; justify-content: space-between; padding: 22px 0; font-size: 12.5px; color: rgba(255,255,255,0.4); flex-wrap: wrap; gap: 8px; }

        /* Responsive */
        html, body { overflow-x: hidden; }
        .dcs-root { overflow-x: hidden; width: 100%; }
        .dcs-hero-art, .dcs-hero-blob, .dcs-ring { max-width: 100%; }

        @media (max-width: 1080px) {
          .dcs-service-grid, .dcs-team-grid { grid-template-columns: repeat(2, 1fr); }
          .dcs-pricing-grid.is-wide { grid-template-columns: repeat(2, 1fr); }
        }

        @media (max-width: 980px) {
          .dcs-nav, .dcs-header-phone { display: none; }
          .dcs-menu-btn { display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
          .dcs-header-actions .dcs-btn { padding: 9px 16px; font-size: 13.5px; }
          .dcs-mobile-nav.dcs-mobile-nav { display: flex; flex-direction: column; gap: 4px; padding: 14px 24px 22px; background: var(--cream); border-top: 1px solid rgba(36,28,52,0.06); }
          .dcs-mobile-nav a { padding: 11px 0; font-weight: 600; }
          .dcs-mobile-nav .dcs-btn { margin-top: 10px; width: 100%; }

          .dcs-hero-grid, .dcs-whyus-grid, .dcs-faq-grid { grid-template-columns: 1fr; gap: 44px; }
          .dcs-hero { padding: 48px 0 64px; }
          .dcs-hero-copy { text-align: center; }
          .dcs-hero-sub { margin-left: auto; margin-right: auto; }
          .dcs-hero-cta { justify-content: center; }
          .dcs-hero-stats { justify-content: center; }
          .dcs-hero-art { order: -1; height: auto; padding: 60px 30px 40px; }
          .dcs-hero-blob { width: min(300px, 70vw); height: min(340px, 78vw); }
          .dcs-ring { width: min(360px, 82vw); height: min(360px, 82vw); }

          .dcs-whyus-art { max-width: 420px; margin: 0 auto; }
          .dcs-whyus-copy { text-align: center; }
          .dcs-whyus-copy .dcs-reasons { text-align: left; max-width: 380px; margin-left: auto; margin-right: auto; }
          .dcs-whyus-card { margin-left: auto; margin-right: 16px; }

          .dcs-faq-head { text-align: center; margin: 0 auto 12px; }

          .dcs-process-row { flex-direction: column; align-items: stretch; gap: 26px; }
          .dcs-process-line { display: none; }
          .dcs-footer-grid { grid-template-columns: 1fr 1fr; }
        }

        @media (max-width: 640px) {
          .dcs-container { padding: 0 18px; }
          .dcs-header-row { height: 64px; }
          .dcs-header-actions { display: none; }
          .dcs-hero { padding: 40px 0 52px; }
          .dcs-hero-title { font-size: 30px; }
          .dcs-hero-sub { font-size: 15.5px; }
          .dcs-hero-cta { flex-direction: column; align-items: stretch; }
          .dcs-hero-cta .dcs-btn { width: 100%; }
          .dcs-hero-stats { gap: 18px; row-gap: 16px; }
          .dcs-hero-stats strong { font-size: 22px; }
          .dcs-float-card { padding: 9px 12px; font-size: 12px; gap: 8px; }
          .dcs-float-card strong { font-size: 13px; }
          .dcs-float-top { left: 4px; top: 6px; }
          .dcs-float-bottom { right: 4px; bottom: 10px; }

          .dcs-section { padding: 52px 0; }
          .dcs-section-head h2 { font-size: 26px; }
          .dcs-service-grid, .dcs-team-grid, .dcs-pricing-grid, .dcs-pricing-grid.is-wide { grid-template-columns: 1fr; }
          .dcs-service-card { padding: 26px 22px; }

          .dcs-whyus-copy h2 { font-size: 26px; }
          .dcs-whyus-card { margin-left: auto; margin-right: 10px; margin-top: -26px; }

          .dcs-faq-grid { gap: 30px; }
          .dcs-faq-item button { font-size: 14px; }

          .dcs-cta-inner { flex-direction: column; align-items: flex-start; }
          .dcs-cta h2 { font-size: 25px; }
          .dcs-cta-actions { width: 100%; }
          .dcs-cta-actions .dcs-btn { flex: 1; }

          .dcs-footer-grid { grid-template-columns: 1fr; gap: 32px; }
          .dcs-footer-bottom { flex-direction: column; text-align: center; gap: 6px; }
        }

        @media (max-width: 400px) {
          .dcs-hero-title { font-size: 26px; }
          .dcs-hero-stats { justify-content: space-between; }
          .dcs-hero-stats div { flex: 1 1 40%; }
        }
      `}</style>

      <Header menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <Hero />
      <Services />
      <Process />
      <WhyUs />
      <Team />
      <Pricing />
      <FAQ />
      <CTA />
      <Footer />
    </div>
  );
}
