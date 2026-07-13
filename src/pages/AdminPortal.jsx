import React, { useState, useMemo } from 'react';
import PageWrapper from '../components/layout/PageWrapper';
import InputField from '../components/ui/InputField';
import { Terminal, Users, School, Cpu, CheckCircle, ShieldAlert, Lock, ArrowRight, ShieldCheck, RefreshCw } from 'lucide-react';

export default function AdminPortal({ 
  setActivePage, 
  registrations, 
  setRegistrations,
  currentUser,
  setCurrentUser 
}) {
  const [adminAuth, setAdminAuth] = useState({ email: '', password: '' });
  const [adminError, setAdminError] = useState("");

  const handleAdminLogin = (e) => {
    e.preventDefault();
    if (adminAuth.email === 'admin@techfest.bup.edu.bd' && adminAuth.password === 'Admin@BUP2026!') {
      setCurrentUser({ role: 'admin', fullName: 'System Chief Admin' });
      setAdminError("");
    } else {
      setAdminError("Access denied. Invalid coordinate keys.");
    }
  };

  // Toggle dynamic registration payment states
  const cyclePaymentStatus = (email) => {
    const updated = registrations.map((reg) => {
      if (reg.email === email) {
        const nextStatus = reg.paymentStatus === 'Pending' 
          ? 'Approved' 
          : reg.paymentStatus === 'Approved' 
          ? 'Pending' 
          : 'Approved';
        return { ...reg, paymentStatus: nextStatus };
      }
      return reg;
    });
    setRegistrations(updated);
  };

  // Compute stats metrics dynamically
  const adminStats = useMemo(() => {
    const totalTeams = registrations.length;
    const universities = [...new Set(registrations.map(r => r.university))];
    const totalUniversities = universities.length;
    const pendingCount = registrations.filter(r => r.paymentStatus === 'Pending').length;
    const approvedCount = registrations.filter(r => r.paymentStatus === 'Approved').length;

    return { totalTeams, totalUniversities, universities, pendingCount, approvedCount };
  }, [registrations]);

  return (
    <PageWrapper>
      <div className="absolute inset-0 cyber-grid opacity-40 pointer-events-none" />
      <div className="max-w-6xl mx-auto px-6 w-full relative z-10 space-y-8">
        
        {/* ========================================================================= */}
        {/* ADMIN AUTH SCREEN (If not validated) */}
        {/* ========================================================================= */}
        {(!currentUser || currentUser.role !== 'admin') && (
          <div className="max-w-sm mx-auto p-8 border border-[#0d2d6c] bg-[#051638]/95 rounded-sm font-mono text-white space-y-6">
            <div className="space-y-1.5 text-center">
              <span className="text-[10px] text-accent-rose tracking-widest font-bold block">
                [ ADMIN_GATEWAY_SECURE_SWEEP ]
              </span>
              <h2 className="text-xl font-bold font-sans">ADMIN GATE</h2>
            </div>

            <form onSubmit={handleAdminLogin} className="space-y-5">
              <InputField 
                label="Admin Email Coordinate" 
                name="email" 
                placeholder="admin@techfest.bup.edu.bd" 
                value={adminAuth.email} 
                onChange={(e) => setAdminAuth({ ...adminAuth, email: e.target.value })} 
                required 
              />
              <InputField 
                label="Admin Access Key" 
                name="password" 
                type="password" 
                placeholder="••••••••" 
                value={adminAuth.password} 
                onChange={(e) => setAdminAuth({ ...adminAuth, password: e.target.value })} 
                required 
                error={adminError}
              />

              <button
                type="submit"
                className="w-full py-3.5 bg-accent-rose hover:bg-rose-500 text-white font-bold rounded-sm text-xs uppercase tracking-widest flex items-center justify-center space-x-2 shadow-lg"
              >
                <Lock className="w-4 h-4" />
                <span>LOG IN ADMIN PORTAL</span>
              </button>
            </form>
          </div>
        )}

        {/* ========================================================================= */}
        {/* FULL ADMIN OPERATIONS PANEL */}
        {/* ========================================================================= */}
        {currentUser && currentUser.role === 'admin' && (
          <div className="space-y-8 font-mono text-white">
            
            {/* Header and status alerts */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#0d2d6c] pb-5">
              <div className="space-y-1.5">
                <span className="text-[10px] text-accent-cyan tracking-widest font-bold block">
                  [ HOST_ADMIN_PORTAL_ACTIVE ]
                </span>
                <h1 className="text-3xl font-sans font-bold uppercase">ADMIN MONITOR</h1>
              </div>

              <button
                onClick={() => setCurrentUser(null)}
                className="px-4 py-2 border border-[#0d2d6c] hover:border-accent-rose text-white/60 hover:text-accent-rose font-bold text-xs uppercase tracking-wider rounded transition-colors"
              >
                Exit Console
              </button>
            </div>

            {/* Quick Stat Blocks */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              {[
                { icon: Users, label: "TOTAL ROSTERS", value: adminStats.totalTeams, color: "text-accent-cyan" },
                { icon: School, label: "UNIVERSITIES INVOLVED", value: adminStats.totalUniversities, color: "text-accent-gold" },
                { icon: ShieldCheck, label: "APPROVED SLOTS", value: adminStats.approvedCount, color: "text-accent-emerald" },
                { icon: ShieldAlert, label: "PENDING SLOTS", value: adminStats.pendingCount, color: "text-accent-rose" }
              ].map((card, idx) => {
                const Icon = card.icon;
                return (
                  <div key={idx} className="p-5 rounded border border-[#0d2d6c] bg-[#051638]/90 space-y-2">
                    <div className="inline-flex p-2 rounded-full bg-white/5 text-white/55">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-lg sm:text-2xl font-bold font-sans">{card.value}</p>
                      <p className="text-[9px] text-white/40 font-bold uppercase tracking-widest">{card.label}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* University checklist */}
            <div className="p-5 rounded border border-[#0d2d6c] bg-[#051638]/90 space-y-3">
              <h3 className="text-xs uppercase tracking-widest text-accent-cyan font-bold border-b border-[#0d2d6c] pb-2">
                ACTIVE UNIVERSITIES DIRECTORY:
              </h3>
              <div className="flex flex-wrap gap-2 text-[10px] uppercase font-bold">
                {adminStats.universities.map((uni, idx) => (
                  <span key={idx} className="px-2.5 py-1 rounded bg-[#0d2d6c]/50 text-white border border-[#0d2d6c]">
                    {uni}
                  </span>
                ))}
              </div>
            </div>

            {/* Unified Registrations Records Roster List */}
            <div className="p-6 rounded border border-[#0d2d6c] bg-[#051638]/90 space-y-4">
              <h3 className="text-xs uppercase tracking-widest text-accent-cyan font-bold border-b border-[#0d2d6c] pb-2">
                REGISTERED TEAM ROSTERS DATA:
              </h3>

              <div className="space-y-4">
                {registrations.map((reg) => (
                  <div 
                    key={reg.id}
                    className="p-4 rounded border border-[#0d2d6c] bg-bgDark/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6"
                  >
                    <div className="space-y-2 text-xs">
                      <div className="flex items-center space-x-2">
                        <span className="font-bold text-base text-accent-cyan">{reg.teamName}</span>
                        <span className="text-white/40">({reg.university})</span>
                        <span className="text-[9px] uppercase tracking-widest font-bold px-2 py-0.5 rounded bg-[#fbbf24]/10 text-[#fbbf24]">
                          {reg.track}
                        </span>
                      </div>
                      <div className="text-white/60 space-y-0.5">
                        <p>Leader: {reg.fullName} | ID: {reg.studentId} | Phone: {reg.phone}</p>
                        <p>Roster squad: {reg.member2Name || "None"} , {reg.member3Name || "None"}</p>
                      </div>
                    </div>

                    {/* Roster state toggle actions */}
                    <div className="flex items-center space-x-3 shrink-0">
                      <span className={`px-2 py-1 rounded text-[9px] font-bold ${
                        reg.paymentStatus === 'Approved' 
                          ? 'bg-accent-emerald/20 text-accent-emerald' 
                          : 'bg-accent-gold/20 text-accent-gold'
                      }`}>
                        {reg.paymentStatus}
                      </span>

                      <button
                        onClick={() => cyclePaymentStatus(reg.email)}
                        className="p-1.5 rounded border border-[#0d2d6c] hover:border-accent-cyan bg-bgDark hover:bg-accent-cyan/10 text-white/50 hover:text-accent-cyan transition-colors"
                        aria-label="Toggle payment status"
                      >
                        <RefreshCw className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

      </div>
    </PageWrapper>
  );
}