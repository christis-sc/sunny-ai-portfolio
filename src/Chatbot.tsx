import { useEffect, useMemo, useRef, useState } from "react";

type Role = "user" | "bot";
type Msg = { id: string; role: Role; text: string; time: string };

function nowTime() {
  return new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

function uid() {
  return Math.random().toString(16).slice(2) + Date.now().toString(16);
}

function delay(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

// Convert URLs in text into clickable links
function linkify(text: string) {
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  const parts = text.split(urlRegex);
  return parts.map((part, i) => {
    if (part.match(urlRegex)) {
      return (
        <a
          key={i}
          href={part}
          target="_blank"
          rel="noreferrer"
          style={{ textDecoration: "underline", fontWeight: 900 }}
        >
          {part.replace("https://", "").replace("http://", "")}
        </a>
      );
    }
    return <span key={i}>{part}</span>;
  });
}

export default function Chatbot() {
  const [messages, setMessages] = useState<Msg[]>([
    {
      id: uid(),
      role: "bot",
      time: nowTime(),
      text:
        "Hi! I’m Sunny’s AI portfolio assistant 🤖\n\n" +
        "Ask me about Sunny’s skills, projects, or contact info — or tap a quick prompt below.",
    },
  ]);

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");

  const listRef = useRef<HTMLDivElement | null>(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    const el = listRef.current;
    if (!el) return;
    el.scrollTop = el.scrollHeight;
  }, [messages, loading]);

  const quickPrompts = useMemo(
    () => [
      { label: "About Sunny", prompt: "Tell me about Sunny Christian." },
      { label: "Skills", prompt: "What are Sunny’s main skills?" },
      { label: "Projects", prompt: "List Sunny’s projects and what he built." },
      { label: "Contact", prompt: "How can I contact Sunny? Give links." },
      { label: "Best project", prompt: "Which project best represents Sunny’s skills and why?" },
    ],
    []
  );

  const fetchAI = async (userMessage: string): Promise<string> => {
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: userMessage }),
    });

    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
      const msg =
        data?.error ||
        "AI server error. Check OPENAI_API_KEY in Vercel Environment Variables.";
      throw new Error(msg);
    }

    return data.reply || "No response.";
  };

  const send = async (override?: string) => {
    const text = (override ?? input).trim();
    if (!text || loading) return;

    setError("");
    setInput("");

    const userMsg: Msg = { id: uid(), role: "user", text, time: nowTime() };
    setMessages((prev) => [...prev, userMsg]);

    setLoading(true);

    try {
      // A tiny delay makes it feel more natural
      await delay(220);

      const reply = await fetchAI(text);

      const botMsg: Msg = { id: uid(), role: "bot", text: reply, time: nowTime() };
      setMessages((prev) => [...prev, botMsg]);
    } catch (e: any) {
      const msg = e?.message || "Could not reach AI server.";
      setError(msg);
      setMessages((prev) => [
        ...prev,
        {
          id: uid(),
          role: "bot",
          time: nowTime(),
          text:
            "Sorry — I couldn’t generate a response right now.\n\n" +
            "If this is deployed, make sure your Vercel Environment Variable OPENAI_API_KEY is set and the project is redeployed.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const clearChat = () => {
    setError("");
    setInput("");
    setMessages([
      {
        id: uid(),
        role: "bot",
        time: nowTime(),
        text:
          "Chat cleared ✅\n\nAsk me about Sunny’s skills, projects, or contact info.",
      },
    ]);
  };

  const Bubble = ({ m }: { m: Msg }) => {
    const isUser = m.role === "user";
    return (
      <div
        style={{
          display: "flex",
          justifyContent: isUser ? "flex-end" : "flex-start",
          marginBottom: 10,
        }}
      >
        <div
          style={{
            maxWidth: "78%",
            padding: "10px 12px",
            borderRadius: 16,
            whiteSpace: "pre-wrap",
            border: "1px solid rgba(255,255,255,0.14)",
            background: isUser
              ? "linear-gradient(135deg, rgba(124,58,237,0.95), rgba(124,58,237,0.55))"
              : "rgba(255,255,255,0.06)",
            boxShadow: "0 10px 22px rgba(0,0,0,0.18)",
          }}
        >
          <div style={{ fontSize: 13, opacity: 0.78, marginBottom: 6, fontWeight: 800 }}>
            {isUser ? "You" : "Assistant"} • {m.time}
          </div>

          <div style={{ lineHeight: 1.55 }}>{linkify(m.text)}</div>
        </div>
      </div>
    );
  };

  return (
    <div className="container" style={{ padding: "26px 0 40px", maxWidth: 980 }}>
      <div className="glass" style={{ padding: 18 }}>
        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 10,
            flexWrap: "wrap",
          }}
        >
          <div>
            <h2 style={{ margin: 0, fontSize: "clamp(20px, 3.6vw, 30px)", fontWeight: 950 }}>
              AI Portfolio Assistant
            </h2>
            <div className="muted" style={{ fontWeight: 800, marginTop: 4 }}>
              Ask questions about Sunny (skills, projects, contact)
            </div>
          </div>

          <div style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
            <span
              className="badge"
              style={{
                background: loading ? "rgba(34,197,94,0.18)" : "rgba(255,255,255,0.06)",
                borderColor: "rgba(255,255,255,0.18)",
              }}
            >
              {loading ? "Live AI: Thinking..." : "Live AI: Ready"}
            </span>
            <button
              onClick={clearChat}
              disabled={loading}
              className="btn-ghost"
              style={{ cursor: loading ? "not-allowed" : "pointer" }}
            >
              Clear
            </button>
          </div>
        </div>

        {/* Quick prompts */}
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 14 }}>
          {quickPrompts.map((q) => (
            <button
              key={q.label}
              onClick={() => send(q.prompt)}
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
              {q.label}
            </button>
          ))}
        </div>

        {/* Chat panel */}
        <div
          ref={listRef}
          className="glass"
          style={{
            marginTop: 14,
            padding: 14,
            minHeight: 380,
            maxHeight: 560,
            overflowY: "auto",
            background: "rgba(255,255,255,0.05)",
          }}
        >
          {messages.map((m) => (
            <Bubble key={m.id} m={m} />
          ))}

          {loading && (
            <div className="muted" style={{ fontWeight: 900, marginTop: 4 }}>
              🤖 Typing…
            </div>
          )}
        </div>

        {/* Error */}
        {error && (
          <div style={{ marginTop: 10, color: "#ffb4b4", fontWeight: 950 }}>
            {error}
          </div>
        )}

        {/* Input */}
        <div style={{ display: "flex", gap: 10, marginTop: 12, flexWrap: "wrap" }}>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask something… (ex: What are Sunny’s skills?)"
            disabled={loading}
            style={{
              flex: 1,
              minWidth: 220,
              padding: "12px 12px",
              borderRadius: 14,
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

        
      </div>
    </div>
  );
}