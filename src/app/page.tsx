import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24 gap-6">
      <Link href='/drag-n-drop'>
        Drag n Drop
      </Link>
      <Link href='/preview'>
        Preview
      </Link>
      <Link href='/google-auth'>
        Google OAuth 2.0
      </Link>
    </main>
  );
}
