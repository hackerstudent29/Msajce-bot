const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config({ path: '.env.local' });

async function listModels() {
  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    // The SDK doesn't have a direct listModels but we can check if it works by calling a basic one
    console.log("Testing API Key...");
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent("hi");
    console.log("Success with gemini-1.5-flash");
  } catch (e) {
    if (e.message.includes("404")) {
        console.log("Model gemini-1.5-flash NOT found.");
    } else {
        console.error("Different Error:", e.message);
    }
  }
}

listModels();
