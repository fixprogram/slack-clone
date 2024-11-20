import { useAuthActions } from "@convex-dev/auth/react";
import { useCallback, useState } from "react";

export const useProviders = () => {
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string>();
  const { signIn } = useAuthActions();

  const handleSignInWithProvider = useCallback(
    (provider: string, options?: Record<string, string>) => {
      setPending(true);
      setError(undefined); // Reset error state before a new attempt
      signIn(provider, options)
        .catch((err) => {
          setError(err.message || "An error occurred during sign-in");
        })
        .finally(() => setPending(false));
    },
    [signIn]
  );

  const handleGithubSignIn = useCallback(() => handleSignInWithProvider("github"), [handleSignInWithProvider]);

  const handleGoogleSignIn = useCallback(() => handleSignInWithProvider("google"), [handleSignInWithProvider]);

  const handlePasswordSignIn = useCallback(
    (email: string, password: string) => {
      handleSignInWithProvider("password", { email, password, flow: "signIn" });
    },
    [handleSignInWithProvider]
  );

  return { handleGithubSignIn, handleGoogleSignIn, handlePasswordSignIn, pending, error };
};
