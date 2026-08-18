import { DepthLayer } from '@/components/primitives/DepthLayer';
import { LED, Rivet } from '@/components/primitives/Details';
import { Github, Twitter, Instagram, Linkedin } from 'lucide-react';

const COLS = [
  {
    title: 'Platform',
    links: ['Find a Jugaad', 'Post a Jugaad', 'Explore', 'How it works'],
  },
  {
    title: 'Students',
    links: ['Dashboard', 'My Jugaads', 'Earnings', 'Profile'],
  },
  {
    title: 'Company',
    links: ['About', 'Campus program', 'Privacy', 'Terms'],
  },
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden grain border-t border-metal-2/30 preserve-3d">
      <div
        className="absolute -top-32 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(255,138,61,0.12), transparent 60%)', filter: 'blur(40px)' }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-16">
        <DepthLayer depth={40}>
          <div className="surface-metal-brushed metal-scratches rounded-3xl p-8 sm:p-12 relative mb-12">
            <Rivet size={10} className="absolute top-3 left-3" />
            <Rivet size={10} className="absolute top-3 right-3" />
            <Rivet size={10} className="absolute bottom-3 left-3" />
            <Rivet size={10} className="absolute bottom-3 right-3" />
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <LED color="amber" pulse size={7} />
                  <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-ink-2">Ready when you are</span>
                </div>
                <h3 className="font-display text-2xl sm:text-3xl text-ink-0 leading-tight">
                  Got a problem? <span className="text-amber">There's a Jugaad for that.</span>
                </h3>
              </div>
              <div className="flex items-center gap-3">
                <a href="#find" className="font-display text-sm uppercase tracking-tight px-5 py-3 rounded-xl text-bg-0" style={{ background: 'linear-gradient(180deg, var(--amber-soft), var(--amber) 55%, var(--amber-deep))', boxShadow: 'var(--glow-amber), inset 0 1px 0 rgba(255,255,255,0.3)' }}>
                  Find a Jugaad
                </a>
                <a href="#post" className="font-display text-sm uppercase tracking-tight px-5 py-3 rounded-xl text-bg-0" style={{ background: 'linear-gradient(180deg, var(--mint-soft), var(--mint) 55%, var(--mint-deep))', boxShadow: 'var(--glow-mint), inset 0 1px 0 rgba(255,255,255,0.3)' }}>
                  Post a Jugaad
                </a>
              </div>
            </div>
          </div>
        </DepthLayer>

        <div className="grid md:grid-cols-[1.5fr_1fr_1fr_1fr] gap-10 mb-12">
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <span className="grid place-items-center w-9 h-9 rounded-lg" style={{ background: 'linear-gradient(135deg, var(--amber), var(--amber-deep))', boxShadow: 'var(--glow-amber)' }}>
                <span className="font-display text-bg-0 text-base">J</span>
              </span>
              <span className="font-display text-lg text-ink-0">CAMPUS<span className="text-amber">JUGAAD</span></span>
            </div>
            <p className="text-sm text-ink-2 leading-relaxed max-w-xs">
              A student-to-student exchange. Your problem. Someone's skill. That's a Jugaad.
            </p>
            <div className="flex items-center gap-3 mt-5">
              {[Github, Twitter, Instagram, Linkedin].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="grid place-items-center w-9 h-9 rounded-lg text-ink-2 hover:text-ink-0 transition-colors"
                  style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(107,118,137,0.3)' }}
                  aria-label="social link"
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>
          {COLS.map((col) => (
            <div key={col.title}>
              <h4 className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-3 mb-4">{col.title}</h4>
              <ul className="space-y-2.5">
                {col.links.map((l) => (
                  <li key={l}>
                    <a href="#" className="text-sm text-ink-1 hover:text-amber transition-colors">{l}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="pt-8 border-t border-metal-2/30 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-mono text-[11px] text-ink-3">© 2026 CampusJugaad · Built by students, for students</p>
          <p className="font-mono text-[11px] text-ink-3">The Jugaad Exchange · v2.4</p>
        </div>
      </div>
    </footer>
  );
}
