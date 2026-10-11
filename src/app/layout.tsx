import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const metadataBase = new URL(
  process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "http://localhost:3000",
);

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase,
  title: "Prabu Mahendra | Software Engineer & Frontend Developer",
  description:
    "Portofolio Prabu Mahendra, mahasiswa Computer Science BINUS peminatan Software Engineering. Frontend developer dan UI/UX designer dari Bali, terbuka untuk magang.",
  applicationName: "Prabu Mahendra Portfolio",
  keywords: [
    "Prabu Mahendra",
    "Software Engineer Intern",
    "Frontend Developer",
    "UI/UX Designer",
    "BINUS University",
    "Bali",
  ],
  openGraph: {
    title: "Prabu Mahendra | Software Engineer & Frontend Developer",
    description:
      "Computer Science student at BINUS, focused on frontend engineering and UI/UX. Open to internship opportunities.",
    type: "website",
    locale: "id_ID",
  },
  twitter: {
    card: "summary_large_image",
    title: "Prabu Mahendra | Software Engineer & Frontend Developer",
    description:
      "Computer Science student at BINUS, focused on frontend engineering and UI/UX. Open to internship opportunities.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="id" suppressHydrationWarning data-scroll-behavior="smooth" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
