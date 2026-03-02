const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config()
const genAI = new GoogleGenerativeAI(process.env.GEMINI_KEY);

exports.generateFollowUp = async (lead, activities) => {
  const model = genAI.getGenerativeModel({ 
    model: "gemini-3-flash-preview" 
  });

  const prompt = `
    You are an expert wellness coach assistant. 
    Lead Name: ${lead.name}
    Current Status: ${lead.status}
    Recent Activity: ${JSON.stringify(activities)}

    Based on this, generate:
    1. A short, friendly WhatsApp message.
    2. A 3-bullet point call script.
    3. A 1-sentence objection handler (only if status is INTERESTED).

 Return the response STRICTLY as a JSON object with these EXACT keys:
    {
      "whatsapp": "...",
      "callScript": ["...", "...", "..."],
      "objectionHandler": "..."
    }
  `;

  const result = await model.generateContent(prompt);
  const response = result.response.text();
  
  // Clean the response: remove ```json and ``` if they exist
  const cleanJson = response.replace(/```json|```/g, "").trim();
  
  return JSON.parse(cleanJson);
};