import { useMemo, useState } from "react";

type Role = "user" | "bot";
type Msg = { role: Role; text: string };

type Topic = "about" | "skills" | "projects" | "contact" | "unknown";

const PROFILE = {
  name: "Sunny Christian",
  role: "Computer Science student & developer",
  school: "Kean University",
  focus: "building modern web applications with React and AI-enhanced features",
  skills: [
    "JavaScript",
    "TypeScript",
    "React",
    "Vite",
    "Node.js",
    "HTML/CSS",
    "Git/GitHub",
    "APIs",
    "AI Integration",
  ],
  projects: [
    {
      title: "AI Portfolio Assistant",
      desc: "An AI-style portfolio chatbot that answers questions about Sunny’s skills, projects, and contact details.",
      highlights: ["Intent detection", "Quick actions", "Responsive UI"],
    },
    {
      title: "Donut Shop Calculator",
      desc: "React app that calculates totals, tax, and order summary with clean UI and validation.",
      highlights: ["State management", "UI/UX", "Responsive layout"],
    },
    {
      title: "Car/Bike Marketplace",
      desc: "Marketplace-style browsing experience with listings and details flow.",
      highlights: ["Navigation", "Data-driven UI", "Multi-page structure"],
    },
    {
      title: "PHP Login System",
      desc: "Authentication flow with login, register, and forgot-password features.",
      highlights: ["Form handling", "Error handling", "Auth flow"],
    },
  ],
  contact: {
    email: "christis@kean.edu",
    linkedin: "https://www.linkedin.com/in/sunny-christian-3a3366188",
    github: "https://github.com/christis-sc/sunny-ai-portfolio",
  },
};

function classify(text: string): Topic {
  const msg = text.toLowerCase();

  const greetings = ["hi", "hello", "hey", "good morning", "good afternoon", "good evening"];
  if (greetings.some((w) => msg.includes(w))) return "about";

  if (
    msg.includes("who are you") ||
    msg.includes("who is sunny") ||
    msg.includes("about") ||
    msg.includes("introduce") ||
    msg.includes("background")
  )
    return "about";

  if (
    msg.includes("skill") ||
    msg.includes("stack") ||
    msg.includes("tech") ||
    msg.includes("language") ||
    msg.includes("framework")
  )
    return "skills";

  if (
    msg.includes("project") ||
    msg.includes("portfolio") ||
    msg.includes("built") ||
    msg.includes("apps") ||
    msg.includes("work")
  )
    return "projects";

  if (
    msg.includes("contact") ||
    msg.includes("email") ||
    msg.includes("linkedin") ||
    msg.includes("github") ||
    msg.includes("reach")
  )
    return "contact";

  return "unknown";
}

function delay(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

function renderAbout(): string {
  return (
    `${PROFILE.name} is a ${PROFILE.role} at ${PROFILE.school}. ` +
    `He focuses on ${PROFILE.focus}.\n\n` +
    `You can ask me about:\n` +
    `• Skills\n` +
    `• Projects\n` +
    `• Contact info`
  );
}

function renderSkills(): string {
  return (
    `Here are Sunny’s core skills:\n` +
    `• ${PROFILE.skills.join("\n• ")}\n\n` +
    `Want me to list projects that use React/TypeScript?`
  );
}

function renderProjects(): string {
  const list = PROFILE.projects
    .map(
      (p) =>
        `• ${p.title}\n  ${p.desc}\n  Highlights: ${p.highlights.join(", ")}`
    )
    .join("\n\n");

  return (
    `Here are Sunny’s featured projects:\n\n${list}\n\n` +
    `If you want, tell me which one and I’ll describe what Sunny built and what he learned.`
  );
}

function renderContact(): string {
  return (
    `You can contact Sunny here:\n` +
    `• Email: ${PROFILE.contact.email}\n` +
    `• LinkedIn: ${PROFILE.contact.linkedin}\n` +
    `• GitHub: ${PROFILE.contact.github}\n\n` +
    `Do you want the GitHub link or LinkedIn link opened next?`
  );
}

function renderFallback(lastTopic: Topic): string {
  if (lastTopic === "projects") {
    return `Are you asking about one specific project? Try: “Tell me more about the Donut Shop Calculator.”`;
  }
  if (lastTopic === "skills") {
    return `Are you asking for Sunny’s strongest skills or his full tech stack?`;
  }
  return (
    `I’m Sunny’s portfolio assistant. I can help with:\n` +
    `• About Sunny\n` +
    `• Skills\n` +
    `• Projects\n` +
    `• Contact\n\n` +
    `Try: “What are Sunny’s skills?” or “Show Sunny’s projects.”`
  );
}

export default function Chatbot() {
  const [messages, setMessages] = useState<Msg[]>([
    {
      role: "bot",
      text:
        `Hi! I’m Sunny’s portfolio assistant 🤖\n\n` +
        `Ask me about Sunny’s skills, projects, or contact info — or tap a quick button below.`,
    },
  ]);

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");

  const lastBotTopic = useMemo<Topic>(() => {
    // Rough memory: infer last topic from the last user message if available
    const lastUser = [...messages].reverse().find((m) => m.role === "user")?.text;
    return lastUser ? classify(lastUser) : "about";
  }, [messages]);

  const generateReply = async (userText: string): Promise<string> => {
    const topic = classify(userText);

    // small realistic delay
    await delay(450);

    switch (topic) {
      case "about":
        return renderAbout();
      case "skills":
        return renderSkills();
      case "projects":
        return renderProjects();
      case "contact":
        return renderContact();
      default:
        return renderFallback(lastBotTopic);
    }
  };

  const send = async (textOverride?: string) => {
    const text = (textOverride ?? input).trim();
    if (!text || loading) return;

    setError("");
    setMessages((prev) => [...prev, { role: "user", text }]);
    setInput("");
    setLoading(true);

    try {
      const reply = await generateReply(text);
      setMessages((prev) => [...prev, { role: "bot", text: reply }]);
    } catch (e) {
      setError("Something went wrong. Please try again.");
      setMessages((prev) => [...prev, { role: "bot", text: "Sorry — I had an error generating a response." }]);
    } finally {
      setLoading(false);
    }
  };

  const QuickBtn = ({ label, prompt }: { label: string; prompt: string }) => (
    <button
      onClick={() => send(prompt)}
      disabled={loading}
      style={{
        border: "1px solid rgba(255,255,255,0.18)",
        background: "rgba(255,255,255,0.06)",
        color: "white",
        borderRadius: 999,
        padding: "8px 12px",
        fontWeight: 900,
        cursor: loading ? "not-allowed" : "pointer",
      }}
    >
      {label}
    </button>
  );

  return (
    <div className="container" style={{ padding: "26px 0 40px", maxWidth: 950 }}>
      <div className="glass" style={{ padding: 18 }}>
        <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
          <h2 style={{ margin: 0, fontSize: "clamp(20px, 3.5vw, 28px)", fontWeight: 950 }}>
            AI Portfolio Assistant
          </h2>
          <div className="muted" style={{ fontWeight: 800 }}>
            Ask about Sunny
          </div>
        </div>

        {/* Quick actions */}
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 12 }}>
          <QuickBtn label="About" prompt="Tell me about Sunny Christian" />
          <QuickBtn label="Skills" prompt="What are Sunny's skills?" />
          <QuickBtn label="Projects" prompt="Show Sunny's projects" />
          <QuickBtn label="Contact" prompt="How can I contact Sunny?" />
        </div>

        {/* Chat box */}
        <div
          className="glass"
          style={{
            marginTop: 14,
            padding: 14,
            minHeight: 360,
            maxHeight: 520,
            overflowY: "auto",
            background: "rgba(255,255,255,0.05)",
          }}
        >
          {messages.map((m, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                justifyContent: m.role === "user" ? "flex-end" : "flex-start",
                marginBottom: 10,
              }}
            >
              <div
                style={{
                  maxWidth: "78%",
                  padding: "10px 12px",
                  borderRadius: 14,
                  whiteSpace: "pre-wrap",
                  border: "1px solid rgba(255,255,255,0.14)",
                  background:
                    m.role === "user"
                      ? "linear-gradient(135deg, rgba(124,58,237,0.90), rgba(124,58,237,0.55))"
                      : "rgba(255,255,255,0.06)",
                }}
              >
                {m.text}
              </div>
            </div>
          ))}

          {loading && (
            <div className="muted" style={{ marginTop: 6, fontWeight: 800 }}>
              🤖 Thinking...
            </div>
          )}
        </div>

        {error && (
          <div style={{ marginTop: 10, color: "#ffb4b4", fontWeight: 900 }}>
            {error}
          </div>
        )}

        {/* Input */}
        <div style={{ display: "flex", gap: 10, marginTop: 12, flexWrap: "wrap" }}>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a question… (ex: What are Sunny’s skills?)"
            disabled={loading}
            style={{
              flex: 1,
              minWidth: 220,
              padding: "12px 12px",
              borderRadius: 12,
              border: "1px solid rgba(255,255,255,0.18)",
              background: "rgba(0,0,0,0.20)",
              color: "white",
              outline: "none",
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") send();
            }}
          />

          <button
            onClick={() => send()}
            disabled={loading}
            className="btn-primary"
            style={{ cursor: loading ? "not-allowed" : "pointer" }}
          >
            {loading ? "..." : "Send"}
          </button>
        </div>

        <div className="muted" style={{ marginTop: 10, fontWeight: 800 }}>
          Tip: Try the quick buttons first — it feels more like a real assistant.
        </div>
      </div>
    </div>
  );
}