import axios from "axios";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const code = searchParams.get("code") || ""
  const uxMode = searchParams.get("ux_mode") || ""

  const redirectUri = uxMode === "popup" ? "postmessage" : process.env.NEXT_PUBLIC_GOOGLE_OAUTH_REDIRECT_URI

  const res = await axios.post(
    "https://oauth2.googleapis.com/token",
    new URLSearchParams({
      grant_type: "authorization_code",
      access_type: "offline",
      code,
      client_id: process.env.NEXT_PUBLIC_GOOGLE_OAUTH_CLIENT_ID || "",
      client_secret: process.env.GOOGLE_OAUTH_CLIENT_SECRET || "",
      redirect_uri: redirectUri || "",
    })
  )

  const data = {
    access_token: res.data.access_token,
    refresh_token: res.data.refresh_token,
    expires_in: res.data.expires_in,
  }

  const cookiesStore = cookies()

  cookiesStore.set('access', data.access_token, {
    path: "/",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: data.expires_in,
  })

  if (data.refresh_token) {
    cookiesStore.set('refresh', data.refresh_token, {
      path: "/",
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
    })
  }

  if (uxMode === "popup") {
    return NextResponse.json({
      redirectUrl: "/google-auth"
    })
  } else {
    redirect('/google-auth')
  }
}