import { useUser, SignedIn, SignedOut, RedirectToSignIn } from "@clerk/nextjs";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function App() {
  return (
    <>
      <SignedIn>
        <MainApp />
      </SignedIn>

      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </>
  );
}

function MainApp() {
  const { user } = useUser();
  const isPremium = user?.publicMetadata?.isPremium === true;

  const [prompt, setPrompt] = useState('');
  const [model, setModel] = useState('gpt-3.5');
  const [response, setResponse] = useState('');
  const [history, setHistory] = useState([]);
  const [savedPrompts, setSavedPrompts] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem('savedPrompts');
    if (stored) setSavedPrompts(JSON.parse(stored));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt, model }),
    });

    const data = await res.json();
    const answer = data.message || 'No response';

    setResponse(answer);

    setHistory((prev) => [
      ...prev,
      {
        prompt,
        response: answer,
        model,
        timestamp: new Date().toLocaleTimeString(),
      },
    ]);

    setPrompt('');
  };

  const clearHistory = () => {
    setHistory([]);
  };

  const savePrompt = (prompt, response) => {
    const saved = { prompt, response, timestamp: new Date().toLocaleString() };
    const updated = [...savedPrompts, saved];
    setSavedPrompts(updated);
    localStorage.setItem('savedPrompts', JSON.stringify(updated));
  };

  const exportPrompt = (prompt, response) => {
    const blob = new Blob([`Prompt:\n${prompt}\n\nResponse:\n${response}`], {
      type: 'text/plain',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'prompt.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div style={{ padding: '30px', fontFamily: 'Arial' }}>
      <h1>🧠 Welcome, {user?.firstName || 'Nomad'}!</h1>

      <Link href="/enhancer" style={{ color: 'blue', fontSize: '14px' }}>
        → ✨ Try Prompt Enhancer
      </Link>

      {!isPremium && (
        <div style={{ marginBottom: '20px' }}>
          <button
            onClick={() =>
              alert('💎 Premium will be unlocked soon via Kaspi!')
            }
            style={{
              padding: '8px 14px',
              background: 'gold',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
            }}
          >
            💎 Upgrade to Premium (Mock)
          </button>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <label>Select model:</label>
        <select value={model} onChange={(e) => setModel(e.target.value)}>
          <option value="gpt-3.5">GPT-3.5</option>
          <option value="deepseek">DeepSeek</option>
          <option value="claude">Claude</option>
        </select>
        <br />
        <br />

        <textarea
          rows="5"
          cols="60"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Enter your prompt here"
        />
        <br />
        <br />

        <button type="submit">Send</button>
        <button type="button" onClick={clearHistory} style={{ marginLeft: '10px' }}>
          Clear History
        </button>
      </form>

      <div style={{ marginTop: '40px' }}>
        <h2>💬 Current Response:</h2>

        {response && (
          <>
            <button onClick={() => savePrompt(prompt, response)}>⭐ Save Prompt</button>
            <button onClick={() => exportPrompt(prompt, response)} style={{ marginLeft: '10px' }}>
              📤 Export Prompt
            </button>
          </>
        )}

        <pre>{response}</pre>
      </div>

      <div style={{ marginTop: '40px' }}>
        <h2>🕘 History:</h2>
        {history.length === 0 ? (
          <p>No prompts yet.</p>
        ) : (
          <ul>
            {history.map((item, index) => (
              <li key={index} style={{ marginBottom: '20px' }}>
                <strong>
                  [{item.timestamp}] {item.model} →
                </strong>
                <div style={{ paddingLeft: '10px' }}>
                  <p><strong>Prompt:</strong> {item.prompt}</p>
                  <p><strong>Response:</strong> {item.response}</p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div style={{ marginTop: '40px' }}>
        <h2>⭐ Saved Prompts:</h2>
        {savedPrompts.length === 0 ? (
          <p>No saved prompts yet.</p>
        ) : (
          <ul>
            {savedPrompts.map((item, index) => (
              <li key={index} style={{ marginBottom: '20px' }}>
                <strong>[{item.timestamp}]</strong>
                <div style={{ paddingLeft: '10px' }}>
                  <p><strong>Prompt:</strong> {item.prompt}</p>
                  <p><strong>Response:</strong> {item.response}</p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
