import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Auth } from "@/components/JazzAndAuth";
import { Nav } from "@/components/Nav";
import { ToastProvider } from "@/contexts/ToastContext";
import clsx from "clsx";
import { Fraunces } from "next/font/google";

const fraunces = Fraunces({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-fraunces",
});

const inter = Inter({ subsets: ["latin"] });

const title = "pocket dreams";
const description = "your minimalist virtual book shelf";

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className="bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400"
    >
      <body className={clsx(inter.className, fraunces.variable)}>
        <Auth>
          <ToastProvider>
            <header>
              <Nav />
            </header>
            <main>{children}</main>
          </ToastProvider>
        </Auth>
      </body>
    </html>
  );
}
