import { Button } from "@/components/ui/button";
import { cookies } from "next/headers";
import Link from "next/link";
import UserInfo from "./_lib/user-info";
import Logout from "./_lib/logout";

export default function GoogleAuth() {
  const token = cookies().get("access")?.value;

  return (
    <main className="flex items-center justify-center p-6 h-svh flex-col gap-6">
      <UserInfo />

      <div className="flex gap-3">
        <Link href="/google-auth/protected">
          <Button>Protected page</Button>
        </Link>
        {token ? (
          <Logout />
        ) : (
          <Link href="/google-auth/login">
            <Button>Login Page</Button>
          </Link>
        )}
      </div>
    </main>
  );
}
