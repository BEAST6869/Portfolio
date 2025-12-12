'use client';
import { useState, useEffect } from 'react';
import { FaTimes, FaUndo } from 'react-icons/fa';

export default function ConnectFour({ onClose }) {
    const ROWS = 6;
    const COLS = 7;
    const [board, setBoard] = useState(Array(ROWS).fill(null).map(() => Array(COLS).fill(null)));
    const [isPlayerTurn, setIsPlayerTurn] = useState(true); // Player = Red (X), Bot = Yellow (O)
    const [winner, setWinner] = useState(null); // 'Player', 'Ujjwal', 'Draw'
    const [winningCells, setWinningCells] = useState([]);

    useEffect(() => {
        if (!isPlayerTurn && !winner) {
            const timer = setTimeout(() => {
                makeBotMove();
            }, 600);
            return () => clearTimeout(timer);
        }
    }, [isPlayerTurn, winner]);

    const checkWin = (b, r, c, player) => {
        const directions = [
            [[0, 1], [0, 2], [0, 3]],
            [[1, 0], [2, 0], [3, 0]],
            [[1, 1], [2, 2], [3, 3]],
            [[1, -1], [2, -2], [3, -3]]
        ];

        for (let d of directions) {
            for (let delta of d) {
            }
        }
        for (let i = 0; i < ROWS; i++) {
            for (let j = 0; j <= COLS - 4; j++) {
                if (b[i][j] === player && b[i][j + 1] === player && b[i][j + 2] === player && b[i][j + 3] === player)
                    return [[i, j], [i, j + 1], [i, j + 2], [i, j + 3]];
            }
        }
        for (let i = 0; i <= ROWS - 4; i++) {
            for (let j = 0; j < COLS; j++) {
                if (b[i][j] === player && b[i + 1][j] === player && b[i + 2][j] === player && b[i + 3][j] === player)
                    return [[i, j], [i + 1, j], [i + 2, j], [i + 3, j]];
            }
        }
        // Diag \
        for (let i = 0; i <= ROWS - 4; i++) {
            for (let j = 0; j <= COLS - 4; j++) {
                if (b[i][j] === player && b[i + 1][j + 1] === player && b[i + 2][j + 2] === player && b[i + 3][j + 3] === player)
                    return [[i, j], [i + 1, j + 1], [i + 2, j + 2], [i + 3, j + 3]];
            }
        }
        for (let i = 0; i <= ROWS - 4; i++) {
            for (let j = 3; j < COLS; j++) {
                if (b[i][j] === player && b[i + 1][j - 1] === player && b[i + 2][j - 2] === player && b[i + 3][j - 3] === player)
                    return [[i, j], [i + 1, j - 1], [i + 2, j - 2], [i + 3, j - 3]];
            }
        }
        return null;
    };

    const getLowestEmptyRow = (b, col) => {
        for (let r = ROWS - 1; r >= 0; r--) {
            if (b[r][col] === null) return r;
        }
        return -1;
    };

    const dropPiece = (col) => {
        if (winner || !isPlayerTurn) return;

        const row = getLowestEmptyRow(board, col);
        if (row === -1) return;

        const newBoard = board.map(arr => [...arr]);
        newBoard[row][col] = 'Player';
        setBoard(newBoard);

        const winData = checkWin(newBoard, row, col, 'Player');
        if (winData) {
            setWinner('Player');
            setWinningCells(winData);
        } else if (newBoard.every(row => row.every(cell => cell !== null))) {
            setWinner('Draw');
        } else {
            setIsPlayerTurn(false);
        }
    };

    const makeBotMove = () => {
        const simulateMove = (simBoard, col, player) => {
            const row = getLowestEmptyRow(simBoard, col);
            if (row === -1) return null;
            const newSimBoard = simBoard.map(arr => [...arr]);
            newSimBoard[row][col] = player;
            return { board: newSimBoard, row };
        };

        for (let c = 0; c < COLS; c++) {
            const sim = simulateMove(board, c, 'Ujjwal');
            if (sim) {
                if (checkWin(sim.board, sim.row, c, 'Ujjwal')) {
                    dropPieceBot(c);
                    return;
                }
            }
        }

        for (let c = 0; c < COLS; c++) {
            const sim = simulateMove(board, c, 'Player');
            if (sim) {
                if (checkWin(sim.board, sim.row, c, 'Player')) {
                    dropPieceBot(c);
                    return;
                }
            }
        }

        const centerOrder = [3, 2, 4, 1, 5, 0, 6];
        const validCols = centerOrder.filter(c => getLowestEmptyRow(board, c) !== -1);

        if (validCols.length > 0) {
            const randomCol = validCols[Math.floor(Math.random() * Math.min(3, validCols.length))];
            dropPieceBot(randomCol);
        }
    };

    const dropPieceBot = (col) => {
        const row = getLowestEmptyRow(board, col);
        const newBoard = board.map(arr => [...arr]);
        newBoard[row][col] = 'Ujjwal';
        setBoard(newBoard);

        const winData = checkWin(newBoard, row, col, 'Ujjwal');
        if (winData) {
            setWinner('Ujjwal');
            setWinningCells(winData);
        } else if (newBoard.every(r => r.every(cell => cell !== null))) {
            setWinner('Draw');
        } else {
            setIsPlayerTurn(true);
        }
    };

    const resetGame = () => {
        setBoard(Array(ROWS).fill(null).map(() => Array(COLS).fill(null)));
        setIsPlayerTurn(true);
        setWinner(null);
        setWinningCells([]);
    };

    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-sm">
            <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 shadow-2xl animate-in fade-in zoom-in duration-300">

                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-bold text-white">Connect Four</h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors cursor-pointer">
                        <FaTimes size={20} />
                    </button>
                </div>

                <div className="bg-blue-600/30 p-4 rounded-xl border border-blue-500/30 mb-6">
                    <div className="grid grid-cols-7 gap-2 sm:gap-3">
                        {Array.from({ length: COLS }).map((_, colIndex) => (
                            <div key={colIndex} className="flex flex-col gap-2 sm:gap-3 cursor-pointer hover:bg-white/5 rounded-full p-1"
                                onClick={() => dropPiece(colIndex)}>
                                {Array.from({ length: ROWS }).map((_, rowIndex) => {
                                    const cell = board[rowIndex][colIndex];
                                    const isWinning = winningCells.some(([r, c]) => r === rowIndex && c === colIndex);
                                    return (
                                        <div key={rowIndex} className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full transition-all duration-300 shadow-inner
                                    ${cell === 'Player' ? 'bg-red-500 shadow-red-900' :
                                                cell === 'Ujjwal' ? 'bg-yellow-400 shadow-yellow-700' : 'bg-[#1a1a1a]/50'}
                                    ${isWinning ? 'ring-4 ring-white animate-pulse' : ''}
                                `}></div>
                                    )
                                })}
                            </div>
                        ))}
                    </div>
                </div>

                <div className="flex justify-between items-center">
                    <div className="font-medium text-white">
                        {winner ? (
                            winner === 'Draw' ? "It's a Draw!" :
                                winner === 'Player' ? "You Won!" : "Ujjwal Won!"
                        ) : (
                            <div className="flex items-center gap-2">
                                <span>Turn:</span>
                                <span className={`px-2 py-1 rounded text-xs font-bold ${isPlayerTurn ? 'bg-red-500 text-white' : 'bg-yellow-400 text-black'}`}>
                                    {isPlayerTurn ? 'You' : 'Ujjwal'}
                                </span>
                            </div>
                        )}
                    </div>
                    <button
                        onClick={resetGame}
                        className="p-2 bg-white/10 rounded-full hover:bg-white/20 text-white transition-all cursor-pointer"
                    >
                        <FaUndo size={16} />
                    </button>
                </div>

            </div>
        </div>
    );
}
