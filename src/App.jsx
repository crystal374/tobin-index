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
    label: "Step 1 of 5",
    question: "What is your zip code?",
    placeholder: "e.g. 90210",
  },
  {
    id: "income",
    type: "options",
    label: "Step 2 of 5",
    question: "Which best describes your household income?",
    options: ["Under $25k", "$25k–$50k", "$50k–$100k", "Over $100k"],
  },
  {
    id: "housing",
    type: "options",
    label: "Step 3 of 5",
    question: "How would you describe your housing situation?",
    options: ["Own my home", "Renting — stable", "Renting — unstable", "Experiencing housing insecurity"],
  },
  {
    id: "healthcare",
    type: "options",
    label: "Step 4 of 5",
    question: "Do you currently have health insurance?",
    options: ["Yes, employer-provided", "Yes, government program", "Yes, self-purchased", "No, uninsured"],
  },
  {
    id: "civic",
    type: "options",
    label: "Step 5 of 5",
    question: "How engaged are you in your local community?",
    options: ["Very — I vote, volunteer, donate", "Somewhat — I vote regularly", "A little — occasionally", "Not at all"],
  },
];

function computeScore(answers) {
  const incomeMap = { "Under $25k": 30, "$25k–$50k": 50, "$50k–$100k": 70, "Over $100k": 90 };
  const housingMap = { "Own my home": 90, "Renting — stable": 65, "Renting — unstable": 40, "Experiencing housing insecurity": 15 };
  const healthMap = { "Yes, employer-provided": 85, "Yes, government program": 70, "Yes, self-purchased": 65, "No, uninsured": 25 };
  const civicMap = { "Very — I vote, volunteer, donate": 90, "Somewhat — I vote regularly": 65, "A little — occasionally": 40, "Not at all": 20 };

  const economic = Math.round(((incomeMap[answers.income] || 50) + (housingMap[answers.housing] || 50)) / 2);
  const wellbeing = healthMap[answers.healthcare] || 50;
  const social = Math.round((civicMap[answers.civic] || 50) * 0.9);
  const community = Math.round((civicMap[answers.civic] || 50) * 0.85);
  const total = Math.round((economic + wellbeing + social + community) / 4);

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
  const lowestPillar = Object.entries({
    "Economic Standing": scores.economic,
    "Well-Being": scores.wellbeing,
    "Social Trust": scores.social,
    "Community": scores.community,
  }).sort((a, b) => a[1] - b[1])[0];

  return `Your Tobin Index of ${scores.total} reflects a profile we'd describe as "${label}" — a composite reading of your economic position, health access, and civic engagement relative to the promises embedded in the Declaration of Independence. Zip code ${zip} provides important geographic context, as local infrastructure, employment density, and public services significantly shape what's achievable. Your lowest pillar is ${lowestPillar[0]} (${lowestPillar[1]}/100). Focusing here first — whether through local resource programs, community organizations, or civic participation — is likely to yield the most meaningful gains in your overall index. The gap between your current score and 100 is not a measure of failure; it is a measure of what the system still owes you.`;
}

export default function TobinIndex() {
  const [page, setPage] = useState("home"); // home | assess | results
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [scores, setScores] = useState(null);
  const [animating, setAnimating] = useState(false);

  const progress = ((step) / questions.length) * 100;

  function startAssess() {
    setStep(0);
    setAnswers({});
    setPage("assess");
  }

  function handleAnswer(id, value) {
    setAnswers((prev) => ({ ...prev, [id]: value }));
  }

  function next() {
    const q = questions[step];
    if (q.type === "text" && !answers[q.id]) return;
    if (step < questions.length - 1) {
      setAnimating(true);
      setTimeout(() => { setStep((s) => s + 1); setAnimating(false); }, 150);
    } else {
      const s = computeScore(answers);
      setScores(s);
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
                {["Enter your zip code", "Answer 4 quick questions", "Receive your Index score", "Get an AI-guided action plan"].map((s, i) => (
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
                { icon: "📊", title: "Economic", score: scores.economic },
                { icon: "❤️", title: "Well-Being", score: scores.wellbeing },
                { icon: "🏛️", title: "Social Trust", score: scores.social },
                { icon: "🤝", title: "Community", score: scores.community },
              ].map((p) => (
                <div className="pillar-score" key={p.title}>
                  <span className="ps-icon">{p.icon}</span>
                  <p className="ps-title">{p.title}</p>
                  <p className="ps-score">{p.score}</p>
                  <div className="ps-bar-wrap">
                    <div className="ps-bar" style={{ width: `${p.score}%` }} />
                  </div>
                </div>
              ))}
            </div>

            <div className="ai-insight fade-up-3">
              <p className="ai-label">✦ AI Guide Insight</p>
              <p className="ai-text">{getAiInsight(scores, answers)}</p>
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
