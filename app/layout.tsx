import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/theme-providers";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
  title: "NEXA IDE ",
  description: "NEXA IDE is a free online code editor that lets you write, debug, and run your code in the browser. It is an open source editor that is easy to use and has a simple interface. It is also a great way to learn programming and get started with coding.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const session = await auth()
  return (
    <SessionProvider session={session}>
    <html lang="en" suppressHydrationWarning>
      <body
        className="antialiased"
      >
        <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
        >
            <div className="flex flex-col min-h-screen">
              <Toaster/>
              <div className="flex-1">{children}</div>
            </div>
        </ThemeProvider>
      </body>
    </html>
    </SessionProvider>
  );
}
