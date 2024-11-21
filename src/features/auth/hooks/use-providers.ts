import { useAuthActions } from "@convex-dev/auth/react";
import { useCallback, useState } from "react";

type ProviderType = "github" | "google" | "password";

type SignInOptions = { flow: "signIn"; email: string; password: string };
type SignUpOptions = {
  flow: "signUp";
  email: string;
  password: string;
  confirmPassword: string;
  name: string;
};

type PasswordOptions = SignInOptions | SignUpOptions;

export const useProviders = () => {
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string>();
  const { signIn } = useAuthActions();

  const handleSignInWithProvider = useCallback(
    (provider: ProviderType, options?: PasswordOptions) => {
      setPending(true);
      setError(undefined); // Reset error state before a new attempt
      signIn(provider, options)
        .catch((err) => {
          setError(err.message || `An error occurred during ${options?.flow === "signIn" ? "sign-in" : "sign-up"}`);
        })
        .finally(() => setPending(false));
    },
    [signIn]
  );

  const handleGithubSignIn = useCallback(() => handleSignInWithProvider("github"), [handleSignInWithProvider]);

  const handleGoogleSignIn = useCallback(() => handleSignInWithProvider("google"), [handleSignInWithProvider]);

  const handlePasswordSignIn = useCallback(
    (options: PasswordOptions) => {
      if (options.flow === "signUp" && options.password !== options.confirmPassword) {
        return setError("Passwords don't match");
      }

      handleSignInWithProvider("password", options);
    },
    [handleSignInWithProvider]
  );

  return { handleGithubSignIn, handleGoogleSignIn, handlePasswordSignIn, pending, error };
};
