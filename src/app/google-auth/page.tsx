"use client";

import Button from "@/components/button";
import Link from "next/link";

export default function GoogleAuth() {
  const handleLogin = () => {
    const clientId = process.env.NEXT_PUBLIC_GOOGLE_OAUTH_CLIENT_ID || "";
    const redirectUri = process.env.NEXT_PUBLIC_GOOGLE_OAUTH_REDIRECT_URI || "";

    const url = new URL("https://accounts.google.com/o/oauth2/v2/auth");
    url.searchParams.append("client_id", clientId);
    url.searchParams.append("redirect_uri", redirectUri);
    url.searchParams.append("response_type", "code");
    url.searchParams.append("access_type", "offline");
    url.searchParams.append("scope", "openid email profile");

    window.location.assign(url.toString());
  };

  return (
    <main className="flex items-center justify-center p-6 h-svh flex-col gap-4">
      <Button onClick={handleLogin}>login with redirect</Button>
      <Button>login with popup (on development)</Button>
      <Link href="/google-auth/protected">
        <Button>Protected page</Button>
      </Link>
    </main>
  );
}
