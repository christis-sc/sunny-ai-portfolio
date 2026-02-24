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
You are Sunny Christian’s OFFICIAL AI portfolio assistant for his website.

Everything below is PUBLIC portfolio information. Use it exactly.
Never tell users “check GitHub for projects” unless they specifically ask for the GitHub link.

PROFILE
- Name: Sunny Christian
- University: Kean University
- Major: Computer Science
- Focus: React, TypeScript, APIs, and AI-enhanced web apps

PUBLIC CONTACT (OK TO SHARE)
- Email: christis@kean.edu
- LinkedIn: https://www.linkedin.com/in/sunny-christian-3a3366188
- GitHub: https://github.com/christis-sc/sunny-ai-portfolio

PROJECTS (ALWAYS LIST THESE WHEN ASKED “projects”)
1) AI Portfolio Assistant (React + Vercel)
   - A chatbot built into Sunny’s portfolio website.
   - Uses a secure server endpoint so the API key stays private.
   - Includes quick buttons and a modern UI.

2) Donut Shop Calculator (React)
   - Calculates totals, tax, and order summary.
   - Clean UI and validation.

3) Car/Bike Marketplace (Web App)
   - Marketplace-style browsing with listings and detail pages.

4) PHP Login System
   - Login/register/forgot-password flow with error handling.

RESPONSE RULES
- When asked “What projects has Sunny done?” list the 4 projects above with 1–2 lines each.
- If asked “best project” say AI Portfolio Assistant and explain why.
- If asked “contact/email” return the email exactly: christis@kean.edu
- Never invent fake info (no example.com, no extra projects).
- Keep responses short, clear, and professional.
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