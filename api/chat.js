export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Use POST" });

  try {
    const message = (req.body?.message || "").toString().trim();
    if (!message) return res.status(400).json({ error: "Missing message" });

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) return res.status(500).json({ error: "Missing OPENAI_API_KEY" });

    const system = `
You are Sunny Christian's portfolio assistant.
Only answer questions about Sunny, his skills, projects, and contact info.
If the user asks something unrelated, redirect them politely to Sunny's portfolio.
Keep answers helpful, natural, and concise.
`;

    const context = `
PROFILE:
Name: Sunny Christian
School: Kean University
Role: Computer Science student & developer
Skills: JavaScript, TypeScript, React, Vite, Node.js, HTML/CSS, Git/GitHub, APIs, AI Integration
Projects:
1) AI Portfolio Assistant
2) Donut Shop Calculator
3) Car/Bike Marketplace
4) PHP Login System
Contact:
Email: christis@kean.edu
LinkedIn: https://www.linkedin.com/in/sunny-christian-3a3366188
GitHub: https://github.com/christis-sc/sunny-ai-portfolio
`;

    const r = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-4.1-mini",
        input: [
          { role: "system", content: system },
          { role: "user", content: `${context}\n\nUSER: ${message}` },
        ],
        max_output_tokens: 220,
      }),
    });

    const data = await r.json();

    if (!r.ok) {
      return res.status(500).json({
        error: data?.error?.message || "OpenAI request failed",
      });
    }

    return res.json({ reply: data.output_text || "No response." });
  } catch (e) {
    return res.status(500).json({ error: "Server error" });
  }
}