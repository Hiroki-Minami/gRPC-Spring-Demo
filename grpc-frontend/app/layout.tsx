import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "app/ui/globals.css";
import Header from "app/ui/header";
import { AuthProvider } from "./auth-context";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "gRTC Open AI Chat Demo",
  description: "Generated by Hiroki Minami",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <div className="w-full flex flex-col">
            <Header />
          </div>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
