export default function Home() {
  const cardStyle: React.CSSProperties = {
    padding: 18,
    borderRadius: 12,
    marginTop: 16,
    backgroundColor: "white",
    color: "#111", // ✅ makes text visible on white cards
  };

  return (
    <div className="container" style={{ maxWidth: 950 }}>
      <h3 style={{ fontWeight: 900, marginTop: 18 }}>Sunny Christian</h3>
      <p style={{ fontSize: 18, opacity: 0.9 }}>
        Computer Science Student | React Developer | AI-Enhanced Portfolio
      </p>

      <div className="card" style={{ ...cardStyle, marginTop: 0 }}>
        <h5 style={{ marginTop: 0, fontWeight: 800 }}>About Me</h5>
        <p>
          I’m a Computer Science student at Kean University. I build modern web apps using
          JavaScript/TypeScript, React, and APIs. This portfolio includes an AI chatbot that can
          answer questions about my skills and projects.
        </p>
      </div>

      <div id="projects" className="card" style={cardStyle}>
        <h5 style={{ marginTop: 0, fontWeight: 800 }}>Projects</h5>
        <ul style={{ marginTop: 8 }}>
          <li><b>AI Chatbot Portfolio</b> — React chatbot assistant that answers questions about me.</li>
          <li><b>Donut Shop Calculator</b> — React app for totals, tax, and order summary.</li>
          <li><b>Car/Bike Marketplace</b> — multi-page marketplace with listings.</li>
          <li><b>PHP Login System</b> — login/register/forgot-password flow.</li>
        </ul>
      </div>

      <div id="skills" className="card" style={cardStyle}>
        <h5 style={{ marginTop: 0, fontWeight: 800 }}>Skills</h5>
        <p>
          JavaScript • TypeScript • React • Vite • Node.js • HTML/CSS • GitHub • APIs • AI Integration
        </p>
      </div>

      <div id="contact" className="card" style={cardStyle}>
        <h5 style={{ marginTop: 0, fontWeight: 800 }}>Contact</h5>
        <p><b>Email:</b> christis@kean.edu</p>
        <p><b>LinkedIn:</b> https://www.linkedin.com/in/sunny-christian-3a3366188</p>
      </div>

      <p style={{ marginTop: 14, opacity: 0.8 }}>
        Tip: Open the <b>AI Chatbot</b> tab and ask about my projects/skills.
      </p>
    </div>
  );
}