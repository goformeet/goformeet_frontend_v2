import type { Metadata } from "next";
import { Arimo } from "next/font/google";
import "../globals.css";
import { cn } from "@/lib/utils";
import Navbar from "@/components/admin/Navbar";
import Sidebar from "@/components/admin/Sidebar";
import { Toaster } from "@/components/ui/toaster";

const arimo = Arimo({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "Goformeet",
  description: "Book and #Goformeet",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head></head>
      <body
        className={cn(
          "font-sans antialiased min-h-screen max-w-screen flex justify-center items-center",
          arimo.variable
        )}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
