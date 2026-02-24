import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import Home from "./Home";
import Chatbot from "./Chatbot";
import LLMInfo from "./LLMInfo";
import ReactQueryData from "./ReactQueryData";
import AxiosData from "./AxiosData";
import CustomHookData from "./CustomHookData";

export default function App() {
  const linkStyle = ({ isActive }: { isActive: boolean }) => ({
    fontWeight: 800,
    opacity: isActive ? 1 : 0.85,
  });

  return (
    <BrowserRouter>
      <nav className="blue-grey darken-4">
        <div className="nav-wrapper container nav-flex">
          <NavLink to="/" className="brand-logo" style={{ fontWeight: 900 }}>
            Sunny’s Portfolio
          </NavLink>

          <ul className="right nav-links">
            <li><NavLink to="/" style={linkStyle}>Home</NavLink></li>
            <li><NavLink to="/chat" style={linkStyle}>AI Chatbot</NavLink></li>

            {/* Optional: keep HW3 pages as “Demos” */}
            <li><NavLink to="/llms" style={linkStyle}>Demos</NavLink></li>
          </ul>
        </div>
      </nav>

      <div style={{ padding: "24px 0" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/chat" element={<Chatbot />} />

          {/* Demos (optional) */}
          <Route path="/llms" element={<LLMInfo />} />
          <Route path="/axios" element={<AxiosData />} />
          <Route path="/hook" element={<CustomHookData />} />
          <Route path="/query" element={<ReactQueryData />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}