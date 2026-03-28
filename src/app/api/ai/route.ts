import { NextResponse } from 'next/server';
import OpenAI from 'openai';

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  try {
    const openai = new OpenAI();
    
    const body = await req.json();
    const { messages, contextData } = body;
    const { dhsiScore, unemployment, inflation, mortgageRate, context } = contextData;

    const systemPrompt = `You are an expert AI economic analyst integrated into the "Dynamic Housing Stress Index" (DHSI) monitoring dashboard. 
Your sole purpose is to answer questions related to the housing market, macroeconomic conditions, mortgage rates, early-warning signals, affordability, and the DHSI framework.

GUARDRAILS:
- If the user asks about ANY unrelated topic (e.g., coding, general knowledge, pop culture, non-financial advice), you MUST politely decline and steer the conversation back to housing market economics.
- Do not provide direct, personalized financial or investment advice. Frame answers analytically.

CURRENT DASHBOARD STATE:
- DHSI Composite Score: ${dhsiScore} / 100 (Scores > 75 indicate High Systemic Stress, < 50 indicate Stability)
- Unemployment Rate: ${unemployment}%
- Inflation (CPI YoY): ${inflation}%
- 30-Year Mortgage Rate: ${mortgageRate}%
${context ? `- User Context/Simulation applied: ${context}` : ''}

Use this real-time data to contextualize your answers. Keep responses highly insightful, analytical, and concise (1-3 paragraphs max).`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        { role: "system", content: systemPrompt },
        ...messages
      ],
      temperature: 0.5,
      max_tokens: 400,
    });

    return NextResponse.json({ 
      insight: completion.choices[0].message.content,
      role: 'assistant'
    });
  } catch (error) {
    console.error("OpenAI API Error:", error);
    return NextResponse.json(
      { insight: "Unable to generate AI insights at this time. Please ensure the OPENAI_API_KEY environment variable is configured correctly in Vercel." }, 
      { status: 500 }
    );
  }
}
