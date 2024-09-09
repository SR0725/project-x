import { Viewport } from "next";
import clsx from "clsx";
import { Toaster } from "sonner";
import "@/styles/globals.css";
import { Providers } from "./providers";

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}) {
  return {
    title: {
      default: `Suta`,
      template: `Suta | %s`,
    },
    description: "description",
    keywords: "keywords",
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
        className={clsx(
          "bg-background min-h-screen font-sans antialiased",
          fontSans.variable
        )}
      >
        <Providers>
          <Toaster />
          {children}
        </Providers>
      </body>
    </html>
  );
}
