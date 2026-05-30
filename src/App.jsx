import { useState, useEffect, useRef } from "react";

const C = {
  cyan: "#00BFFF",
  sky: "#19B5FE",
  navy: "#071C3C",
  navyMid: "#0D2C5E",
  grayLight: "#F5F9FC",
  grayMid: "#E8F4FD",
  textDark: "#0A1628",
  textMuted: "#5A6A80",
};

const gradCyan = `linear-gradient(135deg, ${C.cyan}, ${C.sky})`;
const gradNavy = `linear-gradient(135deg, ${C.navy}, ${C.navyMid})`;
const shadowCard = "0 2px 24px rgba(7,28,60,0.08)";
const shadowMd = "0 8px 40px rgba(0,191,255,0.15)";

// ── Responsive CSS injected once ──────────────────────────────────
const RESPONSIVE_CSS = `
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html, body, #root { margin: 0; padding: 0; width: 100%; }
  body { overflow-x: hidden; }

  @keyframes pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.5;transform:scale(1.3)} }
  @keyframes fadeUp { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
  @keyframes slideIn { from{opacity:0;transform:translateX(-20px)} to{opacity:1;transform:translateX(0)} }

  .mobile-menu {
    display: none;
    flex-direction: column;
    position: fixed;
    top: 0; left: 0; right: 0; bottom: 0;
    background: ${C.navy};
    z-index: 2000;
    padding: 80px 32px 40px;
    gap: 0;
    animation: fadeUp .3s ease;
  }
  .mobile-menu.open { display: flex; }
  .mobile-menu a {
    font-family: 'Sora', sans-serif;
    font-size: 22px;
    font-weight: 700;
    color: rgba(255,255,255,0.85);
    text-decoration: none;
    padding: 18px 0;
    border-bottom: 1px solid rgba(255,255,255,0.08);
    transition: color .2s;
    display: flex;
    align-items: center;
    gap: 12px;
  }
  .mobile-menu a:hover { color: #00BFFF; }
  .mobile-close {
    position: absolute;
    top: 20px; right: 20px;
    width: 44px; height: 44px;
    background: rgba(255,255,255,0.08);
    border: none; border-radius: 10px;
    color: #fff; font-size: 20px;
    cursor: pointer; display: flex;
    align-items: center; justify-content: center;
  }
  .mobile-cta {
    margin-top: 28px;
    background: linear-gradient(135deg,#00BFFF,#19B5FE);
    color: #fff; padding: 16px;
    border-radius: 12px; font-family: 'Sora',sans-serif;
    font-size: 16px; font-weight: 700;
    text-decoration: none; text-align: center;
    display: block;
  }

  /* Hamburger */
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
    display: block; width: 24px; height: 2px;
    background: ${C.navy}; border-radius: 2px;
    transition: all .3s;
  }

  @media (max-width: 900px) {
    .hamburger { display: flex; }
    .nav-desktop-links { display: none !important; }
    .nav-desktop-btn { display: none !important; }
  }

  @media (max-width: 768px) {
    .hero-grid { grid-template-columns: 1fr !important; gap: 40px !important; padding: 60px 20px !important; }
    .hero-visual { display: none !important; }
    .hero-title { font-size: 36px !important; }
    .stats-row { grid-template-columns: repeat(2,1fr) !important; margin: 0 16px !important; }
    .stat-box:first-child { border-radius: 12px 0 0 0 !important; }
    .stat-box:nth-child(2) { border-radius: 0 12px 0 0 !important; border-right: none !important; }
    .stat-box:nth-child(3) { border-radius: 0 0 0 12px !important; border-right: 1px solid rgba(255,255,255,0.06) !important; border-top: 1px solid rgba(255,255,255,0.06) !important; }
    .stat-box:last-child { border-radius: 0 0 12px 0 !important; border-top: 1px solid rgba(255,255,255,0.06) !important; }
    .about-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
    .about-img-col { display: none !important; }
    .services-grid { grid-template-columns: 1fr !important; }
    .pricing-grid { grid-template-columns: 1fr !important; }
    .pricing-grid > div { transform: none !important; }
    .team-grid { grid-template-columns: 1fr !important; }
    .blog-grid { grid-template-columns: 1fr !important; }
    .contact-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
    .footer-grid { grid-template-columns: 1fr !important; gap: 32px !important; }
    .footer-bottom { flex-direction: column !important; text-align: center !important; }
    .cta-banner-inner { flex-direction: column !important; text-align: center !important; }
    .cta-btns { justify-content: center !important; }
    .topbar { display: none !important; }
    .section-pad { padding: 60px 0 !important; }
    .form-grid { grid-template-columns: 1fr !important; }
  }

  @media (max-width: 480px) {
    .hero-title { font-size: 30px !important; }
    .section-title { font-size: 24px !important; }
    .hero-btns { flex-direction: column !important; }
    .hero-btns a, .hero-btns button { width: 100% !important; justify-content: center !important; }
  }
`;

const services = [
  { icon: "fab fa-android", title: "Mobile App Development", desc: "Android & iOS apps with React Native. From delivery apps like GrabzoMart to enterprise-grade CRM mobile solutions." },
  { icon: "fas fa-globe", title: "Web Development", desc: "Full-stack websites using React JS, Python FastAPI, HTML/CSS/JS with PostgreSQL & Railway/DigitalOcean hosting." },
  { icon: "fas fa-brain", title: "AI Development", desc: "Intelligent automation, AI-powered chatbots, recommendation engines, and custom ML solutions for your business." },
  { icon: "fas fa-bullhorn", title: "Digital Marketing", desc: "Pure digital marketing, lead generation, social media management, and brand promotion that drives real results." },
  { icon: "fas fa-pen-fancy", title: "Content & Brand Awareness", desc: "Content creation, brand awareness campaigns, social media growth, and digital presence building for startups." },
  { icon: "fas fa-database", title: "Cloud & Database Solutions", desc: "PostgreSQL design, Railway, Hostinger & DigitalOcean deployment, server management and scalable infrastructure." },
];

const stats = [
  { icon: "fas fa-users", num: "200+", label: "Happy Clients" },
  { icon: "fas fa-project-diagram", num: "50+", label: "Projects Done" },
  { icon: "fas fa-award", num: "15+", label: "Awards Won" },
  { icon: "fas fa-headset", num: "24/7", label: "Expert Support" },
];

const pricing = [
  {
    plan: "Starter", price: "₹49k", period: "/project",
    desc: "Perfect for small businesses & MVPs",
    features: [
      { ok: true, text: "Website Development" },
      { ok: true, text: "Basic SEO Setup" },
      { ok: true, text: "Social Media Setup" },
      { ok: true, text: "3 Months Support" },
      { ok: false, text: "Mobile App" },
      { ok: false, text: "AI Integration" },
      { ok: false, text: "Lead Generation" },
    ], featured: false,
  },
  {
    plan: "Growth", price: "₹99k", period: "/project",
    desc: "For startups ready to scale fast",
    features: [
      { ok: true, text: "Website + Mobile App" },
      { ok: true, text: "Digital Marketing" },
      { ok: true, text: "Lead Generation" },
      { ok: true, text: "Brand Promotion" },
      { ok: true, text: "Content Creation" },
      { ok: true, text: "6 Months Support" },
      { ok: false, text: "AI Integration" },
    ], featured: true,
  },
  {
    plan: "Enterprise", price: "₹2L+", period: "/custom",
    desc: "Full-stack digital transformation",
    features: [
      { ok: true, text: "Everything in Growth" },
      { ok: true, text: "AI / Automation" },
      { ok: true, text: "CRM & ERP Systems" },
      { ok: true, text: "Cloud Infrastructure" },
      { ok: true, text: "Dedicated Account Manager" },
      { ok: true, text: "12 Months Support" },
      { ok: true, text: "Priority 24/7 Support" },
    ], featured: false,
  },
];

const team = [
  { name: "Thirupathi Kodaganti", role: "Founder & CEO", icon: "fas fa-user-tie", bg: "linear-gradient(135deg,#e8f4ff,#cce7ff)", iconColor: "#1a6fa8" },
  { name: "Sardar Harpreeth Singh", role: "Senior Developer", icon: "fas fa-user-cog", bg: "linear-gradient(135deg,#e8fff4,#ccf5e5)", iconColor: "#1a8a56" },
  { name: "Ranaprathap", role: "Director & Digital Manager", icon: "fas fa-user-chart", bg: "linear-gradient(135deg,#f5e8ff,#e0ccff)", iconColor: "#6a1a8a" },
];

const blogs = [
  { cat: "Mobile Dev", bg: "linear-gradient(135deg,#e8f4ff,#cce7ff)", icon: "fas fa-mobile-alt", iconColor: "#1a6fa8", date: "May 2025", author: "Thirupathi", title: "How to Build a Delivery App Like GrabzoMart From Scratch", desc: "A complete guide to building a real-world Android delivery app with React Native, FastAPI and PostgreSQL." },
  { cat: "Marketing", bg: "linear-gradient(135deg,#e8fff4,#ccf5e5)", icon: "fas fa-chart-line", iconColor: "#1a8a56", date: "Apr 2025", author: "Ranaprathap", title: "Lead Generation Strategies for Startups in 2025", desc: "How Tranova helped clients generate 500+ quality leads per month through targeted digital campaigns." },
  { cat: "AI Dev", bg: "linear-gradient(135deg,#f5e8ff,#e0ccff)", icon: "fas fa-brain", iconColor: "#6a1a8a", date: "Mar 2025", author: "Anna", title: "Building AI-Powered CRM for Real Estate Businesses", desc: "How we built an intelligent CRM system that automated follow-ups and increased conversions by 40%." },
];

const techStack = [
  { icon: "fab fa-python", label: "Python" },
  { icon: "fas fa-bolt", label: "FastAPI" },
  { icon: "fab fa-react", label: "React JS" },
  { icon: "fab fa-js", label: "JavaScript" },
  { icon: "fab fa-html5", label: "HTML / CSS" },
  { icon: "fab fa-android", label: "React Native" },
  { icon: "fas fa-database", label: "PostgreSQL" },
  { icon: "fas fa-train", label: "Railway" },
  { icon: "fas fa-server", label: "Hostinger" },
  { icon: "fab fa-digital-ocean", label: "DigitalOcean" },
  { icon: "fab fa-apple", label: "App Store" },
  { icon: "fas fa-brain", label: "AI / ML" },
  { icon: "fab fa-google", label: "Google Play" },
  { icon: "fas fa-chart-line", label: "SEO & Analytics" },
];

const SectionTag = ({ children }) => (
  <span style={{ display: "inline-block", background: "rgba(0,191,255,0.1)", color: C.cyan, padding: "6px 16px", borderRadius: 50, fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: 2, marginBottom: 14, border: "1px solid rgba(0,191,255,0.2)", fontFamily: "'Sora',sans-serif" }}>{children}</span>
);

const SectionTitle = ({ children, style }) => (
  <h2 className="section-title" style={{ fontFamily: "'Sora',sans-serif", fontSize: "clamp(24px,3vw,38px)", fontWeight: 800, color: C.navy, lineHeight: 1.15, marginBottom: 14, letterSpacing: "-0.8px", ...style }}>{children}</h2>
);

const BtnPrimary = ({ href = "#", children, style, onClick }) => {
  const [hov, setHov] = useState(false);
  return (
    <a href={href} onClick={onClick} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ background: gradCyan, color: "#fff", padding: "13px 28px", borderRadius: 9, fontWeight: 700, fontSize: 14, textDecoration: "none", fontFamily: "'Sora',sans-serif", boxShadow: hov ? "0 12px 32px rgba(0,191,255,0.55)" : "0 6px 24px rgba(0,191,255,0.4)", transform: hov ? "translateY(-3px)" : "none", transition: "all .3s", display: "inline-flex", alignItems: "center", gap: 8, ...style }}>{children}</a>
  );
};

const BtnOutline = ({ href = "#", children, dark, style }) => {
  const [hov, setHov] = useState(false);
  return (
    <a href={href} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ background: hov ? "rgba(0,191,255,0.08)" : "transparent", color: hov ? C.cyan : dark ? C.navy : "#fff", padding: "13px 28px", borderRadius: 9, fontWeight: 600, fontSize: 14, textDecoration: "none", fontFamily: "'Sora',sans-serif", border: `2px solid ${hov ? C.cyan : dark ? "rgba(7,28,60,0.3)" : "rgba(255,255,255,0.3)"}`, transition: "all .3s", display: "inline-flex", alignItems: "center", gap: 8, ...style }}>{children}</a>
  );
};

function ServiceCard({ icon, title, desc }) {
  const [hov, setHov] = useState(false);
  return (
    <div onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ background: "#fff", borderRadius: 14, padding: "34px 26px", border: `1px solid ${hov ? "rgba(0,191,255,0.3)" : "rgba(0,191,255,0.1)"}`, boxShadow: hov ? shadowMd : shadowCard, transform: hov ? "translateY(-8px)" : "none", transition: "all .35s", cursor: "default" }}>
      <div style={{ width: 50, height: 60, borderRadius: 14, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, marginBottom: 22, transition: "all .35s", background: hov ? gradCyan : "rgba(0,191,255,0.1)", color: hov ? "#fff" : C.cyan, transform: hov ? "scale(1.08)" : "none" }}>
        <i className={icon} />
      </div>
      <h3 style={{ fontFamily: "'Sora',sans-serif", fontSize: 17, fontWeight: 700, color: C.navy, marginBottom: 10 }}>{title}</h3>
      <p style={{ fontSize: 13, color: C.textMuted, lineHeight: 1.75, marginBottom: 18 }}>{desc}</p>
      <a href="#contact" style={{ fontSize: 12, fontWeight: 700, color: C.cyan, textDecoration: "none", fontFamily: "'Sora',sans-serif", textTransform: "uppercase", letterSpacing: ".5px", display: "inline-flex", alignItems: "center", gap: 6 }}>
        Get Started <i className="fas fa-arrow-right" />
      </a>
    </div>
  );
}

function PricingCard({ data }) {
  const [hov, setHov] = useState(false);
  const { plan, price, period, desc, features, featured } = data;
  return (
    <div onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ borderRadius: 14, padding: "38px 30px", position: "relative", overflow: "hidden", background: featured ? gradNavy : "#fff", border: `1px solid ${featured ? C.cyan : "rgba(0,191,255,0.12)"}`, boxShadow: featured ? "0 16px 48px rgba(0,191,255,0.25)" : hov ? shadowMd : shadowCard, transform: featured ? "scale(1.04)" : hov ? "translateY(-6px)" : "none", transition: "all .35s" }}>
      {featured && <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 4, background: gradCyan }} />}
      {featured && <span style={{ position: "absolute", top: 18, right: 18, background: gradCyan, color: "#fff", fontSize: 10, fontWeight: 700, padding: "4px 12px", borderRadius: 50, textTransform: "uppercase", letterSpacing: 1 }}>Most Popular</span>}
      <div style={{ fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: 2, color: C.cyan, marginBottom: 10 }}>{plan}</div>
      <div style={{ fontFamily: "'Sora',sans-serif", fontSize: 46, fontWeight: 800, color: featured ? "#fff" : C.navy, lineHeight: 1, marginBottom: 6 }}>
        {price}<small style={{ fontSize: 15, fontWeight: 400, color: featured ? "rgba(255,255,255,0.5)" : C.textMuted }}>{period}</small>
      </div>
      <p style={{ fontSize: 13, color: featured ? "rgba(255,255,255,0.65)" : C.textMuted, marginBottom: 24 }}>{desc}</p>
      <ul style={{ listStyle: "none", marginBottom: 28, display: "flex", flexDirection: "column", gap: 10 }}>
        {features.map((f, i) => (
          <li key={i} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 13, color: f.ok ? (featured ? "rgba(255,255,255,0.85)" : C.textDark) : (featured ? "rgba(255,255,255,0.3)" : "rgba(100,100,100,0.5)") }}>
            <i className={f.ok ? "fas fa-check" : "fas fa-times"} style={{ color: f.ok ? C.cyan : "rgba(150,150,150,0.5)", fontSize: 12 }} />
            {f.text}
          </li>
        ))}
      </ul>
      <a href="#contact" style={{ display: "block", textAlign: "center", padding: "13px", borderRadius: 9, fontWeight: 700, fontSize: 13, textDecoration: "none", fontFamily: "'Sora',sans-serif", background: featured ? gradCyan : "transparent", color: featured ? "#fff" : C.cyan, border: featured ? "none" : `2px solid rgba(0,191,255,0.4)`, boxShadow: featured ? "0 6px 20px rgba(0,191,255,0.4)" : "none" }}>Get Started</a>
    </div>
  );
}

function TeamCard({ member }) {
  const [hov, setHov] = useState(false);
  return (
    <div onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ borderRadius: 14, overflow: "hidden", boxShadow: hov ? shadowMd : shadowCard, border: "1px solid rgba(0,191,255,0.08)", transform: hov ? "translateY(-8px)" : "none", transition: "all .35s" }}>
      <div style={{ position: "relative" }}>
        <div style={{ height: 220, background: member.bg, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <i className={member.icon} style={{ fontSize: 80, color: member.iconColor, opacity: 0.5 }} />
        </div>
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg,transparent 40%,rgba(7,28,60,0.85) 100%)", opacity: hov ? 1 : 0, transition: "opacity .35s", display: "flex", alignItems: "flex-end", justifyContent: "center", paddingBottom: 18, gap: 10 }}>
          {["fab fa-linkedin-in", "fab fa-twitter", "fas fa-envelope"].map((ic, i) => (
            <a key={i} href="#" style={{ width: 34, height: 34, background: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.3)", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", textDecoration: "none", fontSize: 13 }}><i className={ic} /></a>
          ))}
        </div>
      </div>
      <div style={{ padding: "18px", background: "#fff", textAlign: "center" }}>
        <h3 style={{ fontFamily: "'Sora',sans-serif", fontSize: 15, fontWeight: 700, color: C.navy, marginBottom: 4 }}>{member.name}</h3>
        <p style={{ fontSize: 12, color: C.cyan, fontWeight: 600, textTransform: "uppercase", letterSpacing: 1 }}>{member.role}</p>
      </div>
    </div>
  );
}

function BlogCard({ post }) {
  const [hov, setHov] = useState(false);
  return (
    <div onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ background: "#fff", borderRadius: 14, overflow: "hidden", boxShadow: hov ? shadowMd : shadowCard, border: "1px solid rgba(0,191,255,0.08)", transform: hov ? "translateY(-6px)" : "none", transition: "all .35s" }}>
      <div style={{ height: 180, background: post.bg, position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <i className={post.icon} style={{ fontSize: 55, color: post.iconColor, opacity: 0.3 }} />
        <span style={{ position: "absolute", top: 14, left: 14, background: gradCyan, color: "#fff", fontSize: 10, fontWeight: 700, padding: "4px 12px", borderRadius: 50, textTransform: "uppercase", letterSpacing: 1 }}>{post.cat}</span>
      </div>
      <div style={{ padding: 20 }}>
        <div style={{ display: "flex", gap: 14, fontSize: 12, color: C.textMuted, marginBottom: 8 }}>
          <span><i className="fas fa-calendar" style={{ color: C.cyan, marginRight: 4 }} />{post.date}</span>
          <span><i className="fas fa-user" style={{ color: C.cyan, marginRight: 4 }} />{post.author}</span>
        </div>
        <h3 style={{ fontFamily: "'Sora',sans-serif", fontSize: 14, fontWeight: 700, color: C.navy, lineHeight: 1.4, marginBottom: 8 }}>{post.title}</h3>
        <p style={{ fontSize: 12, color: C.textMuted, lineHeight: 1.7, marginBottom: 14 }}>{post.desc}</p>
        <a href="#" style={{ fontSize: 12, fontWeight: 700, color: C.cyan, textDecoration: "none", fontFamily: "'Sora',sans-serif", textTransform: "uppercase", letterSpacing: ".5px", display: "inline-flex", alignItems: "center", gap: 6 }}>Read More <i className="fas fa-arrow-right" /></a>
      </div>
    </div>
  );
}

function Field({ label, placeholder, type, style }) {
  const [focused, setFocused] = useState(false);
  return (
    <div style={style}>
      <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: C.navy, marginBottom: 7, textTransform: "uppercase", letterSpacing: ".5px", fontFamily: "'Sora',sans-serif" }}>{label}</label>
      <input type={type} placeholder={placeholder} onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
        style={{ width: "100%", padding: "12px 14px", border: `1.5px solid ${focused ? C.cyan : "rgba(0,191,255,0.2)"}`, borderRadius: 9, fontSize: 13, fontFamily: "'DM Sans',sans-serif", color: C.textDark, background: "#fff", outline: "none", boxShadow: focused ? "0 0 0 4px rgba(0,191,255,0.1)" : "none", transition: "all .2s" }} />
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
    // Inject fonts + FA
    if (!document.getElementById("fa-cdn")) {
      const l = document.createElement("link"); l.id = "fa-cdn"; l.rel = "stylesheet";
      l.href = "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css";
      document.head.appendChild(l);
    }
    if (!document.getElementById("gfonts")) {
      const l = document.createElement("link"); l.id = "gfonts"; l.rel = "stylesheet";
      l.href = "https://fonts.googleapis.com/css2?family=Sora:wght@300;400;600;700;800&family=DM+Sans:wght@300;400;500;600&display=swap";
      document.head.appendChild(l);
    }
    // Inject responsive CSS
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

  // Lock body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", color: C.textDark, background: "#fff", overflowX: "hidden", width: "100%" }}>

      {/* ── MOBILE MENU ── */}
      <div className={`mobile-menu ${mobileOpen ? "open" : ""}`}>
        <button className="mobile-close" onClick={() => setMobileOpen(false)}>
          <i className="fas fa-times" />
        </button>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 32 }}>
          <div style={{ width: 42, height: 42, background: gradCyan, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Sora',sans-serif", fontSize: 20, fontWeight: 800, color: "#fff" }}>T</div>
          <div style={{ lineHeight: 1.1 }}>
            <div style={{ fontFamily: "'Sora',sans-serif", fontSize: 18, fontWeight: 800, color: "#fff" }}>Tranova</div>
            <div style={{ fontSize: 9, color: C.cyan, textTransform: "uppercase", letterSpacing: 2, fontWeight: 700 }}>Digital Technologies</div>
          </div>
        </div>
        {["About", "Services", "Pricing", "Team", "Blog", "Contact"].map(item => (
          <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setMobileOpen(false)}>
            <i className={`fas fa-chevron-right`} style={{ fontSize: 14, color: C.cyan }} />{item}
          </a>
        ))}
        <a href="#contact" className="mobile-cta" onClick={() => setMobileOpen(false)}>
          <i className="fas fa-rocket" style={{ marginRight: 8 }} />Start a Project
        </a>
        <div style={{ display: "flex", gap: 12, marginTop: 24, justifyContent: "center" }}>
          {["fab fa-linkedin-in","fab fa-twitter","fab fa-instagram","fab fa-youtube","fab fa-whatsapp"].map((ic,i) => (
            <a key={i} href="#" style={{ width: 38, height: 38, borderRadius: 9, border: "1px solid rgba(255,255,255,0.15)", display: "flex", alignItems: "center", justifyContent: "center", color: "rgba(255,255,255,0.6)", fontSize: 14, textDecoration: "none" }}><i className={ic} /></a>
          ))}
        </div>
      </div>

      {/* ── TOP BAR ── */}
      <div className="topbar" style={{ background: C.navy, color: "#a8c4e0", fontSize: 12, padding: "7px 0", width: "100%" }}>
        <div style={{ maxWidth: 1200, margin: "auto", padding: "0 24px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
          <div>
            <i className="fas fa-phone-alt" style={{ color: C.cyan, marginRight: 6 }} />+91 8897XXXXXX &nbsp;|&nbsp;
            <i className="fas fa-envelope" style={{ color: C.cyan, marginRight: 6 }} />hello@tranovadigital.com
          </div>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {["fab fa-linkedin-in","fab fa-twitter","fab fa-instagram","fab fa-youtube"].map((ic,i) => (
              <a key={i} href="#" style={{ color: "#a8c4e0", fontSize: 11, padding: "2px 7px", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 4, textDecoration: "none" }}><i className={ic} /></a>
            ))}
            <a href="#contact" style={{ background: "rgba(0,191,255,0.15)", border: "1px solid rgba(0,191,255,0.3)", padding: "3px 12px", borderRadius: 4, color: C.cyan, textDecoration: "none", fontWeight: 600, fontSize: 11 }}>Get Free Quote</a>
          </div>
        </div>
      </div>

      {/* ── NAVBAR ── */}
      <nav style={{ position: "sticky", top: 0, zIndex: 1000, background: gradNavy, backdropFilter: "blur(20px)", borderBottom: "1px solid rgba(0,191,255,0.15)", boxShadow: scrolled ? "0 4px 30px rgba(7,28,60,0.4)" : "0 2px 20px rgba(7,28,60,0.2)", transition: "all .3s", width: "100%" }}>
        <div style={{ maxWidth: 1200, margin: "auto", padding: "0 20px", display: "flex", justifyContent: "space-between", alignItems: "center", height: 68 }}>
          {/* Logo */}
          <a href="#" style={{ display: "flex", alignItems: "center", gap: 11, textDecoration: "none" }}>
            <div style={{ width: 40, height: 40, background: gradCyan, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Sora',sans-serif", fontSize: 19, fontWeight: 800, color: "#fff", boxShadow: "0 4px 16px rgba(0,191,255,0.4)" }}>T</div>
            <div style={{ lineHeight: 1.1 }}>
              <div style={{ fontFamily: "'Sora',sans-serif", fontSize: 18, fontWeight: 800, color: "#fff", letterSpacing: "-0.5px" }}>Tranova</div>
              <div style={{ fontSize: 9, color: C.cyan, textTransform: "uppercase", letterSpacing: 2, fontWeight: 700 }}>Digital Technologies</div>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <div className="nav-desktop-links" style={{ display: "flex", gap: 26 }}>
            {["About","Services","Pricing","Team","Blog","Contact"].map(item => (
              <a key={item} href={`#${item.toLowerCase()}`}
                style={{ fontSize: 14, fontWeight: 500, color: "rgba(255,255,255,0.8)", textDecoration: "none", transition: "color .2s", fontFamily: "'DM Sans',sans-serif" }}
                onMouseEnter={e => e.target.style.color = C.cyan}
                onMouseLeave={e => e.target.style.color = "rgba(255,255,255,0.8)"}>{item}</a>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="nav-desktop-btn">
            <BtnPrimary href="#contact">Start a Project →</BtnPrimary>
          </div>

          {/* Hamburger */}
          <button className="hamburger" onClick={() => setMobileOpen(true)} aria-label="Open menu">
            <span style={{ background: "#fff" }} />
            <span style={{ background: "#fff" }} />
            <span style={{ background: "#fff" }} />
          </button>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section id="home" style={{ position: "relative", minHeight: "90vh", display: "flex", alignItems: "center", background: `linear-gradient(135deg, ${C.navy} 0%, ${C.navyMid} 50%, #0a2040 100%)`, overflow: "hidden", width: "100%" }}>
        <div style={{ position: "absolute", inset: 0, opacity: 0.06, backgroundImage: "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.8) 1px, transparent 0)", backgroundSize: "40px 40px" }} />
        <div style={{ position: "absolute", top: -100, right: -100, width: 600, height: 600, borderRadius: "50%", background: "radial-gradient(circle, rgba(0,191,255,0.18) 0%, transparent 70%)" }} />
        <div style={{ position: "absolute", bottom: -200, left: -100, width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(25,181,254,0.12) 0%, transparent 70%)" }} />

        <div className="hero-grid" style={{ maxWidth: 1200, margin: "auto", padding: "80px 24px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 70, alignItems: "center", position: "relative", zIndex: 2, width: "100%" }}>
          <div>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(0,191,255,0.15)", border: "1px solid rgba(0,191,255,0.3)", padding: "7px 14px", borderRadius: 50, fontSize: 12, color: C.cyan, fontWeight: 600, marginBottom: 20, letterSpacing: ".5px" }}>
              <span style={{ width: 6, height: 6, background: C.cyan, borderRadius: "50%", animation: "pulse 2s infinite" }} />
              Hyderabad's Leading Digital Agency
            </div>
            <h1 className="hero-title" style={{ fontFamily: "'Sora',sans-serif", fontSize: "clamp(32px,4vw,56px)", fontWeight: 800, color: "#fff", lineHeight: 1.1, marginBottom: 20, letterSpacing: "-1.5px" }}>
              Creative &amp; <span style={{ color: C.cyan }}>Innovative</span><br />Digital Solution
            </h1>
            <p style={{ fontSize: 15, color: "rgba(255,255,255,0.7)", lineHeight: 1.8, marginBottom: 28, maxWidth: 460 }}>
              From mobile apps and web platforms to AI development, digital marketing, and brand growth — Tranova delivers end-to-end technology solutions under one roof.
            </p>
            <div className="hero-btns" style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
              <BtnPrimary href="#services"><i className="fas fa-rocket" /> Explore Services</BtnPrimary>
              <BtnOutline href="#about"><i className="fas fa-play-circle" /> Watch Story</BtnOutline>
            </div>

            {/* Mobile Stats Pills */}
            <div style={{ display: "flex", gap: 12, marginTop: 32, flexWrap: "wrap" }}>
              {[["50+","Projects"],["200+","Clients"],["3+","Years"]].map(([n,l]) => (
                <div key={l} style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(0,191,255,0.2)", borderRadius: 10, padding: "10px 16px", textAlign: "center" }}>
                  <div style={{ fontFamily: "'Sora',sans-serif", fontSize: 20, fontWeight: 800, color: C.cyan }}>{n}</div>
                  <div style={{ fontSize: 11, color: "rgba(255,255,255,0.6)", marginTop: 2 }}>{l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Hero Visual — hidden on mobile via CSS */}
          <div className="hero-visual" style={{ position: "relative" }}>
            <div style={{ borderRadius: 20, overflow: "hidden", boxShadow: "0 30px 80px rgba(0,0,0,0.4)", border: "2px solid rgba(0,191,255,0.2)" }}>
              <div style={{ width: "100%", height: 380, background: `linear-gradient(135deg, ${C.navyMid} 0%, #0a3060 50%, ${C.navy} 100%)`, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 16 }}>
                <i className="fas fa-city" style={{ fontSize: 90, color: "rgba(0,191,255,0.2)" }} />
                <p style={{ color: "rgba(255,255,255,0.25)", fontSize: 13 }}>Tranova Team at Work</p>
              </div>
            </div>
            <div style={{ position: "absolute", bottom: -22, left: -22, background: "#fff", borderRadius: 14, padding: "14px 18px", boxShadow: "0 8px 32px rgba(0,0,0,0.2)", display: "flex", alignItems: "center", gap: 12, border: "1px solid rgba(0,191,255,0.15)" }}>
              <div style={{ width: 42, height: 42, background: gradCyan, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 17 }}><i className="fas fa-star" /></div>
              <div>
                <strong style={{ display: "block", fontFamily: "'Sora',sans-serif", fontSize: 18, fontWeight: 800, color: C.navy }}>50+ Projects</strong>
                <span style={{ fontSize: 11, color: C.textMuted }}>Successfully Delivered</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <div ref={statsRef} className="stats-row" style={{ maxWidth: 1200, margin: "-44px auto 0", padding: "0 24px", display: "grid", gridTemplateColumns: "repeat(4,1fr)", position: "relative", zIndex: 10 }}>
        {stats.map((s, i) => (
          <div key={i} className="stat-box" style={{ background: gradNavy, padding: "26px 18px", textAlign: "center", borderRadius: i===0?"14px 0 0 14px":i===3?"0 14px 14px 0":0, borderRight: i<3?"1px solid rgba(255,255,255,0.06)":"none", position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: gradCyan }} />
            <i className={s.icon} style={{ fontSize: 24, color: C.cyan, marginBottom: 7, display: "block" }} />
            <div style={{ fontFamily: "'Sora',sans-serif", fontSize: 30, fontWeight: 800, color: "#fff", lineHeight: 1, marginBottom: 4 }}>
              {i===3?(counted?"24/7":"0"):(counted?counts[i]+"+":"0+")}
            </div>
            <div style={{ fontSize: 11, color: "rgba(255,255,255,0.5)", textTransform: "uppercase", letterSpacing: 1, fontWeight: 500 }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* ── CLIENTS ── */}
      <div style={{ background: C.grayLight, padding: "48px 0", borderBottom: "1px solid rgba(0,191,255,0.08)", marginTop: 48, width: "100%" }}>
        <div style={{ maxWidth: 1200, margin: "auto", padding: "0 24px", textAlign: "center" }}>
          <p style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: 2, color: C.textMuted, marginBottom: 28 }}>Trusted by Companies Across India</p>
          <div style={{ display: "flex", gap: 28, alignItems: "center", justifyContent: "center", flexWrap: "wrap" }}>
            {["GrabzoMart","RealEstate CRM","PayrollPro","DigitalLeads","AppStudio","TechBrand"].map(name => (
              <span key={name} style={{ fontFamily: "'Sora',sans-serif", fontSize: 16, fontWeight: 800, color: "rgba(7,28,60,0.2)", letterSpacing: "-0.5px", cursor: "default", transition: "color .3s" }}
                onMouseEnter={e => e.target.style.color = C.cyan}
                onMouseLeave={e => e.target.style.color = "rgba(7,28,60,0.2)"}>{name}</span>
            ))}
          </div>
        </div>
      </div>

      {/* ── ABOUT ── */}
      <section id="about" className="section-pad" style={{ background: C.grayLight, padding: "88px 0", width: "100%" }}>
        <div className="about-grid" style={{ maxWidth: 1200, margin: "auto", padding: "0 24px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center" }}>
          <div className="about-img-col" style={{ position: "relative" }}>
            <div style={{ borderRadius: 20, overflow: "hidden", boxShadow: "0 20px 60px rgba(7,28,60,0.15)" }}>
              <div style={{ width: "100%", height: 420, background: `linear-gradient(135deg,${C.grayMid},#dbeeff)`, display: "flex", alignItems: "center", justifyContent: "center", borderRadius: 20 }}>
                <i className="fas fa-handshake" style={{ fontSize: 100, color: "rgba(0,191,255,0.22)" }} />
              </div>
            </div>
            <div style={{ position: "absolute", bottom: -16, right: -16, background: gradCyan, color: "#fff", borderRadius: 14, padding: "16px 20px", textAlign: "center", boxShadow: "0 8px 30px rgba(0,191,255,0.4)" }}>
              <div style={{ fontFamily: "'Sora',sans-serif", fontSize: 32, fontWeight: 800, lineHeight: 1 }}>3+</div>
              <div style={{ fontSize: 10, fontWeight: 600, opacity: .85, marginTop: 4 }}>Years of<br />Excellence</div>
            </div>
          </div>
          <div>
            <SectionTag>About Tranova</SectionTag>
            <SectionTitle>The Best IT Solution With <span style={{ color: C.cyan }}>Expert Experience</span></SectionTitle>
            <p style={{ color: C.textMuted, fontSize: 14, lineHeight: 1.8, marginBottom: 20 }}>Tranova Digital Technologies is a full-service IT company based in Hyderabad offering development, digital marketing, AI integration, and brand building — all under one roof. We help startups and businesses scale digitally.</p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, margin: "20px 0 28px" }}>
              {["Android & iOS App Development","Web Development (React, FastAPI)","AI & Automation Development","Digital Marketing & Lead Gen","PostgreSQL & Cloud Hosting","Brand Promotion & Content"].map(f => (
                <div key={f} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, fontWeight: 500, color: C.textDark }}>
                  <i className="fas fa-check-circle" style={{ color: C.cyan, fontSize: 14, flexShrink: 0 }} />{f}
                </div>
              ))}
            </div>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <BtnPrimary href="#services"><i className="fas fa-arrow-right" /> Our Services</BtnPrimary>
              <BtnOutline href="#contact" dark><i className="fas fa-phone" /> Contact Us</BtnOutline>
            </div>
          </div>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section id="services" className="section-pad" style={{ background: "#fff", padding: "88px 0", width: "100%" }}>
        <div style={{ maxWidth: 1200, margin: "auto", padding: "0 24px" }}>
          <div style={{ textAlign: "center", marginBottom: 50 }}>
            <SectionTag>What We Do</SectionTag>
            <SectionTitle>All-in-One <span style={{ color: C.cyan }}>Digital Services</span></SectionTitle>
            <p style={{ fontSize: 14, color: C.textMuted, lineHeight: 1.8, maxWidth: 520, margin: "0 auto" }}>One platform where technology meets marketing — complete digital solutions under one roof.</p>
          </div>
          <div className="services-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 22 }}>
            {services.map((s,i) => <ServiceCard key={i} {...s} />)}
          </div>
        </div>
      </section>

      {/* ── TECH STACK ── */}
      <div style={{ background: C.grayLight, padding: "56px 0", width: "100%" }}>
        <div style={{ maxWidth: 1200, margin: "auto", padding: "0 24px" }}>
          <div style={{ textAlign: "center", marginBottom: 36 }}>
            <SectionTag>Technology</SectionTag>
            <SectionTitle>Powered by <span style={{ color: C.cyan }}>Modern Tech Stack</span></SectionTitle>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10, justifyContent: "center" }}>
            {techStack.map((t,i) => {
              const [hov, setHov] = useState(false);
              return (
                <div key={i} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
                  style={{ background: hov ? "linear-gradient(135deg,rgba(0,191,255,0.1),rgba(25,181,254,0.15))" : "#fff", border: `1px solid ${hov ? C.cyan : "rgba(0,191,255,0.15)"}`, color: C.navy, padding: "9px 18px", borderRadius: 50, fontSize: 12, fontWeight: 600, display: "flex", alignItems: "center", gap: 7, transition: "all .3s", cursor: "default", transform: hov ? "translateY(-2px)" : "none" }}>
                  <i className={t.icon} style={{ color: C.cyan, fontSize: 13 }} />{t.label}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── PRICING ── */}
      <section id="pricing" className="section-pad" style={{ background: "#fff", padding: "88px 0", width: "100%" }}>
        <div style={{ maxWidth: 1200, margin: "auto", padding: "0 24px" }}>
          <div style={{ textAlign: "center", marginBottom: 50 }}>
            <SectionTag>Pricing Plans</SectionTag>
            <SectionTitle>Competitive Prices <span style={{ color: C.cyan }}>For Our Clients</span></SectionTitle>
            <p style={{ fontSize: 14, color: C.textMuted, lineHeight: 1.8, maxWidth: 520, margin: "0 auto" }}>All-in-one service at industry-low costs. One plan includes both development AND promotion.</p>
          </div>
          <div className="pricing-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 22, alignItems: "center" }}>
            {pricing.map((p,i) => <PricingCard key={i} data={p} />)}
          </div>
        </div>
      </section>

      {/* ── TEAM ── */}
      <section id="team" className="section-pad" style={{ background: C.grayLight, padding: "88px 0", width: "100%" }}>
        <div style={{ maxWidth: 1200, margin: "auto", padding: "0 24px" }}>
          <div style={{ textAlign: "center", marginBottom: 50 }}>
            <SectionTag>Our Team</SectionTag>
            <SectionTitle>Professional Team Ready to <span style={{ color: C.cyan }}>Help Your Business</span></SectionTitle>
          </div>
          <div className="team-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 22 }}>
            {team.map((m,i) => <TeamCard key={i} member={m} />)}
          </div>
        </div>
      </section>

      {/* ── BLOG ── */}
      <section id="blog" className="section-pad" style={{ background: "#fff", padding: "88px 0", width: "100%" }}>
        <div style={{ maxWidth: 1200, margin: "auto", padding: "0 24px" }}>
          <div style={{ textAlign: "center", marginBottom: 50 }}>
            <SectionTag>Latest Articles</SectionTag>
            <SectionTitle>Read The Latest From <span style={{ color: C.cyan }}>Our Blog</span></SectionTitle>
          </div>
          <div className="blog-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 22 }}>
            {blogs.map((b,i) => <BlogCard key={i} post={b} />)}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <div style={{ background: `linear-gradient(135deg,${C.navy} 0%, #0a2856 50%, ${C.navy} 100%)`, padding: "64px 0", position: "relative", overflow: "hidden", width: "100%" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle at 1px 1px,rgba(255,255,255,0.04) 1px,transparent 0)", backgroundSize: "28px 28px" }} />
        <div className="cta-banner-inner" style={{ maxWidth: 1200, margin: "auto", padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 28, position: "relative", zIndex: 1, flexWrap: "wrap" }}>
          <div>
            <h2 style={{ fontFamily: "'Sora',sans-serif", fontSize: "clamp(20px,2.5vw,32px)", fontWeight: 800, color: "#fff", lineHeight: 1.2, letterSpacing: "-0.5px" }}>
              Need a Free Quote? Feel Free to <span style={{ color: C.cyan }}>Contact Us</span>
            </h2>
            <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 13, marginTop: 7 }}>Get expert consultation — no hidden charges, transparent pricing.</p>
          </div>
          <div className="cta-btns" style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <BtnPrimary href="#contact"><i className="fas fa-paper-plane" /> Get Free Quote</BtnPrimary>
            <BtnOutline href="tel:+918897000000"><i className="fas fa-phone" /> Call Now</BtnOutline>
          </div>
        </div>
      </div>

      {/* ── CONTACT ── */}
      <section id="contact" className="section-pad" style={{ background: C.grayLight, padding: "88px 0", width: "100%" }}>
        <div className="contact-grid" style={{ maxWidth: 1200, margin: "auto", padding: "0 24px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "start" }}>
          <div>
            <SectionTag>Get In Touch</SectionTag>
            <SectionTitle>Let's Build Something <span style={{ color: C.cyan }}>Amazing Together</span></SectionTitle>
            <p style={{ color: C.textMuted, fontSize: 13, lineHeight: 1.8, marginBottom: 32 }}>Whether you need a startup website, mobile app, AI system, or a full digital marketing campaign — Tranova is your all-in-one technology partner.</p>
            {[
              { icon: "fas fa-map-marker-alt", title: "Our Location", text: "Hyderabad, Telangana, India – 500047" },
              { icon: "fas fa-phone-alt", title: "Phone Number", text: "+91 8897XXXXXX\nMon – Sat: 9AM to 7PM" },
              { icon: "fas fa-envelope", title: "Email Address", text: "hello@tranovadigital.com\nsupport@tranovadigital.com" },
              { icon: "fab fa-whatsapp", title: "WhatsApp", text: "Instant chat support available\nfor project inquiries" },
            ].map((item,i) => (
              <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 12, marginBottom: 20 }}>
                <div style={{ width: 44, height: 44, borderRadius: 11, background: "linear-gradient(135deg,rgba(0,191,255,0.1),rgba(25,181,254,0.15))", border: "1px solid rgba(0,191,255,0.2)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, color: C.cyan, flexShrink: 0 }}>
                  <i className={item.icon} />
                </div>
                <div>
                  <h4 style={{ fontFamily: "'Sora',sans-serif", fontSize: 12, fontWeight: 700, color: C.navy, marginBottom: 3, textTransform: "uppercase", letterSpacing: ".5px" }}>{item.title}</h4>
                  <p style={{ fontSize: 13, color: C.textMuted, lineHeight: 1.6, whiteSpace: "pre-line" }}>{item.text}</p>
                </div>
              </div>
            ))}
          </div>
          <div style={{ background: "#fff", borderRadius: 20, padding: "32px", border: "1px solid rgba(0,191,255,0.1)", boxShadow: shadowCard }}>
            <h3 style={{ fontFamily: "'Sora',sans-serif", fontSize: 19, fontWeight: 700, color: C.navy, marginBottom: 22 }}>Send Us a Message</h3>
            <div className="form-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 14 }}>
              <Field label="Your Name" placeholder="John Doe" type="text" />
              <Field label="Phone Number" placeholder="+91 XXXXXXXXXX" type="tel" />
            </div>
            <Field label="Email Address" placeholder="you@company.com" type="email" style={{ marginBottom: 14 }} />
            <div style={{ marginBottom: 14 }}>
              <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: C.navy, marginBottom: 7, textTransform: "uppercase", letterSpacing: ".5px", fontFamily: "'Sora',sans-serif" }}>Service Required</label>
              <select style={{ width: "100%", padding: "11px 13px", border: "1.5px solid rgba(0,191,255,0.2)", borderRadius: 9, fontSize: 13, fontFamily: "'DM Sans',sans-serif", color: C.textDark, background: "#fff", outline: "none" }}>
                {["Select a Service","Web Development","Mobile App Development","AI Development","Digital Marketing","Brand Promotion","CRM / ERP System","Full Digital Package"].map(o => <option key={o}>{o}</option>)}
              </select>
            </div>
            <div style={{ marginBottom: 18 }}>
              <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: C.navy, marginBottom: 7, textTransform: "uppercase", letterSpacing: ".5px", fontFamily: "'Sora',sans-serif" }}>Your Message</label>
              <textarea placeholder="Describe your project or requirement..." style={{ width: "100%", padding: "11px 13px", border: "1.5px solid rgba(0,191,255,0.2)", borderRadius: 9, fontSize: 13, fontFamily: "'DM Sans',sans-serif", color: C.textDark, background: "#fff", outline: "none", resize: "vertical", minHeight: 100 }} />
            </div>
            <button onClick={() => { setFormSent(true); setTimeout(() => setFormSent(false), 3500); }}
              style={{ background: formSent ? "linear-gradient(135deg,#28a745,#20c050)" : gradCyan, color: "#fff", padding: "13px", border: "none", borderRadius: 9, fontWeight: 700, fontSize: 14, cursor: "pointer", fontFamily: "'Sora',sans-serif", boxShadow: "0 6px 24px rgba(0,191,255,0.4)", transition: "all .3s", width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
              <i className={formSent ? "fas fa-check" : "fas fa-paper-plane"} />
              {formSent ? "Message Sent! We'll contact you soon." : "Send Message Now"}
            </button>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ background: C.navy, color: "rgba(255,255,255,0.7)", padding: "64px 0 0", width: "100%" }}>
        <div style={{ maxWidth: 1200, margin: "auto", padding: "0 24px" }}>
          <div className="footer-grid" style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: 40, marginBottom: 44 }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 11, marginBottom: 16 }}>
                <div style={{ width: 40, height: 40, background: gradCyan, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Sora',sans-serif", fontSize: 18, fontWeight: 800, color: "#fff" }}>T</div>
                <div style={{ lineHeight: 1.1 }}>
                  <div style={{ fontFamily: "'Sora',sans-serif", fontSize: 17, fontWeight: 800, color: "#fff" }}>Tranova</div>
                  <div style={{ fontSize: 9, color: C.cyan, textTransform: "uppercase", letterSpacing: 2, fontWeight: 700 }}>Digital Technologies</div>
                </div>
              </div>
              <p style={{ fontSize: 13, lineHeight: 1.8, color: "rgba(255,255,255,0.5)", marginBottom: 20, maxWidth: 260 }}>All-in-one digital technology company offering web, mobile, AI, and marketing solutions from Hyderabad.</p>
              <div style={{ display: "flex", gap: 7 }}>
                {["fab fa-linkedin-in","fab fa-twitter","fab fa-instagram","fab fa-youtube","fab fa-whatsapp"].map((ic,i) => (
                  <a key={i} href="#" style={{ width: 34, height: 34, borderRadius: 8, border: "1px solid rgba(255,255,255,0.12)", display: "flex", alignItems: "center", justifyContent: "center", color: "rgba(255,255,255,0.5)", fontSize: 13, textDecoration: "none", transition: "all .2s" }}
                    onMouseEnter={e => { e.currentTarget.style.background = C.cyan; e.currentTarget.style.color = "#fff"; }}
                    onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "rgba(255,255,255,0.5)"; }}>
                    <i className={ic} />
                  </a>
                ))}
              </div>
            </div>
            {[
              { title: "Services", links: ["Web Development","Mobile App Dev","AI Development","Digital Marketing","Brand Promotion","CRM Systems"] },
              { title: "Company", links: ["About Tranova","Our Team","Portfolio","Blog & Articles","Careers","Contact Us"] },
              { title: "Projects", links: ["GrabzoMart App","Real Estate CRM","Payroll System","AI Chatbots","Lead Gen Tools","E-Commerce Sites"] },
            ].map(col => (
              <div key={col.title}>
                <h4 style={{ fontFamily: "'Sora',sans-serif", fontSize: 13, fontWeight: 700, color: "#fff", marginBottom: 16, paddingBottom: 9, position: "relative" }}>
                  {col.title}
                  <span style={{ position: "absolute", bottom: 0, left: 0, width: 24, height: 2, background: C.cyan, borderRadius: 2, display: "block" }} />
                </h4>
                <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 9 }}>
                  {col.links.map(link => (
                    <li key={link}><a href="#" style={{ fontSize: 12, color: "rgba(255,255,255,0.5)", textDecoration: "none", transition: "color .2s", display: "inline-flex", alignItems: "center", gap: 4 }}
                      onMouseEnter={e => e.currentTarget.style.color = C.cyan}
                      onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,0.5)"}>
                      <span style={{ color: C.cyan, fontWeight: 700 }}>›</span>{link}
                    </a></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="footer-bottom" style={{ borderTop: "1px solid rgba(255,255,255,0.08)", padding: "18px 0", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
            <p style={{ fontSize: 12, color: "rgba(255,255,255,0.35)" }}>© 2025 <a href="#" style={{ color: C.cyan, textDecoration: "none" }}>Tranova Digital Technologies</a>. All rights reserved. | Built with ❤️ in Hyderabad</p>
            <div style={{ display: "flex", gap: 14 }}>
              <a href="#" style={{ fontSize: 12, color: "rgba(255,255,255,0.35)", textDecoration: "none" }}>Privacy Policy</a>
              <a href="#" style={{ fontSize: 12, color: "rgba(255,255,255,0.35)", textDecoration: "none" }}>Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>

      {/* ── SCROLL TOP ── */}
      {showTop && (
        <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          style={{ position: "fixed", bottom: 24, right: 24, width: 44, height: 44, background: gradCyan, color: "#fff", border: "none", borderRadius: 10, fontSize: 15, cursor: "pointer", boxShadow: "0 6px 20px rgba(0,191,255,0.4)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 999 }}>
          <i className="fas fa-chevron-up" />
        </button>
      )}
    </div>
  );
}
