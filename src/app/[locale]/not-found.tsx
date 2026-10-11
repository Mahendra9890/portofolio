import Image from "next/image";
import Link from "next/link";

export default function LocaleNotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[var(--bg)] px-4 text-[var(--text)]">
      <div className="text-center">
        <Image src="/images/profile-casual.jpg" alt="Prabu Mahendra wearing a blue polo shirt" width={128} height={128} className="mx-auto mb-6 rounded-full border border-[var(--border)] object-cover object-[center_top]" />
        <div className="text-8xl font-black tracking-[-0.08em] text-[var(--accent)]">404</div>
        <h1 className="mt-4 text-3xl font-semibold tracking-[-0.05em]">Halaman belum tersedia.</h1>
        <Link href="/id" className="mt-8 inline-flex rounded-full bg-[var(--accent)] px-5 py-3 font-semibold text-[#111111]">
          Kembali ke Home
        </Link>
      </div>
    </main>
  );
}
