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

  // Fetch AI response from YOUR local server
  const fetchBotText = async (userMessage: string): Promise<string> => {
    const res = await fetch("http://localhost:5050/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message: userMessage }),
    });

    const data = await res.json();
    return data.reply || data.error || "AI not responding.";
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
      // IMPORTANT FIX: pass `text` into fetchBotText
      const botReply = await fetchBotText(text);
      setMessages((prev) => [...prev, { role: "bot", text: botReply }]);
    } catch (err) {
      setError("Could not reach the AI server. Make sure it is running on port 5050.");
      setMessages((prev) => [
        ...prev,
        { role: "bot", text: "Error getting response from AI server." },
      ]);
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

        {/* Loading */}
        {loading && (
          <p style={{ marginTop: "10px", opacity: 0.7 }}>🤖 Bot is thinking...</p>
        )}
      </div>

      {/* Error message */}
      {error && (
        <p style={{ color: "#ff6b6b", marginTop: 0, marginBottom: 12 }}>
          {error}
        </p>
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

      <p style={{ marginTop: 10, opacity: 0.75 }}>
        Note: The AI server must be running at <b>http://localhost:5050</b>.
      </p>
    </div>
  );
}