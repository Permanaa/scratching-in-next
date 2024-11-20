"use client";

import { Button } from "@/components/ui/button";
import axios, { AxiosResponse } from "axios";

export default function LoginGoogle() {
  const clientId = process.env.NEXT_PUBLIC_GOOGLE_OAUTH_CLIENT_ID || "";
  const redirectUri = process.env.NEXT_PUBLIC_GOOGLE_OAUTH_REDIRECT_URI || "";

  const handleLogin = () => {
    const url = new URL("https://accounts.google.com/o/oauth2/v2/auth");
    url.searchParams.append("client_id", clientId);
    url.searchParams.append("redirect_uri", redirectUri);
    url.searchParams.append("response_type", "code");
    url.searchParams.append("access_type", "offline");
    url.searchParams.append("scope", "openid email profile");

    window.location.assign(url.toString());
  };

  const handleLoginPopup = () => {
    if (window.google) {
      const client = window.google.accounts.oauth2.initCodeClient({
        client_id: clientId,
        redirect_uri: "postmessage",
        ux_mode: "popup",
        scope: "openid email profile",
        callback: async (response) => {
          await axios
            .get(
              `/api/auth/google/callback?code=${response.code}&ux_mode=popup`
            )
            .then((res: AxiosResponse<{ redirectUrl: string }>) => {
              window.location.assign(res.data.redirectUrl);
            });
        },
        error_callback: (error) => {
          console.log("haloooo error", error);
        },
      });

      client.requestCode();
    }
  };

  return (
    <main className="flex items-center justify-center p-6 h-svh flex-col gap-4">
      <Button onClick={handleLogin}>login with redirect</Button>
      <Button onClick={handleLoginPopup}>login with popup</Button>
    </main>
  );
}
