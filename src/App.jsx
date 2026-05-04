import { useState, useEffect, useRef } from "react";

const style = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400;1,700&family=DM+Sans:wght@300;400;500&family=DM+Mono:wght@400;500&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --ink: #0f0e0b;
    --paper: #f5f0e8;
    --cream: #ede8dc;
    --gold: #c8922a;
    --gold-light: #e8b84b;
    --rust: #b84c2a;
    --muted: #6b6456;
    --rule: #c8bfad;
  }

  html { scroll-behavior: smooth; }

  body {
    font-family: 'DM Sans', sans-serif;
    background: var(--paper);
    color: var(--ink);
    min-height: 100vh;
  }

  /* HEADER */
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1.25rem 3rem;
    border-bottom: 1px solid var(--rule);
    position: sticky;
    top: 0;
    background: var(--paper);
    z-index: 100;
  }
  .header-logo {
    font-family: 'DM Mono', monospace;
    font-size: 0.8rem;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: var(--muted);
  }
  .header-logo span { color: var(--ink); font-weight: 500; }
  .header-nav { display: flex; gap: 2rem; align-items: center; }
  .nav-link {
    font-size: 0.82rem;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--muted);
    text-decoration: none;
    cursor: pointer;
    transition: color 0.2s;
  }
  .nav-link:hover { color: var(--ink); }
  .nav-cta {
    font-family: 'DM Mono', monospace;
    font-size: 0.75rem;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    background: var(--ink);
    color: var(--paper);
    border: none;
    padding: 0.55rem 1.2rem;
    cursor: pointer;
    transition: background 0.2s;
  }
  .nav-cta:hover { background: var(--gold); }

  /* HERO */
  .hero {
    display: grid;
    grid-template-columns: 1fr 1fr;
    min-height: calc(100vh - 65px);
    border-bottom: 1px solid var(--rule);
  }
  .hero-left {
    padding: 5rem 3rem 4rem;
    border-right: 1px solid var(--rule);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .hero-eyebrow {
    font-family: 'DM Mono', monospace;
    font-size: 0.7rem;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: var(--gold);
    margin-bottom: 2rem;
  }
  .hero-headline {
    font-family: 'Playfair Display', serif;
    font-size: clamp(2.8rem, 5vw, 5rem);
    line-height: 1.05;
    font-weight: 900;
    letter-spacing: -0.02em;
    flex: 1;
  }
  .hero-headline em {
    font-style: italic;
    color: var(--gold);
  }
  .hero-sub {
    margin-top: 2.5rem;
    font-size: 1.05rem;
    line-height: 1.7;
    color: var(--muted);
    max-width: 36ch;
    font-weight: 300;
  }
  .hero-actions {
    margin-top: 3rem;
    display: flex;
    gap: 1rem;
    align-items: center;
  }
  .btn-primary {
    font-family: 'DM Mono', monospace;
    font-size: 0.78rem;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    background: var(--ink);
    color: var(--paper);
    border: none;
    padding: 1rem 2rem;
    cursor: pointer;
    transition: background 0.2s, transform 0.15s;
  }
  .btn-primary:hover { background: var(--gold); transform: translateY(-1px); }
  .btn-secondary {
    font-size: 0.82rem;
    letter-spacing: 0.06em;
    color: var(--muted);
    text-decoration: underline;
    background: none;
    border: none;
    cursor: pointer;
  }
  .hero-right {
    padding: 5rem 3rem 4rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    background: var(--cream);
    position: relative;
    overflow: hidden;
  }
  .hero-right::before {
    content: '"';
    font-family: 'Playfair Display', serif;
    font-size: 28rem;
    color: var(--rule);
    position: absolute;
    top: -4rem;
    right: -2rem;
    line-height: 1;
    pointer-events: none;
    user-select: none;
  }
  .quote-text {
    font-family: 'Playfair Display', serif;
    font-size: 1.45rem;
    line-height: 1.55;
    font-style: italic;
    position: relative;
    z-index: 1;
  }
  .quote-attr {
    margin-top: 1.5rem;
    font-family: 'DM Mono', monospace;
    font-size: 0.7rem;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: var(--gold);
  }
  .index-display {
    margin-top: 3rem;
    padding: 1.5rem;
    border: 1px solid var(--rule);
    background: var(--paper);
    position: relative;
    z-index: 1;
  }
  .index-label {
    font-family: 'DM Mono', monospace;
    font-size: 0.65rem;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: var(--muted);
    margin-bottom: 0.5rem;
  }
  .index-number {
    font-family: 'Playfair Display', serif;
    font-size: 4rem;
    font-weight: 900;
    line-height: 1;
    color: var(--gold);
  }
  .index-caption {
    font-size: 0.82rem;
    color: var(--muted);
    margin-top: 0.4rem;
  }

  /* DIVIDER */
  .section-rule {
    display: grid;
    grid-template-columns: 1fr auto 1fr;
    align-items: center;
    gap: 1.5rem;
    padding: 0 3rem;
    margin: 4rem 0 0;
  }
  .section-rule hr { border: none; border-top: 1px solid var(--rule); }
  .section-rule-label {
    font-family: 'DM Mono', monospace;
    font-size: 0.65rem;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: var(--muted);
    white-space: nowrap;
  }

  /* PILLARS */
  .pillars-section { padding: 0 3rem 6rem; }
  .pillars-intro {
    max-width: 60ch;
    margin: 3rem 0 4rem;
  }
  .pillars-intro h2 {
    font-family: 'Playfair Display', serif;
    font-size: 2rem;
    font-weight: 700;
    line-height: 1.2;
    margin-bottom: 1rem;
  }
  .pillars-intro p {
    font-size: 1rem;
    line-height: 1.7;
    color: var(--muted);
    font-weight: 300;
  }
  .pillars-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    border: 1px solid var(--rule);
  }
  .pillar {
    padding: 2.5rem 2rem;
    border-right: 1px solid var(--rule);
    transition: background 0.2s;
    cursor: default;
  }
  .pillar:last-child { border-right: none; }
  .pillar:hover { background: var(--cream); }
  .pillar-icon {
    font-size: 1.8rem;
    margin-bottom: 1.5rem;
    display: block;
  }
  .pillar-number {
    font-family: 'DM Mono', monospace;
    font-size: 0.65rem;
    letter-spacing: 0.2em;
    color: var(--gold);
    margin-bottom: 0.75rem;
  }
  .pillar-title {
    font-family: 'Playfair Display', serif;
    font-size: 1.25rem;
    font-weight: 700;
    margin-bottom: 0.5rem;
  }
  .pillar-maps {
    font-family: 'DM Mono', monospace;
    font-size: 0.65rem;
    letter-spacing: 0.1em;
    color: var(--rust);
    text-transform: uppercase;
    margin-bottom: 1rem;
  }
  .pillar-desc {
    font-size: 0.88rem;
    line-height: 1.65;
    color: var(--muted);
    font-weight: 300;
  }
  .pillars-summit {
    margin-top: 0;
    border: 1px solid var(--rule);
    border-top: none;
    padding: 2.5rem;
    background: var(--ink);
    color: var(--paper);
    text-align: center;
  }
  .summit-label {
    font-family: 'DM Mono', monospace;
    font-size: 0.65rem;
    letter-spacing: 0.25em;
    text-transform: uppercase;
    color: var(--gold-light);
    margin-bottom: 0.75rem;
  }
  .summit-title {
    font-family: 'Playfair Display', serif;
    font-size: 2rem;
    font-weight: 900;
    font-style: italic;
  }
  .summit-desc {
    margin-top: 0.75rem;
    font-size: 0.9rem;
    color: #a09880;
    font-weight: 300;
  }

  /* CTA SECTION */
  .cta-section {
    border-top: 1px solid var(--rule);
    display: grid;
    grid-template-columns: 1fr 1fr;
  }
  .cta-left {
    padding: 5rem 3rem;
    border-right: 1px solid var(--rule);
  }
  .cta-left h2 {
    font-family: 'Playfair Display', serif;
    font-size: 2.5rem;
    font-weight: 900;
    line-height: 1.1;
    margin-bottom: 1.5rem;
  }
  .cta-left p {
    font-size: 1rem;
    line-height: 1.7;
    color: var(--muted);
    font-weight: 300;
    margin-bottom: 2.5rem;
    max-width: 40ch;
  }
  .cta-steps {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin-bottom: 2.5rem;
  }
  .cta-step {
    display: flex;
    gap: 1rem;
    align-items: flex-start;
  }
  .step-num {
    font-family: 'DM Mono', monospace;
    font-size: 0.7rem;
    color: var(--gold);
    padding-top: 0.1rem;
    min-width: 1.5rem;
  }
  .step-text {
    font-size: 0.9rem;
    color: var(--muted);
    font-weight: 300;
    line-height: 1.5;
  }
  .cta-right {
    padding: 5rem 3rem;
    background: var(--cream);
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .maslow-diagram {
    width: 100%;
    max-width: 320px;
  }
  .maslow-tier {
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--paper);
    font-family: 'DM Mono', monospace;
    font-size: 0.65rem;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    margin-bottom: 2px;
    height: 52px;
    transition: opacity 0.2s;
  }
  .maslow-tier:hover { opacity: 0.85; }
  .tier-5 { background: var(--gold); clip-path: polygon(25% 0%, 75% 0%, 100% 100%, 0% 100%); }
  .tier-4 { background: #c47d2c; clip-path: polygon(18% 0%, 82% 0%, 100% 100%, 0% 100%); }
  .tier-3 { background: #a06030; clip-path: polygon(12% 0%, 88% 0%, 100% 100%, 0% 100%); }
  .tier-2 { background: #6b3d20; clip-path: polygon(6% 0%, 94% 0%, 100% 100%, 0% 100%); }
  .tier-1 { background: var(--ink); clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%); }

  /* ASSESSMENT */
  .assess-overlay {
    position: fixed;
    inset: 0;
    background: var(--paper);
    z-index: 200;
    overflow-y: auto;
  }
  .assess-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1.25rem 3rem;
    border-bottom: 1px solid var(--rule);
    position: sticky;
    top: 0;
    background: var(--paper);
    z-index: 10;
  }
  .assess-logo {
    font-family: 'DM Mono', monospace;
    font-size: 0.8rem;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: var(--muted);
  }
  .assess-close {
    background: none;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
    color: var(--muted);
    transition: color 0.2s;
  }
  .assess-close:hover { color: var(--ink); }
  .assess-progress {
    height: 3px;
    background: var(--rule);
    position: sticky;
    top: 64px;
    z-index: 9;
  }
  .assess-progress-bar {
    height: 100%;
    background: var(--gold);
    transition: width 0.4s ease;
  }
  .assess-body {
    max-width: 720px;
    margin: 0 auto;
    padding: 4rem 2rem 6rem;
  }
  .assess-step-label {
    font-family: 'DM Mono', monospace;
    font-size: 0.65rem;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: var(--gold);
    margin-bottom: 1rem;
  }
  .assess-question {
    font-family: 'Playfair Display', serif;
    font-size: 2rem;
    font-weight: 700;
    line-height: 1.2;
    margin-bottom: 2.5rem;
  }
  .assess-input {
    width: 100%;
    font-family: 'DM Mono', monospace;
    font-size: 1.1rem;
    border: none;
    border-bottom: 2px solid var(--rule);
    background: transparent;
    padding: 0.75rem 0;
    color: var(--ink);
    outline: none;
    transition: border-color 0.2s;
  }
  .assess-input:focus { border-color: var(--gold); }
  .assess-options {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.75rem;
  }
  .assess-option {
    padding: 1.25rem 1.5rem;
    border: 1px solid var(--rule);
    background: transparent;
    text-align: left;
    cursor: pointer;
    font-size: 0.9rem;
    color: var(--ink);
    font-family: 'DM Sans', sans-serif;
    transition: background 0.15s, border-color 0.15s;
  }
  .assess-option:hover, .assess-option.selected {
    background: var(--ink);
    color: var(--paper);
    border-color: var(--ink);
  }
  .assess-option.selected { background: var(--gold); border-color: var(--gold); }
  .assess-nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 3rem;
  }
  .assess-back {
    background: none;
    border: none;
    font-size: 0.85rem;
    color: var(--muted);
    cursor: pointer;
    font-family: 'DM Sans', sans-serif;
  }
  .assess-back:hover { color: var(--ink); }

  /* RESULTS */
  .results-body {
    max-width: 900px;
    margin: 0 auto;
    padding: 4rem 2rem 6rem;
  }
  .results-eyebrow {
    font-family: 'DM Mono', monospace;
    font-size: 0.65rem;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: var(--gold);
    margin-bottom: 1.5rem;
  }
  .results-headline {
    font-family: 'Playfair Display', serif;
    font-size: 3rem;
    font-weight: 900;
    line-height: 1.1;
    margin-bottom: 1rem;
  }
  .results-sub {
    font-size: 1rem;
    color: var(--muted);
    line-height: 1.7;
    font-weight: 300;
    max-width: 55ch;
    margin-bottom: 4rem;
  }
  .score-display {
    display: grid;
    grid-template-columns: auto 1fr;
    gap: 4rem;
    align-items: center;
    padding: 3rem;
    border: 1px solid var(--rule);
    background: var(--cream);
    margin-bottom: 3rem;
  }
  .big-score {
    font-family: 'Playfair Display', serif;
    font-size: 7rem;
    font-weight: 900;
    line-height: 1;
    color: var(--gold);
  }
  .score-label {
    font-family: 'DM Mono', monospace;
    font-size: 0.65rem;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: var(--muted);
    margin-bottom: 0.5rem;
  }
  .score-desc {
    font-family: 'Playfair Display', serif;
    font-size: 1.4rem;
    font-style: italic;
    margin-bottom: 1rem;
  }
  .score-bar-wrap {
    height: 6px;
    background: var(--rule);
    border-radius: 3px;
    overflow: hidden;
    max-width: 320px;
  }
  .score-bar {
    height: 100%;
    background: var(--gold);
    border-radius: 3px;
    transition: width 1s ease;
  }
  .pillar-scores {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 1px;
    background: var(--rule);
    border: 1px solid var(--rule);
    margin-bottom: 3rem;
  }
  .pillar-score {
    background: var(--paper);
    padding: 1.75rem 1.5rem;
    text-align: center;
  }
  .ps-icon { font-size: 1.4rem; margin-bottom: 0.75rem; display: block; }
  .ps-title {
    font-family: 'DM Mono', monospace;
    font-size: 0.62rem;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: var(--muted);
    margin-bottom: 0.5rem;
  }
  .ps-score {
    font-family: 'Playfair Display', serif;
    font-size: 2rem;
    font-weight: 900;
    color: var(--ink);
  }
  .ps-bar-wrap { height: 3px; background: var(--rule); margin-top: 0.5rem; }
  .ps-bar { height: 100%; background: var(--gold); }
  .ai-insight {
    padding: 2.5rem 3rem;
    background: var(--ink);
    color: var(--paper);
    position: relative;
    overflow: hidden;
  }
  .ai-insight::before {
    content: 'AI';
    font-family: 'Playfair Display', serif;
    font-size: 10rem;
    color: rgba(255,255,255,0.04);
    position: absolute;
    right: 1rem;
    bottom: -2rem;
    pointer-events: none;
  }
  .ai-label {
    font-family: 'DM Mono', monospace;
    font-size: 0.65rem;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: var(--gold-light);
    margin-bottom: 1.25rem;
  }
  .ai-text {
    font-size: 1rem;
    line-height: 1.75;
    color: #d4cfc5;
    font-weight: 300;
    max-width: 65ch;
    position: relative;
    z-index: 1;
  }

  /* FOOTER */
  .footer {
    border-top: 1px solid var(--rule);
    padding: 3rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .footer-logo {
    font-family: 'DM Mono', monospace;
    font-size: 0.75rem;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: var(--muted);
  }
  .footer-copy {
    font-size: 0.78rem;
    color: var(--muted);
    font-weight: 300;
  }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .fade-up { animation: fadeUp 0.6s ease both; }
  .fade-up-2 { animation: fadeUp 0.6s 0.15s ease both; }
  .fade-up-3 { animation: fadeUp 0.6s 0.3s ease both; }

  @media (max-width: 900px) {
    .hero { grid-template-columns: 1fr; }
    .hero-right { border-top: 1px solid var(--rule); }
    .pillars-grid { grid-template-columns: 1fr 1fr; }
    .pillar { border-bottom: 1px solid var(--rule); }
    .cta-section { grid-template-columns: 1fr; }
    .cta-right { border-top: 1px solid var(--rule); }
    .score-display { grid-template-columns: 1fr; gap: 2rem; }
    .pillar-scores { grid-template-columns: 1fr 1fr; }
    .assess-options { grid-template-columns: 1fr; }
    .header { padding: 1.25rem 1.5rem; }
    .pillars-section, .cta-left, .cta-right { padding-left: 1.5rem; padding-right: 1.5rem; }
    .footer { flex-direction: column; gap: 1rem; text-align: center; }
    .results-headline { font-size: 2rem; }
    .big-score { font-size: 5rem; }
  }
`;

const pillars = [
  {
    icon: "📊",
    title: "Economic Standing",
    maps: "Maps to: LIFE",
    needs: "Physiological & Safety",
    desc: "Income, housing, employment, education, cost of living, and business ownership. Can you survive and build stability?",
  },
  {
    icon: "❤️",
    title: "Well-Being",
    maps: "Maps to: LIFE",
    needs: "Physiological & Safety",
    desc: "Healthcare access, life expectancy, mortality rates, and food security. Are you healthy enough to dream?",
  },
  {
    icon: "🏛️",
    title: "Social Trust",
    maps: "Maps to: LIBERTY",
    needs: "Belonging & Esteem",
    desc: "Voter registration, turnout, polling access. Do you believe the system hears you? Can you even reach it?",
  },
  {
    icon: "🤝",
    title: "Community",
    maps: "Maps to: LIBERTY",
    needs: "Belonging & Esteem",
    desc: "Crime rates, volunteerism, charitable giving. Do your neighbors know your name? Would they help if you needed it?",
  },
];

const questions = [
  {
    id: "zip",
    type: "text",
    label: "Step 1 of 6",
    question: "What is your zip code?",
    placeholder: "e.g. 90210",
    demographic: true,
    note: "Demographic context only — not calculated in your score. Source: U.S. Census Bureau.",
  },
  {
    id: "age",
    type: "options",
    label: "Step 2 of 6",
    question: "What is your age?",
    options: ["Under 18", "18–34", "35–54", "55–64", "65 or older"],
    demographic: true,
    note: "Demographic context only — not calculated in your score. Source: U.S. Census Bureau.",
  },
  {
    id: "income",
    type: "options",
    label: "Step 3 of 6",
    question: "Which best describes your household income?",
    options: ["Under $35,000", "$35,000–$74,999", "$75,000–$124,999", "$125,000 or more"],
    note: "30% weight · Economic Standing pillar. U.S. median household income: $83,730 (Census Bureau CPS ASEC 2024).",
  },
  {
    id: "healthcare",
    type: "options",
    label: "Step 4 of 6",
    question: "Do you currently have health insurance?",
    options: ["Yes, employer-provided", "Yes, government program (Medicaid/Medicare)", "Yes, self-purchased", "No, I am uninsured"],
    note: "25% weight · Well-Being pillar. 92% of Americans had coverage in 2024 (Census Bureau CPS ASEC 2024).",
  },
  {
    id: "volunteer",
    type: "options",
    label: "Step 5 of 6",
    question: "Do you currently volunteer with any organizations?",
    options: ["Yes, regularly (monthly or more)", "Yes, occasionally (a few times a year)", "Not currently, but I have in the past", "No, I have never volunteered"],
    note: "25% weight · Community pillar. 28.3% of Americans formally volunteered in 2023 (AmeriCorps/Census Bureau Civic Life Survey 2023).",
  },
  {
    id: "voting",
    type: "options",
    label: "Step 6 of 6",
    question: "Are you registered to vote?",
    options: ["Yes, and I vote in most elections", "Yes, but I rarely vote", "No, but I plan to register", "No, and I don't plan to register"],
    note: "20% weight · Social Trust pillar. 73.6% of citizen voting-age Americans were registered in 2024 (Census Bureau CPS Voting Supplement 2024).",
  },
];

function computeScore(answers) {
  // --- Economic Standing (30% weight) ---
  // Benchmarked to Census Bureau CPS ASEC 2024 — median household income $83,730
  // Brackets reflect where each range sits relative to the national median
  const incomeMap = {
    "Under $35,000": 22,          // below poverty-adjacent threshold; bottom ~20%
    "$35,000–$74,999": 50,        // below national median of $83,730
    "$75,000–$124,999": 74,       // near/above national median
    "$125,000 or more": 93,       // top ~20%; well above national median
  };
  const economic = incomeMap[answers.income] || 50;

  // --- Well-Being (25% weight) ---
  // Benchmarked to Census Bureau CPS ASEC 2024 — 92% insured, ~8% uninsured
  const healthMap = {
    "Yes, employer-provided": 88,
    "Yes, government program (Medicaid/Medicare)": 74,
    "Yes, self-purchased": 68,
    "No, I am uninsured": 18,     // ~8% of Americans; significant barrier
  };
  const wellbeing = healthMap[answers.healthcare] || 50;

  // --- Community (25% weight) ---
  // Benchmarked to AmeriCorps/Census Bureau Civic Life Survey 2023 — 28.3% formal volunteer rate
  const volunteerMap = {
    "Yes, regularly (monthly or more)": 90,         // well above 28.3% national rate
    "Yes, occasionally (a few times a year)": 62,   // at or near national benchmark
    "Not currently, but I have in the past": 38,    // disengaged but experienced
    "No, I have never volunteered": 18,             // below national participation rate
  };
  const community = volunteerMap[answers.volunteer] || 50;

  // --- Social Trust (20% weight) ---
  // Benchmarked to Census Bureau CPS Voting Supplement 2024 — 73.6% registered nationally
  const votingMap = {
    "Yes, and I vote in most elections": 90,   // registered + consistently participates
    "Yes, but I rarely vote": 55,              // registered but disengaged
    "No, but I plan to register": 32,          // unregistered; aspirational
    "No, and I don't plan to register": 15,   // fully disengaged from civic process
  };
  const social = votingMap[answers.voting] || 50;

  // --- Total: weighted average ---
  // Weights: Economic Standing 30%, Well-Being 25%, Community 25%, Social Trust 20%
  const total = Math.round(
    economic * 0.30 +
    wellbeing * 0.25 +
    community * 0.25 +
    social * 0.20
  );

  return { total, economic, wellbeing, social, community };
}

function getScoreLabel(score) {
  if (score >= 80) return "Strong Foundation";
  if (score >= 60) return "Building Momentum";
  if (score >= 40) return "Facing Headwinds";
  return "Structural Barriers Present";
}

function getAiInsight(scores, answers) {
  const label = getScoreLabel(scores.total);
  const zip = answers.zip || "your area";
  const age = answers.age ? `at age ${answers.age}` : "";

  const pillarDetails = {
    "Economic Standing": {
      score: scores.economic,
      context: "The U.S. median household income was $83,730 in 2024 (Census Bureau CPS ASEC 2024). Your income bracket shapes access to housing, credit, and long-term wealth building.",
    },
    "Well-Being": {
      score: scores.wellbeing,
      context: "92% of Americans had health insurance in 2024 (Census Bureau CPS ASEC 2024). The uninsured face significantly higher barriers to preventive and emergency care.",
    },
    "Community": {
      score: scores.community,
      context: "28.3% of Americans formally volunteered through an organization in 2023 — the largest recorded expansion of volunteerism in U.S. history (AmeriCorps/Census Bureau Civic Life Survey 2023).",
    },
    "Social Trust": {
      score: scores.social,
      context: "73.6% of citizen voting-age Americans were registered to vote in 2024 — the most recent data from the Census Bureau CPS Voting Supplement.",
    },
  };

  const lowestPillar = Object.entries(pillarDetails).sort((a, b) => a[1].score - b[1].score)[0];
  const highestPillar = Object.entries(pillarDetails).sort((a, b) => b[1].score - a[1].score)[0];

  return `Your Tobin Index of ${scores.total} ${age} reflects a profile we'd describe as "${label}" — a composite reading of your economic position, health access, civic participation, and community engagement relative to the promises embedded in the Declaration of Independence. Zip code ${zip} provides important geographic context, as local infrastructure, employment density, and public services significantly shape what's achievable.\n\nYour strongest pillar is ${highestPillar[0]} (${highestPillar[1].score}/100). Your lowest pillar is ${lowestPillar[0]} (${lowestPillar[1].score}/100). ${lowestPillar[1].context} Focusing here first — whether through local resource programs, community organizations, or civic participation — is likely to yield the most meaningful gains in your overall index.\n\nThe gap between your current score and 100 is not a measure of failure. It is a measure of what the system still owes you.`;
}

// ─── SUPABASE CONFIG ───────────────────────────────────────────────────────
const SUPABASE_URL = "https://byzafxumlampwbwcivqt.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ5emFmeHVtbGFtcHdid2NpdnF0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY5MDUwMzQsImV4cCI6MjA5MjQ4MTAzNH0.C5JzxL9Kepv0qnN2i2IxrgDuV96lVvTqemvBgrf63DA";

async function saveResponse(answers, scores) {
  try {
    const payload = {
      zip:              answers.zip || null,
      age:              answers.age || null,
      income:           answers.income || null,
      healthcare:       answers.healthcare || null,
      volunteer:        answers.volunteer || null,
      voting:           answers.voting || null,
      score_economic:   scores.economic,
      score_wellbeing:  scores.wellbeing,
      score_social:     scores.social,
      score_community:  scores.community,
      score_total:      scores.total,
      created_at:       new Date().toISOString(),
    };
    const res = await fetch(`${SUPABASE_URL}/rest/v1/responses`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "apikey": SUPABASE_ANON_KEY,
        "Authorization": `Bearer ${SUPABASE_ANON_KEY}`,
        "Prefer": "return=minimal",
      },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      console.error("Supabase save failed:", res.status, await res.text());
    }
  } catch (err) {
    console.error("Supabase error:", err);
  }
}

export default function TobinIndex() {
  const [page, setPage] = useState("home"); // home | assess | results
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [scores, setScores] = useState(null);
  const [animating, setAnimating] = useState(false);
  const [saving, setSaving] = useState(false);

  const progress = (step / questions.length) * 100;

  function startAssess() {
    setStep(0);
    setAnswers({});
    setPage("assess");
  }

  function handleAnswer(id, value) {
    setAnswers((prev) => ({ ...prev, [id]: value }));
  }

  async function next() {
    const q = questions[step];
    if (q.type === "text" && !answers[q.id]) return;
    if (step < questions.length - 1) {
      setAnimating(true);
      setTimeout(() => { setStep((s) => s + 1); setAnimating(false); }, 150);
    } else {
      const s = computeScore(answers);
      setScores(s);
      setSaving(true);
      await saveResponse(answers, s);
      setSaving(false);
      setPage("results");
    }
  }

  function back() {
    if (step === 0) setPage("home");
    else setStep((s) => s - 1);
  }

  const q = questions[step];
  const canNext = answers[q?.id];

  return (
    <>
      <style>{style}</style>

      {/* HOME */}
      {page === "home" && (
        <div>
          <header className="header">
            <div className="header-logo"><span>Tobin</span> Index</div>
            <nav className="header-nav">
              <span className="nav-link">About</span>
              <span className="nav-link">Methodology</span>
              <button className="nav-cta" onClick={startAssess}>Find Your Score</button>
            </nav>
          </header>

          <section className="hero">
            <div className="hero-left">
              <div>
                <p className="hero-eyebrow fade-up">An American Framework</p>
                <h1 className="hero-headline fade-up-2">
                  Closing the gap between the <em>American Dream</em> and American Reality.
                </h1>
        <p className="hero-sub fade-up-3">
                  An AI-powered framework that maps where you are, shows you what's available, and walks with you toward the life this country promised.
                </p>
              </div>
              <div className="hero-actions fade-up-3">
                <button className="btn-primary" onClick={startAssess}>Find Your Index Score</button>
                <button className="btn-secondary">Learn more ↓</button>
              </div>
            </div>
            <div className="hero-right">
              <blockquote className="quote-text">
                "We hold these truths to be self-evident, that all men are created equal, that they are endowed with certain unalienable Rights, that among these are Life, Liberty and the pursuit of Happiness."
              </blockquote>
              <p className="quote-attr">— Declaration of Independence, 1776</p>
              <div className="index-display">
                <p className="index-label">Sample Index Score</p>
                <div className="index-number">63</div>
                <p className="index-caption">Building Momentum — 37 points remain</p>
              </div>
            </div>
          </section>

          <section className="pillars-section">
            <div className="section-rule">
              <hr /><span className="section-rule-label">The Four Pillars</span><hr />
            </div>
            <div className="pillars-intro">
              <h2>Four Pillars. Three Promises. One Index.</h2>
              <p>The Tobin Index maps Maslow's hierarchy of needs to the Declaration of Independence's foundational promises — then measures where the system is keeping that promise, and where it isn't.</p>
            </div>
            <div className="pillars-grid">
              {pillars.map((p, i) => (
                <div className="pillar" key={i}>
                  <span className="pillar-icon">{p.icon}</span>
                  <p className="pillar-number">0{i + 1}</p>
                  <h3 className="pillar-title">{p.title}</h3>
                  <p className="pillar-maps">{p.maps} — {p.needs}</p>
                  <p className="pillar-desc">{p.desc}</p>
                </div>
              ))}
            </div>
            <div className="pillars-summit">
              <p className="summit-label">When all four pillars rise together</p>
              <h3 className="summit-title">The Pursuit of Happiness</h3>
              <p className="summit-desc">Self-Actualization — the full promise of the Declaration, fulfilled.</p>
            </div>
          </section>

          <section className="cta-section">
            <div className="cta-left">
              <h2>The first step is knowing where you stand.</h2>
              <p>Enter your zip code. Answer a few questions. In two minutes, you'll see your Tobin Index — and an AI guide will help you understand what it means and what you can do about it.</p>
              <div className="cta-steps">
                {["Enter your zip code and age", "Answer 4 scored questions", "Receive your Index score", "Get an AI-guided action plan"].map((s, i) => (
                  <div className="cta-step" key={i}>
                    <span className="step-num">0{i + 1}</span>
                    <span className="step-text">{s}</span>
                  </div>
                ))}
              </div>
              <button className="btn-primary" onClick={startAssess}>Start Your Assessment</button>
            </div>
            <div className="cta-right">
              <div className="maslow-diagram">
                {[
                  { cls: "tier-5", label: "Self-Actualization" },
                  { cls: "tier-4", label: "Esteem" },
                  { cls: "tier-3", label: "Belonging" },
                  { cls: "tier-2", label: "Safety" },
                  { cls: "tier-1", label: "Physiological" },
                ].map((t) => (
                  <div key={t.cls} className={`maslow-tier ${t.cls}`}>{t.label}</div>
                ))}
              </div>
            </div>
          </section>

          <footer className="footer">
            <div className="footer-logo">Tobin Index</div>
            <p className="footer-copy">An AI-powered civic framework for American opportunity.</p>
          </footer>
        </div>
      )}

      {/* SAVING OVERLAY */}
      {saving && (
        <div style={{ position: "fixed", inset: 0, background: "var(--paper)", zIndex: 300, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "1rem" }}>
          <p style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.7rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--gold)" }}>✦ Saving your response…</p>
          <p style={{ fontSize: "0.85rem", color: "var(--muted)", fontWeight: 300 }}>Just a moment while we record your results.</p>
        </div>
      )}

      {/* ASSESSMENT */}
      {page === "assess" && (
        <div className="assess-overlay">
          <div className="assess-header">
            <div className="assess-logo">Tobin Index — Assessment</div>
            <button className="assess-close" onClick={() => setPage("home")}>×</button>
          </div>
          <div className="assess-progress">
            <div className="assess-progress-bar" style={{ width: `${progress}%` }} />
          </div>
          <div className="assess-body">
            {!animating && (
              <>
                <p className="assess-step-label fade-up">{q.label}</p>
                {q.demographic && (
                  <p style={{ display: "inline-block", marginBottom: "0.75rem", fontFamily: "'DM Mono', monospace", fontSize: "0.62rem", letterSpacing: "0.15em", textTransform: "uppercase", background: "var(--cream)", border: "1px solid var(--rule)", padding: "0.3rem 0.7rem", color: "var(--muted)" }}>
                    Demographic info only — not included in score
                  </p>
                )}
                <h2 className="assess-question fade-up-2">{q.question}</h2>
                {q.type === "text" ? (
                  <input
                    className="assess-input fade-up-3"
                    type="text"
                    placeholder={q.placeholder}
                    value={answers[q.id] || ""}
                    onChange={(e) => handleAnswer(q.id, e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && canNext && next()}
                    autoFocus
                  />
                ) : (
                  <div className="assess-options fade-up-2">
                    {q.options.map((opt) => (
                      <button
                        key={opt}
                        className={`assess-option ${answers[q.id] === opt ? "selected" : ""}`}
                        onClick={() => {
                          handleAnswer(q.id, opt);
                          setTimeout(next, 200);
                        }}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                )}
                {q.note && (
                  <p style={{ marginTop: "1.5rem", fontSize: "0.72rem", color: "var(--muted)", fontFamily: "'DM Mono', monospace", lineHeight: 1.6 }}>
                    ↳ {q.note}
                  </p>
                )}
                <div className="assess-nav">
                  <button className="assess-back" onClick={back}>← Back</button>
                  {q.type === "text" && (
                    <button
                      className="btn-primary"
                      onClick={next}
                      disabled={!canNext}
                      style={{ opacity: canNext ? 1 : 0.4 }}
                    >
                      Continue →
                    </button>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* RESULTS */}
      {page === "results" && scores && (
        <div className="assess-overlay">
          <div className="assess-header">
            <div className="assess-logo">Tobin Index — Results</div>
            <button className="assess-close" onClick={() => setPage("home")}>×</button>
          </div>
          <div className="results-body">
            <p className="results-eyebrow fade-up">Your Tobin Index</p>
            <h1 className="results-headline fade-up-2">
              {getScoreLabel(scores.total)}
            </h1>
            <p className="results-sub fade-up-3">
              Based on your responses, here's how the system measures up to its promises for you.
            </p>

            <div className="score-display fade-up">
              <div className="big-score">{scores.total}</div>
              <div>
                <p className="score-label">Overall Tobin Index</p>
                <p className="score-desc">"{getScoreLabel(scores.total)}"</p>
                <div className="score-bar-wrap">
                  <div className="score-bar" style={{ width: `${scores.total}%` }} />
                </div>
                <p style={{ fontSize: "0.78rem", color: "var(--muted)", marginTop: "0.5rem" }}>
                  {100 - scores.total} points remain toward full promise
                </p>
              </div>
            </div>

            <div className="pillar-scores fade-up-2">
              {[
                { icon: "📊", title: "Economic", score: scores.economic, weight: "30%" },
                { icon: "❤️", title: "Well-Being", score: scores.wellbeing, weight: "25%" },
                { icon: "🤝", title: "Community", score: scores.community, weight: "25%" },
                { icon: "🏛️", title: "Social Trust", score: scores.social, weight: "20%" },
              ].map((p) => (
                <div className="pillar-score" key={p.title}>
                  <span className="ps-icon">{p.icon}</span>
                  <p className="ps-title">{p.title}</p>
                  <p style={{ fontSize: "0.6rem", fontFamily: "'DM Mono', monospace", color: "var(--gold)", marginBottom: "0.4rem" }}>{p.weight} weight</p>
                  <p className="ps-score">{p.score}</p>
                  <div className="ps-bar-wrap">
                    <div className="ps-bar" style={{ width: `${p.score}%` }} />
                  </div>
                </div>
              ))}
            </div>

            <div className="ai-insight fade-up-3">
              <p className="ai-label">✦ AI Guide Insight</p>
              {getAiInsight(scores, answers).split('\n\n').map((para, i) => (
                <p key={i} className="ai-text" style={{ marginBottom: i < 2 ? "1rem" : 0 }}>{para}</p>
              ))}
            </div>

            {/* DATA ATTRIBUTION */}
            <div style={{ marginTop: "2rem", padding: "1.5rem 2rem", border: "1px solid var(--rule)", background: "var(--cream)" }}>
              <p style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.62rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--gold)", marginBottom: "1rem" }}>
                ✦ Data Sources &amp; Methodology
              </p>
              <p style={{ fontSize: "0.78rem", color: "var(--muted)", lineHeight: 1.7, fontWeight: 300, marginBottom: "0.75rem" }}>
                Your Tobin Index score is calculated using a weighted composite of four pillars, each benchmarked against the most recent complete national data available from the U.S. Census Bureau and AmeriCorps.
              </p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
                {[
                  { pillar: "Economic Standing", weight: "30%", source: "U.S. Census Bureau — Current Population Survey Annual Social and Economic Supplement (CPS ASEC) 2024", benchmark: "National median household income: $83,730" },
                  { pillar: "Well-Being", weight: "25%", source: "U.S. Census Bureau — CPS ASEC 2024", benchmark: "92% of Americans had health insurance coverage; 8% uninsured" },
                  { pillar: "Community", weight: "25%", source: "AmeriCorps & U.S. Census Bureau — Civic Engagement and Volunteering Survey (CEV) 2023", benchmark: "28.3% of Americans formally volunteered through an organization" },
                  { pillar: "Social Trust", weight: "20%", source: "U.S. Census Bureau — Current Population Survey Voting and Registration Supplement 2024", benchmark: "73.6% of citizen voting-age population was registered to vote" },
                ].map((d) => (
                  <div key={d.pillar} style={{ padding: "1rem", background: "var(--paper)", border: "1px solid var(--rule)" }}>
                    <p style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.6rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--gold)", marginBottom: "0.3rem" }}>
                      {d.pillar} · {d.weight} weight
                    </p>
                    <p style={{ fontSize: "0.78rem", color: "var(--ink)", fontWeight: 500, marginBottom: "0.3rem" }}>{d.benchmark}</p>
                    <p style={{ fontSize: "0.72rem", color: "var(--muted)", lineHeight: 1.5 }}>{d.source}</p>
                  </div>
                ))}
              </div>
              <p style={{ marginTop: "1rem", fontSize: "0.7rem", color: "var(--muted)", fontFamily: "'DM Mono', monospace", lineHeight: 1.6 }}>
                Zip code and age are collected for demographic context only and are not included in score calculations. Scores reflect your responses relative to national benchmarks — not a judgment of individual worth or effort.
              </p>
            </div>

            <div style={{ marginTop: "2.5rem", display: "flex", gap: "1rem" }}>
              <button className="btn-primary" onClick={startAssess}>Retake Assessment</button>
              <button className="btn-secondary" onClick={() => setPage("home")}>Return home</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}