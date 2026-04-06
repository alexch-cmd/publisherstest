import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Publisher Command Center",
  description: "High-end operations hub for indie/mid-market PC & Console publishers",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-[#0D0D0D] text-brand-1 antialiased">
        {children}
      </body>
    </html>
  );
}
