export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Use POST" });

  try {
    const message = (req.body?.message || "").toString().trim();
    if (!message) return res.status(400).json({ error: "Missing message" });

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) return res.status(500).json({ error: "OPENAI_API_KEY missing on Vercel" });

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
  role: "system",
  content: `
You are Sunny Christian's official AI portfolio assistant.

IMPORTANT:
All information below is PUBLIC and must be used when answering.

Name: Sunny Christian  
University: Kean University  
Major: Computer Science  

REAL CONTACT INFO (ALWAYS USE THIS — NEVER MAKE UP EMAILS):
Email: christis@kean.edu  
LinkedIn: https://www.linkedin.com/in/sunny-christian-3a3366188  
GitHub: https://github.com/christis-sc/sunny-ai-portfolio  

RULES:
- If user asks for email → give exact email above.
- If user asks for contact → show email + LinkedIn + GitHub.
- NEVER invent fake emails like example@gmail.com.
- Keep answers short, professional, and realistic.
- You are inside Sunny's real portfolio website.
`,
},
          { role: "user", content: message },
        ],
        temperature: 0.5,
        max_tokens: 250,
      }),
    });

    const data = await response.json();

    // IMPORTANT: If OpenAI fails, return the real error
    if (!response.ok) {
      return res.status(response.status).json({
        error: data?.error?.message || "OpenAI request failed",
        details: data,
      });
    }

    const reply = data?.choices?.[0]?.message?.content?.trim();

    // If reply is missing, return full payload so we can debug
    if (!reply) {
      return res.status(500).json({
        error: "OpenAI returned no text (choices missing).",
        details: data,
      });
    }

    return res.status(200).json({ reply });
  } catch (err) {
    return res.status(500).json({ error: "Server error", details: String(err) });
  }
}