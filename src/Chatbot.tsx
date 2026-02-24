import { useState } from "react";

type Msg = {
  role: "user" | "bot";
  text: string;
};

export default function Chatbot() {
  const [messages, setMessages] = useState<Msg[]>([
    { role: "bot", text: "Hi! Ask me about Sunny’s skills, projects, or contact info." },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Front-end "AI" (works on Vercel, no backend needed)
  const fetchBotText = async (userMessage: string): Promise<string> => {
    const msg = userMessage.toLowerCase();

    const isGreeting = ["hi", "hello", "hey", "good morning", "good afternoon", "good evening"].some(
      (w) => msg.includes(w)
    );

    const asksWho =
      msg.includes("who is sunny") ||
      msg.includes("who are you") ||
      msg.includes("about sunny") ||
      msg.includes("tell me about") ||
      msg.includes("introduce");

    const asksSkills =
      msg.includes("skill") ||
      msg.includes("tech") ||
      msg.includes("stack") ||
      msg.includes("languages") ||
      msg.includes("framework");

    const asksProjects =
      msg.includes("project") ||
      msg.includes("portfolio") ||
      msg.includes("built") ||
      msg.includes("work") ||
      msg.includes("apps");

    const asksContact =
      msg.includes("contact") ||
      msg.includes("email") ||
      msg.includes("linkedin") ||
      msg.includes("github") ||
      msg.includes("reach");

    const asksEducation =
      msg.includes("school") ||
      msg.includes("university") ||
      msg.includes("kean") ||
      msg.includes("degree") ||
      msg.includes("major");

    const PROFILE = {
      name: "Sunny Christian",
      role: "Computer Science student & developer",
      school: "Kean University",
      focus: "building web applications using React and AI",
      skills: [
        "JavaScript",
        "TypeScript",
        "React",
        "Vite",
        "Node.js",
        "HTML/CSS",
        "GitHub",
        "APIs",
      ],
      projects: [
        {
          title: "AI Chatbot Portfolio",
          desc: "React chatbot assistant that answers questions about Sunny using AI-style logic.",
        },
        {
          title: "Donut Shop Calculator",
          desc: "React app that calculates totals, tax, and order summary.",
        },
        {
          title: "Car/Bike Marketplace",
          desc: "Marketplace web app for browsing listings and details.",
        },
        {
          title: "PHP Login System",
          desc: "Login/Register/Forgot Password authentication flow.",
        },
      ],
      contact: {
        email: "your-email@kean.edu",
        github: "github.com/yourusername",
        linkedin: "linkedin.com/in/yourlink",
      },
    };

    // Optional tiny delay to feel more "AI"
    await new Promise((r) => setTimeout(r, 300));

    if (isGreeting) {
      return "Hello! I’m Sunny’s AI portfolio assistant 🤖. Ask me about Sunny’s skills, projects, or contact info.";
    }
    if (asksWho) {
      return `${PROFILE.name} is a ${PROFILE.role} at ${PROFILE.school}. He focuses on ${PROFILE.focus}.`;
    }
    if (asksEducation) {
      return `Sunny studies Computer Science at ${PROFILE.school}.`;
    }
    if (asksSkills) {
      return `Sunny’s main skills include: ${PROFILE.skills.join(", ")}. He specializes in building modern web applications using React.`;
    }
    if (asksProjects) {
      const list = PROFILE.projects.map((p) => `• ${p.title}: ${p.desc}`).join("\n");
      return `Here are some of Sunny’s projects:\n${list}`;
    }
    if (asksContact) {
      return `You can contact Sunny here:\n• Email: ${PROFILE.contact.email}\n• GitHub: ${PROFILE.contact.github}\n• LinkedIn: ${PROFILE.contact.linkedin}`;
    }

    return (
      "I can help with that! Try asking:\n" +
      "• Who is Sunny Christian?\n" +
      "• What are Sunny’s skills?\n" +
      "• Show Sunny’s projects\n" +
      "• How can I contact Sunny?"
    );
  };

  // Send message
  const sendMessage = async () => {
    const text = input.trim();
    if (!text || loading) return;

    setError("");
    setMessages((prev) => [...prev, { role: "user", text }]);
    setInput("");
    setLoading(true);

    try {
      const botReply = await fetchBotText(text);
      setMessages((prev) => [...prev, { role: "bot", text: botReply }]);
    } catch (err) {
      setError("Chatbot error. Please try again.");
      setMessages((prev) => [...prev, { role: "bot", text: "Error generating response." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container" style={{ maxWidth: 900 }}>
      <h4 className="center-align">Sunny's AI Chatbot</h4>

      {/* Chat box */}
      <div
        style={{
          minHeight: "320px",
          border: "1px solid #ccc",
          borderRadius: 10,
          padding: 20,
          marginBottom: 14,
          backgroundColor: "rgba(0,0,0,0.25)",
          overflowY: "auto",
        }}
      >
        {messages.map((m, i) => (
          <div
            key={i}
            style={{
              backgroundColor: m.role === "user" ? "#1976d2" : "#2e7d32",
              color: "white",
              padding: 10,
              borderRadius: 10,
              marginBottom: 10,
              maxWidth: "75%",
              marginLeft: m.role === "user" ? "auto" : "0",
              whiteSpace: "pre-wrap",
            }}
          >
            {m.text}
          </div>
        ))}

        {loading && <p style={{ marginTop: "10px", opacity: 0.7 }}>🤖 Bot is thinking...</p>}
      </div>

      {error && (
        <p style={{ color: "#ff6b6b", marginTop: 0, marginBottom: 12 }}>{error}</p>
      )}

      {/* Input */}
      <div style={{ display: "flex", gap: 10 }}>
        <input
          className="browser-default"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          style={{ flex: 1, padding: 10 }}
          onKeyDown={(e) => {
            if (e.key === "Enter") sendMessage();
          }}
          disabled={loading}
        />
        <button className="btn" onClick={sendMessage} disabled={loading}>
          {loading ? "..." : "Send"}
        </button>
      </div>

     
    </div>
  );
}