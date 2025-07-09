"use client";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-white">
      {/* HEADLINE */}
      <h1 className="text-5xl font-extrabold tracking-tight text-gray-900">
        AI won’t beat me
      </h1>

      {/* SUB-LINE */}
      <p className="mt-4 max-w-xl text-center text-lg text-gray-600">
        If a bot can do my job and I add no extra value, I lose.
      </p>

      {/* CTA */}
      <button
        className="mt-8 rounded-xl border border-gray-900 px-6 py-3 font-semibold transition hover:bg-gray-900 hover:text-white"
        onClick={() => alert('Duel component coming soon')}
      >
        Try me
      </button>
    </main>
  );
}
