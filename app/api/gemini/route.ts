// app/api/gemini/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize the Google Generative AI client
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export async function POST(req: NextRequest) {
  try {
    // Parse the request body
    const { description, category, subcategory } = await req.json();
    
    // Validate input
    if (!description || !category) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Create a prompt for the Gemini model, including subcategory if available
    const subcategoryText = subcategory ? ` (subcategory: ${subcategory})` : '';
    
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

    // Use the latest model name format - either gemini-1.5-pro or gemini-1.0-pro
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
    
    // Configure structured output
    const generationConfig = {
      temperature: 0.7,
      topP: 0.8,
      topK: 40,
    };

    // Call the Gemini API
    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      generationConfig,
    });
    
    const response = result.response;
    const text = response.text();
    
    // Extract the JSON response
    let jsonResponse;
    try {
      // Find JSON in the response (it might be wrapped in markdown code blocks)
      const jsonMatch = text.match(/```json\s*({[\s\S]*?})\s*```/) || 
                        text.match(/({[\s\S]*"analysis"[\s\S]*})/);
      
      if (jsonMatch && jsonMatch[1]) {
        jsonResponse = JSON.parse(jsonMatch[1]);
      } else {
        jsonResponse = JSON.parse(text);
      }
    } catch (error) {
      console.error('Failed to parse Gemini response:', text);
      console.log(error);
      
      // Fallback: Create a structured response from the text
      jsonResponse = {
        score: 5,
        sentiment: "neutral",
        categoryMatch: 50,
        analysis: text.substring(0, 500) + (text.length > 500 ? "..." : "")
      };
    }

    // Return the analysis results
    return NextResponse.json(jsonResponse);
  } catch (error) {
    console.error('Error processing request:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}