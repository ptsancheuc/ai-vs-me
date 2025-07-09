"use client";

import { useState } from "react";

export default function Home() {
  /* ---------- Estados ---------- */
  const [profession, setProfession] = useState("");            // profesión
  const riskFactors = [
    "You repeated a task today that you already did yesterday",
    "You often forget meeting commitments",
    "You haven't learned anything new in the last week",
    "You create nothing new from interactions with others",
    "You don't handle core tech tools in your role",
  ];
  const [checks, setChecks] = useState<boolean[]>(              // checks
    riskFactors.map(() => false)
  );
  const [result, setResult] = useState<string | null>(null);    // resultado

  /* ---------- Lógica ---------- */
  const handleSubmit = () => {
    const score = checks.filter(Boolean).length; // 0-5
    let msg: string;

    if (score <= 1) msg = "Rare: your job is safe (for now) 🥩";
    else if (score <= 3) msg = "Medium: tweak your recipe or you’ll burn 🍳";
    else msg = "Well-done: the robot is sharpening its knives 🤖🔥";

    setResult(`Cooked-Score: ${score}/5 — ${msg}`);
  };

  /* ---------- Render ---------- */
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-white p-4">
      {/* HERO */}
      <h1 className="text-5xl font-extrabold tracking-tight text-gray-900">
        AI won’t beat me
      </h1>

      <p className="mt-4 max-w-xl text-center text-lg text-gray-600">
        If a bot can do my job and I add no extra value, I lose.
      </p>

      {/* PROFESSION INPUT */}
      <input
        type="text"
        value={profession}
        onChange={(e) => setProfession(e.target.value)}
        placeholder="Your profession (e.g. CFO)"
        className="mt-6 w-72 rounded-md border border-gray-300 px-3 py-2 text-center text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900"
      />

      {/* RISK FACTORS */}
      <div className="mt-6 flex flex-col gap-2">
        {riskFactors.map((text, i) => (
          <label
            key={i}
            className="flex items-center gap-2 text-sm text-gray-700"
          >
            <input
              type="checkbox"
              checked={checks[i]}
              onChange={() =>
                setChecks((prev) => {
                  const next = [...prev];
                  next[i] = !next[i];
                  return next;
                })
              }
            />
            {text}
          </label>
        ))}
      </div>

      {/* RESULT CARD */}
      {result && (
        <div className="mt-6 rounded-xl border border-gray-300 bg-gray-50 p-4 text-center text-gray-800 shadow">
          {result}
        </div>
      )}

      {/* CTA BUTTON */}
      <button
        className="mt-8 rounded-xl border border-gray-900 px-6 py-3 font-semibold transition hover:bg-gray-900 hover:text-white"
        onClick={handleSubmit}
      >
        Try me
      </button>
    </main>
  );
}
