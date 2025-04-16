import { useState } from 'react';
import Link from 'next/link';

export default function Enhancer() {
  const [originalPrompt, setOriginalPrompt] = useState('');
  const [enhancedPrompt, setEnhancedPrompt] = useState('');
  const [model, setModel] = useState('gpt-3.5');
  const [tone, setTone] = useState('Professional');
  const [category, setCategory] = useState('General');
  const [loading, setLoading] = useState(false);

  const handleEnhance = async () => {
    setLoading(true);
    const finalPrompt = `Rewrite the following prompt in a more clear, detailed, and ${tone.toLowerCase()} tone for the category "${category}":\n\n"${originalPrompt}"`;

    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt: finalPrompt, model }),
    });

    const data = await res.json();
    setEnhancedPrompt(data.message || 'No response');
    setLoading(false);
  };

  const exportEnhancedPrompt = () => {
    const blob = new Blob([enhancedPrompt], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'enhanced_prompt.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div style={{ padding: '30px', fontFamily: 'Arial' }}>
      <h1>🪄 Prompt Enhancer</h1>

      <Link href="/" style={{ fontSize: '14px', color: 'blue' }}>
        ← Back to Home
      </Link>

      <div style={{ marginTop: '20px' }}>
        <label><strong>Prompt:</strong></label><br />
        <textarea
          rows="5"
          cols="70"
          value={originalPrompt}
          onChange={(e) => setOriginalPrompt(e.target.value)}
          placeholder="Enter your raw prompt here..."
        />
      </div>

      <div style={{ marginTop: '20px' }}>
        <label><strong>Tone:</strong></label>
        <select value={tone} onChange={(e) => setTone(e.target.value)} style={{ marginLeft: '10px' }}>
          <option>Professional</option>
          <option>Friendly</option>
          <option>Persuasive</option>
          <option>Academic</option>
          <option>Casual</option>
        </select>
      </div>

      <div style={{ marginTop: '10px' }}>
        <label><strong>Category:</strong></label>
        <select value={category} onChange={(e) => setCategory(e.target.value)} style={{ marginLeft: '10px' }}>
          <option>General</option>
          <option>Email</option>
          <option>Essay</option>
          <option>Ad Copy</option>
          <option>Code Assistant</option>
          <option>Marketing</option>
        </select>
      </div>

      <div style={{ marginTop: '10px' }}>
        <label><strong>Model:</strong></label>
        <select value={model} onChange={(e) => setModel(e.target.value)} style={{ marginLeft: '10px' }}>
          <option value="gpt-3.5">GPT-3.5</option>
          <option value="deepseek">DeepSeek</option>
        </select>
      </div>

      <div style={{ marginTop: '20px' }}>
        <button onClick={handleEnhance} disabled={loading}>
          {loading ? 'Enhancing...' : '✨ Enhance Prompt'}
        </button>
      </div>

      {enhancedPrompt && (
        <div style={{ marginTop: '30px' }}>
          <h3>✨ Enhanced Prompt:</h3>
          <pre>{enhancedPrompt}</pre>
          <button onClick={exportEnhancedPrompt}>📤 Export to TXT</button>
        </div>
      )}
    </div>
  );
}
