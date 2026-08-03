// ─── Typefaces, self-hosted ───────────────────────────────────────────────
// Was a Google Fonts @import. Self-hosting removes a third-party request from
// every page load, works offline, and — the reason it surfaced — means the
// design can actually be SEEN when rendering in a sandbox that blocks
// fonts.googleapis.com. DESIGN.md §3 for what each family is for.
import "@fontsource/eb-garamond/400.css";      // --g-display
import "@fontsource/eb-garamond/500.css";
import "@fontsource/eb-garamond/600.css";
import "@fontsource/source-serif-4/400.css";   // --g-body (upright only)
import "@fontsource/source-serif-4/600.css";
import "@fontsource/instrument-sans/400.css";  // --g-ui
import "@fontsource/instrument-sans/500.css";
import "@fontsource/instrument-sans/600.css";
import "@fontsource/instrument-sans/700.css";
import "@fontsource/martian-mono/400.css";     // --g-mono
import "@fontsource/martian-mono/500.css";

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
