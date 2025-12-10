'use client';

import { useState, useEffect, useRef } from 'react';
import TicTacToe from './TicTacToe';
import GuessGame from './GuessGame';
import RPSGame from './RPSGame';
import ConnectFour from './ConnectFour';

export default function Terminal() {
    const [input, setInput] = useState('');
    const [output, setOutput] = useState([
        { type: 'info', content: 'Welcome to TiwarminalX v1.0.0' },
        { type: 'info', content: 'Type "help" to see available commands.' },
    ]);
    const [history, setHistory] = useState([]);
    const [historyIndex, setHistoryIndex] = useState(-1);
    const inputRef = useRef(null);
    const bottomRef = useRef(null);
    const terminalBodyRef = useRef(null);

    // Game State
    const [showTicTacToe, setShowTicTacToe] = useState(false);
    const [showGuessGame, setShowGuessGame] = useState(false);
    const [showRPS, setShowRPS] = useState(false);
    const [showConnectFour, setShowConnectFour] = useState(false);

    useEffect(() => {
        if (terminalBodyRef.current) {
            terminalBodyRef.current.scrollTop = terminalBodyRef.current.scrollHeight;
        }
    }, [output]);

    const handleCommand = (cmd) => {
        const trimmedCmd = cmd.trim().toLowerCase();
        const newOutput = [...output, { type: 'command', content: `user@tiwarminal:~$ ${cmd}` }];

        switch (trimmedCmd) {
            case 'help':
                newOutput.push({
                    type: 'info',
                    content: `Available commands:
  help            - Show this help message
  about           - Learn about me
  experience      - View my work experience
  skills          - View my technical skills
  projects        - View my projects
  whois           - Who am I?
  clear           - Clear the terminal
  games           - Play some games
  play <game>     - Launch a specific game
  exit            - Close the session (simulated)`
                });
                break;
            case 'about':
                newOutput.push({ type: 'success', content: 'DevOps Engineer & Full Stack Developer focusing on scalable systems.' });
                break;
            case 'experience':
                newOutput.push({ type: 'success', content: '- Freelance Web Dev\n- Open Source Contributor\n- Versatile Engineering Roles' });
                break;
            case 'skills':
                newOutput.push({ type: 'success', content: 'Python, JS, React, Next.js, Node.js, Docker, Linux, Git, AWS...' });
                break;
            case 'projects':
                newOutput.push({ type: 'success', content: '1. PassOp (Password Manager)\n2. Discord Casino Bot\n3. Freelance Musician Site' });
                break;
            case 'whois':
                newOutput.push({ type: 'info', content: 'Ujjwal Tiwari: A creative developer blending code with creativity.' });
                break;
            case 'clear':
                setOutput([]);
                setInput('');
                return;
            case 'games':
                newOutput.push({
                    type: 'info', content: `Available games:
    guess      - Guess the Number
    tictactoe  - Tic Tac Toe 
    rps        - Rock Paper Scissors 
    connect4   - Connect Four ` });
                break;
            case 'play guess':
            case 'guess':
                setShowGuessGame(true);
                newOutput.push({ type: 'success', content: 'Launching Guess the Number...' });
                break;
            case 'play tictactoe':
            case 'tictactoe':
                setShowTicTacToe(true);
                newOutput.push({ type: 'success', content: 'Launching Tic Tac Toe...' });
                break;
            case 'play rps':
            case 'rps':
                setShowRPS(true);
                newOutput.push({ type: 'success', content: 'Launching Rock Paper Scissors...' });
                break;
            case 'play connect4':
            case 'connect4':
            case 'connectfour':
                setShowConnectFour(true);
                newOutput.push({ type: 'success', content: 'Launching Connect Four...' });
                break;
            case 'exit':
                newOutput.push({ type: 'error', content: 'Session terminated. Refresh to restart.' });
                break;
            case '':
                break;
            default:
                newOutput.push({ type: 'error', content: `Command not found: ${cmd}. Type "help" for a list of commands.` });
        }

        setOutput(newOutput);
        setHistory([...history, cmd]);
        setHistoryIndex(-1);
        setInput('');
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleCommand(input);
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            if (history.length > 0) {
                const newIndex = historyIndex + 1;
                if (newIndex < history.length) {
                    setHistoryIndex(newIndex);
                    setInput(history[history.length - 1 - newIndex]);
                }
            }
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            if (historyIndex > 0) {
                const newIndex = historyIndex - 1;
                setHistoryIndex(newIndex);
                setInput(history[history.length - 1 - newIndex]);
            } else if (historyIndex === 0) {
                setHistoryIndex(-1);
                setInput('');
            }
        }
    };

    return (
        <section className="w-full max-w-4xl py-6 border-t border-white/5">
            <div className="w-full rounded-xl overflow-hidden bg-[#1e1e1e] shadow-2xl border border-gray-800 font-mono text-sm sm:text-base">
                {/* macOS Window Header */}
                <div className="bg-[#2d2d2d] px-4 py-2 flex items-center gap-2 border-b border-gray-700">
                    <div className="flex gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-500"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    </div>
                    <div className="flex-1 text-center text-gray-400 text-xs font-semibold select-none">
                        user@tiwarminal: ~
                    </div>
                </div>

                {/* Terminal Body */}
                <div ref={terminalBodyRef} className="p-4 h-[400px] overflow-y-auto text-gray-300" onClick={() => inputRef.current?.focus()}>
                    {output.map((line, i) => (
                        <div key={i} className={`mb-1 whitespace-pre-wrap ${line.type === 'error' ? 'text-red-400' :
                            line.type === 'success' ? 'text-green-400' :
                                line.type === 'warning' ? 'text-yellow-400' :
                                    line.type === 'command' ? 'text-blue-300 font-bold' : 'text-gray-300'
                            }`}>
                            {line.content}
                        </div>
                    ))}
                    <div className="flex items-center gap-2 text-white">
                        <span className="text-green-400">user@tiwarminal:~$</span>
                        <input
                            ref={inputRef}
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={handleKeyDown}
                            className="flex-1 bg-transparent border-none outline-none text-white placeholder-gray-600"
                            autoFocus
                            spellCheck="false"
                            autoComplete="off"
                        />
                    </div>
                    <div ref={bottomRef} />
                </div>
            </div>
            {showTicTacToe && <TicTacToe onClose={() => setShowTicTacToe(false)} />}
            {showGuessGame && <GuessGame onClose={() => setShowGuessGame(false)} />}
            {showRPS && <RPSGame onClose={() => setShowRPS(false)} />}
            {showConnectFour && <ConnectFour onClose={() => setShowConnectFour(false)} />}
        </section>
    );
}
