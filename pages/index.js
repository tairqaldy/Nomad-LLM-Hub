import Link from 'next/link';

export default function Home() {
  return (
    <div style={{ padding: '40px', fontFamily: 'Arial', textAlign: 'center' }}>
      <h1>🌍 Welcome to Nomad LLM Hub</h1>
      <p>Access the smartest AI tools in one place.</p>
      <Link href="/login">
        <button style={btn}>Login</button>
      </Link>
      <Link href="/signup">
        <button style={{ ...btn, backgroundColor: '#000', color: '#fff' }}>Sign Up</button>
      </Link>
    </div>
  );
}

const btn = {
  margin: '10px',
  padding: '12px 24px',
  fontSize: '16px',
  borderRadius: '8px',
  backgroundColor: '#f2f2f2',
  border: '1px solid #ccc',
  cursor: 'pointer',
};
