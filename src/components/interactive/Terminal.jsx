import React, { useState, useRef, useEffect } from 'react';
import { Terminal as TerminalIcon, ArrowRight } from 'lucide-react';

export default function Terminal({ setActivePage }) {
  const [history, setHistory] = useState([
    { text: "BUP_TECH_CARNIVAL: CORE KERNEL SYSTEM v2.0", type: "system" }
  ]);
  const [input, setInput] = useState("");
  const [nameEntered, setNameEntered] = useState(false);
  const [userName, setUserName] = useState("");
  const containerRef = useRef(null);
  const typingStarted = useRef(false); // Ref sentinel to prevent duplicate mount triggers in React StrictMode

  useEffect(() => {
    if (typingStarted.current) return;
    typingStarted.current = true;

    const text = "Type your name: ";
    let currentText = "";
    let index = 0;

    const timer = setInterval(() => {
      if (index < text.length) {
        currentText += text[index];
        setHistory(prev => {
          const clean = prev.filter(line => !line.isTyping);
          return [...clean, { text: currentText, type: "hint", isTyping: true }];
        });
        index++;
      } else {
        clearInterval(timer);
        setHistory(prev => prev.map(line => line.isTyping ? { ...line, isTyping: false } : line));
      }
    }, 80);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [history]);

  const handleCommand = (e) => {
    if (e.key !== 'Enter') return;
    const value = input.trim();
    if (!value) return;

    if (!nameEntered) {
      setUserName(value);
      setNameEntered(true);
      setInput("");

      const compileWelcome = [
        { text: `> ${value}`, type: "input" },
        { text: "Compiling welcome_protocol.cpp...", type: "system" },
        { text: "#include <iostream>", type: "code" },
        { text: "using namespace std;", type: "code" },
        { text: "int main() {", type: "code" },
        { text: `    cout << "Welcome to BUP CSE TechFest, ${value}!" << endl;`, type: "code-glowing" },
        { text: "    return 0;", type: "code" },
        { text: "}", type: "code" },
        { text: "Execution complete: welcome_protocol exited with code 0.", type: "system" },
        { text: "Type 'help' to review directory variables.", type: "hint" }
      ];

      setHistory(prev => [...prev, ...compileWelcome]);
      return;
    }

    const command = value.toLowerCase();
    let reply = [];

    switch (command) {
      case 'help':
        reply = [
          { text: `> ${value}`, type: "input" },
          { text: "COMMAND DIRECTORY CODES:", type: "output" },
          { text: "  ./iupc       - Visit programming contest info", type: "output" },
          { text: "  ./hackathon  - Visit hackathon contest details", type: "output" },
          { text: "  ./ctf        - Visit Jeopardy CTF details", type: "output" },
          { text: "  ./register   - Run global registration panel", type: "output" },
          { text: "  clear        - Clear console logs", type: "output" },
        ];
        break;
      case './iupc':
        reply = [{ text: `> ${value}`, type: "input" }, { text: "Rerouting port to ./iupc...", type: "system" }];
        setTimeout(() => setActivePage('iupc'), 800);
        break;
      case './hackathon':
        reply = [{ text: `> ${value}`, type: "input" }, { text: "Rerouting port to ./hackathon...", type: "system" }];
        setTimeout(() => setActivePage('hackathon'), 800);
        break;
      case './ctf':
        reply = [{ text: `> ${value}`, type: "input" }, { text: "Rerouting port to ./ctf...", type: "system" }];
        setTimeout(() => setActivePage('ctf'), 800);
        break;
      case './register':
        reply = [{ text: `> ${value}`, type: "input" }, { text: "Booting Registration engine interface...", type: "system" }];
        setTimeout(() => setActivePage('registration'), 800);
        break;
      case 'clear':
        setHistory([]);
        setInput("");
        return;
      default:
        reply = [
          { text: `> ${value}`, type: "input" },
          { text: `ERR: unrecognized command '${command}'. Type 'help' to list directories.`, type: "error" }
        ];
    }

    setHistory(prev => [...prev, ...reply]);
    setInput("");
  };

  return (
    <div className="w-full max-w-2xl mx-auto rounded-lg border border-[#0d2d6c] bg-[#051638]/95 backdrop-blur-md overflow-hidden terminal-crt font-mono shadow-xl text-white">
      <div className="flex items-center justify-between px-4 py-3 border-b border-[#0d2d6c] bg-[#020b1e]/90">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded-full bg-accent-rose" />
          <div className="w-3 h-3 rounded-full bg-accent-gold" />
          <div className="w-3 h-3 rounded-full bg-accent-emerald" />
        </div>
        <span className="text-[10px] tracking-widest text-white/40 uppercase flex items-center gap-1.5 font-bold">
          <TerminalIcon className="w-3.5 h-3.5 text-accent-cyan" /> bup-console.sh
        </span>
      </div>

      <div 
        ref={containerRef}
        className="p-6 h-64 overflow-y-auto text-xs space-y-2.5 scrollbar-thin scrollbar-thumb-accent-cyan/10"
      >
        {history.map((line, idx) => (
          <div key={idx} className={`${
            line.type === 'system' ? 'text-accent-cyan font-bold' :
            line.type === 'hint' ? 'text-white/50' :
            line.type === 'input' ? 'text-white font-semibold' :
            line.type === 'code' ? 'text-white/30 pl-4 font-mono' :
            line.type === 'code-glowing' ? 'text-accent-emerald pl-4 font-mono font-bold cyber-glow-cyan' :
            line.type === 'error' ? 'text-accent-rose' : 'text-white/70'
          }`}>
            {line.text}
          </div>
        ))}
      </div>

      <div className="flex items-center px-6 py-4 border-t border-[#0d2d6c] bg-[#020b1e]/95">
        <ArrowRight className="w-3.5 h-3.5 text-accent-cyan shrink-0 mr-2" />
        <span className="text-xs text-accent-cyan select-none mr-2">
          {nameEntered ? `${userName.toLowerCase().replace(/\s+/g, '')}@bup:~#` : "guest@bup:~#"}
        </span>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleCommand}
          placeholder={nameEntered ? "type help and press Enter..." : "Enter your name..."}
          className="w-full bg-transparent text-xs text-white outline-none border-none placeholder-white/20"
        />
      </div>
    </div>
  );
}