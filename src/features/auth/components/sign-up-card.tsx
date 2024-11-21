import { TriangleAlert } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { FC, FormEvent, useCallback, useRef } from "react";
import { useProviders } from "../hooks/use-providers";

interface SignUpCardProps {
  onSignIn: VoidFunction;
}

export const SignUpCard: FC<SignUpCardProps> = ({ onSignIn }) => {
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  // const [confirmPassword, setConfirmPassword] = useState("");

  const nameRef = useRef<HTMLInputElement | null>(null);
  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const confirmPasswordRef = useRef<HTMLInputElement | null>(null);

  const { handleGoogleSignIn, handleGithubSignIn, handlePasswordSignIn, pending, error } = useProviders();

  const handleSignUp = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      const name = nameRef.current?.value;
      const email = emailRef.current?.value;
      const password = passwordRef.current?.value;
      const confirmPassword = confirmPasswordRef.current?.value;
      if (name && email && password && confirmPassword) {
        handlePasswordSignIn({ flow: "signUp", email, password, confirmPassword, name });
      }
    },
    [handlePasswordSignIn]
  );

  return (
    <Card className="w-full h-full p-8">
      <CardHeader className="px-0 pt-0">
        <CardTitle>Sign up to continue</CardTitle>
        <CardDescription>Use your email or another service to continue</CardDescription>
      </CardHeader>
      {!!error && (
        <div className="bg-destructive/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-destructive mb-6">
          <TriangleAlert className="size-4" />
          <p>{error}</p>
        </div>
      )}
      <CardContent className="space-y-5 px-0 pb-0">
        <form className="space-y-2.5" onSubmit={handleSignUp}>
          <Input ref={nameRef} placeholder="Name" required disabled={pending} />
          <Input ref={emailRef} type="email" placeholder="Email" required disabled={pending} />
          <Input ref={passwordRef} type="password" placeholder="Password" required disabled={pending} />
          <Input ref={confirmPasswordRef} type="password" placeholder="Confirm password" required disabled={pending} />
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
          {`Already have an account?`}{" "}
          <span className="text-sky-700 hover:underline cursor-pointer" onClick={onSignIn}>
            Sign in
          </span>
        </p>
      </CardContent>
    </Card>
  );
};
