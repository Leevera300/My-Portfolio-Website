import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { LangProvider } from "./context/LangContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "My Portfolio",
  description: "Built with Next.js",
  other: {
    grammarly: "false",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`flex flex-col min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white ${geistSans.variable} ${geistMono.variable}`}
      >
        <LangProvider>
          <Navbar />
          <main className="flex-grow px-4">{children}</main>
          <Footer />
        </LangProvider>
      </body>
    </html>
  );
}
