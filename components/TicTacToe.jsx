'use client';
import { useState, useEffect } from 'react';
import { FaTimes, FaUndo } from 'react-icons/fa';

export default function TicTacToe({ onClose }) {
    const [board, setBoard] = useState(Array(9).fill(null));
    const [isXNext, setIsXNext] = useState(true);
    const [winner, setWinner] = useState(null);

    useEffect(() => {
        if (!isXNext && !winner) {
            const timer = setTimeout(() => {
                makeBotMove();
            }, 500);
            return () => clearTimeout(timer);
        }
    }, [isXNext, winner, board]);

    const checkWinner = (squares) => {
        const lines = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6],
        ];
        for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i];
            if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
                return squares[a];
            }
        }
        return null;
    };

    const checkWinnerVal = (squares) => {
        const lines = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6],
        ];
        for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i];
            if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
                return squares[a];
            }
        }
        return null;
    };

    const minimax = (tempBoard, depth, isMaximizing) => {
        const winnerVal = checkWinnerVal(tempBoard);
        if (winnerVal === 'O') return 10 - depth;
        if (winnerVal === 'X') return depth - 10;
        if (!tempBoard.includes(null)) return 0;

        if (isMaximizing) {
            let bestScore = -Infinity;
            for (let i = 0; i < 9; i++) {
                if (tempBoard[i] === null) {
                    tempBoard[i] = 'O';
                    const score = minimax(tempBoard, depth + 1, false);
                    tempBoard[i] = null;
                    bestScore = Math.max(score, bestScore);
                }
            }
            return bestScore;
        } else {
            let bestScore = Infinity;
            for (let i = 0; i < 9; i++) {
                if (tempBoard[i] === null) {
                    tempBoard[i] = 'X';
                    const score = minimax(tempBoard, depth + 1, true);
                    tempBoard[i] = null;
                    bestScore = Math.min(score, bestScore);
                }
            }
            return bestScore;
        }
    };

    const makeBotMove = () => {
        let bestScore = -Infinity;
        let move = -1;

        // First move optimization: Take center if available, else corners
        const availableMoves = board.filter(s => s === null).length;
        if (availableMoves === 9 || availableMoves === 8) {
            // If it's the very first moves, standard openings save computation and are optimal
            if (board[4] === null) move = 4;
            else move = 0;
        } else {
            for (let i = 0; i < 9; i++) {
                if (board[i] === null) {
                    const tempBoard = [...board]; // Create a temporary board for minimax
                    tempBoard[i] = 'O';
                    const score = minimax(tempBoard, 0, false);
                    if (score > bestScore) {
                        bestScore = score;
                        move = i;
                    }
                }
            }
        }

        if (move !== -1) {
            const newBoard = [...board];
            newBoard[move] = 'O';
            setBoard(newBoard);

            const win = checkWinner(newBoard);
            if (win) {
                setWinner(win === 'O' ? 'Ujjwal' : 'User');
            } else if (!newBoard.includes(null)) {
                setWinner('Draw');
            } else {
                setIsXNext(true);
            }
        }
    };

    const handleClick = (i) => {
        if (winner || board[i] || !isXNext) return; // Prevent clicking during bot turn
        const newBoard = [...board];
        newBoard[i] = 'X';
        setBoard(newBoard);

        const win = checkWinner(newBoard);
        if (win) {
            setWinner(win === 'X' ? 'User' : 'Ujjwal');
        } else if (!newBoard.includes(null)) {
            setWinner('Draw');
        } else {
            setIsXNext(false);
        }
    };

    const resetGame = () => {
        setBoard(Array(9).fill(null));
        setIsXNext(true);
        setWinner(null);
    };

    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-sm">
            <div className="w-[320px] bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 shadow-2xl animate-in fade-in zoom-in duration-300">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-bold text-white">Tic Tac Toe</h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
                        <FaTimes size={20} />
                    </button>
                </div>

                <div className="grid grid-cols-3 gap-3 mb-6">
                    {board.map((cell, i) => (
                        <button
                            key={i}
                            onClick={() => handleClick(i)}
                            className={`h-20 rounded-lg text-4xl font-bold flex items-center justify-center transition-all duration-200 
                ${cell ? 'bg-white/20' : 'bg-white/5 hover:bg-white/10'}
                ${cell === 'X' ? 'text-blue-400' : 'text-purple-400'}
              `}
                            disabled={!!cell || !!winner}
                        >
                            {cell}
                        </button>
                    ))}
                </div>

                <div className="flex justify-between items-center">
                    <div className="text-sm font-medium text-gray-300">
                        {winner ? (
                            winner === 'Draw' ? "It's a Draw!" : `Winner: ${winner}`
                        ) : (
                            `Next Player: ${isXNext ? 'X' : 'O'}`
                        )}
                    </div>
                    <button
                        onClick={resetGame}
                        className="p-2 bg-white/10 rounded-full hover:bg-white/20 text-white transition-all"
                        title="Restart Game"
                    >
                        <FaUndo size={16} />
                    </button>
                </div>
            </div>
        </div>
    );
}
