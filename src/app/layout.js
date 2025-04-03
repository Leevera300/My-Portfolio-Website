import "./globals.css";
import { Inter } from "next/font/google";
import { AuthProvider } from "./context/AuthContext";
import { LangProvider } from "./context/LangContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Michael's Portfolio",
  description: "Personal portfolio website showcasing my projects and skills",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className="flex flex-col min-h-screen bg-[#0d1117] text-white"
        suppressHydrationWarning
      >
        <AuthProvider>
          <LangProvider>
            <Navbar />
            <main className="flex-grow">{children}</main>
            <Footer />
          </LangProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
