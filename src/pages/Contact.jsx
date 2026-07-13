import React, { useState } from 'react';
import PageWrapper from '../components/layout/PageWrapper';
import InputField from '../components/ui/InputField';
import { Mail, Phone, MapPin, Terminal, CheckCircle } from 'lucide-react';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({});
  const [isSuccess, setIsSuccess] = useState(false);

  const handleInput = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!form.name) newErrors.name = 'Required';
    if (!form.email) newErrors.email = 'Required';
    if (!form.message) newErrors.message = 'Required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSuccess(true);
    setForm({ name: '', email: '', message: '' });
  };

  return (
    <PageWrapper>
      <div className="absolute inset-0 cyber-grid opacity-40 pointer-events-none" />
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-12 relative z-10">
        
        {/* Contact Form Column */}
        <div className="md:col-span-7 space-y-8">
          <div className="space-y-4">
            <span className="font-mono text-xs uppercase tracking-widest text-accent-cyan font-bold block">
              ./query_port_terminal.sh
            </span>
            <h1 className="text-3xl sm:text-5xl font-bold font-sans text-primary dark:text-white">
              GET IN TOUCH
            </h1>
            <p className="text-sm font-mono text-primary/70 dark:text-white/60 leading-relaxed">
              Facing problems with payment sweeps or squad verifications? Send a direct signal to BUP technical coordinators.
            </p>
          </div>

          {!isSuccess ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <InputField
                  label="Name"
                  name="name"
                  placeholder="Full name"
                  value={form.name}
                  onChange={handleInput}
                  required
                  error={errors.name}
                />
                <InputField
                  label="Email"
                  name="email"
                  type="email"
                  placeholder="name@domain.com"
                  value={form.email}
                  onChange={handleInput}
                  required
                  error={errors.email}
                />
              </div>

              <div className="space-y-1.5 font-mono">
                <label className="block text-[11px] uppercase tracking-widest text-primary/70 dark:text-white/60 font-bold">
                  Message Code
                </label>
                <textarea
                  name="message"
                  rows="5"
                  value={form.message}
                  onChange={handleInput}
                  placeholder="Write your issue description..."
                  className={`w-full px-4 py-3 text-xs bg-bgLight dark:bg-bgDark-card border ${
                    errors.message 
                      ? 'border-accent-rose' 
                      : 'border-bgLight-border dark:border-bgDark-border focus:border-primary dark:focus:border-accent-cyan'
                  } text-primary dark:text-white rounded-sm outline-none transition-all placeholder-primary/20 dark:placeholder-white/20`}
                />
                {errors.message && (
                  <span className="block text-[10px] text-accent-rose uppercase">[ERR] {errors.message}</span>
                )}
              </div>

              <button
                type="submit"
                className="w-full px-8 py-4 font-mono text-xs uppercase tracking-widest bg-primary dark:bg-accent-cyan text-white dark:text-bgDark font-bold rounded-sm shadow-md"
              >
                EMIT MESSAGE PACKET
              </button>
            </form>
          ) : (
            <div className="p-8 rounded-md border border-accent-emerald/20 bg-accent-emerald/5 flex items-start space-x-4 font-mono text-xs text-primary/85 dark:text-white/80 leading-relaxed">
              <CheckCircle className="w-5 h-5 text-accent-emerald shrink-0 mt-0.5" />
              <div className="space-y-2">
                <h4 className="font-bold text-accent-emerald text-sm uppercase">[SUCCESS] TRANSMISSION_OK</h4>
                <p>Your query coordinates have been parsed and securely beamed. Helpdesk units will follow up shortly on your registered email address.</p>
                <button 
                  onClick={() => setIsSuccess(false)}
                  className="mt-2 text-accent-cyan underline font-bold"
                >
                  Send another message
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Directory Coordinates Column */}
        <div className="md:col-span-5 space-y-8 font-mono">
          <div className="p-6 rounded-md border border-bgLight-border dark:border-bgDark-border bg-bgLight-card/50 dark:bg-bgDark-card/50 space-y-6">
            <div className="flex items-center space-x-2 text-primary dark:text-white font-bold text-sm">
              <Terminal className="w-4 h-4 text-accent-cyan" />
              <span>HELPDESK_INDEX:</span>
            </div>

            <div className="space-y-4 text-xs text-primary/80 dark:text-white/70">
              <div className="flex items-start space-x-3.5">
                <Mail className="w-4.5 h-4.5 text-accent-cyan shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold uppercase tracking-wider text-[10px] text-primary/50 dark:text-white/40">COMM_EMAIL</p>
                  <p>cse.techfest@bup.edu.bd</p>
                </div>
              </div>

              <div className="flex items-start space-x-3.5">
                <Phone className="w-4.5 h-4.5 text-accent-cyan shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold uppercase tracking-wider text-[10px] text-primary/50 dark:text-white/40">HELPDESK_PHONE</p>
                  <p>+880 1712 345678</p>
                </div>
              </div>

              <div className="flex items-start space-x-3.5">
                <MapPin className="w-4.5 h-4.5 text-accent-cyan shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold uppercase tracking-wider text-[10px] text-primary/50 dark:text-white/40">GEO_LOCATION</p>
                  <p>Mirpur Cantonment, Dhaka-1216, Bangladesh</p>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </PageWrapper>
  );
}