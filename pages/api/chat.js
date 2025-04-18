export default async function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).end();
  
    const { prompt, model } = req.body;
  
    try {
      if (model === 'gpt-3.5') {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            model: 'gpt-3.5-turbo',
            messages: [{ role: 'user', content: prompt }],
          }),
        });
  
        const data = await response.json();
  
        if (data.choices && data.choices[0]) {
          return res.status(200).json({ message: data.choices[0].message.content });
        } else {
          console.error('OpenAI API error:', data);
          return res.status(500).json({ message: 'OpenAI response invalid.' });
        }
      }
  
      if (model === 'deepseek') {
        const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${process.env.DEEPSEEK_API_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            model: 'deepseek-chat',
            messages: [{ role: 'user', content: prompt }],
          }),
        });
  
        const data = await response.json();
        console.log('DeepSeek response:', JSON.stringify(data, null, 2));
  
        if (data.choices && data.choices[0] && data.choices[0].message) {
          return res.status(200).json({ message: data.choices[0].message.content });
        } else {
          return res.status(500).json({ message: data.error?.message || 'DeepSeek response error' });
        }
      }
  
      if (model === 'claude') {
        const response = await fetch('https://api.anthropic.com/v1/messages', {
          method: 'POST',
          headers: {
            'x-api-key': process.env.ANTHROPIC_API_KEY,
            'anthropic-version': '2023-06-01',
            'content-type': 'application/json',
          },
          body: JSON.stringify({
            model: 'claude-3-opus-20240229',
            max_tokens: 1000,
            messages: [{ role: 'user', content: prompt }],
          }),
        });
  
        const data = await response.json();
        console.log('Claude response:', JSON.stringify(data, null, 2));
  
        if (data.content && Array.isArray(data.content) && data.content[0].text) {
          return res.status(200).json({ message: data.content[0].text });
        } else {
          return res.status(500).json({ message: data.error?.message || 'Claude response error' });
        }
      }
  
      // If none matched
      return res.status(400).json({ message: 'Model not supported yet.' });
    } catch (err) {
      console.error('Server error:', err);
      return res.status(500).json({ message: 'Server error when querying model.' });
    }
  }
  