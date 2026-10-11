import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const metadataBase = new URL(
  process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "http://localhost:3000",
);
const profileImageUrl = new URL("/images/profile-web.png", metadataBase).toString();

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
    images: [
      {
        url: profileImageUrl,
        width: 1254,
        height: 1254,
        alt: "Prabu Mahendra in a formal portrait",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Prabu Mahendra | Software Engineer & Frontend Developer",
    description:
      "Computer Science student at BINUS, focused on frontend engineering and UI/UX. Open to internship opportunities.",
    images: [profileImageUrl],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="id" suppressHydrationWarning data-scroll-behavior="smooth" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Prabu Mahendra",
              url: metadataBase.toString(),
              image: profileImageUrl,
              jobTitle: "Software Engineer & Frontend Developer",
              email: "mailto:prabumahendra255@gmail.com",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Ubud",
                addressRegion: "Bali",
                addressCountry: "ID",
              },
              sameAs: [
                "https://github.com/Mahendra9890",
                "https://www.linkedin.com/in/prabumahendra/",
                "https://www.instagram.com/mahendr4k?utm_source=ig_web_button_share_sheet&obrf=ZDNlZDc0MzIxNw==",
              ],
            }),
          }}
        />
        {children}
      </body>
    </html>
  );
}
