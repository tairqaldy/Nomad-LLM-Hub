import { useState } from 'react';

export default function Home() {
  const [prompt, setPrompt] = useState('');
  const [model, setModel] = useState('gpt-3.5');
  const [response, setResponse] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt, model }),
    });

    const data = await res.json();
    setResponse(data.message || 'No response');
  };

  return (
    <div style={{ padding: '30px', fontFamily: 'Arial' }}>
      <h1>Nomad LLM Hub 🧠</h1>
      <form onSubmit={handleSubmit}>
        <label>Select model:</label>
        <select value={model} onChange={(e) => setModel(e.target.value)}>
          <option value="gpt-3.5">GPT-3.5</option>
          <option value="deepseek">DeepSeek</option>
          <option value="claude">Claude (coming soon)</option>
        </select>
        <br /><br />
        <textarea
          rows="5"
          cols="60"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Enter your prompt here"
        />
        <br /><br />
        <button type="submit">Send</button>
      </form>

      <div style={{ marginTop: '30px' }}>
        <h3>Response:</h3>
        <pre>{response}</pre>
      </div>
    </div>
  );
}
