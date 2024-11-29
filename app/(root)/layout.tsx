import type { Metadata } from "next";
import { Arimo } from "next/font/google";
import "../globals.css";
import { cn } from "@/lib/utils";

import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import { Provider as JotaiProvider } from "jotai";
import { MantineProvider } from "@mantine/core"; // Import MantineProvider

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
      <body
        className={cn(
          "font-sans antialiased min-h-screen flex flex-col",
          arimo.variable
        )}
      >
        {/* Remove withGlobalStyles and withNormalizeCSS */}
        <MantineProvider>
          <JotaiProvider>
            <Navbar />
            <section className="flex-1">{children}</section>
            <Footer />
          </JotaiProvider>
        </MantineProvider>
      </body>
    </html>
  );
}
