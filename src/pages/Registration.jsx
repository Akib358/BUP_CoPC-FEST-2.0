import React, { useState } from 'react';
import PageWrapper from '../components/layout/PageWrapper';
import InputField from '../components/ui/InputField';
import FileUpload from '../components/ui/FileUpload';
import { Terminal, ShieldCheck, ArrowRight, ArrowLeft, CheckCircle } from 'lucide-react';

export default function Registration({ setActivePage }) {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    fullName: '', email: '', phone: '', university: '', department: '', studentId: '',
    teamName: '', member2Name: '', member2Id: '', member3Name: '', member3Id: '',
    photo: null, idCard: null, payment: null, doc: null
  });
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInput = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const handleFileSelect = (fieldName, file) => {
    setForm({ ...form, [fieldName]: file });
  };

  const handleNext = () => {
    const newErrors = {};
    if (step === 1) {
      if (!form.fullName) newErrors.fullName = 'Required';
      if (!form.email) newErrors.email = 'Required';
      if (!form.phone) newErrors.phone = 'Required';
      if (!form.university) newErrors.university = 'Required';
      if (!form.department) newErrors.department = 'Required';
      if (!form.studentId) newErrors.studentId = 'Required';
    } else if (step === 2) {
      if (!form.teamName) newErrors.teamName = 'Required';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setStep(step + 1);
  };

  const handlePrev = () => {
    setStep(step - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
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
          <h1 className="text-3xl sm:text-5xl font-bold font-sans text-primary dark:text-white">
            PORTAL REGISTRATION
          </h1>
          <div className="flex items-center space-x-6 text-xs font-mono font-bold text-primary/40 dark:text-white/40">
            <span className={step === 1 ? 'text-accent-cyan' : ''}>[1] PARTICIPANT</span>
            <span>&gt;</span>
            <span className={step === 2 ? 'text-accent-cyan' : ''}>[2] TEAM</span>
            <span>&gt;</span>
            <span className={step === 3 ? 'text-accent-cyan' : ''}>[3] UPLINKS</span>
          </div>
        </div>

        {!isSubmitted ? (
          <div className="p-8 border border-bgLight-border dark:border-bgDark-border bg-bgLight-card/50 dark:bg-bgDark-card/50 rounded-sm">
            {/* STEP 1: PARTICIPANT DATA */}
            {step === 1 && (
              <div className="space-y-6">
                <div className="flex items-center space-x-2 text-primary dark:text-white font-mono font-bold text-sm border-b border-bgLight-border dark:border-bgDark-border pb-3">
                  <Terminal className="w-4 h-4 text-accent-cyan" />
                  <span>PARTICIPANT_METADATA:</span>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <InputField label="Full Name" name="fullName" placeholder="Your full name" value={form.fullName} onChange={handleInput} required error={errors.fullName} />
                  <InputField label="Email Address" name="email" type="email" placeholder="name@domain.com" value={form.email} onChange={handleInput} required error={errors.email} />
                  <InputField label="Phone Number" name="phone" placeholder="017xxxxxxxx" value={form.phone} onChange={handleInput} required error={errors.phone} />
                  <InputField label="Student ID" name="studentId" placeholder="ID Number" value={form.studentId} onChange={handleInput} required error={errors.studentId} />
                  <InputField label="University / College" name="university" placeholder="Institution Name" value={form.university} onChange={handleInput} required error={errors.university} />
                  <InputField label="Department" name="department" placeholder="Department (e.g. CSE)" value={form.department} onChange={handleInput} required error={errors.department} />
                </div>

                <div className="pt-4 flex justify-end">
                  <button onClick={handleNext} className="px-6 py-3 bg-primary dark:bg-accent-cyan text-white dark:text-bgDark font-mono text-xs uppercase tracking-widest font-bold rounded-sm flex items-center space-x-2">
                    <span>Continue parameters</span> <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2: TEAM SPECIFICATIONS */}
            {step === 2 && (
              <div className="space-y-6">
                <div className="flex items-center space-x-2 text-primary dark:text-white font-mono font-bold text-sm border-b border-bgLight-border dark:border-bgDark-border pb-3">
                  <Terminal className="w-4 h-4 text-accent-cyan" />
                  <span>TEAM_PARAMETERS:</span>
                </div>

                <div className="space-y-6">
                  <InputField label="Team Name" name="teamName" placeholder="Roster Squad Title" value={form.teamName} onChange={handleInput} required error={errors.teamName} />
                  
                  <div className="p-4 rounded-md border border-primary/10 dark:border-white/5 bg-primary/5 dark:bg-bgDark-card/30 font-mono text-[10px] text-primary/50 dark:text-white/40 leading-relaxed">
                    Leave team member details blank if registering as an individual participant for specialized single tracks.
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <InputField label="Member 2 Name" name="member2Name" placeholder="Optional" value={form.member2Name} onChange={handleInput} />
                    <InputField label="Member 2 Student ID" name="member2Id" placeholder="Optional" value={form.member2Id} onChange={handleInput} />
                    <InputField label="Member 3 Name" name="member3Name" placeholder="Optional" value={form.member3Name} onChange={handleInput} />
                    <InputField label="Member 3 Student ID" name="member3Id" placeholder="Optional" value={form.member3Id} onChange={handleInput} />
                  </div>
                </div>

                <div className="pt-4 flex justify-between items-center">
                  <button onClick={handlePrev} className="px-6 py-3 border border-primary/25 dark:border-white/10 hover:border-accent-cyan text-primary dark:text-white font-mono text-xs uppercase tracking-widest font-bold rounded-sm flex items-center space-x-2">
                    <ArrowLeft className="w-4 h-4" /> <span>Back</span>
                  </button>
                  <button onClick={handleNext} className="px-6 py-3 bg-primary dark:bg-accent-cyan text-white dark:text-bgDark font-mono text-xs uppercase tracking-widest font-bold rounded-sm flex items-center space-x-2">
                    <span>Continue Uplinks</span> <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: DOCUMENT UPLINKS */}
            {step === 3 && (
              <div className="space-y-6">
                <div className="flex items-center space-x-2 text-primary dark:text-white font-mono font-bold text-sm border-b border-bgLight-border dark:border-bgDark-border pb-3">
                  <Terminal className="w-4 h-4 text-accent-cyan" />
                  <span>SECURE_UPLINK_DECK:</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <FileUpload label="Profile Photo" onFileSelect={(file) => handleFileSelect('photo', file)} accept="image/*" />
                  <FileUpload label="Student ID Snapshot" onFileSelect={(file) => handleFileSelect('idCard', file)} accept="image/*" />
                  <FileUpload label="Payment Receipt Screenshot" onFileSelect={(file) => handleFileSelect('payment', file)} accept="image/*" />
                  <FileUpload label="Additional Documents (Optional)" onFileSelect={(file) => handleFileSelect('doc', file)} accept="application/pdf,image/*" />
                </div>

                <div className="pt-4 flex justify-between items-center">
                  <button onClick={handlePrev} className="px-6 py-3 border border-primary/25 dark:border-white/10 hover:border-accent-cyan text-primary dark:text-white font-mono text-xs uppercase tracking-widest font-bold rounded-sm flex items-center space-x-2">
                    <ArrowLeft className="w-4 h-4" /> <span>Back</span>
                  </button>
                  <button onClick={handleSubmit} className="px-8 py-3 bg-accent-cyan dark:bg-accent-cyan text-bgDark font-mono text-xs uppercase tracking-widest font-bold rounded-sm flex items-center space-x-2 shadow-glow-cyan/20">
                    <ShieldCheck className="w-4 h-4" /> <span>AUTHORIZE SIGNUP</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="p-8 border border-accent-emerald/20 bg-accent-emerald/5 rounded-md flex items-start space-x-4 font-mono text-xs text-primary/85 dark:text-white/85 leading-relaxed">
            <CheckCircle className="w-6 h-6 text-accent-emerald shrink-0 mt-0.5" />
            <div className="space-y-3">
              <h3 className="text-accent-emerald font-sans font-bold text-lg uppercase">[PORTAL] ROSTER_LOCKED</h3>
              <p>Your team parameters and proof payloads have been processed and indexed into BUP CSE TechFest core datasets.</p>
              <p className="text-primary/50 dark:text-white/40">An invitation ticket verification coordinate set has been beamed to your email address: <span className="text-accent-cyan">{form.email}</span>.</p>
              <div className="pt-2 flex flex-col sm:flex-row items-center gap-4">
                <button onClick={() => setActivePage('home')} className="w-full sm:w-auto px-6 py-3 border border-accent-emerald/30 text-accent-emerald hover:bg-accent-emerald/10 font-bold tracking-wider uppercase rounded-sm">
                  Return Home
                </button>
                <button onClick={() => { setIsSubmitted(false); setStep(1); setForm({ fullName: '', email: '', phone: '', university: '', department: '', studentId: '', teamName: '', member2Name: '', member2Id: '', member3Name: '', member3Id: '', photo: null, idCard: null, payment: null, doc: null }); }} className="w-full sm:w-auto text-accent-cyan underline">
                  Register another team
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </PageWrapper>
  );
}