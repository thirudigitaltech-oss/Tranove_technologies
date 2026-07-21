import { useState, useEffect, useRef } from "react";

const C = {
  violet: "#5B4B9E",
  violetDeep: "#3D2F73",
  ink: "#12101C",
  inkMid: "#1D1832",
  paper: "#FAF9F7",
  paperMid: "#F1EEF7",
  gold: "#B9975B",
  textDark: "#16141F",
  textMuted: "#5F5A6E",
};

const gradAccent = `linear-gradient(135deg, ${C.violet}, ${C.violetDeep})`;
const gradInk = `linear-gradient(135deg, ${C.ink}, ${C.inkMid})`;
const shadowCard = "0 1px 2px rgba(18,16,28,0.06), 0 8px 24px rgba(18,16,28,0.05)";
const shadowMd = "0 12px 32px rgba(18,16,28,0.14)";

const RESPONSIVE_CSS = `
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html, body, #root { margin: 0; padding: 0; width: 100%; }
  body { overflow-x: hidden; }

  @keyframes fadeUp { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }

  .mobile-menu {
    display: none;
    flex-direction: column;
    position: fixed;
    top: 0; left: 0; right: 0; bottom: 0;
    background: ${C.ink};
    z-index: 2000;
    padding: 80px 32px 40px;
    gap: 0;
    animation: fadeUp .3s ease;
  }
  .mobile-menu.open { display: flex; }
  .mobile-menu a {
    font-family: 'Fraunces', serif;
    font-size: 21px;
    font-weight: 500;
    color: rgba(255,255,255,0.82);
    text-decoration: none;
    padding: 17px 0;
    border-bottom: 1px solid rgba(255,255,255,0.08);
    transition: color .2s;
    display: flex;
    align-items: center;
    gap: 12px;
  }
  .mobile-menu a:hover { color: #C9BBF0; }
  .mobile-close {
    position: absolute;
    top: 20px; right: 20px;
    width: 40px; height: 40px;
    background: rgba(255,255,255,0.06);
    border: 1px solid rgba(255,255,255,0.14);
    color: #fff; font-size: 17px;
    cursor: pointer; display: flex;
    align-items: center; justify-content: center;
  }
  .mobile-cta {
    margin-top: 26px;
    background: ${C.violet};
    color: #fff; padding: 15px;
    font-family: 'Inter',sans-serif;
    font-size: 13px; font-weight: 600;
    letter-spacing: .04em; text-transform: uppercase;
    text-decoration: none; text-align: center;
    display: block;
  }

  .hamburger {
    display: none;
    flex-direction: column;
    gap: 5px;
    cursor: pointer;
    padding: 8px;
    background: none;
    border: none;
  }
  .hamburger span {
    display: block; width: 22px; height: 1.5px;
    background: ${C.ink};
  }

  @media (max-width: 900px) {
    .hamburger { display: flex; }
    .nav-desktop-links { display: none !important; }
    .nav-desktop-btn { display: none !important; }
    .footer-grid { grid-template-columns: 1fr 1fr !important; gap: 32px 24px !important; }
    .services-grid { grid-template-columns: repeat(2,1fr) !important; }
    .pricing-grid { grid-template-columns: repeat(2,1fr) !important; }
    .starts-grid { grid-template-columns: repeat(2,1fr) !important; }
  }

  @media (max-width: 768px) {
    .hero-grid { grid-template-columns: 1fr !important; gap: 40px !important; padding: 56px 20px !important; }
    .hero-visual { display: none !important; }
    .hero-title { font-size: 34px !important; }
    .stats-row { grid-template-columns: repeat(2,1fr) !important; margin: 0 16px !important; }
    .about-grid { grid-template-columns: 1fr !important; gap: 36px !important; }
    .about-img-col { display: none !important; }
    .services-grid { grid-template-columns: 1fr !important; }
    .pricing-grid { grid-template-columns: 1fr !important; }
    .starts-grid { grid-template-columns: 1fr !important; }
    .team-grid { grid-template-columns: 1fr !important; }
    .blog-grid { grid-template-columns: 1fr !important; }
    .contact-grid { grid-template-columns: 1fr !important; gap: 36px !important; }
    .footer-grid { grid-template-columns: 1fr !important; gap: 34px !important; text-align: center !important; }
    .footer-grid > div:first-child > div:first-child { justify-content: center !important; }
    .footer-grid > div:first-child > p { margin-left: auto !important; margin-right: auto !important; }
    .footer-grid > div:first-child > div:last-child { justify-content: center !important; }
    .footer-bottom { flex-direction: column !important; text-align: center !important; gap: 10px !important; }
    .cta-banner-inner { flex-direction: column !important; text-align: center !important; }
    .cta-btns { justify-content: center !important; }
    .topbar { display: none !important; }
    .section-pad { padding: 56px 0 !important; }
    .form-grid { grid-template-columns: 1fr !important; }
  }

  @media (max-width: 480px) {
    .hero-title { font-size: 28px !important; }
    .section-title { font-size: 22px !important; }
    .hero-btns { flex-direction: column !important; }
    .hero-btns a, .hero-btns button { width: 100% !important; justify-content: center !important; }
    .footer-grid { gap: 30px !important; }
    .footer-grid ul { align-items: center !important; }
  }
`;

const services = [
  {
    icon: "fab fa-android",
    title: "Mobile App Development",
    desc: "Android and iOS apps built on React Native. One codebase for both app stores — useful for delivery apps, booking apps, and internal business tools your team and customers use daily.",
    who: "For businesses that want customers to book, order or track something from a phone.",
  },
  {
    icon: "fas fa-globe",
    title: "Web Development",
    desc: "Business websites and web apps built with React JS and JavaScript on the frontend, Python FastAPI on the backend, and PostgreSQL for data — hosted reliably on the cloud.",
    who: "For businesses that need a fast, modern website or a custom web platform, not just a template.",
  },
  {
    icon: "fas fa-brain",
    title: "AI Development",
    desc: "Applied AI — chatbots, automated replies, recommendation systems and workflow automation. If your team repeats the same task every day, we identify it and automate it.",
    who: "For businesses spending manual hours on repetitive, rule-based work.",
  },
  {
    icon: "fas fa-vial",
    title: "Automation Testing",
    desc: "Automated test scripts using Playwright, so every update to your website or app is checked automatically before it goes live — catching bugs before your customers do.",
    who: "For products that release updates often and can't afford to break in front of users.",
  },
  {
    icon: "fas fa-bullhorn",
    title: "Digital Marketing",
    desc: "Meta Ads (Instagram, Facebook, WhatsApp), Google Ads (Search, Display, YouTube), social media management and Google My Business setup — built to bring awareness, leads and enquiries to your business.",
    who: "For businesses that need more people to know they exist, and more enquiries to come in.",
  },
  {
    icon: "fas fa-pen-fancy",
    title: "Content & Brand",
    desc: "Editorial content, brand identity and audience growth — the words, visuals and posting plan that make your brand recognisable and trusted.",
    who: "For businesses that have the product but need people to remember the name.",
  },
  {
    icon: "fas fa-database",
    title: "Cloud & Data",
    desc: "PostgreSQL database architecture and managed hosting on DigitalOcean — infrastructure that stays fast and online as your business grows.",
    who: "For businesses whose website or app needs to survive real traffic, not just a demo.",
  },
];

const startingPackages = [
  {
    tag: "Most Requested",
    title: "Digital Marketing",
    price: "₹10,000",
    period: "/month onwards",
    items: [
      "Meta Ads — Instagram & Facebook",
      "WhatsApp Business setup & outreach",
      "Google Ads — Search, Display & YouTube",
      "Social media page management",
      "Google My Business setup & optimisation",
      "Monthly performance report",
    ],
    footnote: "Best for: local businesses that need awareness + steady leads coming in every month.",
  },
  {
    tag: "Build",
    title: "App Development",
    price: "₹30,000",
    period: "onwards",
    items: [
      "React Native — Android & iOS from one codebase",
      "Python FastAPI backend",
      "PostgreSQL database",
      "Hosted on DigitalOcean cloud",
      "Play Store & App Store submission support",
    ],
    footnote: "Best for: businesses that need customers to book, order or track from their phone.",
  },
  {
    tag: "Build",
    title: "Web Development",
    price: "₹15,000",
    period: "onwards",
    items: [
      "React JS + JavaScript frontend",
      "Python FastAPI backend (if dynamic)",
      "PostgreSQL database (if needed)",
      "Playwright automated testing before launch",
      "Cloud hosting & domain setup",
    ],
    footnote: "Best for: businesses that need a fast, modern site that actually converts visitors.",
  },
];

const stats = [
  { icon: "fas fa-users", num: "200+", label: "Clients Served" },
  { icon: "fas fa-project-diagram", num: "50+", label: "Projects Delivered" },
  { icon: "fas fa-award", num: "15+", label: "Industry Awards" },
  { icon: "fas fa-headset", num: "24/7", label: "Client Support" },
];

const pricing = [
  {
    plan: "Starter", price: "₹9999k", period: "/project",
    desc: "For early-stage teams and MVPs",
    features: [
      { ok: true, text: "Website Development" },
      { ok: true, text: "Foundational SEO" },
      { ok: true, text: "Social Media Setup" },
      { ok: true, text: "3 Months Support" },
      { ok: false, text: "Mobile App" },
      { ok: false, text: "AI Integration" },
      { ok: false, text: "Lead Generation" },
    ], featured: false,
  },
  {
    plan: "Growth", price: "₹99k", period: "/project",
    desc: "For teams ready to scale distribution",
    features: [
      { ok: true, text: "Website + Mobile App" },
      { ok: true, text: "Digital Marketing" },
      { ok: true, text: "Lead Generation" },
      { ok: true, text: "Brand Programme" },
      { ok: true, text: "Content Production" },
      { ok: true, text: "6 Months Support" },
      { ok: false, text: "AI Integration" },
    ], featured: true,
  },
  {
    plan: "Enterprise", price: "₹2L+", period: "/custom",
    desc: "Full digital transformation programme",
    features: [
      { ok: true, text: "Everything in Growth" },
      { ok: true, text: "AI & Automation" },
      { ok: true, text: "CRM & ERP Systems" },
      { ok: true, text: "Cloud Infrastructure" },
      { ok: true, text: "Dedicated Account Lead" },
      { ok: true, text: "12 Months Support" },
      { ok: true, text: "Priority Support" },
    ], featured: false,
  },
];

const team = [
  { name: "Thirupathi Kodaganti", role: "Founder & CEO", icon: "fas fa-user-tie" },
  { name: "Sardar Harpreeth Singh", role: "Senior Developer", icon: "fas fa-user-cog" },
  { name: "Ranaprathap", role: "Director, Digital", icon: "fas fa-user-tie" },
  { name: "Anna Reddy", role: "QA & Automation Lead", icon: "fas fa-user-check" },
];

const blogs = [
  { cat: "Mobile", icon: "fas fa-mobile-alt", date: "May 2025", author: "Thirupathi", title: "Building a Delivery Platform From Scratch", desc: "A practical guide to a production Android delivery app on React Native, FastAPI and PostgreSQL." },
  { cat: "Marketing", icon: "fas fa-chart-line", date: "Apr 2025", author: "Ranaprathap", title: "Lead Generation for Early-Stage Startups", desc: "How targeted campaigns produced 500+ qualified leads per month for growth-stage clients." },
  { cat: "AI", icon: "fas fa-brain", date: "Mar 2025", author: "Anna", title: "An AI-Native CRM for Real Estate Teams", desc: "How automated follow-ups and intent scoring lifted conversion by 40 percent." },
  { cat: "QA", icon: "fas fa-vial", date: "Feb 2025", author: "Anna Reddy", title: "Cutting Regression Time With Test Automation", desc: "How a Selenium and Playwright suite integrated into CI cut regression cycles from days to hours." },
];

const techStack = [
  { icon: "fab fa-python", label: "Python" },
  { icon: "fas fa-bolt", label: "FastAPI" },
  { icon: "fab fa-react", label: "React" },
  { icon: "fab fa-js", label: "JavaScript" },
  { icon: "fab fa-html5", label: "HTML / CSS" },
  { icon: "fab fa-android", label: "React Native" },
  { icon: "fas fa-database", label: "PostgreSQL" },
  { icon: "fas fa-server", label: "Hostinger" },
  { icon: "fab fa-digital-ocean", label: "DigitalOcean" },
  { icon: "fab fa-apple", label: "App Store" },
  { icon: "fas fa-brain", label: "AI / ML" },
  { icon: "fab fa-google", label: "Google Play" },
  { icon: "fas fa-vial", label: "Selenium" },
  { icon: "fas fa-robot", label: "Playwright" },
  { icon: "fas fa-infinity", label: "CI/CD" },
];

const SectionTag = ({ children }) => (
  <span style={{ display: "inline-flex", alignItems: "center", gap: 8, color: C.violet, fontSize: 12, fontWeight: 600, textTransform: "uppercase", letterSpacing: 2.5, marginBottom: 16, fontFamily: "'Inter',sans-serif" }}>
    <span style={{ width: 20, height: 1, background: C.violet, display: "inline-block" }} />{children}
  </span>
);

const SectionTitle = ({ children, style, light }) => (
  <h2 className="section-title" style={{ fontFamily: "'Fraunces',serif", fontSize: "clamp(24px,3vw,38px)", fontWeight: 500, color: light ? "#fff" : C.ink, lineHeight: 1.2, marginBottom: 14, letterSpacing: "-0.3px", ...style }}>{children}</h2>
);

const BtnPrimary = ({ href = "#", children, style, onClick }) => {
  const [hov, setHov] = useState(false);
  return (
    <a href={href} onClick={onClick} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ background: C.violet, color: "#fff", padding: "14px 30px", fontWeight: 600, fontSize: 13, textDecoration: "none", fontFamily: "'Inter',sans-serif", letterSpacing: ".03em", textTransform: "uppercase", boxShadow: hov ? shadowMd : "none", transform: hov ? "translateY(-2px)" : "none", transition: "all .25s", display: "inline-flex", alignItems: "center", gap: 10, ...style }}>{children}</a>
  );
};

const BtnOutline = ({ href = "#", children, dark, style }) => {
  const [hov, setHov] = useState(false);
  return (
    <a href={href} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ background: hov ? (dark ? "rgba(91,75,158,0.06)" : "rgba(255,255,255,0.06)") : "transparent", color: dark ? C.ink : "#fff", padding: "13px 28px", fontWeight: 600, fontSize: 13, textDecoration: "none", fontFamily: "'Inter',sans-serif", letterSpacing: ".03em", textTransform: "uppercase", border: `1px solid ${dark ? "rgba(18,16,28,0.25)" : "rgba(255,255,255,0.3)"}`, transition: "all .25s", display: "inline-flex", alignItems: "center", gap: 10, ...style }}>{children}</a>
  );
};

function ServiceCard({ icon, title, desc, who }) {
  const [hov, setHov] = useState(false);
  return (
    <div onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ background: "#fff", padding: "36px 28px", border: `1px solid ${hov ? C.violet : "rgba(18,16,28,0.08)"}`, boxShadow: hov ? shadowCard : "none", transition: "all .3s", cursor: "default" }}>
      <div style={{ width: 46, height: 46, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 19, marginBottom: 22, border: `1px solid ${C.violet}`, color: C.violet, background: hov ? C.violet : "transparent", transition: "all .3s" }}>
        <i className={icon} style={{ color: hov ? "#fff" : C.violet, transition: "color .3s" }} />
      </div>
      <h3 style={{ fontFamily: "'Fraunces',serif", fontSize: 18, fontWeight: 500, color: C.ink, marginBottom: 10 }}>{title}</h3>
      <p style={{ fontSize: 13, color: C.textMuted, lineHeight: 1.75, marginBottom: 14 }}>{desc}</p>
      {who && (
        <p style={{ fontSize: 12, color: C.violet, lineHeight: 1.6, marginBottom: 18, fontStyle: "italic" }}>{who}</p>
      )}
      <a href="#contact" style={{ fontSize: 11, fontWeight: 600, color: C.violet, textDecoration: "none", fontFamily: "'Inter',sans-serif", textTransform: "uppercase", letterSpacing: "1px", display: "inline-flex", alignItems: "center", gap: 6 }}>
        Get Started <i className="fas fa-arrow-right" style={{ fontSize: 10 }} />
      </a>
    </div>
  );
}

function StartCard({ data }) {
  const [hov, setHov] = useState(false);
  const { tag, title, price, period, items, footnote } = data;
  return (
    <div onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ background: "#fff", border: `1px solid ${hov ? C.violet : "rgba(18,16,28,0.1)"}`, boxShadow: hov ? shadowCard : "none", transition: "all .3s", padding: "32px 28px", display: "flex", flexDirection: "column", height: "100%" }}>
      <span style={{ display: "inline-block", fontSize: 10, fontWeight: 700, color: C.violet, textTransform: "uppercase", letterSpacing: "1.5px", marginBottom: 14 }}>{tag}</span>
      <h3 style={{ fontFamily: "'Fraunces',serif", fontSize: 20, fontWeight: 500, color: C.ink, marginBottom: 10 }}>{title}</h3>
      <div style={{ fontFamily: "'Fraunces',serif", fontSize: 32, fontWeight: 500, color: C.ink, marginBottom: 18 }}>
        {price}<small style={{ fontSize: 13, fontWeight: 400, color: C.textMuted, fontFamily: "'Inter',sans-serif" }}> {period}</small>
      </div>
      <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 11, marginBottom: 20, flexGrow: 1 }}>
        {items.map((it, i) => (
          <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: 9, fontSize: 13, color: C.textDark, lineHeight: 1.5 }}>
            <i className="fas fa-check" style={{ color: C.violet, fontSize: 11, marginTop: 3, flexShrink: 0 }} />{it}
          </li>
        ))}
      </ul>
      <p style={{ fontSize: 12, color: C.textMuted, fontStyle: "italic", lineHeight: 1.6, marginBottom: 20, paddingTop: 16, borderTop: "1px solid rgba(18,16,28,0.08)" }}>{footnote}</p>
      <a href="#contact" style={{ display: "block", textAlign: "center", padding: "13px", fontWeight: 600, fontSize: 12, textDecoration: "none", fontFamily: "'Inter',sans-serif", textTransform: "uppercase", letterSpacing: "1px", background: C.violet, color: "#fff" }}>Start This</a>
    </div>
  );
}

function PricingCard({ data }) {
  const [hov, setHov] = useState(false);
  const { plan, price, period, desc, features, featured } = data;
  return (
    <div onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ padding: "40px 32px", position: "relative", background: featured ? gradInk : "#fff", border: `1px solid ${featured ? C.ink : "rgba(18,16,28,0.1)"}`, boxShadow: featured ? shadowMd : hov ? shadowCard : "none", transition: "all .3s" }}>
      {featured && <span style={{ position: "absolute", top: 0, right: 0, background: C.violet, color: "#fff", fontSize: 10, fontWeight: 600, padding: "6px 14px", textTransform: "uppercase", letterSpacing: "1.5px" }}>Recommended</span>}
      <div style={{ fontSize: 12, fontWeight: 600, textTransform: "uppercase", letterSpacing: 2.5, color: featured ? "#C9BBF0" : C.violet, marginBottom: 12, fontFamily: "'Inter',sans-serif" }}>{plan}</div>
      <div style={{ fontFamily: "'Fraunces',serif", fontSize: 44, fontWeight: 500, color: featured ? "#fff" : C.ink, lineHeight: 1, marginBottom: 8 }}>
        {price}<small style={{ fontSize: 14, fontWeight: 400, color: featured ? "rgba(255,255,255,0.5)" : C.textMuted, fontFamily: "'Inter',sans-serif" }}>{period}</small>
      </div>
      <p style={{ fontSize: 13, color: featured ? "rgba(255,255,255,0.6)" : C.textMuted, marginBottom: 26, paddingBottom: 26, borderBottom: `1px solid ${featured ? "rgba(255,255,255,0.1)" : "rgba(18,16,28,0.08)"}` }}>{desc}</p>
      <ul style={{ listStyle: "none", marginBottom: 30, display: "flex", flexDirection: "column", gap: 12 }}>
        {features.map((f, i) => (
          <li key={i} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 13, color: f.ok ? (featured ? "rgba(255,255,255,0.85)" : C.textDark) : (featured ? "rgba(255,255,255,0.28)" : "rgba(18,16,28,0.3)") }}>
            <i className={f.ok ? "fas fa-check" : "fas fa-minus"} style={{ color: f.ok ? C.violet : "inherit", fontSize: 11, width: 12 }} />
            {f.text}
          </li>
        ))}
      </ul>
      <a href="#contact" style={{ display: "block", textAlign: "center", padding: "14px", fontWeight: 600, fontSize: 12, textDecoration: "none", fontFamily: "'Inter',sans-serif", textTransform: "uppercase", letterSpacing: "1px", background: featured ? C.violet : "transparent", color: featured ? "#fff" : C.ink, border: featured ? "none" : `1px solid rgba(18,16,28,0.25)` }}>Get Started</a>
    </div>
  );
}

function TeamAvatar({ seed }) {
  const hues = [
    { skin: "#E8B9CE", hair: "#3D2F73", top: "#5B4B9E" },
    { skin: "#D9A9B0", hair: "#1D1832", top: "#3D2F73" },
    { skin: "#C98F6E", hair: "#12101C", top: "#7A67C4" },
    { skin: "#E3B98C", hair: "#2A1F1A", top: "#5B4B9E" },
  ];
  const p = hues[seed % hues.length];
  return (
    <svg viewBox="0 0 200 220" width="100%" height="100%" preserveAspectRatio="xMidYMid slice">
      <rect width="200" height="220" fill="#F1EEF7" />
      <ellipse cx="100" cy="205" rx="70" ry="14" fill="#E3DAF1" />
      <path d="M40 220 Q40 150 100 150 Q160 150 160 220 Z" fill={p.top} />
      <circle cx="100" cy="105" r="48" fill={p.skin} />
      <path d="M52 100 Q52 45 100 45 Q148 45 148 100 Q140 80 100 78 Q60 80 52 100 Z" fill={p.hair} />
      <circle cx="80" cy="108" r="4" fill="#2A1420" />
      <circle cx="120" cy="108" r="4" fill="#2A1420" />
      <path d="M85 128 Q100 138 115 128" stroke="#2A1420" strokeWidth="3" fill="none" strokeLinecap="round" />
    </svg>
  );
}

function TeamCard({ member, seed }) {
  const [hov, setHov] = useState(false);
  return (
    <div onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ border: "1px solid rgba(18,16,28,0.08)", boxShadow: hov ? shadowCard : "none", transition: "all .3s" }}>
      <div style={{ position: "relative" }}>
        <div style={{ height: 220, overflow: "hidden" }}>
          <TeamAvatar seed={seed} />
        </div>
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg,transparent 45%,rgba(18,16,28,0.82) 100%)", opacity: hov ? 1 : 0, transition: "opacity .3s", display: "flex", alignItems: "flex-end", justifyContent: "center", paddingBottom: 18, gap: 10 }}>
          {["fab fa-linkedin-in", "fas fa-envelope"].map((ic, i) => (
            <a key={i} href="#" style={{ width: 32, height: 32, background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.25)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", textDecoration: "none", fontSize: 12 }}><i className={ic} /></a>
          ))}
        </div>
      </div>
      <div style={{ padding: "20px", background: "#fff", textAlign: "center" }}>
        <h3 style={{ fontFamily: "'Fraunces',serif", fontSize: 16, fontWeight: 500, color: C.ink, marginBottom: 4 }}>{member.name}</h3>
        <p style={{ fontSize: 11, color: C.violet, fontWeight: 600, textTransform: "uppercase", letterSpacing: 1.5, fontFamily: "'Inter',sans-serif" }}>{member.role}</p>
      </div>
    </div>
  );
}

function BlogCard({ post }) {
  const [hov, setHov] = useState(false);
  return (
    <div onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ background: "#fff", border: "1px solid rgba(18,16,28,0.08)", boxShadow: hov ? shadowCard : "none", transition: "all .3s" }}>
      <div style={{ height: 170, background: C.paperMid, position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <i className={post.icon} style={{ fontSize: 46, color: C.violet, opacity: 0.3 }} />
        <span style={{ position: "absolute", top: 14, left: 14, background: C.ink, color: "#fff", fontSize: 10, fontWeight: 600, padding: "5px 12px", textTransform: "uppercase", letterSpacing: "1.5px" }}>{post.cat}</span>
      </div>
      <div style={{ padding: 22 }}>
        <div style={{ display: "flex", gap: 14, fontSize: 11, color: C.textMuted, marginBottom: 10, fontFamily: "'Inter',sans-serif" }}>
          <span><i className="fas fa-calendar" style={{ color: C.violet, marginRight: 5 }} />{post.date}</span>
          <span><i className="fas fa-user" style={{ color: C.violet, marginRight: 5 }} />{post.author}</span>
        </div>
        <h3 style={{ fontFamily: "'Fraunces',serif", fontSize: 16, fontWeight: 500, color: C.ink, lineHeight: 1.4, marginBottom: 10 }}>{post.title}</h3>
        <p style={{ fontSize: 12, color: C.textMuted, lineHeight: 1.7, marginBottom: 16 }}>{post.desc}</p>
        <a href="#" style={{ fontSize: 11, fontWeight: 600, color: C.violet, textDecoration: "none", fontFamily: "'Inter',sans-serif", textTransform: "uppercase", letterSpacing: "1px", display: "inline-flex", alignItems: "center", gap: 6 }}>Read More <i className="fas fa-arrow-right" style={{ fontSize: 10 }} /></a>
      </div>
    </div>
  );
}

function Field({ label, placeholder, type, style }) {
  const [focused, setFocused] = useState(false);
  return (
    <div style={style}>
      <label style={{ display: "block", fontSize: 11, fontWeight: 600, color: C.ink, marginBottom: 8, textTransform: "uppercase", letterSpacing: "1.2px", fontFamily: "'Inter',sans-serif" }}>{label}</label>
      <input type={type} placeholder={placeholder} onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
        style={{ width: "100%", padding: "12px 14px", border: `1px solid ${focused ? C.violet : "rgba(18,16,28,0.15)"}`, fontSize: 13, fontFamily: "'Inter',sans-serif", color: C.textDark, background: "#fff", outline: "none", transition: "border-color .2s" }} />
    </div>
  );
}

export default function TranovaDigital() {
  const [scrolled, setScrolled] = useState(false);
  const [showTop, setShowTop] = useState(false);
  const [formSent, setFormSent] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const statsRef = useRef(null);
  const [counted, setCounted] = useState(false);
  const [counts, setCounts] = useState([0, 0, 0, 0]);

  useEffect(() => {
    if (!document.getElementById("fa-cdn")) {
      const l = document.createElement("link"); l.id = "fa-cdn"; l.rel = "stylesheet";
      l.href = "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css";
      document.head.appendChild(l);
    }
    if (!document.getElementById("gfonts")) {
      const l = document.createElement("link"); l.id = "gfonts"; l.rel = "stylesheet";
      l.href = "https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600&family=Inter:wght@300;400;500;600;700&display=swap";
      document.head.appendChild(l);
    }
    if (!document.getElementById("tranova-responsive")) {
      const s = document.createElement("style"); s.id = "tranova-responsive";
      s.textContent = RESPONSIVE_CSS; document.head.appendChild(s);
    }
    const onScroll = () => { setScrolled(window.scrollY > 60); setShowTop(window.scrollY > 400); };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!statsRef.current) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !counted) {
        setCounted(true);
        [200, 50, 15, 24].forEach((t, i) => {
          let cur = 0; const inc = t / 60;
          const timer = setInterval(() => {
            cur += inc;
            if (cur >= t) { cur = t; clearInterval(timer); }
            setCounts(prev => { const n = [...prev]; n[i] = Math.floor(cur); return n; });
          }, 25);
        });
      }
    }, { threshold: 0.5 });
    obs.observe(statsRef.current);
    return () => obs.disconnect();
  }, [counted]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", color: C.textDark, background: "#fff", overflowX: "hidden", width: "100%" }}>

      {/* ── MOBILE MENU ── */}
      <div className={`mobile-menu ${mobileOpen ? "open" : ""}`}>
        <button className="mobile-close" onClick={() => setMobileOpen(false)}>
          <i className="fas fa-times" />
        </button>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 32 }}>
          <div style={{ width: 40, height: 40, background: C.violet, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Fraunces',serif", fontSize: 19, fontWeight: 500, color: "#fff" }}>T</div>
          <div style={{ lineHeight: 1.1 }}>
            <div style={{ fontFamily: "'Fraunces',serif", fontSize: 18, fontWeight: 500, color: "#fff" }}>Tranova</div>
            <div style={{ fontSize: 9, color: "#C9BBF0", textTransform: "uppercase", letterSpacing: 2.5, fontWeight: 600 }}>Digital Technologies</div>
          </div>
        </div>
        {["About", "Services", "Pricing", "Team", "Blog", "Contact"].map(item => (
          <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setMobileOpen(false)}>{item}</a>
        ))}
        <a href="#contact" className="mobile-cta" onClick={() => setMobileOpen(false)}>Start a Project</a>
        <div style={{ display: "flex", gap: 10, marginTop: 26, justifyContent: "center" }}>
          {["fab fa-linkedin-in","fab fa-twitter","fab fa-instagram","fab fa-whatsapp"].map((ic,i) => (
            <a key={i} href="#" style={{ width: 36, height: 36, border: "1px solid rgba(255,255,255,0.14)", display: "flex", alignItems: "center", justifyContent: "center", color: "rgba(255,255,255,0.55)", fontSize: 13, textDecoration: "none" }}><i className={ic} /></a>
          ))}
        </div>
      </div>

      {/* ── TOP BAR ── */}
      <div className="topbar" style={{ background: C.ink, color: "rgba(255,255,255,0.55)", fontSize: 12, padding: "8px 0", width: "100%" }}>
        <div style={{ maxWidth: 1200, margin: "auto", padding: "0 24px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8, fontFamily: "'Inter',sans-serif" }}>
          <div>
            <i className="fas fa-phone-alt" style={{ color: "#C9BBF0", marginRight: 6 }} />+91 8897XXXXXX &nbsp;&nbsp;
            <i className="fas fa-envelope" style={{ color: "#C9BBF0", marginRight: 6 }} />hello@tranovadigital.com
          </div>
          <a href="#contact" style={{ color: "#C9BBF0", textDecoration: "none", fontWeight: 600, fontSize: 11, letterSpacing: ".5px", textTransform: "uppercase" }}>Request a Proposal →</a>
        </div>
      </div>

      {/* ── NAVBAR ── */}
      <nav style={{ position: "sticky", top: 0, zIndex: 1000, background: C.ink, borderBottom: "1px solid rgba(255,255,255,0.08)", boxShadow: scrolled ? "0 4px 24px rgba(18,16,28,0.3)" : "none", transition: "all .3s", width: "100%" }}>
        <div style={{ maxWidth: 1200, margin: "auto", padding: "0 20px", display: "flex", justifyContent: "space-between", alignItems: "center", height: 72 }}>
          <a href="#" style={{ display: "flex", alignItems: "center", gap: 12, textDecoration: "none" }}>
            <div style={{ width: 38, height: 38, background: C.violet, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Fraunces',serif", fontSize: 18, fontWeight: 500, color: "#fff" }}>T</div>
            <div style={{ lineHeight: 1.15 }}>
              <div style={{ fontFamily: "'Fraunces',serif", fontSize: 19, fontWeight: 500, color: "#fff", letterSpacing: "-0.2px" }}>Tranova</div>
              <div style={{ fontSize: 9, color: "#C9BBF0", textTransform: "uppercase", letterSpacing: 2.5, fontWeight: 600 }}>Digital Technologies</div>
            </div>
          </a>

          <div className="nav-desktop-links" style={{ display: "flex", gap: 30 }}>
            {["About","Services","Pricing","Team","Blog","Contact"].map(item => (
              <a key={item} href={`#${item.toLowerCase()}`}
                style={{ fontSize: 13, fontWeight: 500, color: "rgba(255,255,255,0.75)", textDecoration: "none", transition: "color .2s", fontFamily: "'Inter',sans-serif", textTransform: "uppercase", letterSpacing: ".8px" }}
                onMouseEnter={e => e.target.style.color = "#fff"}
                onMouseLeave={e => e.target.style.color = "rgba(255,255,255,0.75)"}>{item}</a>
            ))}
          </div>

          <div className="nav-desktop-btn">
            <BtnPrimary href="#contact">Start a Project</BtnPrimary>
          </div>

          <button className="hamburger" onClick={() => setMobileOpen(true)} aria-label="Open menu">
            <span style={{ background: "#fff" }} />
            <span style={{ background: "#fff" }} />
            <span style={{ background: "#fff" }} />
          </button>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section id="home" style={{ position: "relative", minHeight: "88vh", display: "flex", alignItems: "center", background: C.ink, overflow: "hidden", width: "100%" }}>
        <div className="hero-grid" style={{ maxWidth: 1200, margin: "auto", padding: "90px 24px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 70, alignItems: "center", position: "relative", zIndex: 2, width: "100%" }}>
          <div>
            <SectionTag>Hyderabad · Full-Service Digital Partner</SectionTag>
            <h1 className="hero-title" style={{ fontFamily: "'Fraunces',serif", fontSize: "clamp(32px,4vw,54px)", fontWeight: 500, color: "#fff", lineHeight: 1.15, marginBottom: 22, letterSpacing: "-0.5px" }}>
              Considered digital work,<br />built to <span style={{ fontStyle: "italic", color: "#C9BBF0" }}>compound</span>
            </h1>
            <p style={{ fontSize: 15, color: "rgba(255,255,255,0.6)", lineHeight: 1.8, marginBottom: 32, maxWidth: 440 }}>
              From mobile and web platforms to applied AI, automation testing and growth marketing — Tranova delivers end-to-end technology and brand programmes under one roof.
            </p>
            <div className="hero-btns" style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
              <BtnPrimary href="#services">Explore Services</BtnPrimary>
              <BtnOutline href="#about">Our Approach</BtnOutline>
            </div>

            <div style={{ display: "flex", gap: 0, marginTop: 40, borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: 24, flexWrap: "wrap" }}>
              {[["50+","Projects"],["200+","Clients"],["3+","Years"]].map(([n,l], i) => (
                <div key={l} style={{ paddingRight: 28, marginRight: 28, borderRight: i < 2 ? "1px solid rgba(255,255,255,0.1)" : "none" }}>
                  <div style={{ fontFamily: "'Fraunces',serif", fontSize: 24, fontWeight: 500, color: "#fff" }}>{n}</div>
                  <div style={{ fontSize: 11, color: "rgba(255,255,255,0.5)", marginTop: 3, textTransform: "uppercase", letterSpacing: "1px" }}>{l}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="hero-visual" style={{ position: "relative" }}>
            <div style={{ border: "1px solid rgba(255,255,255,0.12)", overflow: "hidden" }}>
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=900&q=80"
                alt="Developers collaborating on a web and mobile project"
                style={{ width: "100%", height: 380, objectFit: "cover", display: "block", filter: "grayscale(15%) contrast(1.05)" }}
              />
            </div>
            <div style={{ position: "absolute", bottom: -1, left: -1, right: -1, background: C.violet, padding: "16px 22px", display: "flex", alignItems: "center", gap: 14 }}>
              <i className="fas fa-star" style={{ color: "#fff", fontSize: 16 }} />
              <div>
                <strong style={{ display: "block", fontFamily: "'Fraunces',serif", fontSize: 16, fontWeight: 500, color: "#fff" }}>50+ Projects Delivered</strong>
                <span style={{ fontSize: 11, color: "rgba(255,255,255,0.7)" }}>Across mobile, web and AI</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <div ref={statsRef} className="stats-row" style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px", display: "grid", gridTemplateColumns: "repeat(4,1fr)", position: "relative", zIndex: 10 }}>
        {stats.map((s, i) => (
          <div key={i} className="stat-box" style={{ background: "#fff", padding: "30px 20px", textAlign: "center", borderRight: i < 3 ? "1px solid rgba(18,16,28,0.08)" : "none", borderBottom: "1px solid rgba(18,16,28,0.08)" }}>
            <i className={s.icon} style={{ fontSize: 20, color: C.violet, marginBottom: 10, display: "block" }} />
            <div style={{ fontFamily: "'Fraunces',serif", fontSize: 28, fontWeight: 500, color: C.ink, lineHeight: 1, marginBottom: 6 }}>
              {i===3?(counted?"24/7":"0"):(counted?counts[i]+"+":"0+")}
            </div>
            <div style={{ fontSize: 11, color: C.textMuted, textTransform: "uppercase", letterSpacing: "1.2px", fontWeight: 500 }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* ── CLIENTS ── */}
      <div style={{ background: C.paper, padding: "48px 0", borderBottom: "1px solid rgba(18,16,28,0.06)", width: "100%" }}>
        <div style={{ maxWidth: 1200, margin: "auto", padding: "0 24px", textAlign: "center" }}>
          <p style={{ fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: 2.5, color: C.textMuted, marginBottom: 28 }}>Trusted by Companies Across India</p>
          <div style={{ display: "flex", gap: 34, alignItems: "center", justifyContent: "center", flexWrap: "wrap" }}>
            {["GrabzoMart","RealEstate CRM","PayrollPro","DigitalLeads","AppStudio","TechBrand"].map(name => (
              <span key={name} style={{ fontFamily: "'Fraunces',serif", fontSize: 16, fontWeight: 500, color: "rgba(18,16,28,0.28)", letterSpacing: "-0.2px", cursor: "default", transition: "color .3s" }}
                onMouseEnter={e => e.target.style.color = C.violet}
                onMouseLeave={e => e.target.style.color = "rgba(18,16,28,0.28)"}>{name}</span>
            ))}
          </div>
        </div>
      </div>

      {/* ── ABOUT ── */}
      <section id="about" className="section-pad" style={{ background: "#fff", padding: "92px 0", width: "100%" }}>
        <div className="about-grid" style={{ maxWidth: 1200, margin: "auto", padding: "0 24px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center" }}>
          <div className="about-img-col" style={{ position: "relative" }}>
            <div style={{ border: "1px solid rgba(18,16,28,0.1)", overflow: "hidden" }}>
              <img
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80"
                alt="Tranova team working on a client project"
                style={{ width: "100%", height: 420, objectFit: "cover", display: "block" }}
              />
            </div>
            <div style={{ position: "absolute", bottom: -1, right: -1, background: C.ink, color: "#fff", padding: "18px 22px", textAlign: "center" }}>
              <div style={{ fontFamily: "'Fraunces',serif", fontSize: 28, fontWeight: 500, lineHeight: 1 }}>3+</div>
              <div style={{ fontSize: 10, fontWeight: 500, opacity: .7, marginTop: 5, textTransform: "uppercase", letterSpacing: "1px" }}>Years of<br />Practice</div>
            </div>
          </div>
          <div>
            <SectionTag>About Tranova</SectionTag>
            <SectionTitle>Full-service technology, <span style={{ fontStyle: "italic", color: C.violet }}>run like a studio</span></SectionTitle>
            <p style={{ color: C.textMuted, fontSize: 14, lineHeight: 1.85, marginBottom: 24 }}>Tranova Digital Technologies is a Hyderabad-based technology practice offering development, digital marketing, applied AI, automation testing and brand building under one roof — built for founders who want a single accountable partner.</p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, margin: "24px 0 32px" }}>
              {["Android & iOS Development","Web Platforms (React, FastAPI)","AI & Automation","Automation Testing (QA)","Marketing & Lead Generation","PostgreSQL & Cloud Hosting","Brand & Content Strategy"].map(f => (
                <div key={f} style={{ display: "flex", alignItems: "flex-start", gap: 10, fontSize: 13, fontWeight: 500, color: C.textDark }}>
                  <i className="fas fa-check" style={{ color: C.violet, fontSize: 12, flexShrink: 0, marginTop: 3 }} />{f}
                </div>
              ))}
            </div>
            <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
              <BtnPrimary href="#services" style={{ background: C.ink }}>Our Services</BtnPrimary>
              <BtnOutline href="#contact" dark>Contact Us</BtnOutline>
            </div>
          </div>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section id="services" className="section-pad" style={{ background: C.paper, padding: "92px 0", width: "100%" }}>
        <div style={{ maxWidth: 1200, margin: "auto", padding: "0 24px" }}>
          <div style={{ textAlign: "center", marginBottom: 54 }}>
            <SectionTag>What We Do</SectionTag>
            <SectionTitle>A single, <span style={{ fontStyle: "italic", color: C.violet }}>accountable</span> digital partner</SectionTitle>
            <p style={{ fontSize: 14, color: C.textMuted, lineHeight: 1.8, maxWidth: 560, margin: "0 auto" }}>Technology and marketing under one roof — no hand-offs between agencies. Each service below explains exactly what you get and who it's for.</p>
          </div>
          <div className="services-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 1, background: "rgba(18,16,28,0.08)" }}>
            {services.map((s,i) => <ServiceCard key={i} {...s} />)}
          </div>
        </div>
      </section>

      {/* ── TECH STACK ── */}
      <div style={{ background: "#fff", padding: "56px 0", borderTop: "1px solid rgba(18,16,28,0.06)", borderBottom: "1px solid rgba(18,16,28,0.06)", width: "100%" }}>
        <div style={{ maxWidth: 1200, margin: "auto", padding: "0 24px" }}>
          <div style={{ textAlign: "center", marginBottom: 32 }}>
            <SectionTag>Technology</SectionTag>
            <SectionTitle style={{ fontSize: "clamp(20px,2.4vw,28px)" }}>Built on a modern stack</SectionTitle>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10, justifyContent: "center" }}>
            {techStack.map((t,i) => {
              const [hov, setHov] = useState(false);
              return (
                <div key={i} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
                  style={{ background: hov ? C.ink : C.paper, border: `1px solid ${hov ? C.ink : "rgba(18,16,28,0.1)"}`, color: hov ? "#fff" : C.ink, padding: "10px 18px", fontSize: 12, fontWeight: 500, display: "flex", alignItems: "center", gap: 8, transition: "all .25s", cursor: "default" }}>
                  <i className={t.icon} style={{ color: hov ? "#C9BBF0" : C.violet, fontSize: 13 }} />{t.label}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── STARTING PACKAGES (per-service pricing) ── */}
      <section className="section-pad" style={{ background: "#fff", padding: "92px 0", width: "100%" }}>
        <div style={{ maxWidth: 1200, margin: "auto", padding: "0 24px" }}>
          <div style={{ textAlign: "center", marginBottom: 54 }}>
            <SectionTag>Where To Start</SectionTag>
            <SectionTitle>Pick a service, see the <span style={{ fontStyle: "italic", color: C.violet }}>starting price</span></SectionTitle>
            <p style={{ fontSize: 14, color: C.textMuted, lineHeight: 1.8, maxWidth: 560, margin: "0 auto" }}>Digital marketing, app development and web development can be started separately — each with its own scope and starting cost.</p>
          </div>
          <div className="starts-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 24 }}>
            {startingPackages.map((p,i) => <StartCard key={i} data={p} />)}
          </div>
        </div>
      </section>

      {/* ── PRICING ── */}
      <section id="pricing" className="section-pad" style={{ background: C.paper, padding: "92px 0", width: "100%" }}>
        <div style={{ maxWidth: 1200, margin: "auto", padding: "0 24px" }}>
          <div style={{ textAlign: "center", marginBottom: 54 }}>
            <SectionTag>Bundled Pricing</SectionTag>
            <SectionTitle>Or take a <span style={{ fontStyle: "italic", color: C.violet }}>full package</span></SectionTitle>
            <p style={{ fontSize: 14, color: C.textMuted, lineHeight: 1.8, maxWidth: 520, margin: "0 auto" }}>Every plan pairs development with promotion — one investment, one team.</p>
          </div>
          <div className="pricing-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 24, alignItems: "stretch" }}>
            {pricing.map((p,i) => <PricingCard key={i} data={p} />)}
          </div>
        </div>
      </section>

      {/* ── TEAM ── */}
      <section id="team" className="section-pad" style={{ background: "#fff", padding: "92px 0", width: "100%" }}>
        <div style={{ maxWidth: 1200, margin: "auto", padding: "0 24px" }}>
          <div style={{ textAlign: "center", marginBottom: 54 }}>
            <SectionTag>Our Team</SectionTag>
            <SectionTitle>The people behind the work</SectionTitle>
          </div>
          <div className="team-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 24 }}>
            {team.map((m,i) => <TeamCard key={i} member={m} seed={i} />)}
          </div>
        </div>
      </section>

      {/* ── BLOG ── */}
      <section id="blog" className="section-pad" style={{ background: C.paper, padding: "92px 0", width: "100%" }}>
        <div style={{ maxWidth: 1200, margin: "auto", padding: "0 24px" }}>
          <div style={{ textAlign: "center", marginBottom: 54 }}>
            <SectionTag>Latest Articles</SectionTag>
            <SectionTitle>Notes from the studio</SectionTitle>
          </div>
          <div className="blog-grid" style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 24 }}>
            {blogs.map((b,i) => <BlogCard key={i} post={b} />)}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <div style={{ background: C.violet, padding: "64px 0", width: "100%" }}>
        <div className="cta-banner-inner" style={{ maxWidth: 1200, margin: "auto", padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 28, flexWrap: "wrap" }}>
          <div>
            <h2 style={{ fontFamily: "'Fraunces',serif", fontSize: "clamp(20px,2.5vw,30px)", fontWeight: 500, color: "#fff", lineHeight: 1.2 }}>
              Ready for a free quote? Let's talk.
            </h2>
            <p style={{ color: "rgba(255,255,255,0.7)", fontSize: 13, marginTop: 8 }}>Straightforward consultation, transparent pricing, no surprises.</p>
          </div>
          <div className="cta-btns" style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <BtnPrimary href="#contact" style={{ background: C.ink }}>Get Free Quote</BtnPrimary>
            <BtnOutline href="tel:+918897000000">Call Now</BtnOutline>
          </div>
        </div>
      </div>

      {/* ── CONTACT ── */}
      <section id="contact" className="section-pad" style={{ background: "#fff", padding: "92px 0", width: "100%" }}>
        <div className="contact-grid" style={{ maxWidth: 1200, margin: "auto", padding: "0 24px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "start" }}>
          <div>
            <SectionTag>Get In Touch</SectionTag>
            <SectionTitle>Let's build something <span style={{ fontStyle: "italic", color: C.violet }}>worth building</span></SectionTitle>
            <p style={{ color: C.textMuted, fontSize: 13, lineHeight: 1.8, marginBottom: 32 }}>Whether it's a startup website, a mobile app, an AI system, a test automation suite or a full marketing programme — Tranova is your single technology partner.</p>
            {[
              { icon: "fas fa-map-marker-alt", title: "Location", text: "Hyderabad, Telangana, India – 500047" },
              { icon: "fas fa-phone-alt", title: "Phone", text: "+91 8897XXXXXX\nMon – Sat: 9AM to 7PM" },
              { icon: "fas fa-envelope", title: "Email", text: "hello@tranovadigital.com\nsupport@tranovadigital.com" },
              { icon: "fab fa-whatsapp", title: "WhatsApp", text: "Instant chat support for\nproject inquiries" },
            ].map((item,i) => (
              <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 14, marginBottom: 22, paddingBottom: 22, borderBottom: i < 3 ? "1px solid rgba(18,16,28,0.06)" : "none" }}>
                <div style={{ width: 40, height: 40, border: `1px solid ${C.violet}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 15, color: C.violet, flexShrink: 0 }}>
                  <i className={item.icon} />
                </div>
                <div>
                  <h4 style={{ fontFamily: "'Inter',sans-serif", fontSize: 11, fontWeight: 600, color: C.ink, marginBottom: 4, textTransform: "uppercase", letterSpacing: "1.2px" }}>{item.title}</h4>
                  <p style={{ fontSize: 13, color: C.textMuted, lineHeight: 1.6, whiteSpace: "pre-line" }}>{item.text}</p>
                </div>
              </div>
            ))}
          </div>
          <div style={{ background: C.paper, padding: "34px", border: "1px solid rgba(18,16,28,0.08)" }}>
            <h3 style={{ fontFamily: "'Fraunces',serif", fontSize: 20, fontWeight: 500, color: C.ink, marginBottom: 24 }}>Send Us a Message</h3>
            <div className="form-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 16 }}>
              <Field label="Your Name" placeholder="John Doe" type="text" />
              <Field label="Phone Number" placeholder="+91 XXXXXXXXXX" type="tel" />
            </div>
            <Field label="Email Address" placeholder="you@company.com" type="email" style={{ marginBottom: 16 }} />
            <div style={{ marginBottom: 16 }}>
              <label style={{ display: "block", fontSize: 11, fontWeight: 600, color: C.ink, marginBottom: 8, textTransform: "uppercase", letterSpacing: "1.2px", fontFamily: "'Inter',sans-serif" }}>Service Required</label>
              <select style={{ width: "100%", padding: "12px 14px", border: "1px solid rgba(18,16,28,0.15)", fontSize: 13, fontFamily: "'Inter',sans-serif", color: C.textDark, background: "#fff", outline: "none" }}>
                {["Select a Service","Web Development","Mobile App Development","AI Development","Automation Testing (QA)","Digital Marketing","Brand Promotion","CRM / ERP System","Full Digital Package"].map(o => <option key={o}>{o}</option>)}
              </select>
            </div>
            <div style={{ marginBottom: 20 }}>
              <label style={{ display: "block", fontSize: 11, fontWeight: 600, color: C.ink, marginBottom: 8, textTransform: "uppercase", letterSpacing: "1.2px", fontFamily: "'Inter',sans-serif" }}>Your Message</label>
              <textarea placeholder="Describe your project or requirement..." style={{ width: "100%", padding: "12px 14px", border: "1px solid rgba(18,16,28,0.15)", fontSize: 13, fontFamily: "'Inter',sans-serif", color: C.textDark, background: "#fff", outline: "none", resize: "vertical", minHeight: 100 }} />
            </div>
            <button onClick={() => { setFormSent(true); setTimeout(() => setFormSent(false), 3500); }}
              style={{ background: formSent ? "#2E7D4F" : C.violet, color: "#fff", padding: "14px", border: "none", fontWeight: 600, fontSize: 13, cursor: "pointer", fontFamily: "'Inter',sans-serif", textTransform: "uppercase", letterSpacing: ".05em", transition: "background .3s", width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
              <i className={formSent ? "fas fa-check" : "fas fa-paper-plane"} />
              {formSent ? "Message Sent — We'll Be In Touch" : "Send Message"}
            </button>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ background: C.ink, color: "rgba(255,255,255,0.65)", padding: "64px 0 0", width: "100%" }}>
        <div style={{ maxWidth: 1200, margin: "auto", padding: "0 24px" }}>
          <div className="footer-grid" style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: 40, marginBottom: 44, paddingBottom: 44, borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 18 }}>
                <div style={{ width: 38, height: 38, background: C.violet, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Fraunces',serif", fontSize: 17, fontWeight: 500, color: "#fff" }}>T</div>
                <div style={{ lineHeight: 1.15 }}>
                  <div style={{ fontFamily: "'Fraunces',serif", fontSize: 17, fontWeight: 500, color: "#fff" }}>Tranova</div>
                  <div style={{ fontSize: 9, color: "#C9BBF0", textTransform: "uppercase", letterSpacing: 2.5, fontWeight: 600 }}>Digital Technologies</div>
                </div>
              </div>
              <p style={{ fontSize: 13, lineHeight: 1.8, color: "rgba(255,255,255,0.45)", marginBottom: 20, maxWidth: 260 }}>A full-service digital technology practice offering web, mobile, AI, automation testing and marketing from Hyderabad.</p>
              <div style={{ display: "flex", gap: 8 }}>
                {["fab fa-linkedin-in","fab fa-twitter","fab fa-instagram","fab fa-whatsapp"].map((ic,i) => (
                  <a key={i} href="#" style={{ width: 34, height: 34, border: "1px solid rgba(255,255,255,0.12)", display: "flex", alignItems: "center", justifyContent: "center", color: "rgba(255,255,255,0.5)", fontSize: 13, textDecoration: "none", transition: "all .2s" }}
                    onMouseEnter={e => { e.currentTarget.style.background = C.violet; e.currentTarget.style.color = "#fff"; e.currentTarget.style.borderColor = C.violet; }}
                    onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "rgba(255,255,255,0.5)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)"; }}>
                    <i className={ic} />
                  </a>
                ))}
              </div>
            </div>
            {[
              { title: "Services", links: ["Web Development","Mobile App Dev","AI Development","Automation Testing","Digital Marketing","CRM Systems"] },
              { title: "Company", links: ["About Tranova","Our Team","Portfolio","Blog & Articles","Careers","Contact Us"] },
              { title: "Projects", links: ["GrabzoMart App","Real Estate CRM","Payroll System","AI Chatbots","QA Automation Suite","E-Commerce Sites"] },
            ].map(col => (
              <div key={col.title}>
                <h4 style={{ fontFamily: "'Inter',sans-serif", fontSize: 12, fontWeight: 600, color: "#fff", marginBottom: 18, textTransform: "uppercase", letterSpacing: "1.5px" }}>
                  {col.title}
                </h4>
                <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 11 }}>
                  {col.links.map(link => (
                    <li key={link}><a href="#" style={{ fontSize: 12, color: "rgba(255,255,255,0.45)", textDecoration: "none", transition: "color .2s" }}
                      onMouseEnter={e => e.currentTarget.style.color = "#C9BBF0"}
                      onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,0.45)"}>{link}
                    </a></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="footer-bottom" style={{ padding: "18px 0 24px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
            <p style={{ fontSize: 12, color: "rgba(255,255,255,0.3)" }}>© 2025 Tranova Digital Technologies. All rights reserved.</p>
            <div style={{ display: "flex", gap: 18 }}>
              <a href="#" style={{ fontSize: 12, color: "rgba(255,255,255,0.3)", textDecoration: "none" }}>Privacy Policy</a>
              <a href="#" style={{ fontSize: 12, color: "rgba(255,255,255,0.3)", textDecoration: "none" }}>Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>

      {showTop && (
        <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          style={{ position: "fixed", bottom: 24, right: 24, width: 44, height: 44, background: C.violet, color: "#fff", border: "none", fontSize: 15, cursor: "pointer", boxShadow: shadowMd, display: "flex", alignItems: "center", justifyContent: "center", zIndex: 999 }}>
          <i className="fas fa-chevron-up" />
        </button>
      )}
    </div>
  );
}
