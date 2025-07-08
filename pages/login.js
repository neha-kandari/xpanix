import dynamic from "next/dynamic";
const LoginForm = dynamic(() => import("../src/components/ui/LoginForm"), { ssr: false });

export default function LoginPage() {
  return <LoginForm />;
}