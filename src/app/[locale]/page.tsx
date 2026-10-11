import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { PortfolioPage } from "@/components/portfolio-page";
import type { Locale } from "@/types/portfolio";

const validLocales: Locale[] = ["id", "en"];

export function generateStaticParams() {
  return validLocales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!validLocales.includes(locale as Locale)) return {};

  return locale === "en"
    ? {
        title: "Prabu Mahendra | Software Engineer Intern",
        description:
          "Computer Science student at BINUS University, focused on frontend engineering and UI/UX. Open to internship opportunities.",
        openGraph: { locale: "en_US" },
      }
    : {
        title: "Prabu Mahendra | Software Engineer & Frontend Developer",
        description:
          "Portofolio Prabu Mahendra, mahasiswa Computer Science BINUS yang berfokus pada frontend engineering dan UI/UX, terbuka untuk magang.",
        openGraph: { locale: "id_ID" },
      };
}

export default function LocalePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  return (
    <Suspense fallback={<main className="flex min-h-[60vh] items-center justify-center text-sm text-[var(--text-muted)]">Loading portfolio…</main>}>
      <LocalePageContent params={params} />
    </Suspense>
  );
}

async function LocalePageContent({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!validLocales.includes(locale as Locale)) {
    notFound();
  }

  return <PortfolioPage locale={locale as Locale} />;
}
