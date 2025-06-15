import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";

import { ApolloWrapper } from "./ApolloWrapper";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Tread",
  description: "Track your workouts with ease.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${manrope.variable} antialiased`}>
        <ApolloWrapper>{children}</ApolloWrapper>
      </body>
    </html>
  );
}
