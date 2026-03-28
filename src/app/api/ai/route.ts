import { NextResponse } from 'next/server';
import OpenAI from 'openai';

// By default, it will use process.env.OPENAI_API_KEY
const openai = new OpenAI();

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { dhsiScore, unemployment, inflation, mortgageRate, context } = body;

    const prompt = `You are an expert economic analyst for the "Dynamic Housing Stress Index" (DHSI) monitoring framework. 
The current or simulated market conditions are as follows:
- DHSI Composite Score: ${dhsiScore} / 100 (Scores > 75 indicate High Stress, < 50 indicate Stability)
- Unemployment Rate: ${unemployment}%
- Inflation (CPI YoY): ${inflation}%
- 30-Year Mortgage Rate: ${mortgageRate}%

${context ? `Additional user context: ${context}` : ''}

Provide a concise, 2-3 sentence executive analysis of the systemic vulnerability in the housing market based on these specific indicators. 
Focus on early-warning signals, affordability pressures, and credit/labor stress. Do not use generic filler language.`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.4,
    });

    return NextResponse.json({ insight: completion.choices[0].message.content });
  } catch (error) {
    console.error("OpenAI API Error:", error);
    return NextResponse.json(
      { insight: "Unable to generate AI insights at this time. Please ensure the OPENAI_API_KEY environment variable is configured correctly in Vercel." }, 
      { status: 500 }
    );
  }
}
