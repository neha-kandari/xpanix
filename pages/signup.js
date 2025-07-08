import dynamic from "next/dynamic";
const SignupForm = dynamic(() => import("../src/components/ui/SignupForm"), { ssr: false });

export default function SignupPage() {
  return <SignupForm />;
}