import type { Metadata } from "next";
import { DM_Sans, Instrument_Serif } from "next/font/google";
import "./globals.css";

// Production domain first, so link previews never point at a per-deploy preview URL.
const siteHost = process.env.VERCEL_PROJECT_PRODUCTION_URL ?? process.env.VERCEL_URL;
const metadataBase = new URL(siteHost ? `https://${siteHost}` : "http://localhost:3000");

// Runs before paint so the saved theme applies without a dark-to-light flash, on every page.
const themeScript = `try{if(localStorage.getItem("theme")==="light")document.documentElement.dataset.theme="light"}catch(e){}`;
const profileImageUrl = new URL("/images/profile-web.png", metadataBase).toString();

const bodyFont = DM_Sans({
  variable: "--font-body",
  subsets: ["latin"],
});

const displayFont = Instrument_Serif({
  variable: "--font-display",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
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
    <html lang="id" suppressHydrationWarning data-scroll-behavior="smooth" className={`${bodyFont.variable} ${displayFont.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
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
                "https://www.instagram.com/mahendr4k/",
              ],
            }),
          }}
        />
        {children}
      </body>
    </html>
  );
}
