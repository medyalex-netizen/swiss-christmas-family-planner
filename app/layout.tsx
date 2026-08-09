import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Tuscany Autumn Family Planner",
  description:
    "Interactive autumn family trip planner for TuscInteractive autumn family trip planner for Tuscany..",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}