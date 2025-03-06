const { OpenAI } = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

const generateMatches = async (lead, allCandidates) => {
  // Validate inputs
  if (!lead) {
    console.error('No lead provided for matching');
    return { matches: [] };
  }

  if (!allCandidates || allCandidates.length === 0) {
    console.warn('No candidates provided for matching');
    return { matches: [] };
  }

  console.log('Generating matches for lead:', lead.id);
  console.log('Number of candidates:', allCandidates.length);

  const prompt = `Analyze potential real estate matches:

Lead Details: ${JSON.stringify(lead.toJSON ? lead.toJSON() : lead)}

Candidate Leads: ${JSON.stringify(allCandidates.map(c => c.toJSON ? c.toJSON() : c))}

Instructions:
- Evaluate ALL candidates
- Return top matches with detailed scores
- Provide specific matching reasons
- Score each candidate from 0-100
- Focus on most promising matches`;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ 
        role: "user", 
        content: prompt 
      }],
      temperature: 0.6,
      max_tokens: 1000
    });

    const responseContent = response.choices[0].message.content;
    console.log('Raw AI Response:', responseContent);

    // Attempt to parse the response
    let parsedResponse;
    try {
      parsedResponse = JSON.parse(responseContent);
    } catch (parseError) {
      console.error('Failed to parse AI response:', parseError);
      console.log('Unparsed response:', responseContent);
      return { matches: [] };
    }

    // Validate response structure
    if (!parsedResponse.matches || !Array.isArray(parsedResponse.matches)) {
      console.warn('Invalid matches format:', parsedResponse);
      return { matches: [] };
    }

    // Sort matches by score
    parsedResponse.matches.sort((a, b) => (b.score || 0) - (a.score || 0));

    console.log('Processed Matches:', parsedResponse.matches);
    return parsedResponse;
  } catch (error) {
    console.error('AI Matching Error:', error);
    
    // Log more details if it's an OpenAI error
    if (error.response) {
      console.error('OpenAI API Error Details:', error.response.data);
    }

    return { 
      matches: [],
      error: error.message 
    };
  }
};

module.exports = { generateMatches };