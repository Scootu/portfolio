import React, { useState, useRef, useEffect } from 'react';
import { ChevronRight, CornerDownLeft, RefreshCw } from 'lucide-react';
import { motion } from 'framer-motion';

interface LogEntry {
  type: 'input' | 'output' | 'error' | 'success';
  text: string;
}

export const Terminal: React.FC = () => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<LogEntry[]>([
    { type: 'output', text: 'ANES HAMDAOUI [Version 1.0.0]' },
    { type: 'output', text: '(c) 2026 Anes Hamdaoui. All rights reserved.' },
    { type: 'output', text: 'Type "help" to see available commands, or click the quick action buttons.' },
    { type: 'output', text: ' ' }
  ]);
  
  const terminalEndRef = useRef<HTMLDivElement>(null);
  const terminalLogsRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const logs = terminalLogsRef.current;
    if (!logs) return;
    logs.scrollTo({
      top: logs.scrollHeight,
      behavior: 'smooth'
    });
  }, [history]);

  const focusInput = () => {
    inputRef.current?.focus();
  };

  const handleCommand = (cmdText: string) => {
    const trimmed = cmdText.trim().toLowerCase();
    if (!trimmed) return;

    const newHistory = [...history, { type: 'input' as const, text: `scootu@anes-pc:~$ ${cmdText}` }];

    switch (trimmed) {
      case 'help':
        newHistory.push(
          { type: 'output', text: 'Available Commands:' },
          { type: 'output', text: '  about      - Display background and profile' },
          { type: 'output', text: '  skills     - List backend, frontend, and tool stacks' },
          { type: 'output', text: '  projects   - Show details of key full stack projects' },
          { type: 'output', text: '  cv         - Download my professional CV PDF' },
          { type: 'output', text: '  contact    - Print email, github, linkedin, phone' },
          { type: 'output', text: '  clear      - Clear the console screen' }
        );
        break;

      case 'about':
        newHistory.push(
          { type: 'output', text: '--- PROFILE SUMMARY ---' },
          { type: 'output', text: 'Anes Hamdaoui - Full Stack Developer' },
          { type: 'output', text: 'Education: Bachelor of Science in Computer Science, Khemis Miliana University (2023-2026).' },
          { type: 'output', text: 'Location: Ain Defla, Algeria.' },
          { type: 'output', text: 'Summary: Passionate developer focusing on scalable web systems, clean architecture, design patterns, and robust databases. Skilled in Bridging React interfaces with C#/.NET Core high-performance backends.' }
        );
        break;

      case 'skills':
        newHistory.push(
          { type: 'output', text: '--- TECHNICAL SKILLS ---' },
          { type: 'output', text: 'Backend:  C++17 | C# | .NET 8 | Node.js | Entity Framework Core | LINQ | RESTful APIs | OOP' },
          { type: 'output', text: 'Frontend: React.js | React Router | Vite | CSS3 | Responsive Design' },
          { type: 'output', text: 'Design:   Clean Architecture | SOLID Principles | Design Patterns (Factory, Clone, etc.)' },
          { type: 'output', text: 'Tools:    Git | GitHub | Unit Testing | Swagger / OpenAPI' },
          { type: 'output', text: 'Languages: English, French, Arabic (Bilingual / Multilingual)' }
        );
        break;

      case 'projects':
        newHistory.push(
          { type: 'output', text: '--- RECENT PROJECTS ---' },
          { type: 'output', text: '1. DEM AI' },
          { type: 'output', text: '   Description: Full-stack healthcare platform (Patients + Doctors + Pharmacies).' },
          { type: 'output', text: '   Tech: ASP.NET Core, CQRS, MediatR, Entity Framework, SQL Server, JWT Auth, React.' },
          { type: 'output', text: ' ' },
          { type: 'output', text: '2. MechanicShop Workshop' },
          { type: 'output', text: '   Description: Workshop platform managing work orders, technicians, scheduling conflict prevention.' },
          { type: 'output', text: '   Tech: ASP.NET Core, React, SQL Server, REST API, scheduling logic.' },
          { type: 'output', text: ' ' },
          { type: 'output', text: 'Type "cv" to download full documentation / CV.' }
        );
        break;

      case 'cv': {
        newHistory.push(
          { type: 'success', text: '[SYSTEM] Initializing download for Anes-hamdaoui-1.pdf...' },
          { type: 'success', text: '[SUCCESS] CV downloaded successfully!' }
        );
        // Trigger actual download
        const link = document.createElement('a');
        link.href = '/Anes-hamdaoui-1.pdf';
        link.download = 'Anes-Hamdaoui-CV.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        break;
      }

      case 'contact':
        newHistory.push(
          { type: 'output', text: '--- CONTACT CHANNELS ---' },
          { type: 'output', text: '  Email:     anes-hamdaoui@univ-dbkm.dz' },
          { type: 'output', text: '  LinkedIn:  linkedin.com/in/anes-hamdaoui-8239a8216' },
          { type: 'output', text: '  GitHub:    github.com/Scootu/' },
          { type: 'output', text: '  Phone:     +0540800930' }
        );
        break;

      case 'clear':
        setHistory([]);
        setInput('');
        return;

      default:
        newHistory.push({
          type: 'error',
          text: `Command "${cmdText}" not recognized. Type "help" for a list of valid commands.`
        });
        break;
    }

    setHistory(newHistory);
    setInput('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleCommand(input);
    }
  };

  const handleQuickClick = (command: string) => {
    handleCommand(command);
  };

  return (
    <>
      <section className="section-box terminal-section" id="terminal">
        <div className="container">
          <div className="section-box-header">
            <div>
              <span className="section-tag">03 // interactive console</span>
              <h2 className="section-title">Developer Terminal</h2>
            </div>
            <div className="header-meta font-mono">cli_simulation.exe</div>
          </div>

          <motion.div
            className="terminal-wrapper"
            initial={{ opacity: 0, y: 34 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Quick Actions Panel */}
            <div className="terminal-actions">
              <span className="terminal-actions-lbl">QUICK BUTTONS //</span>
              <div className="actions-deck">
                <button onClick={() => handleQuickClick('about')} className="terminal-action-btn font-mono">
                  [about]
                </button>
                <button onClick={() => handleQuickClick('skills')} className="terminal-action-btn font-mono">
                  [skills]
                </button>
                <button onClick={() => handleQuickClick('projects')} className="terminal-action-btn font-mono">
                  [projects]
                </button>
                <button onClick={() => handleQuickClick('cv')} className="terminal-action-btn font-mono terminal-action-btn--success">
                  [download_cv]
                </button>
                <button onClick={() => handleQuickClick('contact')} className="terminal-action-btn font-mono">
                  [contact]
                </button>
                <button onClick={() => handleQuickClick('clear')} className="terminal-action-btn font-mono">
                  [clear]
                </button>
              </div>
            </div>

            {/* Simulated Shell */}
            <div className="terminal-window" onClick={focusInput}>
              <div className="terminal-window-header">
                <div className="term-window-dots">
                  <span className="tdot tdot--red"></span>
                  <span className="tdot tdot--yellow"></span>
                  <span className="tdot tdot--green"></span>
                </div>
                <div className="term-window-title">scootu@anes-pc: ~ (sh)</div>
                <button 
                  className="term-refresh-btn" 
                  onClick={(e) => {
                    e.stopPropagation();
                    setHistory([
                      { type: 'output', text: 'ANES HAMDAOUI [Version 1.0.0]' },
                      { type: 'output', text: '(c) 2026 Anes Hamdaoui. All rights reserved.' },
                      { type: 'output', text: 'Type "help" to see available commands, or click the quick action buttons.' },
                      { type: 'output', text: ' ' }
                    ]);
                  }}
                  title="Reset Terminal"
                >
                  <RefreshCw size={10} />
                </button>
              </div>

              <div className="terminal-window-body">
                <div className="terminal-logs" ref={terminalLogsRef}>
                  {history.map((entry, idx) => (
                    <motion.div
                      key={`${idx}-${entry.text}`}
                      className={`terminal-log-row log-${entry.type}`}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.22, delay: Math.min(idx * 0.05, 0.35) }}
                    >
                      {entry.text}
                    </motion.div>
                  ))}
                  <div ref={terminalEndRef} />
                </div>

                <div className="terminal-input-line">
                  <span className="terminal-prompt">scootu@anes-pc:~$</span>
                  <input
                    ref={inputRef}
                    type="text"
                    className="terminal-input"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    autoFocus
                    placeholder="type a command..."
                    autoComplete="off"
                    autoCorrect="off"
                    autoCapitalize="off"
                    spellCheck="false"
                  />
                  <ChevronRight size={14} className="terminal-input-icon" />
                  <span className="enter-symbol-lbl">
                    <CornerDownLeft size={10} /> enter
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <style>{`
        .terminal-section {
          background: var(--color-bg-primary);
        }

        .terminal-wrapper {
          display: flex;
          flex-direction: column;
          gap: var(--space-4);
          margin-top: var(--space-6);
        }

        /* Quick Actions */
        .terminal-actions {
          display: flex;
          align-items: center;
          gap: var(--space-4);
          background: var(--color-bg-tertiary);
          border: 1px solid var(--color-border);
          padding: var(--space-3) var(--space-4);
          flex-wrap: wrap;
        }

        .terminal-actions-lbl {
          font-family: var(--font-mono);
          font-size: 11px;
          color: var(--color-text-tertiary);
          letter-spacing: 0.05em;
        }

        .actions-deck {
          display: flex;
          gap: var(--space-2);
          flex-wrap: wrap;
        }

        .terminal-action-btn {
          font-size: 11px;
          padding: var(--space-1) var(--space-3);
          border: 1px solid var(--color-border);
          background: var(--color-bg-primary);
          color: var(--color-text-secondary);
          transition: all var(--motion-fast) var(--ease-standard);
        }

        .terminal-action-btn:hover {
          color: var(--color-blue);
          border-color: var(--color-blue);
          background: var(--color-blue-subtle);
        }

        .terminal-action-btn--success:hover {
          color: var(--color-green);
          border-color: var(--color-green);
          background: var(--color-green-subtle);
        }

        /* Terminal Window */
        .terminal-window {
          background: #141414;
          border: 1px solid var(--color-border-strong);
          box-shadow: var(--shadow-lg);
          border-radius: 6px;
          overflow: hidden;
          cursor: text;
          height: 380px;
          display: flex;
          flex-direction: column;
        }

        .terminal-window-header {
          background: rgba(255, 255, 255, 0.03);
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          padding: var(--space-2) var(--space-4);
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .term-window-dots {
          display: flex;
          gap: 6px;
        }

        .tdot {
          display: block;
          width: 8px;
          height: 8px;
          border-radius: 50%;
        }

        .tdot--red { background: #ff5f56; }
        .tdot--yellow { background: #ffbd2e; }
        .tdot--green { background: #27c93f; }

        .term-window-title {
          font-family: var(--font-mono);
          font-size: 11px;
          color: rgba(255, 255, 255, 0.4);
        }

        .term-refresh-btn {
          color: rgba(255, 255, 255, 0.4);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: color var(--motion-fast) var(--ease-standard);
        }

        .term-refresh-btn:hover {
          color: #fff;
        }

        .terminal-window-body {
          padding: var(--space-4);
          flex: 1;
          display: flex;
          flex-direction: column;
          font-family: var(--font-mono);
          font-size: 13px;
          line-height: 1.6;
          overflow-y: auto;
          color: #a9b1d6;
        }

        .terminal-logs {
          flex: 1;
          overflow-y: auto;
          margin-bottom: var(--space-3);
          display: flex;
          flex-direction: column;
          gap: 4px;
          text-align: left;
        }

        .terminal-log-row {
          white-space: pre-wrap;
          word-break: break-all;
        }

        .log-input {
          color: #f7768e;
        }

        .log-output {
          color: #a9b1d6;
        }

        .log-error {
          color: #ff5f56;
          font-weight: 500;
        }

        .log-success {
          color: #9ece6a;
          font-weight: 500;
        }

        .terminal-input-line {
          display: flex;
          align-items: center;
          gap: var(--space-2);
          border-top: 1px solid rgba(255, 255, 255, 0.05);
          padding-top: var(--space-3);
        }

        .terminal-prompt {
          color: #7aa2f7;
          font-weight: 500;
          white-space: nowrap;
        }

        .terminal-input {
          flex: 1;
          background: transparent;
          border: none;
          outline: none;
          color: #9ece6a;
          font-family: var(--font-mono);
          font-size: 13px;
          padding: 0;
          margin: 0;
        }

        .terminal-input-icon {
          color: rgba(255, 255, 255, 0.2);
        }

        .enter-symbol-lbl {
          font-size: 10px;
          color: rgba(255, 255, 255, 0.2);
          display: flex;
          align-items: center;
          gap: 2px;
          text-transform: uppercase;
        }

        @media (max-width: 600px) {
          .terminal-window {
            height: 320px;
          }
          .terminal-prompt {
            font-size: 11px;
          }
          .terminal-input {
            font-size: 11px;
          }
        }
      `}</style>
    </>
  );
};
