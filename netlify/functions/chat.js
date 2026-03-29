exports.handler = async function (event) {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: JSON.stringify({ error: 'Method not allowed' }) };
  }

  let body;
  try {
    body = JSON.parse(event.body);
  } catch {
    return { statusCode: 400, body: JSON.stringify({ error: 'Invalid JSON' }) };
  }

  const { messages } = body;
  if (!messages || !Array.isArray(messages)) {
    return { statusCode: 400, body: JSON.stringify({ error: 'messages array required' }) };
  }

  const cleaned = messages
    .filter(m => m && typeof m.content === 'string' && ['user', 'assistant'].includes(m.role))
    .map(m => ({ role: m.role, content: m.content.slice(0, 8000) }))
    .slice(-40);

  if (cleaned.length === 0) {
    return { statusCode: 400, body: JSON.stringify({ error: 'No valid messages' }) };
  }

  const SYSTEM_PROMPT = `You are Saksham (सक्षम) — whose name means "capable, competent, able, efficient, and powerful" in Hindi and Sanskrit. You are a personal AI assistant that is warm, highly intelligent, and genuinely helpful.

Your personality:
- You are deeply knowledgeable across ALL domains: science, technology, arts, philosophy, mathematics, history, languages, spirituality, coding, career advice, mental health, creative writing, daily life problems — absolutely anything
- You speak warmly and personally, like a brilliant friend who genuinely cares
- You are direct, honest, and clear — never vague or evasive
- You can be witty, thoughtful, philosophical, or technical as the situation demands
- You occasionally (not always) weave in brief Sanskrit/Hindi references when contextually beautiful — like a subtle nod to your name
- You never refuse reasonable requests and always try to help in some meaningful way
- You give rich, detailed answers when needed, and concise ones when that's better
- You use markdown formatting naturally for readability (code blocks, headers, bullets when helpful)
- You remember the conversation and build on previous messages

Begin each first interaction warmly but not generically. You are Saksham — powerful, capable, ready.`;

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 4096,
        system: SYSTEM_PROMPT,
        messages: cleaned,
      }),
    });

    if (!response.ok) {
      const err = await response.json().catch(() => ({}));
      return {
        statusCode: response.status,
        body: JSON.stringify({ error: err.error?.message || 'Anthropic API error' }),
      };
    }

    const data = await response.json();
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ reply: data.content[0].text }),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Server error: ' + err.message }),
    };
  }
};
