

import "./globals.css";
import { Poppins } from 'next/font/google';
import Header from "@/components/Header";

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-poppins',
  display: 'swap',
});





export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
      className={`${poppins.variable} antialiased`}
      >
        <Header></Header>
        {children}
        
        
      </body>
    </html>
  );
}
