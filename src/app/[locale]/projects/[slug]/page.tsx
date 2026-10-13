import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { portfolioData } from "@/data/portfolio";
import type { Locale } from "@/types/portfolio";

const locales: Locale[] = ["id", "en"];

function localized(value: { id: string; en: string }, locale: Locale) {
  return value[locale];
}

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    portfolioData.projects.map((project) => ({ locale, slug: project.slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale: requestedLocale, slug } = await params;
  const project = portfolioData.projects.find((item) => item.slug === slug);
  if (!project || !locales.includes(requestedLocale as Locale)) return {};

  const locale = requestedLocale as Locale;
  return {
    title: `${project.title} | Prabu Mahendra`,
    description: localized(project.summary, locale),
    openGraph: {
      title: `${project.title} | Prabu Mahendra`,
      description: localized(project.summary, locale),
      images: [project.coverImage],
    },
  };
}

export default function LocaleProjectDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  return (
    <Suspense fallback={<main className="flex min-h-[60vh] items-center justify-center text-sm text-[var(--text-muted)]">Loading project…</main>}>
      <LocaleProjectDetailContent params={params} />
    </Suspense>
  );
}

async function LocaleProjectDetailContent({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  if (!locales.includes(locale as Locale)) notFound();
  const currentLocale = locale as Locale;
  const project = portfolioData.projects.find((item) => item.slug === slug);

  if (!project) {
    notFound();
  }

  return (
    <main className="mx-auto max-w-6xl px-4 pb-[calc(4rem+env(safe-area-inset-bottom))] pt-8 sm:px-6 sm:pt-16 lg:px-8">
      <nav aria-label="Breadcrumb" className="mb-6 flex min-w-0 items-center text-[11px] uppercase tracking-[0.2em] text-[var(--text-muted)]">
        <Link href={`/${currentLocale}#projects`} className="inline-flex min-h-11 shrink-0 items-center gap-2 rounded-full border border-[var(--border)] px-4 hover:text-[var(--text)]">
          <span aria-hidden="true">←</span>
          {currentLocale === "id" ? "Kembali" : "Back"}
        </Link>
        <span className="mx-3 hidden sm:inline">/</span>
        <span className="hidden truncate sm:inline">{project.title}</span>
      </nav>

      <div className="overflow-hidden rounded-[1.5rem] border border-[var(--border)] bg-[var(--surface)] p-2 sm:rounded-[2rem] sm:p-4">
        <div className="relative aspect-[4/3] sm:aspect-[16/10] overflow-hidden rounded-[1.5rem] border border-[var(--border)]">
          <Image src={project.coverImage} alt={project.title} fill sizes="(max-width: 768px) 100vw, 90vw" className="object-cover" />
        </div>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <div className="text-[11px] uppercase tracking-[0.2em] text-[var(--text-muted)]">{project.year ? `${project.year} · ` : ""}{project.category}</div>
          <h1 className="mt-3 break-words text-3xl font-semibold tracking-[-0.05em] sm:text-5xl">{project.title}</h1>
          {project.context && <p className="mt-3 text-sm font-medium text-[var(--accent)]">{project.context}</p>}
          <p className="mt-4 max-w-2xl text-base leading-8 text-[var(--text-muted)]">{localized(project.summary, currentLocale)}</p>
          {project.authors && <p className="mt-4 max-w-2xl text-sm leading-7 text-[var(--text-muted)]"><span className="font-semibold text-[var(--text)]">{currentLocale === "id" ? "Penulis: " : "Authors: "}</span>{project.authors}</p>}
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            {project.pdfUrl && <a href={project.pdfUrl} target="_blank" rel="noopener noreferrer" className="flex min-h-11 w-full items-center justify-center rounded-full bg-[var(--accent)] px-5 py-3 text-sm font-semibold text-[#111111] sm:w-auto">{project.pdfLabel ? localized(project.pdfLabel, currentLocale) : currentLocale === "id" ? "Buka PDF" : "Open PDF"}</a>}
            {project.liveUrl && <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="flex min-h-11 w-full items-center justify-center rounded-full bg-[var(--accent)] px-5 py-3 text-sm font-semibold text-[#111111] sm:w-auto">{currentLocale === "id" ? "Buka proyek" : "Visit project"}</a>}
            {project.repoUrl && <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" className="flex min-h-11 w-full items-center justify-center rounded-full border border-[var(--border)] px-5 py-3 text-sm font-semibold text-[var(--text)] sm:w-auto">GitHub</a>}
            {project.linkedinUrl && <a href={project.linkedinUrl} target="_blank" rel="noopener noreferrer" className="flex min-h-11 w-full items-center justify-center rounded-full border border-[var(--border)] px-5 py-3 text-sm font-semibold text-[var(--text)] sm:w-auto">{currentLocale === "id" ? "Lihat di LinkedIn" : "View on LinkedIn"}</a>}
          </div>
        </div>
        <div className="rounded-[2rem] border border-[var(--border)] bg-[var(--surface)] p-6">
          <div className="grid gap-4 text-sm text-[var(--text-muted)]">
            <div><span className="text-[var(--text)]">{currentLocale === "id" ? "Peran:" : "Role:"}</span> {localized(project.role, currentLocale)}</div>
            <div><span className="text-[var(--text)]">{currentLocale === "id" ? "Tim:" : "Team:"}</span> {project.team}</div>
            <div><span className="text-[var(--text)]">Stack:</span> {project.stack.join(", ")}</div>
          </div>
        </div>
      </div>

      <section className="mt-12 grid gap-6 lg:grid-cols-2">
        <article className="rounded-[2rem] border border-[var(--border)] bg-[var(--surface)] p-6">
          <h2 className="text-2xl font-semibold tracking-[-0.04em]">{currentLocale === "id" ? "Tantangan" : "Challenge"}</h2>
          <p className="mt-3 text-base leading-8 text-[var(--text-muted)]">{localized(project.problem, currentLocale)}</p>
        </article>
        <article className="rounded-[2rem] border border-[var(--border)] bg-[var(--surface)] p-6">
          <h2 className="text-2xl font-semibold tracking-[-0.04em]">{currentLocale === "id" ? "Solusi" : "Solution"}</h2>
          <p className="mt-3 text-base leading-8 text-[var(--text-muted)]">{localized(project.solution, currentLocale)}</p>
        </article>
      </section>

      {project.metrics && (
        <section aria-label={currentLocale === "id" ? "Hasil penelitian" : "Research results"} className="mt-12 grid gap-4 sm:grid-cols-3">
          {project.metrics.map((metric) => (
            <article key={metric.label.en} className="rounded-[2rem] border border-[var(--border)] bg-[var(--surface)] p-6">
              <div className="text-4xl font-semibold tracking-[-0.06em] text-[var(--accent)]">{metric.value}</div>
              <div className="mt-2 text-xs uppercase tracking-[0.14em] text-[var(--text-muted)]">{localized(metric.label, currentLocale)}</div>
              {metric.comparison && <p className="mt-2 text-sm text-[var(--text-muted)]">{metric.comparison}</p>}
            </article>
          ))}
        </section>
      )}

      <section className="mt-12 rounded-[2rem] border border-[var(--border)] bg-[var(--surface)] p-6">
        <h2 className="text-2xl font-semibold tracking-[-0.04em]">{currentLocale === "id" ? "Fitur utama" : "Key features"}</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {project.features.map((feature) => (
            <article key={feature.id} className="rounded-2xl border border-[var(--border)] bg-[var(--bg)] p-4">
              <h3 className="text-lg font-semibold">{localized(feature.title, currentLocale)}</h3>
              <p className="mt-2 text-sm leading-7 text-[var(--text-muted)]">{localized(feature.description, currentLocale)}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-12 rounded-[2rem] border border-[var(--border)] bg-[var(--surface)] p-6">
        <h2 className="text-2xl font-semibold tracking-[-0.04em]">{currentLocale === "id" ? "Hasil" : "Outcome"}</h2>
        <p className="mt-3 text-base leading-8 text-[var(--text-muted)]">{localized(project.result, currentLocale)}</p>
      </section>

      {project.businessModel && (
        <section className="mt-12 rounded-[2rem] border border-[var(--border)] bg-[var(--surface)] p-6">
          <h2 className="text-2xl font-semibold tracking-[-0.04em]">{currentLocale === "id" ? "Model bisnis & dampak" : "Business model & impact"}</h2>
          <p className="mt-3 text-base leading-8 text-[var(--text-muted)]">{localized(project.businessModel, currentLocale)}</p>
        </section>
      )}

      {project.gallery.length > 0 && (
        <section aria-label={currentLocale === "id" ? "Galeri proyek" : "Project gallery"} className="mt-12 grid gap-4 sm:grid-cols-2">
          {project.gallery.map((image, index) => (
            <div key={image} className="relative aspect-[4/3] overflow-hidden rounded-[1.5rem] border border-[var(--border)]">
              <Image src={image} alt={`${project.title} ${currentLocale === "id" ? "dokumentasi" : "gallery"} ${index + 1}`} fill sizes="(max-width: 640px) 100vw, 50vw" className="object-cover" />
            </div>
          ))}
        </section>
      )}

    </main>
  );
}
