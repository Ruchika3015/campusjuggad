import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, LogOut } from 'lucide-react';
import { TactileButton } from '@/components/primitives/TactileButton';
import { Rivet } from '@/components/primitives/Details';
import { useAuth } from '@/context/AuthContext';

const LINKS = [
  { label: 'Explore', href: '/#explore' },
  { label: 'Find a Jugaad', href: '/#find' },
  { label: 'Post a Jugaad', href: '/#post' },
];

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Only show on the landing page
  if (location.pathname !== '/') return null;

  const handleLogout = () => {
    logout();
    navigate('/');
    setOpen(false);
  };

  return (
    <header className="fixed top-0 inset-x-0 z-50 flex justify-center px-4 pt-4">
      <nav
        className={`surface-metal-brushed metal-scratches relative w-full max-w-6xl rounded-2xl px-4 sm:px-6 py-3 flex items-center justify-between transition-all duration-500 ${scrolled ? 'opacity-100' : 'opacity-95'}`}
      >
        <Rivet size={7} className="absolute top-2 left-2" />
        <Rivet size={7} className="absolute top-2 right-2" />
        <Rivet size={7} className="absolute bottom-2 left-2" />
        <Rivet size={7} className="absolute bottom-2 right-2" />

        {/* Brand mark */}
        <Link to="/" className="flex items-center gap-3 group" aria-label="CampusJugaad home">
          <span
            className="grid place-items-center w-8 h-8 rounded-lg shrink-0"
            style={{
              background: 'linear-gradient(135deg, var(--amber), var(--amber-deep))',
              boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.25)',
            }}
          >
            <span className="font-display text-bg-0 text-sm leading-none">J</span>
          </span>
          <div className="flex flex-col leading-none">
            <span className="font-display text-sm tracking-tight text-ink-0">
              CAMPUS<span className="text-amber">JUGAAD</span>
            </span>
            <span className="font-technical text-[7px] text-ink-3 mt-0.5">EXCHANGE</span>
          </div>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-1">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="group relative font-technical text-[10px] text-ink-1 hover:text-ink-0 px-3.5 py-2 transition-colors"
            >
              {l.label}
              <span className="absolute left-3.5 right-3.5 -bottom-0.5 h-px bg-amber scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
            </a>
          ))}
        </div>

        {/* Desktop CTAs — auth-aware */}
        <div className="hidden md:flex items-center gap-2.5">
          {isAuthenticated ? (
            <>
              <span className="font-mono text-[10px] text-ink-2 max-w-[120px] truncate">
                {user?.name || 'Operator'}
              </span>
              <Link to="/dashboard">
                <TactileButton variant="amber" className="!py-2 !px-3.5" ariaLabel="Dashboard">
                  Workshop
                </TactileButton>
              </Link>
              <TactileButton
                variant="ghost"
                className="!py-2 !px-3.5"
                ariaLabel="Logout"
                onClick={handleLogout}
              >
                <LogOut size={14} />
              </TactileButton>
            </>
          ) : (
            <>
              <Link to="/login">
                <TactileButton variant="ghost" className="!py-2 !px-3.5" ariaLabel="Login">
                  Login
                </TactileButton>
              </Link>
              <Link to="/signup">
                <TactileButton variant="amber" className="!py-2 !px-3.5" ariaLabel="Get started">
                  Get Started
                </TactileButton>
              </Link>
            </>
          )}
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden grid place-items-center w-9 h-9 rounded-lg text-ink-0"
          style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(107,118,137,0.4)' }}
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>

        {/* Mobile menu */}
        {open && (
          <div className="md:hidden absolute top-full left-0 right-0 mt-2 surface-panel rounded-2xl p-4 flex flex-col gap-2 anim-reveal">
            {LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="font-technical text-xs text-ink-1 hover:text-ink-0 px-3 py-2.5 rounded-lg hover:bg-white/5"
              >
                {l.label}
              </a>
            ))}
            <div className="h-px bg-metal-1 my-1" />
            {isAuthenticated ? (
              <>
                <Link to="/dashboard" onClick={() => setOpen(false)}>
                  <TactileButton variant="amber" className="w-full justify-center">Workshop</TactileButton>
                </Link>
                <TactileButton variant="ghost" className="w-full justify-center" onClick={handleLogout}>
                  <LogOut size={14} /> Logout
                </TactileButton>
              </>
            ) : (
              <>
                <Link to="/login" onClick={() => setOpen(false)}>
                  <TactileButton variant="ghost" className="w-full justify-center">Login</TactileButton>
                </Link>
                <Link to="/signup" onClick={() => setOpen(false)}>
                  <TactileButton variant="amber" className="w-full justify-center">Get Started</TactileButton>
                </Link>
              </>
            )}
          </div>
        )}
      </nav>
    </header>
  );
}
