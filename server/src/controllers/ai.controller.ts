import { Request, Response } from "express";
import { GoogleGenAI, Type } from "@google/genai";
import { ENV } from "../config/env";

// In-memory fallback classifier (matches simulateAIClassification from frontend)
function runFallbackClassification(prompt: string) {
  const p = prompt.toLowerCase();
  
  let style = "Transitional";
  let budgetTier = "$$";
  let explanation = "Rule-based backup optimizer. ";
  
  const selections: Record<string, string> = {
    cabinets: "repaint",
    countertops: "butcher-block",
    flooring: "laminate-floor",
    paint: "premium-paint",
    backsplash: "ceramic-tile",
    sink: "undermount-stainless",
    faucet: "pulldown",
    appliances: "basic-package",
    lighting: "recessed"
  };

  if (p.includes("modern") || p.includes("sleek") || p.includes("minimalist") || p.includes("contemporary") || p.includes("black")) {
    style = "Modern / Contemporary";
    explanation += "Detected modern architectural tastes. ";
    selections.paint = "premium-paint";
    selections.lighting = "recessed";
    selections.faucet = "pulldown";
  } else if (p.includes("rustic") || p.includes("farmhouse") || p.includes("cozy") || p.includes("country") || p.includes("wood")) {
    style = "Modern Farmhouse";
    explanation += "Detected rustic farmhouse features. ";
    selections.sink = "farmhouse";
    selections.countertops = "butcher-block";
    selections.flooring = "tile";
  } else if (p.includes("luxury") || p.includes("grand") || p.includes("high-end") || p.includes("expensive") || p.includes("rich")) {
    style = "Premium Editorial / Luxury";
    explanation += "High-end specs requested. ";
  }

  if (p.includes("budget") || p.includes("cheap") || p.includes("economical") || p.includes("low cost")) {
    budgetTier = "$";
    explanation += "Tailored for maximum thrift and cost savings.";
    selections.cabinets = "repaint";
    selections.countertops = "laminate";
    selections.flooring = "vinyl";
    selections.paint = "standard-paint";
    selections.backsplash = "none";
    selections.sink = "standard-sink";
    selections.faucet = "basic-faucet";
    selections.appliances = "keep-existing-app";
    selections.lighting = "standard-lighting";
  } else if (p.includes("luxury") || p.includes("expensive") || p.includes("premium") || p.includes("best")) {
    budgetTier = "$$$$";
    explanation += "Assembled the absolute highest tier bespoke components.";
    selections.cabinets = "custom";
    selections.countertops = "marble";
    selections.flooring = "hardwood";
    selections.paint = "designer-paint";
    selections.backsplash = "natural-stone";
    selections.sink = "workstation";
    selections.faucet = "touchless";
    selections.appliances = "premium-package";
    selections.lighting = "smart-lighting";
  }

  // Material adjustments
  if (p.includes("quartz")) selections.countertops = "quartz";
  if (p.includes("granite")) selections.countertops = "granite";
  if (p.includes("marble")) selections.countertops = "marble";
  if (p.includes("hardwood") || p.includes("wood floor") || p.includes("oak")) selections.flooring = "hardwood";
  if (p.includes("tile") || p.includes("slate")) selections.flooring = "tile";
  if (p.includes("vinyl") || p.includes("lvp")) selections.flooring = "vinyl";

  return { style, budgetTier, explanation, selections };
}

// Lazy load Google Gen AI Client if key exists
let aiClient: GoogleGenAI | null = null;

function getGeminiClient(): GoogleGenAI | null {
  if (!aiClient && ENV.GEMINI_API_KEY) {
    aiClient = new GoogleGenAI({
      apiKey: ENV.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiClient;
}

export const AIController = {
  async getDesignSuggestions(req: Request, res: Response) {
    const { prompt } = req.body;

    if (!prompt || typeof prompt !== "string") {
      res.status(400).json({ message: "A design prompt description is required" });
      return;
    }

    const ai = getGeminiClient();

    if (!ai) {
      // Graceful local fallback if API key is not configured yet
      console.warn("GEMINI_API_KEY is not defined. Falling back to local classifier.");
      const suggestions = runFallbackClassification(prompt);
      res.json(suggestions);
      return;
    }

    const maxAttempts = 3;
    let attempt = 0;
    let response: any = null;
    let lastError: any = null;

    while (attempt < maxAttempts) {
      try {
        attempt++;
        response = await ai.models.generateContent({
          model: "gemini-3.5-flash",
          contents: `You are an AI Blueprint Designer for NOLA BUILDS.
Evaluate this design idea: "${prompt}"

Provide design recommendations. Map them into the appropriate material selections.
The material options must be:
- cabinets: "repaint" (Repainted existing cabinets), "stock" (Stock laminate/veneer cabinets), or "custom" (Bespoke custom hardwoods)
- countertops: "laminate", "butcher-block" (Butcher block wood), "quartz" (Engineered Quartz), "granite" (Natural granite), "marble" (Bespoke high-end marble)
- flooring: "vinyl", "laminate-floor", "tile" (Ceramic / Porcelain / Slate Tile), "hardwood" (Engineered hardwood / Oak / Pine)
- paint: "standard-paint", "premium-paint", "designer-paint"
- backsplash: "none", "ceramic-tile", "subway-tile", "glass-tile", "natural-stone"
- sink: "standard-sink", "undermount-stainless", "farmhouse" (Cozy apron sink), "workstation" (Large professional prep sink)
- faucet: "basic-faucet", "pulldown" (Commercial style pull-down spray), "touchless" (Motion-activated smart faucet)
- appliances: "keep-existing-app", "basic-package", "mid-range-package", "premium-package"
- lighting: "standard-lighting", "recessed", "smart-lighting"

Return a strictly formatted JSON response.`,
          config: {
            responseMimeType: "application/json",
            responseSchema: {
              type: Type.OBJECT,
              properties: {
                style: {
                  type: Type.STRING,
                  description: "Name of the design style (e.g. Modern Farmhouse, Mid-Century Modern, Coastal Cottage, French Quarter Luxury)"
                },
                budgetTier: {
                  type: Type.STRING,
                  description: "Budget indicator. Value must be strictly '$', '$$', '$$$', or '$$$$'"
                },
                explanation: {
                  type: Type.STRING,
                  description: "A short professional designer paragraph explaining the reasoning behind these recommendations."
                },
                selections: {
                  type: Type.OBJECT,
                  properties: {
                    cabinets: { type: Type.STRING },
                    countertops: { type: Type.STRING },
                    flooring: { type: Type.STRING },
                    paint: { type: Type.STRING },
                    backsplash: { type: Type.STRING },
                    sink: { type: Type.STRING },
                    faucet: { type: Type.STRING },
                    appliances: { type: Type.STRING },
                    lighting: { type: Type.STRING }
                  },
                  required: ["cabinets", "countertops", "flooring", "paint", "backsplash", "sink", "faucet", "appliances", "lighting"]
                }
              },
              required: ["style", "budgetTier", "explanation", "selections"]
            }
          }
        });
        break; // Success
      } catch (err: any) {
        lastError = err;
        console.warn(`Gemini API call attempt ${attempt} failed with error:`, err.message || err);
        if (attempt < maxAttempts) {
          const delay = Math.pow(2, attempt) * 500;
          await new Promise((resolve) => setTimeout(resolve, delay));
        }
      }
    }

    if (!response) {
      console.error("Gemini AI API Call failed after all attempts:", lastError);
      const suggestions = runFallbackClassification(prompt);
      res.json(suggestions);
      return;
    }

    try {
      const responseText = response.text;
      if (!responseText) {
        throw new Error("Empty response received from Gemini");
      }

      const parsed = JSON.parse(responseText.trim());
      res.json(parsed);
    } catch (error: any) {
      console.error("Failed to parse Gemini response or unexpected error:", error);
      // Fail safely to rule-based fallback
      const suggestions = runFallbackClassification(prompt);
      res.json(suggestions);
    }
  }
};
