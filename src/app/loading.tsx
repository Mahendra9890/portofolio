export default function Loading() {
  return (
    <main
      className="flex min-h-[60vh] items-center justify-center px-4 text-sm text-[var(--text-muted)]"
      role="status"
      aria-live="polite"
    >
      Loading portfolio…
    </main>
  );
}
