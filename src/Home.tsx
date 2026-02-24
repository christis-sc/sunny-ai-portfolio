const projects = [
  {
    title: "AI Portfolio Assistant",
    subtitle: "Interactive chatbot that answers questions about my background",
    impact: "Improves engagement by letting visitors explore my profile through chat",
    stack: ["React", "TypeScript", "Vercel", "AI Logic"],
    features: ["Intent detection", "Quick actions", "Mobile-friendly UI"],
  },
  {
    title: "Donut Shop Calculator",
    subtitle: "Order calculator with totals, tax, and summary",
    impact: "Demonstrates clean UI + state management in React",
    stack: ["React", "Vite", "CSS"],
    features: ["Live totals", "Validation", "Responsive layout"],
  },
  {
    title: "Car/Bike Marketplace",
    subtitle: "Marketplace-style browsing experience",
    impact: "Shows multi-page navigation and data-driven UI design",
    stack: ["Web App", "CRUD", "UI"],
    features: ["Listing view", "Details page", "Filtering (basic)"],
  },
  {
    title: "PHP Login System",
    subtitle: "Authentication flow: login, register, forgot password",
    impact: "Demonstrates understanding of auth and form handling",
    stack: ["PHP", "Forms", "Sessions"],
    features: ["Register/Login", "Error handling", "Password flow"],
  },
];

export default function Home() {
  return (
    <div className="container" style={{ padding: "26px 0 40px" }}>
      {/* Hero */}
      <div className="glass" style={{ padding: 18 }}>
        <div className="grid" style={{ alignItems: "center" }}>
          <div style={{ gridColumn: "span 8" as any }}>
            <h1 style={{ margin: 0, fontSize: "clamp(28px, 6vw, 52px)", fontWeight: 950 }}>
              Sunny Christian
            </h1>
            <p className="muted" style={{ marginTop: 10, fontSize: 16, lineHeight: 1.6 }}>
              Computer Science student at Kean University. I build modern web apps with React and
              AI-enhanced features.
            </p>

            <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 14 }}>
              <a className="btn-primary" href="/chat">Open AI Assistant</a>
              <a className="btn-ghost" href="#projects">See Projects</a>
            </div>

            <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 14 }}>
              <span className="badge">React</span>
              <span className="badge">TypeScript</span>
              <span className="badge">AI Chatbot</span>
              <span className="badge">Vercel Deploy</span>
            </div>
          </div>

          <div style={{ gridColumn: "span 4" as any, justifySelf: "end" }}>
            <div
              className="glass"
              style={{
                width: 130,
                height: 130,
                borderRadius: 22,
                display: "grid",
                placeItems: "center",
                background: "rgba(255,255,255,0.10)",
                fontSize: 42,
                fontWeight: 950,
                letterSpacing: 1,
              }}
            >
              SC
            </div>
          </div>
        </div>

        <style>{`
          @media (max-width: 720px){
            .grid > div{ grid-column: span 12 !important; }
            .grid > div:last-child{ justify-self: start !important; margin-top: 12px; }
          }
        `}</style>
      </div>

      {/* Projects (realistic case-study cards) */}
      <div id="projects" style={{ marginTop: 16 }} className="glass">
        <div style={{ padding: 18 }}>
          <div className="section-title">Featured Projects</div>
          <p className="muted" style={{ marginTop: 6 }}>
            Each project below includes the goal, the tech stack, and key features.
          </p>

          <div className="grid" style={{ marginTop: 10 }}>
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
                <div style={{ fontWeight: 950, fontSize: 16 }}>{p.title}</div>
                <div className="muted" style={{ marginTop: 6 }}>{p.subtitle}</div>

                <div style={{ marginTop: 12 }}>
                  <div style={{ fontWeight: 900, marginBottom: 6 }}>Why it matters</div>
                  <div className="muted" style={{ lineHeight: 1.55 }}>{p.impact}</div>
                </div>

                <div style={{ marginTop: 12 }}>
                  <div style={{ fontWeight: 900, marginBottom: 6 }}>Tech Stack</div>
                  <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                    {p.stack.map((t) => <span className="badge" key={t}>{t}</span>)}
                  </div>
                </div>

                <div style={{ marginTop: 12 }}>
                  <div style={{ fontWeight: 900, marginBottom: 6 }}>Key Features</div>
                  <ul className="muted" style={{ margin: 0, paddingLeft: 18, lineHeight: 1.6 }}>
                    {p.features.map((f) => <li key={f}>{f}</li>)}
                  </ul>
                </div>

                <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 14 }}>
                  <a className="btn-ghost" href="/chat">Demo</a>
                  <a className="btn-ghost" href="https://github.com/christis-sc/sunny-ai-portfolio" target="_blank" rel="noreferrer">
                    GitHub
                  </a>
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
          <p className="muted" style={{ margin: 0, lineHeight: 1.7 }}>
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