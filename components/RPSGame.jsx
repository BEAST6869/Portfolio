'use client';
import { useState } from 'react';
import { FaTimes, FaHandRock, FaHandPaper, FaHandScissors, FaUndo } from 'react-icons/fa';

export default function RPSGame({ onClose }) {
    const [userMove, setUserMove] = useState(null);
    const [botMove, setBotMove] = useState(null);
    const [result, setResult] = useState(null); // 'Win', 'Lose', 'Draw'
    const [isPlaying, setIsPlaying] = useState(false);

    const [score, setScore] = useState({ user: 0, bot: 0 });

    const moves = [
        { name: 'rock', icon: FaHandRock, color: 'text-white' },
        { name: 'paper', icon: FaHandPaper, color: 'text-white' },
        { name: 'scissors', icon: FaHandScissors, color: 'text-white' },
    ];

    const handleMove = (moveName) => {
        if (userMove) return; // Prevent multiple clicks
        setIsPlaying(true);
        setUserMove(moveName);

        // Simulate thinking delay
        setTimeout(() => {
            const cpuMove = moves[Math.floor(Math.random() * 3)].name;
            setBotMove(cpuMove);

            if (moveName === cpuMove) {
                setResult('Draw');
            } else if (
                (moveName === 'rock' && cpuMove === 'scissors') ||
                (moveName === 'paper' && cpuMove === 'rock') ||
                (moveName === 'scissors' && cpuMove === 'paper')
            ) {
                setResult('Win');
                setScore(prev => ({ ...prev, user: prev.user + 1 }));
            } else {
                setResult('Lose');
                setScore(prev => ({ ...prev, bot: prev.bot + 1 }));
            }
            setIsPlaying(false);
        }, 600);
    };

    const resetGame = () => {
        setUserMove(null);
        setBotMove(null);
        setResult(null);
    };

    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-sm">
            <div className="w-[360px] bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 shadow-2xl animate-in fade-in zoom-in duration-300">

                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-bold text-white">Rock Paper Scissors</h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors cursor-pointer">
                        <FaTimes size={20} />
                    </button>
                </div>

                {/* Score Board */}
                <div className="flex justify-center gap-8 mb-6 text-sm font-bold text-gray-300">
                    <div className="flex flex-col items-center">
                        <span>You</span>
                        <span className="text-2xl text-white">{score.user}</span>
                    </div>
                    <div className="flex flex-col items-center">
                        <span>Ujjwal</span>
                        <span className="text-2xl text-white">{score.bot}</span>
                    </div>
                </div>

                {/* Game Area */}
                <div className="flex justify-between items-center mb-10 px-4">
                    {/* User Side */}
                    <div className="text-center">
                        <div className={`w-20 h-20 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-3xl transition-all ${userMove ? 'scale-110 shadow-[0_0_20px_rgba(255,255,255,0.1)]' : ''}`}>
                            {userMove ? (
                                moves.find(m => m.name === userMove).icon({ className: moves.find(m => m.name === userMove).color })
                            ) : (
                                <span className="text-gray-600 text-4xl">?</span>
                            )}
                        </div>
                    </div>

                    <div className="text-2xl font-bold text-gray-500">VS</div>

                    {/* Bot Side */}
                    <div className="text-center">
                        <div className={`w-20 h-20 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-3xl transition-all ${botMove ? 'scale-110 shadow-[0_0_20px_rgba(255,255,255,0.1)]' : ''}`}>
                            {botMove ? (
                                moves.find(m => m.name === botMove).icon({ className: moves.find(m => m.name === botMove).color })
                            ) : (
                                <span className="text-gray-600 text-4xl">{isPlaying ? '...' : '?'}</span>
                            )}
                        </div>
                    </div>
                </div>

                {/* Controls / Result */}
                {!result ? (
                    <div className="grid grid-cols-3 gap-3">
                        {moves.map((move) => (
                            <button
                                key={move.name}
                                onClick={() => handleMove(move.name)}
                                disabled={!!userMove}
                                className="flex flex-col items-center justify-center gap-2 p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <move.icon className={`text-2xl ${move.color}`} />
                                <span className="text-xs text-gray-300 capitalize">{move.name}</span>
                            </button>
                        ))}
                    </div>
                ) : (
                    <div className="text-center animate-in zoom-in duration-200">
                        <div className={`text-2xl font-bold mb-6 ${result === 'Win' ? 'text-green-400' :
                            result === 'Lose' ? 'text-red-400' : 'text-yellow-400'
                            }`}>
                            {result === 'Win' ? 'You Won!' :
                                result === 'Lose' ? 'Ujjwal Won!' : 'It\'s a Draw!'}
                        </div>
                        <button
                            onClick={resetGame}
                            className="px-6 py-2 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors flex items-center gap-2 mx-auto cursor-pointer"
                        >
                            <FaUndo /> Play Again
                        </button>
                    </div>
                )}

            </div>
        </div>
    );
}
