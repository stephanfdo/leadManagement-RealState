const OpenAI = require('openai');
const { Lead } = require('../models');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

const generateMatchAnalysis = async (lead, candidates) => {
  const prompt = `Analyze real estate matches based on these parameters:
  1. Location proximity (20% weight)
  2. Price/budget alignment (30% weight)
  3. Property type match (20% weight)
  4. Transaction timeline (15% weight)
  5. Special requirements (15% weight)

  Lead: ${JSON.stringify(lead.toJSON())}
  
  Candidates: ${JSON.stringify(candidates.map(c => c.toJSON()))}
  
  Return JSON format:
  {
    "matches": [{
      "candidateId": number,
      "score": number(0-100),
      "reasons": string[]
    }]
  }`;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [{
        role: "user",
        content: prompt
      }],
      temperature: 0.7,
      max_tokens: 1000
    });

    return JSON.parse(response.choices[0].message.content);
  } catch (error) {
    console.error('AI API Error:', error);
    throw new Error('Failed to generate matches');
  }
};

module.exports = {
  generateMatchAnalysis
};