import type { Metadata } from "next";

import LoginApp from "./app";
import BackgroundSetter from "../../ui/background-setter";

export const metadata: Metadata = {
  title: "Login | Zazira Movers",
};

export default function LoginPage() {
  return (
    <main className="flex max-h-screen flex-col p-6">
      <BackgroundSetter src={"/main-background.png"} />

      <LoginApp />
    </main>
  );
}
