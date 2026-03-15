import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { GoogleGenerativeAI } from "@google/generative-ai";
import Groq from "groq-sdk";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(req: Request) {
  try {
    if (!process.env.GROQ_API_KEY) {
      return NextResponse.json({ error: "GROQ_API_KEY is missing. Please add it to your .env.local file." }, { status: 400 });
    }
    
    const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
    const { messages } = await req.json();
    const lastMessage = messages[messages.length - 1].content;

    // 1. Vectorize User Query (Using Gemini Embeddings - separate quota, usually high)
    const embeddingModel = genAI.getGenerativeModel({ model: "gemini-embedding-001" });
    const embeddingResult = await embeddingModel.embedContent(lastMessage);
    const embedding = embeddingResult.embedding.values;

    // 2. Search MongoDB Atlas Vector Store
    const client = await clientPromise;
    const db = client.db(process.env.DB_NAME);
    const collection = db.collection(process.env.VECTOR_COLLECTION!);

    const results = await collection.aggregate([
      {
        "$vectorSearch": {
          "index": "antigravityvectordb",
          "path": "embedding",
          "queryVector": embedding,
          "numCandidates": 100,
          "limit": 10
        }
      }
    ]).toArray();

    const context = results.map(r => r.text).join("\n\n---\n\n");

    // 3. Generate Answer using Groq (Llama 3) - Free and Fast
    const history = messages.slice(0, -1).map((m: any) => 
      `${m.sender === 'user' ? 'User' : 'Assistant'}: ${m.content}`
    ).join("\n");

    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: `You are a high-end AI Academic Assistant for MSAJCE College (Mohamed Sathak A J College of Engineering). 
STRICT OPERATIONAL GUIDELINES:
1. GREETINGS: For simple greetings, respond with a short, friendly welcome.
2. STRUCTURE: Use headers (##), Bold text, and Markdown Tables ONLY when providing data.
3. ALIGNMENT: Ensure headers and tables are properly formatted.
4. ACCURACY: Answer ONLY based on the provided CONTEXT. 
5. CONCISENESS: Provide exactly what the user asked for.
6. NO HALLUCINATION: If information is missing, refer to the college website (msajce-edu.in).`
        },
        {
          role: "user",
          content: `CONTEXT FROM COLLEGE KNOWLEDGE BASE:
${context}

CONVERSATION HISTORY:
${history}

USER QUESTION: ${lastMessage}`
        }
      ],
      model: "llama-3.3-70b-versatile",
      temperature: 0.5,
      max_tokens: 1024,
      top_p: 1,
      stream: false,
    });

    const text = chatCompletion.choices[0]?.message?.content || "";

    return NextResponse.json({ 
      id: Date.now(),
      content: text,
      sender: "ai",
      usage: {
        promptTokens: chatCompletion.usage?.prompt_tokens,
        candidatesTokens: chatCompletion.usage?.completion_tokens,
        totalTokens: chatCompletion.usage?.total_tokens
      }
    });

  } catch (error: any) {
    console.error("Chat API Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
