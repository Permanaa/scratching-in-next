import type { Metadata } from "next";
import Navigation from "@/components/navigation";

export const metadata: Metadata = {
  title: "Drag n Drop | use case",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex">
      <div className="min-w-80 w-80 h-screen p-4 bg-primary/10">
        <div className="mb-10">
          <p className="text-sm">USE CASE</p>
          <h1 className="text-2xl font-bold rounded">drag-n-drop</h1>
        </div>
        <Navigation />
      </div>
      <div className="flex-1 overflow-y-auto">{children}</div>
    </div>
  );
}
