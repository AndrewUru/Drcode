// app/api/gemini/route.ts
import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

// Inicializa el cliente de OpenAI con la API key
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // asegúrate de tener esta variable en .env.local
});

export async function POST(req: NextRequest) {
  try {
    const { description, category, subcategory } = await req.json();

    if (!description || !category) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const subcategoryText = subcategory ? ` (subcategory: ${subcategory})` : "";

    const prompt = `
      Analyze the following lead description for a ${category}${subcategoryText} business:
      "${description}"
      
      Please provide the following:
      1. A score from 1-10 indicating how promising this lead is (10 being highest)
      2. The sentiment of the description (positive, neutral, or negative)
      3. A percentage (0-100) indicating how well this lead matches the ${category}${subcategoryText} category
      4. A brief analysis of the lead's potential and any recommendations, taking into account both the category and subcategory if specified
      
      Format your response as a JSON object with the following structure:
      {
        "score": [number],
        "sentiment": [string],
        "categoryMatch": [number],
        "analysis": [string]
      }
    `;

    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.7,
    });

    console.log("OpenAI response:", JSON.stringify(completion, null, 2));

    const text = completion.choices[0]?.message?.content || "";

    // Removed unused variable 'jsonResponse'
    try {
      const jsonMatch =
        text.match(/```json\s*({[\s\S]*?})\s*```/) ||
        text.match(/({[\s\S]*"analysis"[\s\S]*})/);
      if (jsonMatch && jsonMatch[1]) {
        JSON.parse(jsonMatch[1]);
      } else {
        JSON.parse(text);
      }
    } catch {
      console.error("JSON parse fallback:", text);
      return NextResponse.json({
        score: 5,
        sentiment: "neutral",
        categoryMatch: 50,
        analysis: text.substring(0, 500) + (text.length > 500 ? "..." : ""),
      });
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error processing request:", error.message);
    } else {
      console.error("Error processing request:", error);
    }
    console.error("Error processing request:", error);

    return NextResponse.json(
      {
        error: "Internal server error",
        details: error instanceof Error ? error.message : "Unknown error",
        stack: error instanceof Error ? error.stack : null,
        openaiError:
          (error as { response?: { data?: unknown } })?.response?.data || null,
      },
      { status: 500 }
    );
  }
}
