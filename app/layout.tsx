import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Swiss Christmas Family Planner",
  description:
    "A family planner for a Switzerland Christmas trip with markets, shopping, attractions and scenic train trips.",
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