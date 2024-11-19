import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const bearerToken = request.headers.get("Authorization")

  if (!bearerToken) {
    return NextResponse.json({ message: 'unauthorized' }, { status: 401 })
  }

  const cookiesStore = cookies()

  cookiesStore.delete("access")
  cookiesStore.delete("refresh")

  return NextResponse.json({ message: "success logout" })
}