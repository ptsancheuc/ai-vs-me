"use client";

import { useMemo, useState } from "react";

type ChecklistItem = {
  label: string;
  hint: string;
};

const REGIONS = ["US West", "US East", "Europe", "Asia"] as const;

export default function Home() {
  /* ---------- Local state ---------- */
  const [botName, setBotName] = useState("Omega Probe");
  const [region, setRegion] = useState<(typeof REGIONS)[number]>(REGIONS[0]);
  const [channel, setChannel] = useState("op ai-labs");
  const [greeting, setGreeting] = useState("GLHF! Bot online and scouting.");
  const [accountLabel, setAccountLabel] = useState("throwaway@proton.me");
  const [authSecret, setAuthSecret] = useState("");
  const [tasks, setTasks] = useState<ChecklistItem[]>([
    {
      label: "Handshake with Battle.net gateway",
      hint: "Use a legacy Battle.net logon (BNLS) or modern OAuth wrapper that supports SCRR."
    },
    {
      label: "Join a public channel for matchmaking updates",
      hint: "Listen for /who and /users events to keep a live roster."
    },
    {
      label: "Respond to whispers with ping + ladder rank",
      hint: "Cache ladder lookups to avoid rate limits."
    },
    {
      label: "Advertise custom games for scrimmages",
      hint: "Rotate map pools and broadcast invites every 5 minutes."
    }
  ]);
  const [mission, setMission] = useState<string | null>(null);

  /* ---------- Derived data ---------- */
  const readiness = useMemo(() => {
    const fieldsReady =
      botName.trim().length > 0 && channel.trim().length > 0 && accountLabel.trim().length > 0;
    return fieldsReady ? "Ready for a dry-run" : "Fill the basics to generate a plan";
  }, [botName, channel, accountLabel]);

  /* ---------- Handlers ---------- */
  const handleShuffle = () => {
    const reordered = [...tasks.slice(1), tasks[0]];
    setTasks(reordered);
  };

  const handleGenerate = () => {
    const base = `bot: ${botName || "starbot"} @ ${region} // channel: ${channel || "unknown"}`;
    const greetingLine = greeting.trim() ? `greeting: "${greeting.trim()}"` : "greeting: none";
    const credentialLine = `login: ${accountLabel || "(not set)"} | secret: ${authSecret ? "[redacted]" : "(not set)"}`;
    const tasksLines = tasks.map((task, idx) => `  - [${idx + 1}] ${task.label}`).join("\n");

    setMission(
      `${base}\n${greetingLine}\n${credentialLine}\n\nRuntime steps:\n${tasksLines}\n\nRemember: run inside a sandboxed client that speaks the StarCraft: Remastered protocol; this UI only stages the plan.`
    );
  };

  /* ---------- Render ---------- */
  return (
    <main className="min-h-screen bg-slate-950 px-4 py-10 text-slate-50">
      <section className="mx-auto flex max-w-5xl flex-col gap-10">
        {/* HERO */}
        <header className="flex flex-col gap-4 rounded-2xl bg-gradient-to-br from-indigo-700/60 via-slate-900 to-slate-950 p-8 shadow-xl shadow-indigo-900/40">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-indigo-200">
            StarCraft: Remastered
          </p>
          <h1 className="text-4xl font-black leading-tight sm:text-5xl">
            Build a bot that can connect to Battle.net
          </h1>
          <p className="max-w-3xl text-lg text-slate-200 sm:text-xl">
            Stage the configuration for a Battle.net automation companion: define where it connects, which channel it idles in, and how it interacts with players before you wire it to a real gateway client.
          </p>
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-xl border border-indigo-400/40 bg-indigo-900/30 p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-indigo-100">Region</p>
              <p className="text-lg font-semibold">{region}</p>
            </div>
            <div className="rounded-xl border border-indigo-400/40 bg-indigo-900/30 p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-indigo-100">Channel</p>
              <p className="text-lg font-semibold">{channel || "pending"}</p>
            </div>
            <div className="rounded-xl border border-indigo-400/40 bg-indigo-900/30 p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-indigo-100">Status</p>
              <p className="text-lg font-semibold">{readiness}</p>
            </div>
          </div>
        </header>

        {/* CONFIGURATION */}
        <section className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 shadow-lg shadow-slate-900/40">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-slate-300">Connection profile</p>
              <h2 className="text-2xl font-bold">Battle.net target</h2>
              <p className="text-sm text-slate-300">
                This form outlines the credentials your automation runner will need. Use throwaway accounts and never store primary credentials inside the bot.
              </p>
            </div>
            <button
              className="self-start rounded-full border border-indigo-400/50 px-4 py-2 text-sm font-semibold text-indigo-100 transition hover:border-indigo-200 hover:text-white"
              onClick={handleShuffle}
            >
              Shuffle task order
            </button>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <label className="flex flex-col gap-2">
              <span className="text-sm font-semibold text-slate-200">Bot codename</span>
              <input
                type="text"
                value={botName}
                onChange={(e) => setBotName(e.target.value)}
                className="rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-slate-50 focus:border-indigo-400 focus:outline-none"
                placeholder="Omega Probe"
              />
            </label>

            <label className="flex flex-col gap-2">
              <span className="text-sm font-semibold text-slate-200">Home channel</span>
              <input
                type="text"
                value={channel}
                onChange={(e) => setChannel(e.target.value)}
                className="rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-slate-50 focus:border-indigo-400 focus:outline-none"
                placeholder="op ai-labs"
              />
            </label>

            <label className="flex flex-col gap-2">
              <span className="text-sm font-semibold text-slate-200">Battle.net region</span>
              <select
                value={region}
                onChange={(e) => setRegion(e.target.value as (typeof REGIONS)[number])}
                className="rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-slate-50 focus:border-indigo-400 focus:outline-none"
              >
                {REGIONS.map((value) => (
                  <option key={value} value={value}>
                    {value}
                  </option>
                ))}
              </select>
            </label>

            <label className="flex flex-col gap-2">
              <span className="text-sm font-semibold text-slate-200">Greeting broadcast</span>
              <input
                type="text"
                value={greeting}
                onChange={(e) => setGreeting(e.target.value)}
                className="rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-slate-50 focus:border-indigo-400 focus:outline-none"
                placeholder="GLHF! Bot online and scouting."
              />
            </label>

            <div className="rounded-xl border border-amber-400/40 bg-amber-900/20 p-4 sm:col-span-2">
              <p className="text-sm font-semibold text-amber-100">Credential guidance</p>
              <p className="text-xs text-amber-50/90">
                Provide the handle your runner will log in with and a temporary app password or OAuth token. This UI does not
                persist credentials; keep secrets in environment variables or a vault.
              </p>
              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                <label className="flex flex-col gap-1">
                  <span className="text-xs font-semibold text-slate-200">Account handle</span>
                  <input
                    type="text"
                    value={accountLabel}
                    onChange={(e) => setAccountLabel(e.target.value)}
                    className="rounded-lg border border-amber-400/40 bg-slate-900/70 px-3 py-2 text-slate-50 focus:border-amber-300 focus:outline-none"
                    placeholder="throwaway@proton.me"
                  />
                </label>
                <label className="flex flex-col gap-1">
                  <span className="text-xs font-semibold text-slate-200">Auth secret placeholder</span>
                  <input
                    type="password"
                    value={authSecret}
                    onChange={(e) => setAuthSecret(e.target.value)}
                    className="rounded-lg border border-amber-400/40 bg-slate-900/70 px-3 py-2 text-slate-50 focus:border-amber-300 focus:outline-none"
                    placeholder="App password / token"
                  />
                  <span className="text-[11px] text-amber-50/80">Only for staging; the value is not saved or transmitted.</span>
                </label>
              </div>
            </div>
          </div>

          <div className="mt-6 grid gap-4 lg:grid-cols-2">
            <div className="space-y-3">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-300">Interaction loop</p>
              <ul className="space-y-2">
                {tasks.map((item, index) => (
                  <li
                    key={item.label}
                    className="rounded-lg border border-slate-800 bg-slate-800/70 p-3"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="font-semibold text-slate-100">{index + 1}. {item.label}</p>
                        <p className="text-sm text-slate-300">{item.hint}</p>
                      </div>
                      <span className="rounded-full border border-indigo-400/50 px-3 py-1 text-xs font-semibold text-indigo-100">
                        step
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col gap-3 rounded-xl border border-slate-800 bg-slate-800/70 p-4">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-300">Authentication checklist</p>
              <div className="flex items-center justify-between rounded-lg border border-slate-800 bg-slate-900/50 px-3 py-2">
                <div>
                  <p className="font-semibold text-slate-50">Throwaway credentials</p>
                  <p className="text-xs text-slate-300">Use a secondary Battle.net account with no store purchases.</p>
                </div>
                <span className="rounded-full bg-emerald-500/20 px-3 py-1 text-xs font-bold text-emerald-200">recommended</span>
              </div>
              <div className="flex items-center justify-between rounded-lg border border-slate-800 bg-slate-900/50 px-3 py-2">
                <div>
                  <p className="font-semibold text-slate-50">Offline testing sandbox</p>
                  <p className="text-xs text-slate-300">Attach your bot to an emulator before connecting to Battle.net.</p>
                </div>
                <span className="rounded-full bg-amber-500/20 px-3 py-1 text-xs font-bold text-amber-200">safety</span>
              </div>
              <div className="flex items-center justify-between rounded-lg border border-slate-800 bg-slate-900/50 px-3 py-2">
                <div>
                  <p className="font-semibold text-slate-50">Rate-limit messaging</p>
                  <p className="text-xs text-slate-300">Throttle whispers and channel broadcasts to stay polite.</p>
                </div>
                <span className="rounded-full bg-sky-500/20 px-3 py-1 text-xs font-bold text-sky-200">netiquette</span>
              </div>
            </div>
          </div>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="text-sm text-slate-300">
              <p className="font-semibold text-slate-200">Runner command (conceptual):</p>
              <p className="font-mono text-xs text-slate-200">
                {`BN_USER="${accountLabel}" BN_PASS="${authSecret ? "[secret]" : "(set me)"}" ./scr-bot --gateway "${region}" --channel "${channel || "op ai-labs"}" --name "${botName || "starbot"}" --greeting "${greeting}"`}
              </p>
              <p>Pair this with a Battle.net client library capable of speaking the StarCraft: Remastered handshake.</p>
            </div>
            <button
              className="rounded-lg bg-indigo-500 px-4 py-2 text-sm font-semibold text-slate-50 transition hover:bg-indigo-400"
              onClick={handleGenerate}
            >
              Generate mission plan
            </button>
          </div>
        </section>

        {/* OUTPUT */}
        <section className="rounded-2xl border border-indigo-500/20 bg-indigo-900/30 p-6 shadow-xl shadow-indigo-900/40">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-indigo-100">Staged output</p>
              <h3 className="text-2xl font-bold">Bot bootstrap memo</h3>
            </div>
            <div className="rounded-full border border-indigo-300/40 bg-indigo-300/10 px-3 py-1 text-xs font-semibold text-indigo-50">
              {mission ? "Draft ready" : "Awaiting input"}
            </div>
          </div>

          <div className="mt-4 min-h-[160px] rounded-xl border border-indigo-400/30 bg-slate-950/40 p-4 font-mono text-sm text-indigo-50">
            {mission || "Press “Generate mission plan” to produce a ready-to-wire configuration for your Battle.net bot."}
          </div>
        </section>
      </section>
    </main>
  );
}
