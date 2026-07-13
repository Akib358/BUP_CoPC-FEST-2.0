import React from 'react';

export default function InputField({ 
  label, 
  name, 
  type = "text", 
  placeholder, 
  value, 
  onChange, 
  required = false, 
  error = "" 
}) {
  return (
    <div className="space-y-1.5 font-mono">
      <label className="block text-[11px] uppercase tracking-widest text-primary/70 dark:text-white/60 font-bold">
        {label} {required && <span className="text-accent-rose">*</span>}
      </label>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        className={`w-full px-4 py-3 text-xs bg-bgLight dark:bg-bgDark-card border ${
          error 
            ? 'border-accent-rose' 
            : 'border-bgLight-border dark:border-bgDark-border focus:border-primary dark:focus:border-accent-cyan'
        } text-primary dark:text-white rounded-sm outline-none transition-all duration-200 placeholder-primary/30 dark:placeholder-white/20`}
      />
      {error && (
        <span className="block text-[10px] text-accent-rose tracking-wider uppercase">
          [ERR] {error}
        </span>
      )}
    </div>
  );
}