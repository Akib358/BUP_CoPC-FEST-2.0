import React, { useState, useRef } from 'react';
import { Upload, FileText, CheckCircle, Trash2 } from 'lucide-react';

export default function FileUpload({ label, onFileSelect, accept = "image/*,application/pdf" }) {
  const [file, setFile] = useState(null);
  const [isDragActive, setIsDragActive] = useState(false);
  const fileInputRef = useRef(null);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setIsDragActive(true);
    } else if (e.type === "dragleave") {
      setIsDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const selectedFile = e.dataTransfer.files[0];
      setFile(selectedFile);
      onFileSelect(selectedFile);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      onFileSelect(selectedFile);
    }
  };

  const triggerInputClick = () => {
    fileInputRef.current.click();
  };

  const removeFile = (e) => {
    e.stopPropagation();
    setFile(null);
    onFileSelect(null);
  };

  return (
    <div className="space-y-2 font-mono">
      <span className="block text-[11px] uppercase tracking-widest text-primary/70 dark:text-white/60 font-bold">
        {label}
      </span>
      
      <div
        onDragEnter={handleDrag}
        onDragOver={handleDrag}
        onDragLeave={handleDrag}
        onDrop={handleDrop}
        onClick={triggerInputClick}
        className={`relative group border border-dashed rounded-md p-6 text-center cursor-pointer transition-all duration-300 ${
          isDragActive 
            ? 'border-accent-cyan bg-accent-cyan/5' 
            : 'border-bgLight-border dark:border-bgDark-border hover:border-primary/50 dark:hover:border-accent-cyan/50 bg-bgLight-card dark:bg-bgDark-card'
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept={accept}
          onChange={handleFileChange}
          className="hidden"
        />

        {!file ? (
          <div className="space-y-2">
            <div className="inline-flex p-3 rounded-full bg-primary/5 dark:bg-accent-cyan/5 text-primary/60 dark:text-accent-cyan group-hover:scale-110 transition-transform">
              <Upload className="w-5 h-5" />
            </div>
            <div className="text-xs text-primary/80 dark:text-white/70">
              <span className="font-bold text-primary dark:text-accent-cyan">Click to upload</span> or drag and drop
            </div>
            <p className="text-[10px] text-primary/40 dark:text-white/40 uppercase">
              MAX SIZE 5MB (PDF, JPEG, PNG)
            </p>
          </div>
        ) : (
          <div className="flex items-center justify-between p-3 rounded-sm border border-primary/10 dark:border-white/10 bg-bgLight dark:bg-bgDark">
            <div className="flex items-center space-x-3 text-left">
              <div className="p-2 bg-primary/5 dark:bg-accent-cyan/10 rounded text-accent-cyan">
                <FileText className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs text-primary dark:text-white font-bold truncate max-w-[180px]">
                  {file.name}
                </p>
                <p className="text-[10px] text-primary/50 dark:text-white/40">
                  {(file.size / (1024 * 1024)).toFixed(2)} MB
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-4 h-4 text-accent-emerald" />
              <button
                onClick={removeFile}
                className="p-1.5 text-primary/40 dark:text-white/40 hover:text-accent-rose dark:hover:text-accent-rose transition-colors"
                aria-label="Remove File"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}