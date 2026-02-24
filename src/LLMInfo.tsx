export default function LLMInfo() {
  return (
    <div className="container" style={{ marginTop: "40px", maxWidth: 900 }}>
      <h4 className="center-align">LLMs: ChatGPT & Gemini</h4>

      <div style={{ lineHeight: 1.7 }}>
        <h5>What is an LLM?</h5>
        <p>
          A Large Language Model (LLM) is a type of AI trained on huge amounts of text.
          It can generate human-like responses, summarize content, answer questions,
          and help with writing and coding.
        </p>

        <h5>ChatGPT (OpenAI)</h5>
        <ul>
          <li>Designed for conversation and helpful responses.</li>
          <li>Used for writing help, tutoring, brainstorming, coding support, and more.</li>
          <li>Strength: strong general-purpose chat + reasoning.</li>
        </ul>

        <h5>Gemini (Google)</h5>
        <ul>
          <li>Google’s LLM family for text understanding and generation.</li>
          <li>Often used for productivity, search-style tasks, and multimodal AI features.</li>
          <li>Strength: integrates with Google ecosystem and tools.</li>
        </ul>

        <h5>Common Uses of LLMs</h5>
        <ul>
          <li>Chatbots and customer support</li>
          <li>Summarizing articles and documents</li>
          <li>Writing emails, essays, and reports</li>
          <li>Code generation and debugging</li>
        </ul>

        <p style={{ opacity: 0.8 }}>
          This page was created using React Router.
        </p>
      </div>
    </div>
  );
}