import { GoogleGenAI, Type } from "@google/genai";
import { SaleRecord, Insight } from "../types";

export const generateInsights = async (data: SaleRecord[]): Promise<Insight[]> => {
  // Always use the latest GoogleGenAI initialization pattern with named parameters
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  // Calculate some basic stats to feed the AI
  const totalSales = data.reduce((sum, item) => sum + item.sales, 0);
  const totalProfit = data.reduce((sum, item) => sum + item.profit, 0);
  const avgMargin = (totalProfit / totalSales) * 100;
  
  const regions = [...new Set(data.map(d => d.region))];
  const regionStats = regions.map(r => {
    const rSales = data.filter(d => d.region === r).reduce((s, d) => s + d.sales, 0);
    return { region: r, sales: rSales, share: (rSales / totalSales) * 100 };
  });

  const prompt = `Analyze this sales summary data and provide 5 critical business insights in a JSON array format.
  Each insight should have an 'id', 'text' (the observation), and a 'type' ('success', 'warning', or 'info').
  
  Data Summary:
  - Total Sales: $${totalSales.toFixed(2)}
  - Total Profit: $${totalProfit.toFixed(2)}
  - Average Profit Margin: ${avgMargin.toFixed(1)}%
  - Regional Performance: ${JSON.stringify(regionStats)}
  
  Example insight: "The West region contributes 38% of total sales, outperforming all other territories."
  Focus on storytelling and actionable data observations.`;

  try {
    // Upgraded to gemini-3-pro-preview for higher-quality business reasoning tasks
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              id: { type: Type.STRING },
              text: { type: Type.STRING },
              type: { type: Type.STRING, enum: ['success', 'warning', 'info'] }
            },
            required: ["id", "text", "type"]
          }
        }
      }
    });

    // Directly access the .text property of GenerateContentResponse
    const text = response.text;
    if (!text) return getDefaultInsights();
    return JSON.parse(text);
  } catch (error) {
    console.error("Failed to generate AI insights:", error);
    return getDefaultInsights();
  }
};

const getDefaultInsights = (): Insight[] => [
  { id: '1', text: "Total Sales are distributed across categories with Technology leading the volume.", type: 'info' },
  { id: '2', text: "Several high-value furniture orders are impacting overall profitability due to low margins.", type: 'warning' },
  { id: '3', text: "The West region consistently shows the highest average order value.", type: 'success' },
  { id: '4', text: "Consumer segment represents the largest portion of your customer base.", type: 'info' },
  { id: '5', text: "Calculated profit margins are currently stable but need monitoring in the Furniture category.", type: 'info' }
];
