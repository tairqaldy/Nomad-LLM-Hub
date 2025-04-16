import { SignIn } from "@clerk/nextjs";

export default function Login() {
  return (
    <div style={{ margin: '40px' }}>
      <h1>🔐 Login</h1>
      <SignIn
        routing="hash"
        signUpUrl="/signup"
        afterSignInUrl="/app"
      />
    </div>
  );
}
