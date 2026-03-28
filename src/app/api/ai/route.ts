import { NextResponse } from 'next/server';
import OpenAI from 'openai';

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  try {
    const openai = new OpenAI();
    
    const body = await req.json();
    const { messages, contextData } = body;
    const { dhsiScore, unemployment, inflation, mortgageRate, context } = contextData || {};

    const systemPrompt = `You are an expert AI economic analyst integrated into the "Dynamic Housing Stress Index" (DHSI) monitoring dashboard. 
Your sole purpose is to answer questions related to the housing market, macroeconomic conditions, mortgage rates, early-warning signals, affordability, and the DHSI framework.

GUARDRAILS:
- If the user asks about ANY unrelated topic, you MUST politely decline and steer the conversation back to housing market economics.
- Do not provide direct, personalized financial or investment advice.

CURRENT DASHBOARD STATE:
- DHSI Composite Score: ${dhsiScore || 0} / 100 (Scores > 75 indicate High Systemic Stress, < 50 indicate Stability)
- Unemployment Rate: ${unemployment || 0}%
- Inflation (CPI YoY): ${inflation || 0}%
- 30-Year Mortgage Rate: ${mortgageRate || 0}%
${context ? `- User Context/Simulation applied: ${context}` : ''}

You MUST respond in pure JSON format with exactly two fields:
1. "insight": Your detailed analytical response, applying the current dashboard data where relevant (1-3 paragraphs max). Use markdown formatting for readability.
2. "suggestedQuestions": An array of exactly 3 highly relevant, contextual follow-up questions the user should ask you next.`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      response_format: { type: "json_object" },
      messages: [
        { role: "system", content: systemPrompt },
        ...messages
      ],
      temperature: 0.5,
      max_tokens: 500,
    });

    const responseText = completion.choices[0].message.content || '{}';
    let responseData;
    
    try {
      responseData = JSON.parse(responseText);
    } catch (e) {
      console.error("Failed to parse JSON", e);
      responseData = { insight: responseText, suggestedQuestions: [] };
    }

    return NextResponse.json({ 
      insight: responseData.insight || "I am currently unable to generate insights.",
      suggestedQuestions: responseData.suggestedQuestions || [],
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
