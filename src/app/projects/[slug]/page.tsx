import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { portfolioData } from "@/data/portfolio";

export function generateStaticParams() {
  return portfolioData.projects.map((project) => ({ slug: project.slug }));
}

export default function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  return (
    <Suspense fallback={<main className="flex min-h-[60vh] items-center justify-center text-sm text-[var(--text-muted)]">Loading project…</main>}>
      <ProjectDetailContent params={params} />
    </Suspense>
  );
}

async function ProjectDetailContent({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = portfolioData.projects.find((item) => item.slug === slug);

  if (!project) {
    notFound();
  }

  return (
    <main className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-6 text-[10px] uppercase tracking-[0.2em] text-[var(--text-muted)]">
        <Link href="/" className="hover:text-[var(--text)]">Home</Link>
        <span className="mx-2">/</span>
        <span>{project.title}</span>
      </div>

      <div className="overflow-hidden rounded-[2rem] border border-[var(--border)] bg-[var(--surface)] p-4">
        <div className="relative aspect-[16/10] overflow-hidden rounded-[1.5rem] border border-[var(--border)]">
          <Image src={project.coverImage} alt={project.title} fill sizes="(max-width: 768px) 100vw, 90vw" className="object-cover" />
        </div>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <div className="text-[10px] uppercase tracking-[0.2em] text-[var(--text-muted)]">{project.year} · {project.category}</div>
          <h1 className="mt-3 text-4xl font-semibold tracking-[-0.06em] sm:text-5xl">{project.title}</h1>
          <p className="mt-4 max-w-2xl text-base leading-8 text-[var(--text-muted)]">{project.summary.id}</p>
        </div>
        <div className="rounded-[2rem] border border-[var(--border)] bg-[var(--surface)] p-6">
          <div className="grid gap-4 text-sm text-[var(--text-muted)]">
            <div><span className="text-[var(--text)]">Role:</span> {project.role.id}</div>
            <div><span className="text-[var(--text)]">Team:</span> {project.team}</div>
            <div><span className="text-[var(--text)]">Stack:</span> {project.stack.join(", ")}</div>
          </div>
        </div>
      </div>

      <section className="mt-12 grid gap-8 lg:grid-cols-2">
        <div className="rounded-[2rem] border border-[var(--border)] bg-[var(--surface)] p-6">
          <h2 className="text-2xl font-semibold tracking-[-0.04em]">Problem</h2>
          <p className="mt-3 text-base leading-8 text-[var(--text-muted)]">{project.problem.id}</p>
        </div>
        <div className="rounded-[2rem] border border-[var(--border)] bg-[var(--surface)] p-6">
          <h2 className="text-2xl font-semibold tracking-[-0.04em]">Solution</h2>
          <p className="mt-3 text-base leading-8 text-[var(--text-muted)]">{project.solution.id}</p>
        </div>
      </section>

      <section className="mt-12 rounded-[2rem] border border-[var(--border)] bg-[var(--surface)] p-6">
        <h2 className="text-2xl font-semibold tracking-[-0.04em]">Key Features</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {project.features.map((feature) => (
            <div key={feature.id} className="rounded-2xl border border-[var(--border)] bg-[var(--bg)] p-4">
              <div className="text-lg font-semibold">{feature.title.id}</div>
              <p className="mt-2 text-sm leading-7 text-[var(--text-muted)]">{feature.description.id}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-12 rounded-[2rem] border border-[var(--border)] bg-[var(--surface)] p-6">
        <h2 className="text-2xl font-semibold tracking-[-0.04em]">Result</h2>
        <p className="mt-3 text-base leading-8 text-[var(--text-muted)]">{project.result.id}</p>
      </section>

      <div className="mt-10 flex flex-wrap gap-3">
        {project.liveUrl && <a href={project.liveUrl} target="_blank" rel="noreferrer" className="rounded-full bg-[var(--accent)] px-5 py-3 text-sm font-semibold text-[#111111]">Live Site</a>}
        {project.repoUrl && <a href={project.repoUrl} target="_blank" rel="noreferrer" className="rounded-full border border-[var(--border)] px-5 py-3 text-sm font-semibold text-[var(--text)]">GitHub</a>}
        {project.linkedinUrl && <a href={project.linkedinUrl} target="_blank" rel="noreferrer" className="rounded-full border border-[var(--border)] px-5 py-3 text-sm font-semibold text-[var(--text)]">LinkedIn</a>}
      </div>
    </main>
  );
}
