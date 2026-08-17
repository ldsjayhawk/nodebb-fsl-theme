import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import logo from "@/assets/fsl-logo.png.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Fantasy Sports Legends — NodeBB Forum Theme" },
      {
        name: "description",
        content:
          "A stadium-navy and championship-gold NodeBB theme built to match the Fantasy Sports Legends crest. Preview the forum skin and copy the custom CSS.",
      },
      { property: "og:title", content: "Fantasy Sports Legends — NodeBB Forum Theme" },
      {
        property: "og:description",
        content: "Stadium navy, championship gold, fountain blue. A NodeBB skin for Fantasy Sports Legends.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ThemePage,
});

const palette = [
  { name: "Navy Deep", hex: "#0B1526", cls: "bg-navy-deep" },
  { name: "Stadium Navy", hex: "#12213D", cls: "bg-card" },
  { name: "Championship Gold", hex: "#C9A227", cls: "bg-gold" },
  { name: "Trophy Gold", hex: "#F0CF5E", cls: "bg-gold-bright" },
  { name: "Fountain Blue", hex: "#4AA8FF", cls: "bg-fountain" },
  { name: "Outfield Green", hex: "#2F7D42", cls: "bg-field" },
];

const categories = [
  { name: "Draft Room", desc: "Mocks, rankings and draft-day strategy", topics: 482, posts: "12.4k", accent: "bg-gold" },
  { name: "Trade Block", desc: "Pitch it, veto it, argue about it", topics: 311, posts: "8.9k", accent: "bg-fountain" },
  { name: "Waiver Wire", desc: "Weekly pickups and FAAB bidding wars", topics: 674, posts: "21.2k", accent: "bg-field" },
  { name: "Legends Lounge", desc: "Trash talk, league lore and hall of fame", topics: 190, posts: "5.1k", accent: "bg-gold-bright" },
];

const topics = [
  { title: "Week 1 start/sit megathread", author: "CommishKC", replies: 214, tag: "Pinned" },
  { title: "Is a 3-team trade ever fair?", author: "FountainCity", replies: 87, tag: "Hot" },
  { title: "Dynasty rookie rankings v4.0", author: "GoldGloveGM", replies: 132, tag: "Guide" },
];

function AdSlot({ label, className = "" }: { label: string; className?: string }) {
  return (
    <aside
      aria-label="Advertisement"
      className={`flex flex-col items-center justify-center gap-1 rounded-lg border border-dashed border-gold/50 bg-[image:var(--gradient-stadium)] text-center ${className}`}
    >
      <span className="font-display text-xs uppercase tracking-[0.3em] text-gold">Sponsored</span>
      <span className="text-xs text-muted-foreground">{label}</span>
    </aside>
  );
}

function ThemePage() {
  const [copied, setCopied] = useState(false);
  const [mode, setMode] = useState<"dark" | "light">("dark");

  useEffect(() => {
    document.documentElement.classList.toggle("light", mode === "light");
  }, [mode]);


  const copyCss = async () => {
    const res = await fetch("/nodebb-fsl-theme.css");
    await navigator.clipboard.writeText(await res.text());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <main className="mx-auto max-w-6xl px-5 py-12">
      <header className="flex flex-col items-center gap-6 text-center">
        <img
          src={logo.url}
          alt="Fantasy Sports Legends crest"
          className="w-48 drop-shadow-[0_18px_45px_rgba(0,0,0,0.8)] md:w-64"
        />
        <div>
          <h1 className="font-display text-4xl uppercase tracking-wide md:text-6xl">
            Fantasy Sports Legends
          </h1>
          <p className="mt-1 font-display text-xl uppercase tracking-[0.35em] text-gold md:text-2xl">
            Forum Theme
          </p>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            A NodeBB skin drawn straight from the crest: stadium navy plates, championship gold
            edging and fountain-blue accents.
          </p>
        </div>
        <div className="inline-flex rounded-md border border-border bg-secondary p-1">
          {(["dark", "light"] as const).map((m) => (
            <button
              key={m}
              onClick={() => setMode(m)}
              className={`rounded px-4 py-1.5 font-display text-sm uppercase tracking-wider transition ${
                mode === m
                  ? "bg-[image:var(--gradient-gold)] text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {m === "dark" ? "Night game" : "Day game"}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap justify-center gap-3">
          <button
            onClick={copyCss}
            className="rounded-md border border-[color-mix(in_oklab,var(--gold)_60%,black)] bg-[image:var(--gradient-gold)] px-6 py-3 font-display uppercase tracking-wider text-primary-foreground shadow-[var(--shadow-glow)] transition hover:brightness-110"
          >
            {copied ? "Copied!" : "Copy NodeBB CSS"}
          </button>
          <a
            href="/nodebb-fsl-theme.css"
            download
            className="rounded-md border border-border bg-secondary px-6 py-3 font-display uppercase tracking-wider text-secondary-foreground transition hover:border-fountain"
          >
            Download .css
          </a>
        </div>
      </header>

      <section className="mt-16">
        <h2 className="font-display text-2xl uppercase tracking-wide">Palette</h2>
        <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {palette.map((c) => (
            <div key={c.name} className="overflow-hidden rounded-lg border border-border bg-card">
              <div className={`h-16 ${c.cls}`} />
              <div className="p-3">
                <p className="text-sm font-semibold">{c.name}</p>
                <p className="text-xs text-muted-foreground">{c.hex}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-16">
        <h2 className="font-display text-2xl uppercase tracking-wide">Forum preview</h2>

        <div className="mt-4 overflow-hidden rounded-lg border border-border shadow-[var(--shadow-plate)]">
          <div className="flex items-center justify-between border-b-[3px] border-gold bg-[image:var(--gradient-stadium)] px-4 py-3">
            <div className="flex items-center gap-3">
              <img src={logo.url} alt="" className="h-9 w-9 object-contain" />
              <span className="font-display uppercase tracking-wider">FSL Boards</span>
            </div>
            <nav className="hidden gap-5 text-sm font-semibold sm:flex">
              <span className="text-gold-bright">Categories</span>
              <span>Recent</span>
              <span>Leagues</span>
              <span>Members</span>
            </nav>
            <span className="rounded-md bg-[image:var(--gradient-gold)] px-3 py-1.5 text-xs font-bold uppercase text-primary-foreground">
              New Topic
            </span>
          </div>

          <div className="bg-card">
            {categories.map((cat) => (
              <div
                key={cat.name}
                className="flex items-center gap-4 border-b border-border px-4 py-4 last:border-b-0 transition hover:bg-secondary"
              >
                <span className={`h-10 w-1.5 rounded-full ${cat.accent}`} />
                <div className="min-w-0 flex-1">
                  <p className="font-display text-lg uppercase tracking-wide">{cat.name}</p>
                  <p className="truncate text-sm text-muted-foreground">{cat.desc}</p>
                </div>
                <div className="hidden text-right text-sm text-muted-foreground sm:block">
                  <p>
                    <span className="font-semibold text-foreground">{cat.topics}</span> topics
                  </p>
                  <p>
                    <span className="font-semibold text-foreground">{cat.posts}</span> posts
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <AdSlot label="Leaderboard ad · 728×90" className="mt-6 h-24" />

        <div className="mt-6 overflow-hidden rounded-lg border border-border">
          <div className="border-b-2 border-gold bg-secondary px-4 py-2 font-display text-sm uppercase tracking-widest">
            Recent topics
          </div>
          <ul className="bg-card">
            {topics.map((t) => (
              <li
                key={t.title}
                className="flex items-center gap-3 border-b border-border px-4 py-3 last:border-b-0"
              >
                <span className="h-8 w-8 shrink-0 rounded-md border-2 border-gold bg-navy-deep" />
                <div className="min-w-0 flex-1">
                  <p className="truncate font-semibold">{t.title}</p>
                  <p className="text-xs text-muted-foreground">
                    by {t.author} · 2h ago
                  </p>
                </div>
                <span className="rounded-full border border-fountain/40 bg-fountain/15 px-2.5 py-0.5 text-xs font-semibold text-fountain">
                  {t.tag}
                </span>
                <span className="text-sm text-muted-foreground">{t.replies}</span>
              </li>
            ))}
          </ul>
        </div>

        <AdSlot label="In-feed / sidebar ad · 300×250" className="mt-6 h-40" />

        <blockquote className="mt-6 rounded-md border-l-4 border-fountain bg-fountain/10 px-4 py-3 text-sm">
          Quotes, code blocks and alerts inherit the fountain-blue accent so replies stay readable
          against the navy plate.
        </blockquote>
      </section>

      <section className="mt-16 rounded-lg border border-border bg-card p-6">
        <h2 className="font-display text-2xl uppercase tracking-wide">Install on NodeBB</h2>
        <ol className="mt-4 space-y-2 text-sm text-muted-foreground">
          <li>1. In the ACP, install the Harmony skin and set the default dark mode.</li>
          <li>
            2. Go to <span className="text-foreground">Appearance → Custom HTML &amp; CSS</span>,
            enable custom CSS.
          </li>
          <li>3. Paste the copied stylesheet, save, then rebuild &amp; restart NodeBB.</li>
          <li>
            4. Upload the crest under <span className="text-foreground">Settings → General</span> as
            the site logo and favicon.
          </li>
        </ol>
      </section>

      <footer className="mt-16 border-t border-border py-8 text-center text-sm text-muted-foreground">
        Fantasy Sports Legends — theme preview
      </footer>
    </main>
  );
}
