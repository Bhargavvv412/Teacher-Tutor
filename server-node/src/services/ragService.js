import { Pinecone } from "@pinecone-database/pinecone";
import OpenAI from "openai";
import genai from "@google/generative-ai";

const pc = new Pinecone({ apiKey: process.env.PINECONE_API_KEY });

// Map standard → Pinecone namespace
const stdNamespaces = {
  6: "std6science",
  7: "std7science",
  8: "std8science",
  9: "std9science",
  10: "std10science"
};

// Setup Gemini
const genAI = new genai.GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const geminiModel = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// Query function
export async function queryGeminiRAG(std, query) {
  const namespace = stdNamespaces[std];
  if (!namespace) return `⚠️ No dataset for Std ${std}`;

  // Step 1: Embed query
  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  const embeddingRes = await openai.embeddings.create({
    model: "text-embedding-3-small",
    input: query,
  });
  const embedding = embeddingRes.data[0].embedding;

  // Step 2: Pinecone query
  const index = pc.index(process.env.PINECONE_INDEX);
  const results = await index.namespace(namespace).query({
    vector: embedding,
    topK: 3,
    includeMetadata: true,
  });

  const context = results.matches.map(m => m.metadata.text).join("\n");

  // Step 3: Gemini RAG
  const prompt = `
You are a friendly tutor for Std ${std}.
Use this context to answer simply and clearly for a student:
Your role is to make learning **simple, fun, and encouraging**.  

### Answering Rules:
- **Keep answers short** → about 3–5 sentences.  
- **Highlight key terms in bold**.  
- **Use bullet points (-)** for steps, examples, or lists.  
- **Explain step by step** when needed, with simple examples.  
- **Avoid complex words**; use easy language kids can understand.  
- **Make learning fun** with a warm, positive tone.  
- **If you don’t know**, say “I don’t know” honestly.  

### Output Format:
- Start with a **clear answer**.  
- Add **bullets (-)** if listing steps or points.  
- Keep it **short, clear, and encouraging**.  

Goal: Help students understand quickly, enjoy learning, and feel confident.

Context:
${context}

Question: ${query}
Answer: 
`;

  const resp = await geminiModel.generateContent(prompt);
  return resp.response?.text() || "⚠️ No response from Gemini.";
}
