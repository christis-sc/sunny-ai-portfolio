import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

/* Health check */
app.get("/health", (req, res) => {
  res.json({ ok: true });
});

/* Chatbot route */
app.post("/chat", async (req, res) => {
  try {
    const message = (req.body?.message || "").toString().trim();
    if (!message) return res.status(400).json({ error: "Missing message" });

    const msg = message.toLowerCase();

    // ===== Detect what user asks =====
    const isGreeting =
      ["hi", "hello", "hey", "good morning", "good afternoon", "good evening"].some((w) =>
        msg.includes(w)
      );

    const asksWho =
      msg.includes("who is sunny") ||
      msg.includes("who are you") ||
      msg.includes("about sunny") ||
      msg.includes("tell me about");

    const asksSkills =
      msg.includes("skill") ||
      msg.includes("tech") ||
      msg.includes("stack") ||
      msg.includes("languages");

    const asksProjects =
      msg.includes("project") ||
      msg.includes("portfolio") ||
      msg.includes("built") ||
      msg.includes("apps");

    const asksContact =
      msg.includes("contact") ||
      msg.includes("email") ||
      msg.includes("linkedin") ||
      msg.includes("github");

    const asksEducation =
      msg.includes("university") ||
      msg.includes("kean") ||
      msg.includes("study") ||
      msg.includes("degree");

    // ===== Sunny info (edit if needed) =====
    const PROFILE = {
      name: "Sunny Christian",
      role: "Computer Science student & developer",
      school: "Kean University",
      focus: "building web apps using React and AI",
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
          desc: "React chatbot that answers questions about Sunny using AI logic.",
        },
        {
          title: "Donut Shop Calculator",
          desc: "React app that calculates totals, tax and order summary.",
        },
        {
          title: "Car/Bike Marketplace",
          desc: "Marketplace web app for buying and selling vehicles.",
        },
        {
          title: "PHP Login System",
          desc: "Login/register/forgot password authentication system.",
        },
      ],
      contact: {
        email: "sunny@email.com",
        github: "github.com/yourusername",
        linkedin: "linkedin.com/in/yourlink",
      },
    };

    // ===== AI-style reply generator =====
    let reply = "";

    if (isGreeting) {
      reply =
        "Hello! I'm Sunny's AI assistant 🤖. Ask me about Sunny’s skills, projects, or contact information.";
    } 
    else if (asksWho) {
      reply =
        `${PROFILE.name} is a ${PROFILE.role} at ${PROFILE.school}. ` +
        `He focuses on ${PROFILE.focus}.`;
    } 
    else if (asksEducation) {
      reply = `Sunny is currently studying Computer Science at ${PROFILE.school}.`;
    } 
    else if (asksSkills) {
      reply =
        `Sunny’s main skills include: ${PROFILE.skills.join(", ")}. ` +
        `He specializes in building modern web applications using React.`;
    } 
    else if (asksProjects) {
      const list = PROFILE.projects
        .map((p) => `• ${p.title}: ${p.desc}`)
        .join("\n");
      reply = `Here are some of Sunny's projects:\n${list}`;
    } 
    else if (asksContact) {
      reply =
        `You can contact Sunny here:\n` +
        `• Email: ${PROFILE.contact.email}\n` +
        `• GitHub: ${PROFILE.contact.github}\n` +
        `• LinkedIn: ${PROFILE.contact.linkedin}`;
    } 
    else {
      reply =
        "I can help with that! Try asking:\n" +
        "• Who is Sunny Christian?\n" +
        "• What are Sunny's skills?\n" +
        "• What projects has Sunny built?\n" +
        "• How can I contact Sunny?";
    }

    return res.json({ reply });

  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: "Server error" });
  }
});

/* IMPORTANT: Start server */
const PORT = 5050;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});