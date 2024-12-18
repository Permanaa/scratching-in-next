"use client";

import { Button } from "@/components/ui/button";
import { useGoogleLogin, useGoogleOneTapLogin } from "@react-oauth/google";
import axios, { AxiosResponse } from "axios";
import { useState } from "react";

export default function LoginGoogle() {
  const clientId = process.env.NEXT_PUBLIC_GOOGLE_OAUTH_CLIENT_ID || "";
  const redirectUri = process.env.NEXT_PUBLIC_GOOGLE_OAUTH_REDIRECT_URI || "";

  const [isLoadingCallback, setIsLoadingCallback] = useState<boolean>(false);

  const handleLogin = () => {
    const url = new URL("https://accounts.google.com/o/oauth2/v2/auth");
    url.searchParams.append("client_id", clientId);
    url.searchParams.append("redirect_uri", redirectUri);
    url.searchParams.append("response_type", "code");
    url.searchParams.append("access_type", "offline");
    url.searchParams.append("scope", "openid email profile");

    window.location.assign(url.toString());
  };

  const onSuccessGetCode = async (code: string) => {
    setIsLoadingCallback(true);
    // should it be post method instead?
    await axios
      .get(`/api/auth/google/callback?code=${code}&ux_mode=popup`)
      .then((res: AxiosResponse<{ redirectUrl: string }>) => {
        window.location.assign(res.data.redirectUrl);
      })
      .finally(() => {
        setIsLoadingCallback(false);
      });
  };

  const handleLoginPopup = () => {
    if (window.google) {
      const client = window.google.accounts.oauth2.initCodeClient({
        client_id: clientId,
        redirect_uri: "postmessage",
        ux_mode: "popup",
        scope: "openid email profile",
        callback: (response) => onSuccessGetCode(response.code),
        error_callback: (error) => {
          console.log("haloooo error", error);
        },
      });

      client.requestCode();
    }
  };

  const handleLoginReactOauthGoogle = useGoogleLogin({
    flow: "auth-code",
    ux_mode: "popup",
    onSuccess: (response) => onSuccessGetCode(response.code),
    onError: (errorResponse) => {
      console.log("haloooo error", errorResponse);
    },
  });

  useGoogleOneTapLogin({
    use_fedcm_for_prompt: true,
    onSuccess: (res) => {
      console.log("haloooo google one tap", res);
    },
    onError: () => {
      console.log("haloooo Login Failed");
    },
  });

  return (
    <main className="flex items-center justify-center p-6 h-svh flex-col gap-4">
      <Button onClick={handleLogin} disabled={isLoadingCallback}>
        login with redirect
      </Button>
      <Button onClick={handleLoginPopup} disabled={isLoadingCallback}>
        login with popup
      </Button>
      <Button
        onClick={handleLoginReactOauthGoogle}
        disabled={isLoadingCallback}
      >
        login using @react-oauth/google
      </Button>
    </main>
  );
}
