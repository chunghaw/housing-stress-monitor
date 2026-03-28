# Dynamic Housing Stress Index (DHSI) Monitor

Welcome to the **DHSI Monitor** — an interactive, early-warning framework designed to detect systemic vulnerabilities in the U.S. housing market before they escalate into structural crises. This project is developed as part of **CSE-6242: Data and Visual Analytics** at Georgia Tech.

---

## 📖 The Problem We're Solving
Historically, market observers have relied on simple, static price-to-income ratios to gauge housing affordability. However, these traditional metrics fundamentally ignore the complex, cumulative pressures building up in the macroeconomy. By looking at housing prices in a vacuum, they often fail to capture the cascading effects of inflation, changing labor environments, and credit tightening—missing the warning signs of a severe crisis until it's too late.

## 🚀 The Solution
We engineered the **Dynamic Housing Stress Index (DHSI)**. Our framework continuously aggregates granular historical and modern data (1991–2025) across several tightly integrated macroeconomic dimensions:
- **Labor Deterioration:** Unemployment rates and wage tracking (Sources: BLS & SSA)
- **Purchasing Power:** Consumer Price Index (Source: BLS)
- **Credit Risk & Leverage:** 30-Year Mortgage Rates & Effective Federal Funds Rates (Sources: FRED & Freddie Mac)
- **Asset Inflation:** National Housing Price Indices (Sources: Zillow & Freddie Mac)

By synthesizing these massive forces, the DHSI continuously calculates a systemic vulnerability proxy score, allowing us to dynamically map out the true structural strain on the housing market over time.

---

## ✨ Core Application Features
Our Next.js dashboard translates these massive datasets into an accessible, highly interactive UI suite:

- **Live Data Ingestion Pipeline:** 
  The dashboard dynamically parses our team's aggregated CSV datasets (`hpi.csv`) in real time, guaranteeing that the analytical Key Performance Indicators (Top Cards) always reflect the absolute latest macroeconomic environment (currently Q1 2025).

- **"What-If" Macro Simulations:** 
  Users can navigate to our interactive sandbox to manually adjust economic sliders—such as forcefully spiking the Federal Funds rate or simulating mass unemployment—to immediately project how severe those changes would shock the DHSI stress score.

- **Conversational AI Economic Analyst:** 
  We implemented a locally aware, OpenAI-powered (`gpt-4o`) conversational AI layer. Programmed with strict academic guardrails, the AI Analyst acts as your personal guide. It is contextually aware of the data you are currently viewing and the simulation sliders you have adjusted. It breaks down complex economic relationships in real-time, and even dynamically generates specific, clickable follow-up questions using structured JSON to help guide your analytical research.

- **Tableau Ecosystem Ready:** 
  The frontend includes a dedicated, seamless embedding container built explicitly to host our team's heavy-duty Tableau visualizations and Machine Learning (LASSO/Change-Point) models once the backend analytics pipeline is fully published.

---

## 🛠️ How to Run Locally

1. **Clone the repository:**
   ```bash
   git clone [your-repo-link]
   cd housing-stress-monitor
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure the AI Environment:**
   For the AI Economic Analyst to function, create a `.env` file in the root directory and securely add your OpenAI API Key:
   ```env
   OPENAI_API_KEY=your_openai_api_key_here
   ```

4. **Start the Development Server:**
   ```bash
   npm run dev
   ```

5. **Explore the Data:**
   Open [http://localhost:3000](http://localhost:3000) in your browser to view the interactive DHSI framework!
