import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { LED, Rivet } from '@/components/primitives/Details';
import { LogOut, Menu, X, Backpack as BackpackIcon } from 'lucide-react';
import { WORLD_NAV } from '@/data/backpackMockData';

export function BackpackNav() {
  const { user, logout, isDemoMode } = useAuth();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="sticky top-0 z-50 px-4 pt-4">
      <nav className="surface-metal-brushed metal-scratches relative max-w-7xl mx-auto rounded-2xl px-4 sm:px-5 py-2.5 flex items-center justify-between">
        <Rivet size={7} className="absolute top-2 left-2" />
        <Rivet size={7} className="absolute top-2 right-2" />
        <Rivet size={7} className="absolute bottom-2 left-2" />
        <Rivet size={7} className="absolute bottom-2 right-2" />

        {/* Brand */}
        <Link to="/dashboard" className="flex items-center gap-2.5 shrink-0">
          <span
            className="grid place-items-center w-7 h-7 rounded-lg"
            style={{ background: 'linear-gradient(135deg, var(--amber), var(--amber-deep))' }}
          >
            <span className="font-display text-bg-0 text-xs leading-none">J</span>
          </span>
          <div className="hidden sm:flex flex-col leading-none">
            <span className="font-display text-xs tracking-tight text-ink-0">
              CAMPUS<span className="text-amber">JUGAAD</span>
            </span>
            <span className="font-technical text-[6px] text-ink-3 mt-0.5">BACKPACK</span>
          </div>
        </Link>

        {/* World switcher — WORKSHOP | BACKPACK */}
        <div className="hidden lg:flex items-center gap-1 px-2.5 py-1 rounded-lg" style={{ background: 'rgba(0,0,0,0.25)', border: '1px solid var(--metal-1)' }}>
          {WORLD_NAV.map((world) => {
            const isActive = world.id === 'backpack';
            return (
              <Link
                key={world.id}
                to={world.route}
                className={`group relative flex items-center px-2.5 py-1.5 rounded-md transition-colors ${isActive ? 'text-amber-soft' : 'text-ink-2 hover:text-ink-0'}`}
                style={isActive ? { background: 'rgba(214,138,60,0.08)' } : {}}
              >
                <span className="font-technical text-[8px] font-bold">{world.label}</span>
                {isActive && <LED color="amber" size={4} className="absolute -top-0.5 left-1/2 -translate-x-1/2" />}
              </Link>
            );
          })}
        </div>

        {/* Right — user + logout */}
        <div className="hidden lg:flex items-center gap-3 shrink-0">
          <div className="flex items-center gap-2">
            <LED color="mint" pulse size={5} />
            <span className="font-mono text-[9px] text-ink-1 max-w-[100px] truncate">{user?.name || 'Operator'}</span>
            {isDemoMode && (
              <span className="font-technical text-[6px] text-amber/50 px-1.5 py-0.5 rounded" style={{ border: '1px solid rgba(214,138,60,0.15)' }}>
                DEMO
              </span>
            )}
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 px-2.5 py-2 rounded-lg text-ink-3 hover:text-coral-soft transition-colors"
          >
            <LogOut size={12} />
            <span className="font-technical text-[8px]">EXIT</span>
          </button>
        </div>

        {/* Mobile toggle */}
        <button
          className="lg:hidden grid place-items-center w-8 h-8 rounded-lg text-ink-0"
          style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(107,118,137,0.4)' }}
          onClick={() => setMobileOpen((v) => !v)}
          aria-label={mobileOpen ? 'Close' : 'Open menu'}
        >
          {mobileOpen ? <X size={16} /> : <Menu size={16} />}
        </button>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden absolute top-full left-4 right-4 mt-2 surface-panel rounded-2xl p-4 flex flex-col gap-1 anim-reveal z-50">
          <span className="font-technical text-[7px] text-ink-3 px-3 pt-1 pb-0.5">NAVIGATE</span>
          {WORLD_NAV.map((world) => {
            const isActive = world.id === 'backpack';
            return (
              <Link
                key={world.id}
                to={world.route}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center gap-2.5 px-3 py-2.5 rounded-lg transition-colors ${isActive ? 'text-amber-soft bg-white/5' : 'text-ink-1 hover:text-ink-0'}`}
              >
                <span className="font-technical text-[10px]">{world.label}</span>
                {isActive && <LED color="amber" size={4} />}
              </Link>
            );
          })}
          <div className="h-px bg-metal-1 my-1" />
          <button
            onClick={handleLogout}
            className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-ink-3 hover:text-coral-soft transition-colors"
          >
            <LogOut size={14} />
            <span className="font-technical text-[10px]">EXIT</span>
          </button>
        </div>
      )}
    </header>
  );
}
