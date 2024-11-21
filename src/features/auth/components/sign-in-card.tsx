import { TriangleAlert } from "lucide-react";

import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { FC, FormEvent, useCallback, useRef } from "react";
import { useProviders } from "../hooks/use-providers";

interface SignInCardProps {
  onSignUp: VoidFunction;
}

export const SignInCard: FC<SignInCardProps> = ({ onSignUp }) => {
  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);

  const { handleGoogleSignIn, handleGithubSignIn, handlePasswordSignIn, pending, error } = useProviders();

  const handleSignIn = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const email = emailRef.current?.value;
      const password = passwordRef.current?.value;
      if (email && password) {
        handlePasswordSignIn({ flow: "signIn", email, password });
      }
    },
    [handlePasswordSignIn]
  );

  return (
    <Card className="w-full h-full p-8">
      <CardHeader className="px-0 pt-0">
        <CardTitle>Login to continue</CardTitle>
        <CardDescription>Use your email or another service to continue</CardDescription>
      </CardHeader>
      {!!error && (
        <div className="bg-destructive/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-destructive mb-6">
          <TriangleAlert className="size-4" />
          <p>{error}</p>
        </div>
      )}
      <CardContent className="space-y-5 px-0 pb-0">
        <form className="space-y-2.5" onSubmit={handleSignIn}>
          <Input disabled={pending} type="email" placeholder="Email" required ref={emailRef} />
          <Input disabled={pending} type="password" placeholder="Password" required ref={passwordRef} />
          <Button type="submit" className="w-full" size={"lg"} disabled={pending}>
            Continue
          </Button>
        </form>
        <Separator />

        <div className="flex flex-col gap-y-2.5">
          <Button
            onClick={handleGoogleSignIn}
            variant={"outline"}
            size="lg"
            className="w-full relative"
            disabled={pending}
          >
            <FcGoogle className="size-5 absolute top-3 left-2.5" />
            Continue with Google
          </Button>
          <Button
            onClick={handleGithubSignIn}
            variant={"outline"}
            size="lg"
            className="w-full relative"
            disabled={pending}
          >
            <FaGithub className="size-5 absolute top-3 left-2.5" />
            Continue with Github
          </Button>
        </div>
        <p className="text-xs text-muted-foreground">
          {`Don't have an account?`}{" "}
          <span className="text-sky-700 hover:underline cursor-pointer" onClick={onSignUp}>
            Sign up
          </span>
        </p>
      </CardContent>
    </Card>
  );
};
