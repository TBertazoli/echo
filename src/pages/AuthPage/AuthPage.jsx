import { useState } from "react";
import SignUpForm from "../../components/SignUpForm/SignUpForm";
import LoginForm from "../../components/LoginForm/LoginForm";

export default function AuthPage({ setUser }) {
  const [showSignUp, setShowSignUp] = useState(false);
  return (
    <main className="font-sans bg-zinc-950 flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      {showSignUp ? (
        <SignUpForm setUser={setUser} setShowSignUp={setShowSignUp} />
      ) : (
        <LoginForm setUser={setUser} setShowSignUp={setShowSignUp} />
      )}
    </main>
  );
}
