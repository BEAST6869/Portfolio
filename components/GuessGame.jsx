'use client';
import { useState, useEffect, useRef } from 'react';
import { FaTimes, FaUndo, FaCheck } from 'react-icons/fa';

export default function GuessGame({ onClose }) {
    const [target, setTarget] = useState(0);
    const [guess, setGuess] = useState('');
    const [history, setHistory] = useState([]); // Array of { value: number, feedback: string }
    const [gameOver, setGameOver] = useState(false);
    const [gameWon, setGameWon] = useState(false);
    const inputRef = useRef(null);

    useEffect(() => {
        startNewGame();
        // Auto focus input
        setTimeout(() => inputRef.current?.focus(), 100);
    }, []);

    const startNewGame = () => {
        setTarget(Math.floor(Math.random() * 100) + 1);
        setHistory([]);
        setGuess('');
        setGameOver(false);
        setGameWon(false);
        setTimeout(() => inputRef.current?.focus(), 100);
    };

    const handleGuess = (e) => {
        e.preventDefault();
        if (gameOver || !guess) return;

        const num = parseInt(guess);
        if (isNaN(num)) return;

        let feedback = '';
        let won = false;

        if (num === target) {
            feedback = 'Correct!';
            won = true;
            setGameWon(true);
            setGameOver(true);
        } else if (num < target) {
            feedback = 'Too Low';
        } else {
            feedback = 'Too High';
        }

        setHistory([{ value: num, feedback }, ...history]);
        setGuess('');
    };

    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-sm">
            <div className="w-[360px] bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 shadow-2xl animate-in fade-in zoom-in duration-300">


                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-bold text-white flex items-center gap-2">
                        Guess the Number
                    </h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors cursor-pointer">
                        <FaTimes size={18} />
                    </button>
                </div>

                <div className="space-y-6">

                    <div className="text-center text-gray-300 text-sm">
                        I'm thinking of a number between <span className="text-white font-bold">1</span> and <span className="text-white font-bold">100</span>.
                    </div>

                    <form onSubmit={handleGuess} className="flex gap-2">
                        <input
                            ref={inputRef}
                            type="number"
                            value={guess}
                            onChange={(e) => setGuess(e.target.value)}
                            placeholder="Enter number..."
                            disabled={gameOver}
                            className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors"
                        />
                        <button
                            type="submit"
                            disabled={gameOver || !guess}
                            className="px-4 py-2 bg-blue-600 hover:bg-blue-500 disabled:bg-white/5 disabled:text-gray-500 text-white rounded-lg font-medium transition-colors"
                        >
                            Guess
                        </button>
                    </form>

                    {gameOver && (
                        <div className={`p-3 rounded-lg text-center font-bold animate-in zoom-in duration-200 ${gameWon ? 'bg-green-500/20 text-green-400 border border-green-500/30' : 'bg-red-500/20 text-red-400'}`}>
                            {gameWon ? `You got it! The number was ${target}.` : 'Game Over'}
                        </div>
                    )}


                    {history.length > 0 && (
                        <div className="bg-black/20 rounded-xl p-3 max-h-[150px] overflow-y-auto custom-scrollbar">
                            <div className="flex justify-between items-center mb-2 px-1">
                                <span className="text-xs font-semibold text-gray-500 uppercase">Input</span>
                                <span className="text-xs font-semibold text-gray-500 uppercase">Result</span>
                            </div>
                            <div className="space-y-1">
                                {history.map((item, index) => (
                                    <div key={index} className="flex justify-between items-center bg-white/5 px-3 py-2 rounded-lg text-sm">
                                        <span className="font-mono text-white">{item.value}</span>
                                        <span className={`font-medium ${item.feedback === 'Correct!' ? 'text-green-400' :
                                            item.feedback === 'Too Low' ? 'text-yellow-400' : 'text-red-400'
                                            }`}>
                                            {item.feedback}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}


                    {gameOver && (
                        <button
                            onClick={startNewGame}
                            className="w-full py-2 flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors border border-white/5 cursor-pointer"
                        >
                            <FaUndo size={14} /> Play Again
                        </button>
                    )}

                </div>
            </div>
        </div>
    );
}
