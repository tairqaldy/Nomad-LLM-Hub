import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <div style={{ margin: '40px' }}>
      <h1>👋 Create Account</h1>
      <SignUp
        routing="hash"
        signInUrl="/login"
        afterSignUpUrl="/login"
      />
    </div>
  );
}
