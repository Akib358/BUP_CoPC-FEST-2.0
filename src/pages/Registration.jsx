import React, { useState } from 'react';
import PageWrapper from '../components/layout/PageWrapper';
import InputField from '../components/ui/InputField';
import FileUpload from '../components/ui/FileUpload';
import { AnimatePresence, motion } from 'framer-motion';
import { Terminal, ShieldCheck, ArrowRight, ArrowLeft, CheckCircle, Lock, UserPlus, CreditCard, Coins, X, FileText } from 'lucide-react';

export default function Registration({ 
  setActivePage, 
  selectedTrack, 
  registrations, 
  setRegistrations,
  currentUser,
  setCurrentUser 
}) {
  const [authMode, setAuthMode] = useState('login'); // 'login' | 'signup'
  const [authForm, setAuthForm] = useState({ email: '', password: '', fullName: '', phone: '', university: '', department: '', studentId: '' });
  const [signupTrack, setSignupTrack] = useState(selectedTrack || 'iupc'); 
  const [authErrors, setAuthErrors] = useState({});

  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    teamName: '', member2Name: '', member2Id: '', member3Name: '', member3Id: '',
    photo: null, idCard: null, payment: null, doc: null
  });
  const [errors, setErrors] = useState({});
  const [isSuccess, setIsSuccess] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false); // Controls payment checkout modal

  // Custom track pricing catalog
  const getTrackPrice = (track) => {
    switch (track) {
      case 'iupc': return 1500;
      case 'hackathon': return 1000;
      case 'ctf': return 800;
      default: return 1000;
    }
  };

  const checkPasswordStrength = (pwd) => {
    if (pwd.length < 8) return "Password must be at least 8 characters.";
    if (!/[A-Z]/.test(pwd)) return "Password must contain at least one uppercase letter.";
    if (!/[0-9]/.test(pwd)) return "Password must contain at least one number.";
    return null;
  };

  const handleAuthInput = (e) => {
    setAuthForm({ ...authForm, [e.target.name]: e.target.value });
    setAuthErrors({ ...authErrors, [e.target.name]: '' });
  };

  const handleAuthSubmit = (e) => {
    e.preventDefault();
    const errs = {};

    if (authMode === 'login') {
      if (!authForm.email) errs.email = "Required";
      if (!authForm.password) errs.password = "Required";

      if (Object.keys(errs).length > 0) {
        setAuthErrors(errs);
        return;
      }

      const foundUser = registrations.find(r => r.email === authForm.email);
      if (foundUser) {
        setCurrentUser(foundUser);
        setAuthForm({ email: '', password: '', fullName: '', phone: '', university: '', department: '', studentId: '' });
      } else {
        setAuthErrors({ email: "Profile not found. Please sign up." });
      }
    } else {
      if (!authForm.fullName) errs.fullName = "Required";
      if (!authForm.email) errs.email = "Required";
      if (!authForm.password) errs.password = "Required";
      if (!authForm.phone) errs.phone = "Required";
      if (!authForm.university) errs.university = "Required";
      if (!authForm.studentId) errs.studentId = "Required";

      const pwdError = checkPasswordStrength(authForm.password);
      if (pwdError) errs.password = pwdError;

      if (Object.keys(errs).length > 0) {
        setAuthErrors(errs);
        return;
      }

      const newUser = {
        fullName: authForm.fullName,
        email: authForm.email,
        phone: authForm.phone,
        university: authForm.university,
        department: authForm.department || "CSE",
        studentId: authForm.studentId,
        track: signupTrack,
        paymentStatus: "Pending"
      };
      setCurrentUser(newUser);
      setStep(1); 
    }
  };

  const handleInput = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const handleFileSelect = (fieldName, file) => {
    setForm({ ...form, [fieldName]: file });
  };

  const handleNext = () => {
    const errs = {};
    if (step === 1) {
      if (!form.teamName) errs.teamName = "Required";
    }

    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setStep(step + 1);
  };

  const handlePrev = () => {
    setStep(step - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const finalizedRoster = {
      id: Date.now(),
      fullName: currentUser.fullName,
      email: currentUser.email,
      phone: currentUser.phone,
      university: currentUser.university,
      department: currentUser.department,
      studentId: currentUser.studentId,
      teamName: form.teamName,
      track: currentUser.track || signupTrack,
      member2Name: form.member2Name,
      member2Id: form.member2Id,
      member3Name: form.member3Name,
      member3Id: form.member3Id,
      paymentStatus: "Pending"
    };

    setRegistrations([...registrations, finalizedRoster]);
    setCurrentUser(finalizedRoster);
    setIsSuccess(true);
  };

  // Triggers final "Paid" status update
  const confirmPayment = () => {
    if (!currentUser) return;
    const updated = registrations.map(r => r.email === currentUser.email ? { ...r, paymentStatus: "Paid" } : r);
    setRegistrations(updated);
    setCurrentUser({ ...currentUser, paymentStatus: "Paid" });
    setShowPaymentModal(false);
  };

  return (
    <PageWrapper>
      <div className="absolute inset-0 cyber-grid opacity-40 pointer-events-none" />
      <div className="max-w-3xl mx-auto px-6 w-full relative z-10 space-y-8">
        
        {/* Registration Headers */}
        <div className="space-y-4">
          <span className="font-mono text-xs uppercase tracking-widest text-accent-cyan font-bold block">
            ./secure_registration_uplink.sh
          </span>
          <h1 className="text-3xl sm:text-5xl font-bold font-sans text-primary dark:text-white leading-none">
            PORTAL REGISTRATION
          </h1>
          {currentUser && (
            <div className="flex items-center space-x-6 text-xs font-mono font-bold text-primary/40 dark:text-white/40">
              <span className={step === 1 ? 'text-accent-cyan' : ''}>[1] ROSTER MEMBERS</span>
              <span>&gt;</span>
              <span className={step === 2 ? 'text-accent-cyan' : ''}>[2] SECURE PAYLOADS</span>
            </div>
          )}
        </div>

        {/* ========================================================================= */}
        {/* AUTH SEGMENT */}
        {/* ========================================================================= */}
        {!currentUser && (
          <div className="max-w-md mx-auto p-8 border border-[#0d2d6c] bg-[#051638]/95 rounded-sm font-mono text-white space-y-6">
            <div className="space-y-1.5 text-center">
              <span className="text-[10px] text-accent-cyan tracking-widest font-bold block">
                [ SIGN_IN_SECURE_ROSTER ]
              </span>
              <h2 className="text-xl font-bold font-sans">PORTAL GATEWAY</h2>
            </div>

            <div className="grid grid-cols-2 gap-4 border-b border-[#0d2d6c] pb-3 text-xs uppercase tracking-wider font-bold">
              <button 
                onClick={() => setAuthMode('login')}
                className={`py-2 text-center border-b-2 transition-colors ${
                  authMode === 'login' ? 'border-accent-cyan text-accent-cyan' : 'border-transparent text-white/50'
                }`}
              >
                Log In
              </button>
              <button 
                onClick={() => setAuthMode('signup')}
                className={`py-2 text-center border-b-2 transition-colors ${
                  authMode === 'signup' ? 'border-accent-cyan text-accent-cyan' : 'border-transparent text-white/50'
                }`}
              >
                Sign Up
              </button>
            </div>

            <form onSubmit={handleAuthSubmit} className="space-y-5">
              {authMode === 'signup' && (
                <>
                  <InputField label="Full Name" name="fullName" placeholder="Your full name" value={authForm.fullName} onChange={handleAuthInput} required error={authErrors.fullName} />
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <InputField label="Phone" name="phone" placeholder="017xxxxxxxx" value={authForm.phone} onChange={handleAuthInput} required error={authErrors.phone} />
                    <InputField label="Student ID" name="studentId" placeholder="ID Card No" value={authForm.studentId} onChange={handleAuthInput} required error={authErrors.studentId} />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <InputField label="University" name="university" placeholder="Institution" value={authForm.university} onChange={handleAuthInput} required error={authErrors.university} />
                    <InputField label="Department" name="department" placeholder="e.g. CSE" value={authForm.department} onChange={handleAuthInput} />
                  </div>

                  <div className="space-y-2.5 font-mono">
                    <label className="block text-[11px] uppercase tracking-widest text-white/40 font-bold">
                      Target Competition Track
                    </label>
                    <div className="grid grid-cols-3 gap-2.5">
                      {[
                        { id: 'iupc', label: 'IUPC' },
                        { id: 'hackathon', label: 'Hackathon' },
                        { id: 'ctf', label: 'CTF' }
                      ].map((track) => (
                        <button
                          key={track.id}
                          type="button"
                          onClick={() => setSignupTrack(track.id)}
                          className={`py-2 px-1 text-center border font-bold text-[10px] uppercase rounded-sm transition-all ${
                            signupTrack === track.id 
                              ? 'bg-accent-cyan border-accent-cyan text-bgDark shadow-glow-cyan/5' 
                              : 'bg-transparent border-white/10 text-white/70 hover:border-accent-cyan/40'
                          }`}
                        >
                          {track.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </>
              )}

              <InputField label="Email Address" name="email" type="email" placeholder="name@domain.com" value={authForm.email} onChange={handleAuthInput} required error={authErrors.email} />
              
              <div className="space-y-1 font-mono relative">
                <InputField label="Password" name="password" type="password" placeholder="Min 8 chars, uppercase & number" value={authForm.password} onChange={handleAuthInput} required error={authErrors.password} />
                {authMode === 'login' && (
                  <button 
                    type="button"
                    onClick={() => alert("Password recovery request has been transmitted. The backend will parse the tokens on trigger.")}
                    className="absolute right-0 top-0 text-[9px] text-accent-cyan hover:underline"
                  >
                    Forgot Password?
                  </button>
                )}
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-primary dark:bg-accent-cyan hover:bg-primary-light dark:hover:bg-[#00c6ff] text-white dark:text-bgDark font-bold rounded-sm text-xs uppercase tracking-widest flex items-center justify-center space-x-2 shadow-lg"
              >
                {authMode === 'login' ? <Lock className="w-4 h-4" /> : <UserPlus className="w-4 h-4" />}
                <span>{authMode === 'login' ? 'AUTHORIZE LOG IN' : 'INITIALIZE PROFILE'}</span>
              </button>
            </form>
          </div>
        )}

        {/* ========================================================================= */}
        {/* ACTIVE USER DASHBOARD PROFILE */}
        {/* ========================================================================= */}
        {currentUser && currentUser.teamName && !isSuccess && (
          <div className="p-8 border border-primary/20 dark:border-bgDark-border bg-[#051638] rounded-md font-mono text-white space-y-6">
            <div className="flex items-center justify-between border-b border-[#0d2d6c] pb-4">
              <div className="space-y-1">
                <span className="text-[9px] text-accent-cyan tracking-widest font-bold block">[ PROFILE_TELEMETRY ]</span>
                <h2 className="font-sans font-bold text-xl uppercase">{currentUser.fullName}</h2>
              </div>
              <button 
                onClick={() => { setCurrentUser(null); setShowPaymentModal(false); }}
                className="px-3 py-1 text-[10px] uppercase font-bold rounded border border-[#0d2d6c] hover:border-accent-rose text-white/60 hover:text-accent-rose"
              >
                Log Out
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs">
              <div className="space-y-2">
                <p><span className="text-white/40">TEAM NAME:</span> <span className="font-bold text-accent-cyan">{currentUser.teamName}</span></p>
                <p><span className="text-white/40">REGISTERED TRACK:</span> <span className="font-bold uppercase text-accent-gold">{currentUser.track}</span></p>
                <p><span className="text-white/40">UNIVERSITY:</span> <span className="font-bold">{currentUser.university}</span></p>
              </div>

              <div className="p-4 rounded border border-[#0d2d6c] bg-bgDark/40 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-white/40 uppercase text-[10px]">PAYMENT STATUS:</span>
                  <span className={`px-2.5 py-1 rounded text-[10px] font-bold ${
                    currentUser.paymentStatus === 'Paid' 
                      ? 'bg-accent-emerald text-white shadow-[0_0_15px_rgba(16,185,129,0.3)]' 
                      : 'bg-accent-gold/20 text-accent-gold animate-pulse'
                  }`}>
                    {currentUser.paymentStatus}
                  </span>
                </div>

                {currentUser.paymentStatus === 'Pending' && (
                  <button
                    onClick={() => setShowPaymentModal(true)}
                    className="w-full py-2 bg-accent-gold hover:bg-yellow-500 text-bgDark font-bold rounded text-xs uppercase tracking-widest flex items-center justify-center space-x-1.5 shadow-md"
                  >
                    <CreditCard className="w-3.5 h-3.5" />
                    <span>Pay Now</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* NEW REGISTRATION SEQUENCE */}
        {/* ========================================================================= */}
        {currentUser && !currentUser.teamName && !isSuccess && (
          <div className="p-8 border border-primary/20 dark:border-bgDark-border bg-[#051638] rounded-sm text-white space-y-6">
            <div className="space-y-1">
              <span className="text-[10px] text-accent-cyan tracking-widest font-bold block">
                [ STEP_{step === 1 ? '01_ROSTER_SETUP' : '02_FILE_PAYLOADS'} ]
              </span>
              <h3 className="font-sans font-bold text-lg uppercase">
                {currentUser.track ? `${currentUser.track} Registration` : 'Roster Configuration'}
              </h3>
            </div>

            {step === 1 && (
              <div className="space-y-6">
                <InputField label="Team Name" name="teamName" placeholder="Enter Roster Squad Name" value={form.teamName} onChange={handleInput} required error={errors.teamName} />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <InputField label="Member 2 Name" name="member2Name" placeholder="Optional" value={form.member2Name} onChange={handleInput} />
                  <InputField label="Member 2 Student ID" name="member2Id" placeholder="Optional" value={form.member2Id} onChange={handleInput} />
                  <InputField label="Member 3 Name" name="member3Name" placeholder="Optional" value={form.member3Name} onChange={handleInput} />
                  <InputField label="Member 3 Student ID" name="member3Id" placeholder="Optional" value={form.member3Id} onChange={handleInput} />
                </div>

                <div className="pt-4 flex justify-end">
                  <button onClick={handleNext} className="px-6 py-3 bg-accent-cyan text-bgDark font-mono text-xs uppercase tracking-widest font-bold rounded-sm flex items-center space-x-2">
                    <span>Continue payloads</span> <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <FileUpload label="Profile Photo" onFileSelect={(file) => handleFileSelect('photo', file)} accept="image/*" />
                  <FileUpload label="Student ID Snapshot" onFileSelect={(file) => handleFileSelect('idCard', file)} accept="image/*" />
                  <FileUpload label="Payment Receipt Screenshot" onFileSelect={(file) => handleFileSelect('payment', file)} accept="image/*" />
                  <FileUpload label="Additional Documents (Optional)" onFileSelect={(file) => handleFileSelect('doc', file)} accept="application/pdf,image/*" />
                </div>

                <div className="pt-4 flex justify-between items-center">
                  <button onClick={handlePrev} className="px-6 py-3 border border-white/10 text-white font-mono text-xs uppercase tracking-widest font-bold rounded-sm flex items-center space-x-2">
                    <ArrowLeft className="w-4 h-4" /> <span>Back</span>
                  </button>
                  <button onClick={handleSubmit} className="px-8 py-3 bg-accent-cyan text-bgDark font-mono text-xs uppercase tracking-widest font-bold rounded-sm flex items-center space-x-2 shadow-lg">
                    <ShieldCheck className="w-4 h-4" /> <span>LOCK TEAM ROSTER</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ========================================================================= */}
        {/* SUCCESS STATE */}
        {/* ========================================================================= */}
        {isSuccess && (
          <div className="p-8 border border-accent-emerald/20 bg-accent-emerald/5 rounded-md flex items-start space-x-4 font-mono text-xs text-primary/85 dark:text-white/85 leading-relaxed">
            <CheckCircle className="w-6 h-6 text-accent-emerald shrink-0 mt-0.5" />
            <div className="space-y-3">
              <h3 className="text-accent-emerald font-sans font-bold text-lg uppercase">[PORTAL] ROSTER_LOCKED</h3>
              <p>Your team parameters and proof payloads have been processed and indexed into BUP CSE TechFest core datasets.</p>
              <p className="text-primary/50 dark:text-white/40">An invitation ticket verification coordinate set has been beamed to your email address: <span className="text-accent-cyan">{currentUser.email}</span>.</p>
              <div className="pt-2 flex flex-col sm:flex-row items-center gap-4">
                <button onClick={() => { setIsSuccess(false); setStep(1); }} className="px-6 py-3 border border-accent-emerald/30 text-accent-emerald hover:bg-accent-emerald/10 font-bold tracking-wider uppercase rounded-sm">
                  View Profile Dashboard
                </button>
                <button onClick={() => { setIsSuccess(false); setStep(1); setCurrentUser(null); }} className="text-accent-cyan underline">
                  Log Out
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ========================================================================= */}
      {/* CHECKOUT MODAL: DETAILS, TERMS & PAYMENT CONFIRMATION */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {showPaymentModal && currentUser && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-bgDark/80 backdrop-blur-md">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative max-w-lg w-full rounded border border-[#0d2d6c] bg-[#051638] p-6 shadow-2xl font-mono text-white space-y-6"
            >
              {/* Close Button */}
              <button
                onClick={() => setShowPaymentModal(false)}
                className="absolute top-4 right-4 p-1 text-white/50 hover:text-accent-rose hover:border-accent-rose border border-transparent rounded transition-all"
                aria-label="Close Checkout Modal"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="space-y-1">
                <span className="text-[10px] text-accent-gold tracking-widest font-bold block flex items-center gap-1">
                  <Coins className="w-3.5 h-3.5" /> [ SECURE_CHECKOUT_GATEWAY ]
                </span>
                <h3 className="font-sans font-bold text-lg uppercase">CONFIRM SQUAD FEES</h3>
              </div>

              {/* Roster & Pricing Breakdown */}
              <div className="p-4 rounded border border-[#0d2d6c] bg-bgDark/40 text-xs space-y-2">
                <div className="flex justify-between border-b border-[#0d2d6c]/60 pb-1.5">
                  <span className="text-white/40">TEAM NAME:</span>
                  <span className="font-bold text-accent-cyan">{currentUser.teamName}</span>
                </div>
                <div className="flex justify-between border-b border-[#0d2d6c]/60 pb-1.5">
                  <span className="text-white/40">REGISTERED TRACK:</span>
                  <span className="font-bold uppercase text-accent-gold">{currentUser.track}</span>
                </div>
                <div className="flex justify-between border-b border-[#0d2d6c]/60 pb-1.5">
                  <span className="text-white/40">LEADER NAME:</span>
                  <span className="font-bold">{currentUser.fullName}</span>
                </div>
                <div className="flex justify-between border-b border-[#0d2d6c]/60 pb-1.5">
                  <span className="text-white/40">UNIVERSITY:</span>
                  <span className="font-bold">{currentUser.university}</span>
                </div>
                <div className="flex justify-between pt-1.5 font-bold text-sm text-accent-emerald">
                  <span>TOTAL OUTSTANDING:</span>
                  <span>{getTrackPrice(currentUser.track)} BDT</span>
                </div>
              </div>

              {/* Terms and Conditions block */}
              <div className="space-y-2">
                <div className="flex items-center space-x-1.5 text-accent-cyan text-xs font-bold">
                  <FileText className="w-3.5 h-3.5" />
                  <span>TERMS_AND_REGULATIONS:</span>
                </div>
                <ul className="text-[10px] text-white/50 space-y-1.5 pl-4 list-disc leading-relaxed">
                  <li>Registration fees are strictly non-refundable once rosters are validated.</li>
                  <li>All participating members must present valid physical student ID cards upon arrival.</li>
                  <li>Any form of code sharing or plagiarism will trigger immediate team disqualification.</li>
                  <li>Submitting false bank reference details results in an automatic tournament ban.</li>
                </ul>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-4 pt-2">
                <button
                  onClick={() => setShowPaymentModal(false)}
                  className="py-3 rounded border border-[#0d2d6c] hover:border-accent-rose text-white/70 hover:text-accent-rose font-bold text-xs uppercase transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmPayment}
                  className="py-3 rounded bg-accent-emerald text-white font-bold text-xs uppercase tracking-widest flex items-center justify-center space-x-1.5 shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:scale-[1.02] transition-transform"
                >
                  <CreditCard className="w-4 h-4" />
                  <span>Pay Now</span>
                </button>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </PageWrapper>
  );
}