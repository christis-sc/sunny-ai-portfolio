import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import Home from "./Home";
import Chatbot from "./Chatbot";


export default function App() {
  const linkStyle = ({ isActive }: { isActive: boolean }) => ({
    color: "white",
    textDecoration: "none",
    fontWeight: 700,
    opacity: isActive ? 1 : 0.85,
  });

  return (
    <BrowserRouter>
      {/* ---------- Custom Responsive Navbar ---------- */}
      <nav
        style={{
          backgroundColor: "#263238",
          padding: "0 16px",
        }}
      >
        <div
          style={{
            maxWidth: 1100,
            margin: "0 auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            padding: "14px 0",
            gap: 12,
          }}
        >
          {/* Logo */}
          <NavLink
            to="/"
            style={{
              fontWeight: 900,
              fontSize: "clamp(18px, 4vw, 22px)",
              color: "white",
              textDecoration: "none",
            }}
          >
            Sunny’s Portfolio
          </NavLink>

          {/* Links */}
          <div
            style={{
              display: "flex",
              gap: 18,
              flexWrap: "wrap",
            }}
          >
            <NavLink to="/" style={linkStyle}>
              Home
            </NavLink>

            <NavLink to="/chat" style={linkStyle}>
              AI Chatbot
            </NavLink>

            
          </div>
        </div>
      </nav>

      {/* ---------- Page Content ---------- */}
      <div style={{ padding: "24px 16px" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/chat" element={<Chatbot />} />

          
        </Routes>
      </div>
    </BrowserRouter>
  );
}