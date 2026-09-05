"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowUp, Gamepad2, RotateCcw } from "lucide-react";

type Game = "home" | "snake" | "tic-tac-toe";
type Direction = "up" | "down" | "left" | "right";
type Cell = { x: number; y: number };
const BOARD_SIZE = 16;
const INITIAL_SNAKE: Cell[] = [{ x: 8, y: 8 }, { x: 7, y: 8 }, { x: 6, y: 8 }];
const MOVES: Record<Direction, Cell> = { up: { x: 0, y: -1 }, down: { x: 0, y: 1 }, left: { x: -1, y: 0 }, right: { x: 1, y: 0 } };
const OPPOSITE: Record<Direction, Direction> = { up: "down", down: "up", left: "right", right: "left" };

function randomFood(snake: Cell[]) {
  const open = Array.from({ length: BOARD_SIZE * BOARD_SIZE }, (_, index) => ({ x: index % BOARD_SIZE, y: Math.floor(index / BOARD_SIZE) })).filter((cell) => !snake.some((part) => part.x === cell.x && part.y === cell.y));
  return open[Math.floor(Math.random() * open.length)] ?? { x: 0, y: 0 };
}

function SnakeGame({ onBack }: { onBack: () => void }) {
  const [snake, setSnake] = useState<Cell[]>(INITIAL_SNAKE);
  const [food, setFood] = useState<Cell>({ x: 11, y: 8 });
  const [status, setStatus] = useState<"ready" | "playing" | "paused" | "over">("ready");
  const directionRef = useRef<Direction>("right");
  const queuedDirectionsRef = useRef<Direction[]>([]);
  const score = snake.length - INITIAL_SNAKE.length;
  const changeDirection = useCallback((next: Direction) => {
    const queue = queuedDirectionsRef.current;
    const plannedDirection = queue.at(-1) ?? directionRef.current;
    if (next === plannedDirection || OPPOSITE[plannedDirection] === next || queue.length >= 2) return;
    queue.push(next);
  }, []);
  const restart = () => { setSnake(INITIAL_SNAKE); setFood({ x: 11, y: 8 }); directionRef.current = "right"; queuedDirectionsRef.current = []; setStatus("playing"); };

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const key = event.key.toLowerCase();
      const next = key === "arrowup" || key === "w" ? "up" : key === "arrowdown" || key === "s" ? "down" : key === "arrowleft" || key === "a" ? "left" : key === "arrowright" || key === "d" ? "right" : null;
      if (!next) return;
      event.preventDefault();
      if (status === "ready" || status === "paused") setStatus("playing");
      changeDirection(next);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [changeDirection, status]);

  useEffect(() => {
    if (status !== "playing") return;
    const timer = window.setInterval(() => setSnake((current) => {
      const nextDirection = queuedDirectionsRef.current.shift() ?? directionRef.current;
      directionRef.current = nextDirection;
      const move = MOVES[nextDirection];
      const head = { x: current[0].x + move.x, y: current[0].y + move.y };
      const ate = head.x === food.x && head.y === food.y;
      const body = ate ? current : current.slice(0, -1);
      if (head.x < 0 || head.x >= BOARD_SIZE || head.y < 0 || head.y >= BOARD_SIZE || body.some((part) => part.x === head.x && part.y === head.y)) { setStatus("over"); return current; }
      const next = [head, ...body];
      if (ate) setFood(randomFood(next));
      return next;
    }), 135);
    return () => window.clearInterval(timer);
  }, [food, status]);

  useEffect(() => {
    const pause = () => { if (document.hidden) setStatus((current) => current === "playing" ? "paused" : current); };
    document.addEventListener("visibilitychange", pause);
    return () => document.removeEventListener("visibilitychange", pause);
  }, []);

  return <section className="os-game" aria-labelledby="snake-title"><button className="os-game-back" type="button" onClick={onBack}><ArrowLeft size={16} /> Playground</button><header><div><p className="os-eyebrow">Games / Arcade</p><h1 id="snake-title">Snake</h1></div><p className="os-game-score">Score <strong>{score}</strong></p></header><div className="os-snake-layout"><div className="os-snake-board" role="img" aria-label={`Snake board. Score ${score}. ${status === "over" ? "Game over." : status}.`}>{Array.from({ length: BOARD_SIZE * BOARD_SIZE }, (_, index) => { const cell = { x: index % BOARD_SIZE, y: Math.floor(index / BOARD_SIZE) }; const type = cell.x === food.x && cell.y === food.y ? "food" : snake.some((part) => part.x === cell.x && part.y === cell.y) ? "snake" : ""; return <span key={index} className={type} />; })}</div><aside><p>{status === "ready" ? "Use arrow keys or WASD to move." : status === "paused" ? "Game paused." : status === "over" ? `Game over. Final score: ${score}.` : "Keep moving — do not hit a wall or yourself."}</p><button className="os-button os-button-primary" type="button" onClick={() => status === "over" ? restart() : setStatus((current) => current === "playing" ? "paused" : "playing")}>{status === "ready" ? "Start" : status === "paused" ? "Resume" : status === "over" ? "Play again" : "Pause"}</button><div className="os-snake-pad" aria-label="Snake touch controls"><button type="button" onClick={() => changeDirection("up")} aria-label="Move up"><ArrowUp size={18} /></button><span /><button type="button" onClick={() => changeDirection("left")} aria-label="Move left">←</button><button type="button" onClick={() => changeDirection("down")} aria-label="Move down">↓</button><button type="button" onClick={() => changeDirection("right")} aria-label="Move right">→</button></div></aside></div></section>;
}

const wins = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];
function winner(board: Array<"X" | "O" | null>) { return wins.find(([a, b, c]) => board[a] && board[a] === board[b] && board[a] === board[c])?.map((index) => index) ?? null; }
function computerMove(board: Array<"X" | "O" | null>) {
  const available = board.map((value, index) => value ? -1 : index).filter((index) => index >= 0);
  for (const token of ["O", "X"] as const) for (const index of available) { const next = [...board]; next[index] = token; if (winner(next)) return index; }
  return available.includes(4) ? 4 : available.find((index) => [0, 2, 6, 8].includes(index)) ?? available[0];
}

function TicTacToeGame({ onBack }: { onBack: () => void }) {
  const [board, setBoard] = useState<Array<"X" | "O" | null>>(Array(9).fill(null));
  const [turn, setTurn] = useState<"player" | "computer">("player");
  const winningCells = winner(board);
  const draw = !winningCells && board.every(Boolean);
  const reset = () => { setBoard(Array(9).fill(null)); setTurn("player"); };
  useEffect(() => { if (turn !== "computer" || winningCells || draw) return; const timer = window.setTimeout(() => { setBoard((current) => { const next = [...current]; next[computerMove(current)] = "O"; return next; }); setTurn("player"); }, 380); return () => window.clearTimeout(timer); }, [draw, turn, winningCells]);
  const status = winningCells ? board[winningCells[0]] === "X" ? "You win" : "Computer wins" : draw ? "Draw" : turn === "player" ? "Your turn" : "Computer’s turn";
  return <section className="os-game" aria-labelledby="ttt-title"><button className="os-game-back" type="button" onClick={onBack}><ArrowLeft size={16} /> Playground</button><header><div><p className="os-eyebrow">Games / Strategy</p><h1 id="ttt-title">Tic-Tac-Toe</h1></div><p className="os-game-status" role="status">{status}</p></header><div className="os-tic-layout"><div className="os-tic-board" role="group" aria-label="Tic-Tac-Toe board">{board.map((value, index) => <button key={index} type="button" disabled={Boolean(value) || turn === "computer" || Boolean(winningCells) || draw} aria-label={`Cell ${index + 1}${value ? `, ${value}` : ", empty"}`} className={winningCells?.includes(index) ? "is-winning" : ""} onClick={() => { setBoard((current) => { const next = [...current]; next[index] = "X"; return next; }); setTurn("computer"); }}>{value}</button>)}</div><aside><p>Play as X. The computer takes winning moves, blocks yours, then prefers the center and corners.</p><button className="os-button os-button-primary" type="button" onClick={reset}><RotateCcw size={16} /> Play again</button></aside></div></section>;
}

export default function PlaygroundApp() {
  const [game, setGame] = useState<Game>("home");
  if (game === "snake") return <SnakeGame onBack={() => setGame("home")} />;
  if (game === "tic-tac-toe") return <TicTacToeGame onBack={() => setGame("home")} />;
  return <section className="os-playground-app" aria-labelledby="playground-title"><header className="os-app-header"><div><p className="os-eyebrow">Smaller interactive work</p><h1 id="playground-title">Playground</h1><p className="os-app-intro">Experiments, tiny tools, and things built outside the main project work.</p></div></header><div className="os-playground-games"><article><Gamepad2 size={22} /><p className="os-eyebrow">Arcade</p><h2>Snake</h2><p>Guide the signal, collect food, and keep clear of the walls.</p><button className="os-button os-button-primary" type="button" onClick={() => setGame("snake")}>Play Snake</button></article><article><span className="os-game-mark" aria-hidden="true">XO</span><p className="os-eyebrow">Strategy</p><h2>Tic-Tac-Toe</h2><p>Take on a compact computer opponent inside PortfolioOS.</p><button className="os-button os-button-primary" type="button" onClick={() => setGame("tic-tac-toe")}>Play Tic-Tac-Toe</button></article></div><div className="os-playground-directories"><span>Games/ <strong>2 items</strong></span><span>Experiments/ <small>Coming later</small></span><span>Developer Tools/ <small>Coming later</small></span></div></section>;
}
