import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "T2 Sensory Room",
  description: "A cinematic sensory tea experience."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
