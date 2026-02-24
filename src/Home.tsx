const projects = [
  {
    title: "AI Chatbot Portfolio",
    desc: "Interactive chatbot that answers questions about my skills, projects, and contact info.",
    tags: ["React", "TypeScript", "AI"],
  },
  {
    title: "Donut Shop Calculator",
    desc: "React app that calculates totals, tax, and order summary.",
    tags: ["React", "UI"],
  },
  {
    title: "Car/Bike Marketplace",
    desc: "Marketplace-style app for browsing listings and details.",
    tags: ["Web App", "CRUD"],
  },
  {
    title: "PHP Login System",
    desc: "Login/Register/Forgot Password authentication flow.",
    tags: ["PHP", "Auth"],
  },
];

export default function Home() {
  return (
    <div className="container" style={{ padding: "26px 0 40px" }}>
      {/* Hero */}
      <div className="glass" style={{ padding: 18 }}>
        <div className="grid" style={{ alignItems: "center" }}>
          <div style={{ gridColumn: "span 8" as any }}>
            <h1 style={{ margin: 0, fontSize: "clamp(28px, 6vw, 48px)", fontWeight: 950 }}>
              Sunny Christian
            </h1>
            <p className="muted" style={{ marginTop: 8, fontSize: 16, lineHeight: 1.5 }}>
              Computer Science student at Kean University. I build modern web apps with React and
              AI-enhanced features.
            </p>

            <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 14 }}>
              <a className="btn-primary" href="/chat">Try the AI Chatbot</a>
              <a className="btn-ghost" href="#projects">View Projects</a>
            </div>
          </div>

          <div style={{ gridColumn: "span 4" as any, justifySelf: "end" }}>
            <div
              className="glass"
              style={{
                width: 120,
                height: 120,
                borderRadius: 18,
                display: "grid",
                placeItems: "center",
                background: "rgba(255,255,255,0.10)",
                fontSize: 40,
                fontWeight: 950,
              }}
              aria-label="Profile badge"
            >
              SC
            </div>
          </div>
        </div>
      </div>

      {/* Projects */}
      <div id="projects" style={{ marginTop: 16 }} className="glass">
        <div style={{ padding: 18 }}>
          <div className="section-title">Projects</div>
          <div className="grid">
            {projects.map((p) => (
              <div
                key={p.title}
                className="glass"
                style={{
                  gridColumn: "span 6",
                  padding: 16,
                  background: "rgba(255,255,255,0.06)",
                }}
              >
                <div style={{ fontWeight: 900, fontSize: 16 }}>{p.title}</div>
                <p className="muted" style={{ margin: "8px 0 10px", lineHeight: 1.5 }}>
                  {p.desc}
                </p>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  {p.tags.map((t) => (
                    <span
                      key={t}
                      style={{
                        padding: "6px 10px",
                        borderRadius: 999,
                        border: "1px solid rgba(255,255,255,0.14)",
                        background: "rgba(255,255,255,0.05)",
                        fontSize: 12,
                        fontWeight: 800,
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <style>{`
            @media (max-width: 720px){
              .grid > div{ grid-column: span 12 !important; }
            }
          `}</style>
        </div>
      </div>

      {/* Skills + Contact */}
      <div className="grid" style={{ marginTop: 16 }}>
        <div className="glass" style={{ gridColumn: "span 6", padding: 18 }}>
          <div className="section-title">Skills</div>
          <p className="muted" style={{ margin: 0, lineHeight: 1.6 }}>
            JavaScript • TypeScript • React • Vite • Node.js • HTML/CSS • GitHub • APIs • AI Integration
          </p>
        </div>

        <div className="glass" style={{ gridColumn: "span 6", padding: 18 }}>
          <div className="section-title">Contact</div>
          <p style={{ margin: "8px 0" }}><b>Email:</b> christis@kean.edu</p>
          <p style={{ margin: "8px 0" }}>
            <b>LinkedIn:</b>{" "}
            <a href="https://www.linkedin.com/in/sunny-christian-3a3366188" target="_blank" rel="noreferrer">
              linkedin.com/in/sunny-christian-3a3366188
            </a>
          </p>
        </div>

        <style>{`
          @media (max-width: 720px){
            .grid > div{ grid-column: span 12 !important; }
          }
        `}</style>
      </div>
    </div>
  );
}