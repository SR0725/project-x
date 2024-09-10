import { Viewport } from "next";
import clsx from "clsx";
import { Toaster } from "sonner";
import Header from "@/components/header";
import "./globals.css";
import { Providers } from "./providers";

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}) {
  return {
    title: {
      default: `Twitter 社群職業大解密`,
      template: `Twitter 社群職業大解密 | %s`,
    },
    description: "Twitter 社群職業大解密",
    keywords: "Twitter 社群職業大解密",
    themeColor: [{ color: "#f6f5f5" }],
    authors: [{ name: "Ray 貓" }],
    icons: {
      icon: "/favicon.ico",
    },
  };
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <head />
      <body
        className={clsx("min-h-screen bg-black font-sans antialiased dark")}
      >
        <Providers>
          <Toaster />
          <Header />
          {children}
        </Providers>
      </body>
    </html>
  );
}
