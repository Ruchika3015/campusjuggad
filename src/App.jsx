import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { EnvironmentProvider } from '@/hooks/useEnvironment';
import { AuthProvider } from '@/context/AuthContext';
import { ScrollRail } from '@/components/primitives/ScrollRail';
import { Navigation } from '@/components/Navigation';
import { Hero } from '@/components/sections/Hero';
import { LiveTicker } from '@/components/sections/LiveTicker';
import { JugaadEngine } from '@/components/sections/JugaadEngine';
import { Storytelling } from '@/components/sections/Storytelling';
import { Footer } from '@/components/sections/Footer';
import { LoginPage } from '@/components/auth/LoginPage';
import { SignupPage } from '@/components/auth/SignupPage';
import { DashboardPage } from '@/components/workshop/WorkshopDashboard';
import { BackpackPage } from '@/components/backpack/BackpackPage';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { GuestRoute } from '@/components/auth/ProtectedRoute';

function LandingPage() {
  return (
    <div className="relative min-h-screen bg-bg-0 text-ink-0">
      <ScrollRail />
      <Navigation />
      <main>
        <Hero />
        <LiveTicker />
        <JugaadEngine />
        <Storytelling />
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <EnvironmentProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route
              path="/login"
              element={
                <GuestRoute>
                  <LoginPage />
                </GuestRoute>
              }
            />
            <Route
              path="/signup"
              element={
                <GuestRoute>
                  <SignupPage />
                </GuestRoute>
              }
            />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <DashboardPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/backpack"
              element={
                <ProtectedRoute>
                  <BackpackPage />
                </ProtectedRoute>
              }
            />
          </Routes>
        </BrowserRouter>
      </EnvironmentProvider>
    </AuthProvider>
  );
}

export default App;
