import axios from "axios";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const code = searchParams.get("code") || ""

  const res = await axios.post(
    "https://oauth2.googleapis.com/token",
    new URLSearchParams({
      grant_type: "authorization_code",
      code,
      client_id: process.env.NEXT_PUBLIC_GOOGLE_OAUTH_CLIENT_ID || "",
      client_secret: process.env.GOOGLE_OAUTH_CLIENT_SECRET || "",
      redirect_uri: process.env.NEXT_PUBLIC_GOOGLE_OAUTH_REDIRECT_URI || ""
    })
  )

  const data = {
    access_token: res.data.access_token,
    refresh_token: res.data.refresh_token,
    expires_in: res.data.expires_in,
  }

  const cookiesStore = cookies()

  cookiesStore.set('access', data.access_token, {
    httpOnly: true,
    secure: true,
    sameSite: true,
    maxAge: data.expires_in,
  })

  if (data.refresh_token) {
    cookiesStore.set('refresh', data.refresh_token, {
      httpOnly: true,
      secure: true,
      sameSite: true,
    })
  }

  redirect('/google-auth')
}