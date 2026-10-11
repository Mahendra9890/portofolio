"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Briefcase,
  Mail,
  MapPin,
  MessageSquare,
  Moon,
  Rocket,
  Star,
  SunMedium,
  Users,
  Menu,
  FileText,
} from "lucide-react";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { portfolioData } from "@/data/portfolio";
import type { Locale } from "@/types/portfolio";

function BrandIcon({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      width={18}
      height={18}
      fill="currentColor"
      className="shrink-0"
    >
      <title>{label}</title>
      {children}
    </svg>
  );
}

function GitHubIcon() {
  return (
    <BrandIcon label="GitHub">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2Z" />
    </BrandIcon>
  );
}

function LinkedInIcon() {
  return (
    <BrandIcon label="LinkedIn">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286ZM5.337 7.433a2.062 2.062 0 1 1 0-4.124 2.062 2.062 0 0 1 0 4.124ZM7.119 20.452H3.555V9h3.564v11.452ZM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003Z" />
    </BrandIcon>
  );
}

function InstagramIcon() {
  return (
    <BrandIcon label="Instagram">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069ZM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0Zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324ZM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8Zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881Z" />
    </BrandIcon>
  );
}

const navItems = [
  { href: "#about", label: { id: "About", en: "About" } },
  { href: "#projects", label: { id: "Projects", en: "Projects" } },
  { href: "#skills", label: { id: "Skills", en: "Skills" } },
  { href: "#experience", label: { id: "Experience", en: "Experience" } },
  { href: "#awards", label: { id: "Awards", en: "Awards" } },
  { href: "#contact", label: { id: "Contact", en: "Contact" } },
];

function getText(value: { id: string; en: string }, locale: Locale) {
  return locale === "en" ? value.en : value.id;
}

const projectCategoryOrder = ["Web App", "Web", "AI/Research", "Mobile App / UX Research", "Robotics"] as const;

export function PortfolioPage({ locale }: { locale: Locale }) {
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [mounted, setMounted] = useState(false);
  const [currentYear, setCurrentYear] = useState(2026);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [wordIndex, setWordIndex] = useState(0);
  const mobileMenuRef = useRef<HTMLDetailsElement>(null);
  const heroWords = portfolioData.profile.heroWords;
  const projectCategories = projectCategoryOrder.filter((category) =>
    portfolioData.projects.some((project) => project.category === category),
  );
  const visibleProjects = portfolioData.projects.filter(
    (project) => !selectedCategory || project.category === selectedCategory,
  );

  useEffect(() => {
    document.documentElement.lang = locale;
    const frame = window.requestAnimationFrame(() => {
      setTheme(document.documentElement.dataset.theme === "light" ? "light" : "dark");
      setCurrentYear(new Date().getFullYear());
      setMounted(true);
    });

    return () => window.cancelAnimationFrame(frame);
  }, [locale]);

  useEffect(() => {
    if (!mounted) return;
    document.documentElement.dataset.theme = theme;
    try {
      window.localStorage.setItem("theme", theme);
    } catch {
      // Storage can be blocked (private mode); the theme still applies for this visit.
    }
  }, [mounted, theme]);

  useEffect(() => {
    if (heroWords.length < 2 || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(() => {
      setWordIndex((index) => (index + 1) % heroWords.length);
    }, 2400);
    return () => window.clearInterval(timer);
  }, [heroWords.length]);

  const closeMobileMenu = () => mobileMenuRef.current?.removeAttribute("open");

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)]">
      <header className="sticky top-0 z-50 border-b border-[var(--border)] bg-[color-mix(in_srgb,var(--bg)_72%,transparent)] backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
          <Link href="#home" aria-label={locale === "id" ? "Kembali ke atas" : "Back to top"} className="flex items-center gap-3 text-sm font-semibold tracking-[0.2em] text-[var(--text)] uppercase">
            <span className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--surface)] text-xs tracking-[0.18em] text-[var(--accent)] transition-transform hover:scale-105">
              {portfolioData.profile.monogram}
            </span>
          </Link>

          <nav className="hidden items-center gap-6 md:flex">
            {navItems.map((item) => (
              <a key={item.href} href={item.href} className="text-[11px] font-medium uppercase tracking-[0.18em] text-[var(--text-muted)] transition-colors hover:text-[var(--text)]">
                {getText(item.label, locale)}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Link
              href={locale === "id" ? "/en" : "/id"}
              className="rounded-full border border-[var(--border)] px-3 py-1.5 text-[10px] uppercase tracking-[0.2em] text-[var(--text)]"
            >
              {locale === "id" ? "EN" : "ID"}
            </Link>
            <button
              type="button"
              aria-label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
              aria-pressed={theme === "light"}
              onClick={() => setTheme((prev) => (prev === "dark" ? "light" : "dark"))}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--surface)] text-[var(--text)]"
            >
              {theme === "dark" ? <SunMedium size={16} /> : <Moon size={16} />}
            </button>
            <a
              href="#contact"
              className="rounded-full bg-[var(--accent)] px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#111111] transition-transform hover:scale-[1.02]"
            >
              Hire Me
            </a>
            <details ref={mobileMenuRef} className="relative md:hidden">
              <summary className="flex h-10 w-10 cursor-pointer list-none items-center justify-center rounded-full border border-[var(--border)] bg-[var(--surface)] text-[var(--text)]" aria-label="Open navigation menu">
                <Menu size={17} />
              </summary>
              <nav aria-label="Mobile navigation" className="absolute right-0 top-12 z-50 grid min-w-48 gap-1 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-2 shadow-xl">
                {navItems.map((item) => (
                  <a key={item.href} href={item.href} onClick={closeMobileMenu} className="rounded-xl px-3 py-2 text-xs uppercase tracking-[0.14em] text-[var(--text-muted)] hover:bg-[var(--surface-2)] hover:text-[var(--text)]">
                    {getText(item.label, locale)}
                  </a>
                ))}
              </nav>
            </details>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 pb-20 pt-4 sm:px-6 lg:px-8">
        <section id="home" className="relative overflow-hidden py-12 sm:py-18 lg:min-h-[calc(100vh-5rem)] lg:py-20">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--accent-glow),_transparent_42%)]" />
          <div className="grid items-center gap-10 lg:grid-cols-[1.15fr_0.85fr]">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="relative z-10">
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--surface)] px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.18em] text-[var(--text-muted)]">
                <span className="h-2 w-2 rounded-full bg-[var(--accent-2)] shadow-[0_0_12px_var(--accent-2)]" />
                {portfolioData.profile.status[locale]}
              </div>

              <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--text-muted)]">
                {"// Software Engineer & Frontend Developer"}
              </p>

              <h1 className="max-w-xl text-5xl font-semibold tracking-[-0.06em] text-[var(--text)] sm:text-6xl lg:text-[7rem]">
                Prabu Mahendra
              </h1>

              <div className="mt-5 flex min-h-[32px] items-center text-lg text-[var(--text-muted)] sm:text-xl">
                <span className="mr-2 text-[var(--text)]">{locale === "id" ? "Saya adalah" : "I am"}</span>
                <motion.span
                  key={wordIndex}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="font-medium text-[var(--accent)]"
                  aria-live="polite"
                >
                  {heroWords[wordIndex][locale]}
                </motion.span>
              </div>

              <p className="mt-6 max-w-xl text-base leading-7 text-[var(--text-muted)] sm:text-lg">
                {portfolioData.profile.tagline[locale]}
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <a
                  href={portfolioData.profile.cv}
                  className="inline-flex items-center gap-2 rounded-full bg-[var(--accent)] px-5 py-3 text-sm font-semibold text-[#111111] transition-transform hover:scale-[1.02]"
                >
                  <FileText size={16} />
                  {locale === "id" ? "Minta CV" : "Request CV"}
                </a>
                <a
                  href="#projects"
                  className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] px-5 py-3 text-sm font-semibold text-[var(--text)] transition-transform hover:scale-[1.02]"
                >
                  {locale === "id" ? "Lihat Proyek" : "View Projects"}
                  <ArrowRight size={16} />
                </a>
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-3 text-[var(--text-muted)]">
                {['HTML', 'CSS', 'JavaScript', 'SQL', 'C++', 'Python', 'Figma', 'Git'].map((tool) => (
                  <span key={tool} className="rounded-full border border-[var(--border)] px-2.5 py-1 text-[10px] uppercase tracking-[0.18em]">
                    {tool}
                  </span>
                ))}
              </div>

              <div className="mt-8 flex flex-wrap gap-6 text-sm text-[var(--text-muted)]">
                <span className="inline-flex items-center gap-2"><MapPin size={14} /> Ubud, Bali · WITA</span>
                <span className="inline-flex items-center gap-2"><Briefcase size={14} /> BINUS University · B28</span>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7, delay: 0.1 }} className="relative mx-auto w-full max-w-[450px]">
              <div className="absolute -inset-4 rounded-[2rem] bg-[radial-gradient(circle,_var(--accent-glow),_transparent_70%)] blur-2xl" />
              <div className="relative overflow-hidden rounded-[2rem] border border-[var(--border)] bg-[var(--surface)] p-4 shadow-[0_20px_60px_rgba(0,0,0,0.3)]">
                <div className="absolute inset-0 bg-[linear-gradient(135deg,_rgba(255,255,255,0.05),_transparent_40%)]" />
                <div className="relative aspect-square overflow-hidden rounded-[1.5rem] border border-[var(--border)]">
                  <Image src="/images/profile-web.png" alt="Prabu Mahendra in a formal portrait" fill sizes="(max-width: 1024px) 90vw, 42vw" className="object-cover object-[center_top]" loading="eager" />
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="overflow-hidden border-y border-[var(--border)] bg-[var(--surface)] py-5">
          <div className="marquee-track flex min-w-max gap-8 whitespace-nowrap text-[10px] uppercase tracking-[0.3em] text-[var(--text-muted)]">
            {[...Array(2)].map((_, rowIndex) => (
              <div key={rowIndex} className="flex min-w-max gap-8 px-2">
                {['SOFTWARE ENGINEERING', 'FRONTEND', 'UI/UX', 'WEB DESIGN', 'BINUS', 'BALI', 'HTML', 'CSS', 'JAVASCRIPT', 'SQL', 'C++', 'PYTHON', 'FIGMA', 'GIT'].map((item) => (
                  <span key={`${rowIndex}-${item}`} className="inline-flex items-center gap-3">
                    {item}
                    <span className="text-[var(--accent)]">•</span>
                  </span>
                ))}
              </div>
            ))}
          </div>
        </section>

        <section id="about" className="py-20">
          <div className="mb-10 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--text-muted)]">
            <span className="text-[var(--accent)]">{"// about"}</span>
            <span className="inline-block h-px w-14 bg-[var(--border)]" />
            <span>01</span>
          </div>

          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
            <div className="relative">
              <div className="overflow-hidden rounded-[2rem] border border-[var(--border)] bg-[var(--surface)] p-3">
                <div className="group relative aspect-[4/5] overflow-hidden rounded-[1.5rem]" tabIndex={0} aria-label="Portrait of Prabu Mahendra; hover to see a casual portrait">
                  <Image src="/images/profile-web.png" alt="Prabu Mahendra in a formal portrait" fill sizes="(max-width: 1024px) 90vw, 32vw" className="object-cover object-[center_top] transition-opacity duration-300 group-hover:opacity-0 group-focus:opacity-0" />
                  <Image src="/images/profile-casual.jpg" alt="Prabu Mahendra wearing sunglasses" fill sizes="(max-width: 1024px) 90vw, 32vw" className="object-cover object-[center_top] opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus:opacity-100" />
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-4xl font-semibold tracking-[-0.06em] sm:text-5xl">{locale === "id" ? "Tentang saya" : "About me"}</h2>
              <p className="mt-6 max-w-2xl text-base leading-8 text-[var(--text-muted)]">
                {portfolioData.profile.longBio[locale]}
              </p>

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {[
                  { label: { id: "Kampus", en: "Campus" }, value: "BINUS University" },
                  { label: { id: "Jurusan", en: "Major" }, value: "CS · Software Engineering" },
                  { label: { id: "Lokasi", en: "Location" }, value: "Ubud, Bali" },
                  { label: { id: "Fokus", en: "Focus" }, value: "Frontend & UI/UX" },
                ].map((item) => (
                  <div key={item.label.en} className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4">
                    <div className="text-[10px] uppercase tracking-[0.2em] text-[var(--text-muted)]">{getText(item.label, locale)}</div>
                    <div className="mt-2 text-lg font-medium">{item.value}</div>
                  </div>
                ))}
              </div>

              <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {portfolioData.stats.map((stat) => (
                  <div key={stat.label.en} className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4">
                    <div className="text-3xl font-semibold tracking-[-0.05em] text-[var(--accent)]">{stat.value}</div>
                    <div className="mt-2 text-sm text-[var(--text-muted)]">{getText(stat.label, locale)}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <figure className="relative mt-16 aspect-[16/7] overflow-hidden rounded-[2rem] border border-[var(--border)] bg-[var(--surface)]">
            <Image
              src="/images/kmh-binus.jpg"
              alt="BINUS University Hindu Student Family community-service group in Bali"
              fill
              sizes="(max-width: 768px) 100vw, 90vw"
              className="object-cover object-[center_top]"
            />
            <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent px-6 pb-5 pt-16 text-sm font-medium text-white sm:px-8">
              {locale === "id" ? "Pengabdian masyarakat bersama KMH BINUS University · 2024" : "Community service with KMH BINUS University · 2024"}
            </figcaption>
          </figure>

          <div className="mt-16">
            <div className="mb-8 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--text-muted)]">
              <span>{locale === "id" ? "Cara saya bekerja" : "How I work"}</span>
            </div>
            <div className="grid gap-5 md:grid-cols-3">
              {[
                { icon: Users, title: { id: "Senang bekerja dalam tim", en: "I thrive in teams" }, description: { id: "Saya bekerja paling baik di tim dengan tujuan, pembagian peran, dan komunikasi yang jelas.", en: "I work best in teams with clear goals, clear roles, and clear communication." } },
                { icon: Rocket, title: { id: "Mandiri sejak SMP", en: "Self-starter since junior high" }, description: { id: "Saya mulai jualan online sendiri sejak SMP dan terbiasa bertanggung jawab penuh atas hasil kerja.", en: "I started selling online on my own in junior high and am used to taking full ownership of outcomes." } },
                { icon: Star, title: { id: "Bukan yang terpintar, tapi siap belajar", en: "Not the smartest, always learning" }, description: { id: "Saya terus berkembang dari robotik hingga web dan software engineering.", en: "I keep growing from robotics to web design and software engineering." } },
              ].map((item, index) => (
                <motion.div key={item.title.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ delay: index * 0.08 }} className="rounded-[2rem] border border-[var(--border)] bg-[var(--surface)] p-6">
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--surface-2)] text-[var(--accent)]">
                    <item.icon size={20} />
                  </div>
                  <div className="mb-1 text-[10px] uppercase tracking-[0.2em] text-[var(--text-muted)]">0{index + 1}</div>
                  <h3 className="text-2xl font-semibold tracking-[-0.04em]">{getText(item.title, locale)}</h3>
                  <p className="mt-4 text-base leading-7 text-[var(--text-muted)]">{getText(item.description, locale)}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section id="projects" className="py-20">
          <div className="mb-10 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--text-muted)]">
              <span className="text-[var(--accent)]">{"// projects"}</span>
              <span className="inline-block h-px w-14 bg-[var(--border)]" />
              <span>02</span>
            </div>
            <div className="text-[10px] uppercase tracking-[0.2em] text-[var(--text-muted)]">{locale === "id" ? "Proyek pilihan" : "Selected work"}</div>
          </div>

          <div aria-label={locale === "id" ? "Filter kategori proyek" : "Project category filter"} className="mb-6 flex flex-wrap gap-2">
            <button type="button" aria-pressed={selectedCategory === null} onClick={() => setSelectedCategory(null)} className={`rounded-full border px-3 py-2 text-[10px] uppercase tracking-[0.14em] ${selectedCategory === null ? "border-[var(--accent)] bg-[var(--accent)] text-[#111111]" : "border-[var(--border)] text-[var(--text-muted)]"}`}>
              {locale === "id" ? "Semua proyek" : "All projects"}
            </button>
            {projectCategories.map((category) => (
              <button key={category} type="button" aria-pressed={selectedCategory === category} onClick={() => setSelectedCategory(category)} className={`rounded-full border px-3 py-2 text-[10px] uppercase tracking-[0.14em] ${selectedCategory === category ? "border-[var(--accent)] bg-[var(--accent)] text-[#111111]" : "border-[var(--border)] text-[var(--text-muted)]"}`}>
                {category}
              </button>
            ))}
          </div>

          <div className="grid gap-5 lg:grid-cols-2">
            {visibleProjects.filter((project) => project.featured).map((project) => (
              <Link key={project.slug} href={`/${locale}/projects/${project.slug}`} className="group overflow-hidden rounded-[2rem] border border-[var(--border)] bg-[var(--surface)] p-3 lg:col-span-2">
                <div className="relative overflow-hidden rounded-[1.5rem] border border-[var(--border)]">
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image src={project.coverImage} alt={project.title} fill sizes="(max-width: 1024px) 100vw, 80vw" className="object-cover transition-transform duration-500 group-hover:scale-105" />
                  </div>
                </div>
                <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <div className="text-[10px] uppercase tracking-[0.2em] text-[var(--text-muted)]">{project.year ? `${project.year} · ` : ""}{project.category}</div>
                    <h3 className="mt-2 text-3xl font-semibold tracking-[-0.05em]">{project.title}</h3>
                  </div>
                  <div className="text-[10px] uppercase tracking-[0.2em] text-[var(--text-muted)]">{getText(project.role, locale)}</div>
                </div>
                <p className="mt-4 max-w-2xl text-base leading-7 text-[var(--text-muted)]">{getText(project.summary, locale)}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {project.stack.slice(0, 5).map((stack) => (
                    <span key={stack} className="rounded-full border border-[var(--border)] px-2.5 py-1 text-[10px] uppercase tracking-[0.14em] text-[var(--text-muted)]">{stack}</span>
                  ))}
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {visibleProjects.filter((project) => !project.featured).map((project) => (
              <Link key={project.slug} href={`/${locale}/projects/${project.slug}`} className="group overflow-hidden rounded-[2rem] border border-[var(--border)] bg-[var(--surface)] p-3">
                <div className="relative overflow-hidden rounded-[1.5rem] border border-[var(--border)]">
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image src={project.coverImage} alt={project.title} fill sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw" className="object-cover transition-transform duration-500 group-hover:scale-105" />
                  </div>
                </div>
                <div className="mt-4 flex items-center justify-between text-[10px] uppercase tracking-[0.18em] text-[var(--text-muted)]">
                  <span>{project.year ?? (locale === "id" ? "Proyek kuliah" : "Course project")}</span>
                  <span>{project.category}</span>
                </div>
                <h3 className="mt-3 text-2xl font-semibold tracking-[-0.04em]">{project.title}</h3>
                <p className="mt-3 text-sm leading-7 text-[var(--text-muted)]">{getText(project.summary, locale)}</p>
              </Link>
            ))}
          </div>
        </section>

        <section id="skills" className="py-20">
          <div className="mb-10 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--text-muted)]">
            <span className="text-[var(--accent)]">{"// skills"}</span>
            <span className="inline-block h-px w-14 bg-[var(--border)]" />
            <span>03</span>
          </div>
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            <div className="rounded-[2rem] border border-[var(--border)] bg-[var(--surface)] p-6">
              <h3 className="text-lg font-semibold">Core Languages</h3>
              <div className="mt-6 space-y-4">
                {portfolioData.skills.core.map((skill) => (
                  <div key={skill.name}>
                    <div className="mb-2 flex items-center justify-between text-sm"><span>{skill.name}</span><span className="text-[var(--text-muted)]">{skill.label}</span></div>
                    <div className="flex gap-1.5">
                      {Array.from({ length: 5 }).map((_, idx) => (
                        <span key={`${skill.name}-${idx}`} className={`h-2.5 flex-1 rounded-full ${idx < skill.level ? "bg-[var(--accent)]" : "bg-[var(--surface-2)]"}`} />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[2rem] border border-[var(--border)] bg-[var(--surface)] p-6">
              <h3 className="text-lg font-semibold">Frontend & Design</h3>
              <div className="mt-6 flex flex-wrap gap-2">
                {portfolioData.skills.frontend.map((item) => (
                  <span key={item} className="rounded-full border border-[var(--border)] px-3 py-2 text-xs uppercase tracking-[0.14em] text-[var(--text-muted)]">{item}</span>
                ))}
              </div>
            </div>

            <div className="rounded-[2rem] border border-[var(--border)] bg-[var(--surface)] p-6">
              <h3 className="text-lg font-semibold">Tools & Workflow</h3>
              <div className="mt-6 flex flex-wrap gap-2">
                {portfolioData.skills.tools.map((item) => (
                  <span key={item} className="rounded-full border border-[var(--border)] px-3 py-2 text-xs uppercase tracking-[0.14em] text-[var(--text-muted)]">{item}</span>
                ))}
              </div>
            </div>

            <div className="rounded-[2rem] border border-[var(--border)] bg-[var(--surface)] p-6">
              <h3 className="text-lg font-semibold">Team Stack</h3>
              <div className="mt-6 flex flex-wrap gap-2">
                {portfolioData.skills.teamStack.map((item) => (
                  <span key={item} className="rounded-full border border-[var(--border)] px-3 py-2 text-xs uppercase tracking-[0.14em] text-[var(--text-muted)]">{item}</span>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="experience" className="py-20">
          <div className="mb-10 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--text-muted)]">
            <span className="text-[var(--accent)]">{"// experience"}</span>
            <span className="inline-block h-px w-14 bg-[var(--border)]" />
            <span>04</span>
          </div>

          <div className="space-y-6">
            {portfolioData.experiences.map((experience) => (
              <div key={`${experience.organization}-${experience.period}`} className="relative rounded-[2rem] border border-[var(--border)] bg-[var(--surface)] p-6 pl-7">
                <div className="absolute left-5 top-7 h-[calc(100%-2rem)] w-px bg-[var(--border)]" />
                <div className="absolute left-[1.05rem] top-7 h-3 w-3 rounded-full bg-[var(--accent)] shadow-[0_0_18px_var(--accent)]" />
                <div className="ml-2">
                  <div className="text-[10px] uppercase tracking-[0.2em] text-[var(--text-muted)]">{experience.period}</div>
                  <h3 className="mt-2 text-2xl font-semibold tracking-[-0.04em]">{getText(experience.role, locale)}</h3>
                  <div className="mt-2 text-base font-medium text-[var(--accent)]">{experience.organization}</div>
                  {experience.image && (
                    <div className="relative mt-4 aspect-[16/7] max-w-3xl overflow-hidden rounded-2xl">
                      <Image src={experience.image} alt={`${experience.organization} community-service group photo`} fill sizes="(max-width: 768px) 100vw, 75vw" className="object-cover object-[center_top]" />
                    </div>
                  )}
                  <p className="mt-3 max-w-3xl text-base leading-7 text-[var(--text-muted)]">{getText(experience.summary, locale)}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {experience.tags.map((tag) => (
                      <span key={tag} className="rounded-full border border-[var(--border)] px-2.5 py-1 text-[10px] uppercase tracking-[0.14em] text-[var(--text-muted)]">{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="awards" className="py-20">
          <div className="mb-10 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--text-muted)]">
            <span className="text-[var(--accent)]">{"// awards"}</span>
            <span className="inline-block h-px w-14 bg-[var(--border)]" />
            <span>05</span>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            {portfolioData.awards.map((award) => (
              <div key={award.title} className={`rounded-[2rem] border border-[var(--border)] bg-[var(--surface)] p-4 ${award.highlight ? "ring-1 ring-[var(--accent)]" : ""}`}>
                <div className={`grid gap-3 ${award.photo ? "grid-cols-2" : ""}`}>
                  <div className="relative aspect-[4/3] overflow-hidden rounded-[1.25rem] border border-[var(--border)]">
                    <Image src={award.image} alt={`${award.title}, ${award.event}`} fill sizes={award.photo ? "(max-width: 768px) 50vw, 25vw" : "(max-width: 768px) 100vw, 50vw"} className="object-cover" />
                  </div>
                  {award.photo && (
                    <div className="relative aspect-[4/3] overflow-hidden rounded-[1.25rem] border border-[var(--border)]">
                      <Image src={award.photo} alt={`Prabu Mahendra, ${award.event}`} fill sizes="(max-width: 768px) 50vw, 25vw" className="object-cover object-[center_top]" />
                    </div>
                  )}
                </div>
                <div className="mt-4 flex items-center justify-between gap-3">
                  <h3 className="text-xl font-semibold tracking-[-0.04em]">{award.title}</h3>
                  {award.badge === "gold" ? (
                    <span className="rounded-full border border-amber-300/60 bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-500 px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.16em] text-amber-950 shadow-[0_0_18px_rgba(245,190,55,0.28)]">
                      {locale === "id" ? "Emas" : "Gold"}
                    </span>
                  ) : award.highlight && <span className="rounded-full bg-[var(--accent)] px-2 py-1 text-[9px] uppercase tracking-[0.16em] text-[#111111]">Highlight</span>}
                </div>
                <p className="mt-3 text-sm text-[var(--text-muted)]">{award.event}</p>
                <div className="mt-3 text-[11px] uppercase tracking-[0.16em] text-[var(--text-muted)]">{award.organizer}</div>
                <div className="mt-3 flex items-center justify-between text-sm text-[var(--text-muted)]">
                  <span>{award.date}</span>
                  <span>{award.level}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="py-20">
          <div className="rounded-[2rem] border border-[var(--border)] bg-[var(--surface)] p-6 md:p-8">
            <div className="mb-6 text-[11px] uppercase tracking-[0.2em] text-[var(--text-muted)]">{locale === "id" ? "Perjalanan saya" : "My journey"}</div>
            <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7">
              {portfolioData.journey.map((step) => (
                <li key={step.label} className="flex items-center gap-3 xl:flex-col xl:items-start">
                  <div className="flex h-10 w-12 shrink-0 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--surface-2)] text-[10px] font-semibold uppercase tracking-[0.14em] text-[var(--accent)]">{step.label}</div>
                  <div className="text-sm text-[var(--text-muted)]">{getText(step.title, locale)}</div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="py-20">
          <div className="mb-10 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--text-muted)]">
            <span className="text-[var(--accent)]">{"// research"}</span>
            <span className="inline-block h-px w-14 bg-[var(--border)]" />
            <span>06</span>
          </div>
          <div className="rounded-[2rem] border border-[var(--border)] bg-[var(--surface)] p-6 md:p-8">
            <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
              <div>
                <div className="text-[10px] uppercase tracking-[0.2em] text-[var(--text-muted)]">{portfolioData.research.venue}</div>
                <h3 className="mt-3 max-w-3xl text-3xl font-semibold tracking-[-0.05em]">{portfolioData.research.title}</h3>
              </div>
              <div className="rounded-full border border-[var(--border)] px-3 py-2 text-[10px] uppercase tracking-[0.2em] text-[var(--text-muted)]">{portfolioData.research.status}</div>
            </div>
            <p className="mt-5 max-w-3xl text-base leading-8 text-[var(--text-muted)]">{getText(portfolioData.research.summary, locale)}</p>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-[var(--text-muted)]">{portfolioData.research.authors}</p>
            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              {portfolioData.research.metrics.map((metric) => (
                <div key={metric.label.en} className="rounded-2xl border border-[var(--border)] bg-[var(--bg)] p-5">
                  <div className="text-3xl font-semibold tracking-[-0.05em] text-[var(--accent)]">{metric.value}</div>
                  <div className="mt-2 text-xs uppercase tracking-[0.14em] text-[var(--text-muted)]">{getText(metric.label, locale)}</div>
                  {metric.comparison && <div className="mt-2 text-xs text-[var(--text-muted)]">{metric.comparison}</div>}
                </div>
              ))}
            </div>
            <div className="mt-6 flex flex-wrap gap-3 text-sm text-[var(--text-muted)]">
              <span>{locale === "id" ? "Tahun" : "Year"}: {portfolioData.research.year}</span>
            </div>
            <a href={portfolioData.research.paperUrl} target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex rounded-full bg-[var(--accent)] px-5 py-3 text-sm font-semibold text-[#111111]">
              {locale === "id" ? "Baca Paper (PDF)" : "Read Paper (PDF)"}
            </a>
          </div>
        </section>

        <section className="py-20">
          <div className="mb-10 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--text-muted)]">
            <span className="text-[var(--accent)]">{"// beyond code"}</span>
            <span className="inline-block h-px w-14 bg-[var(--border)]" />
            <span>07</span>
          </div>
          <div className="grid gap-5 lg:grid-cols-2">
            {portfolioData.ventures.map((venture) => (
              <div key={venture.title} className="rounded-[2rem] border border-[var(--border)] bg-[var(--surface)] p-6">
                {venture.image && (
                  <div className="relative mb-5 aspect-[16/7] overflow-hidden rounded-2xl">
                    <Image src={venture.image} alt={`${venture.title} logo`} fill sizes="(max-width: 1024px) 100vw, 50vw" className={venture.imageFit === "contain" ? "bg-[var(--bg)] object-contain" : "object-cover"} />
                  </div>
                )}
                <div className="mb-4 text-[10px] uppercase tracking-[0.2em] text-[var(--text-muted)]">{venture.period}</div>
                <h3 className="text-2xl font-semibold tracking-[-0.04em]">{venture.title}</h3>
                <p className="mt-4 text-base leading-7 text-[var(--text-muted)]">{getText(venture.description, locale)}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {venture.metrics.map((metric) => (
                    <span key={metric} className="rounded-full border border-[var(--border)] px-2.5 py-1 text-[10px] uppercase tracking-[0.14em] text-[var(--text-muted)]">{metric}</span>
                  ))}
                </div>
                {venture.url && (
                  <a href={venture.url} target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex rounded-full border border-[var(--border)] px-4 py-2 text-xs font-medium text-[var(--text)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]">
                    {venture.urlLabel ? getText(venture.urlLabel, locale) : locale === "id" ? "Kunjungi" : "Visit"}
                  </a>
                )}
              </div>
            ))}
          </div>
        </section>

        <section id="contact" className="py-20">
          <div className="mb-10 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--text-muted)]">
            <span className="text-[var(--accent)]">{"// contact"}</span>
            <span className="inline-block h-px w-14 bg-[var(--border)]" />
            <span>08</span>
          </div>

          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <h2 className="text-4xl font-semibold tracking-[-0.06em] sm:text-5xl lg:text-7xl">{locale === "id" ? "Mari bangun sesuatu bersama." : "Let’s build something together."}</h2>
              <p className="mt-5 max-w-xl text-base leading-8 text-[var(--text-muted)]">
                {locale === "id"
                  ? "Saya terbuka untuk magang Software Engineer dan Frontend Engineer selama 1 tahun."
                  : "I’m open to Software Engineer and Frontend Engineer internships for 1 year."}
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <a href={`mailto:${portfolioData.profile.email}`} className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] px-4 py-2 text-sm text-[var(--text)]"><Mail size={16} /> {portfolioData.profile.email}</a>
                <a href={`https://wa.me/${portfolioData.profile.whatsapp.replace(/\D/g, "")}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full bg-[var(--accent)] px-4 py-2 text-sm font-semibold text-[#111111]"><MessageSquare size={16} /> WhatsApp</a>
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <a aria-label="GitHub profile" href={portfolioData.profile.github} target="_blank" rel="noopener noreferrer" className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--surface)] text-[var(--text)]"><GitHubIcon /></a>
                <a aria-label="LinkedIn profile" href={portfolioData.profile.linkedin} target="_blank" rel="noopener noreferrer" className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--surface)] text-[var(--text)]"><LinkedInIcon /></a>
                <a aria-label="Instagram profile" href={portfolioData.profile.instagram} target="_blank" rel="noopener noreferrer" className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--surface)] text-[var(--text)]"><InstagramIcon /></a>
                <a aria-label={locale === "id" ? "Minta CV melalui email" : "Request CV by email"} href={portfolioData.profile.cv} className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--surface)] text-[var(--text)]"><Mail size={18} /></a>
              </div>
            </div>

            <form
              className="rounded-[2rem] border border-[var(--border)] bg-[var(--surface)] p-6"
              onSubmit={(event) => {
                event.preventDefault();
                const form = new FormData(event.currentTarget);
                const subject = encodeURIComponent(`Portfolio inquiry from ${String(form.get("name"))}`);
                const body = encodeURIComponent([
                  `Name: ${String(form.get("name"))}`,
                  `Email: ${String(form.get("email"))}`,
                  `Company: ${String(form.get("company") || "Not provided")}`,
                  "",
                  String(form.get("message")),
                ].join("\n"));
                window.location.href = `mailto:${portfolioData.profile.email}?subject=${subject}&body=${body}`;
              }}
            >
              <div className="grid gap-4">
                <label className="grid gap-2 text-sm text-[var(--text-muted)]">
                  <span>{locale === "id" ? "Nama" : "Name"}</span>
                  <input name="name" autoComplete="name" required className="rounded-xl border border-[var(--border)] bg-[var(--bg)] px-4 py-3 text-[var(--text)] outline-none ring-0 focus:border-[var(--accent)]" />
                </label>
                <label className="grid gap-2 text-sm text-[var(--text-muted)]">
                  <span>Email</span>
                  <input name="email" autoComplete="email" type="email" required className="rounded-xl border border-[var(--border)] bg-[var(--bg)] px-4 py-3 text-[var(--text)] outline-none ring-0 focus:border-[var(--accent)]" />
                </label>
                <label className="grid gap-2 text-sm text-[var(--text-muted)]">
                  <span>{locale === "id" ? "Perusahaan" : "Company"}</span>
                  <input name="company" autoComplete="organization" className="rounded-xl border border-[var(--border)] bg-[var(--bg)] px-4 py-3 text-[var(--text)] outline-none ring-0 focus:border-[var(--accent)]" />
                </label>
                <label className="grid gap-2 text-sm text-[var(--text-muted)]">
                  <span>{locale === "id" ? "Pesan" : "Message"}</span>
                  <textarea name="message" required rows={4} className="rounded-xl border border-[var(--border)] bg-[var(--bg)] px-4 py-3 text-[var(--text)] outline-none ring-0 focus:border-[var(--accent)]" />
                </label>
                <button type="submit" className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-[var(--accent)] px-5 py-3 text-sm font-semibold text-[#111111]">
                  {locale === "id" ? "Kirim pesan" : "Send message"}
                  <ArrowRight size={16} />
                </button>
              </div>
            </form>
          </div>
        </section>
      </main>

      <footer className="border-t border-[var(--border)] bg-[var(--surface)]">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-6 text-sm text-[var(--text-muted)] sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <p>© {currentYear} Prabu Mahendra. Built with Next.js and deployed on Vercel.</p>
          <div className="flex items-center gap-4">
            <span>Made in Bali</span>
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent-2)]" />
            <span>WITA</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
