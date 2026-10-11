import { notFound, redirect } from "next/navigation";
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
      <ProjectDetailRedirect params={params} />
    </Suspense>
  );
}

async function ProjectDetailRedirect({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<never> {
  const { slug } = await params;
  if (!portfolioData.projects.some((project) => project.slug === slug)) notFound();
  redirect(`/id/projects/${slug}`);
}
