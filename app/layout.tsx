import type { Metadata } from "next";
import './fanta.css'
import "./globals.css";
import Head from "./Head";
import Link from "next/link";
import GoTo from "@/components/GoTo"
import { AuthProvider } from "@/context/AuthContext";


export const metadata: Metadata = {
  title: "Centsible ⋅ The Subscription Tracker",
  description: "Track all your subscriptions with analytics",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const footer = (
    <footer>
      <div className="hard-line"></div>
      <div className="footer-content">
        <div>
        <div>
          <h4>Centsible</h4>
          <p>|</p>
          <button disabled>Install App</button>
        </div>
        <p className="copyright">© Copyright 2025 Mike Butts <br /> All Rights Reserved </p>
      </div>
       <div>
        <p>Facing issues? <a>Get help</a></p>
        <p>Suggestions for improvement? <a>Share feedback</a></p>
        <div>
          <Link href={'/privacy'}>Privacy Policy</Link>
          <Link href={'/tos'}>Terms of Service</Link>
        </div>
      </div> 
      </div>
    </footer>
  )


  const header = (
    <header>
      <div>
        <Link href={'/'}>
          <h1 className="text-gradient">Centsible</h1>
        </Link>
          <p>The Subscription Tracker</p>
      </div>
      <GoTo/>
    </header>
  )


  return (
    <html lang="en">
      <Head />
      <AuthProvider>

      <body>
        {header}
        <div className="full-line"></div>
        <main>
        {children}
        </main>
        {footer}
      </body>
      </AuthProvider>
    </html>
  );
}
