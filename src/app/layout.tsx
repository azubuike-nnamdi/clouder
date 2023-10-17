"use client";
import React from "react";
import "./globals.css";
import { Inter } from "next/font/google";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import { usePathname } from "next/navigation";
import BackToTop from "@/components/common/BackToTop";
import TanstackProvider from "@/context/tanstackProvider";
import { AuthProvider } from "@/context/AuthProvider";
import Seo from "@/components/common/SEO";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const showNavigation = ["/", "/about", "/contact", "/pricing"].includes(
    pathname,
  );
  return (
    <html lang="en">
      <body className={inter.className}>
        <TanstackProvider>
          <AuthProvider>
            <Seo templateTitle="Clouder" />
            {showNavigation && <Navbar />}
            {children}
            {showNavigation && <Footer />}
            {/* back top button */}
            <BackToTop />
          </AuthProvider>
        </TanstackProvider>

        <ToastContainer />
      </body>
    </html>
  );
}
