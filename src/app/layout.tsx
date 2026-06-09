import type { Metadata } from "next";
import { Cairo } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "لحظاتنا الخالدة 💕",
  description: "قصة حبنا بين لبنان وروسيا - 25 يناير 2025",
  keywords: ["حب", "رومانسية", "لحظات خاصة"],
  authors: [{ name: "الحبيب" }],
  openGraph: {
    title: "لحظاتنا الخالدة 💕",
    description: "قصة حبنا بين لبنان وروسيا",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <body
        className={`${cairo.variable} font-sans antialiased bg-gradient-to-br from-rose-50 via-pink-50 to-red-50 min-h-screen`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
