import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const bearerToken = request.headers.get("Authorization")

  try {
    const res = await axios.get(
      "https://www.googleapis.com/oauth2/v3/userinfo",
      { headers: { Authorization: bearerToken } }
    )
  
    return NextResponse.json(res.data)
  } catch (err) {
    return NextResponse.json({ data: null }, { status: 500 })
  }
}