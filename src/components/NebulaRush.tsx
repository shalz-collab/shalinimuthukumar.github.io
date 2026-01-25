import { useCallback, useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Rocket, Star, Zap, Trophy } from "lucide-react";

interface Obstacle {
  id: number;
  x: number;
  y: number;
  type: "asteroid" | "star" | "powerup";
}

interface LeaderboardEntry {
  score: number;
  date: string;
}

const GAME_WIDTH = 100;
const GAME_HEIGHT = 100;
const PLAYER_SIZE = 8;
const OBSTACLE_SIZE = 6;
const LEADERBOARD_KEY = "nebula-rush-leaderboard";

const getLeaderboard = (): LeaderboardEntry[] => {
  try {
    const data = localStorage.getItem(LEADERBOARD_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};

const saveToLeaderboard = (score: number) => {
  const leaderboard = getLeaderboard();
  const newEntry: LeaderboardEntry = {
    score,
    date: new Date().toLocaleDateString(),
  };
  leaderboard.push(newEntry);
  leaderboard.sort((a, b) => b.score - a.score);
  const top5 = leaderboard.slice(0, 5);
  localStorage.setItem(LEADERBOARD_KEY, JSON.stringify(top5));
  return top5;
};

export default function NebulaRush() {
  const [playerX, setPlayerX] = useState(50);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [running, setRunning] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [obstacles, setObstacles] = useState<Obstacle[]>([]);
  const [powerMode, setPowerMode] = useState(false);
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const gameRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<number>(0);
  const obstacleIdRef = useRef(0);

  // Load leaderboard on mount
  useEffect(() => {
    const lb = getLeaderboard();
    setLeaderboard(lb);
    if (lb.length > 0) {
      setHighScore(lb[0].score);
    }
  }, []);

  const resetGame = useCallback(() => {
    setPlayerX(50);
    setScore(0);
    setObstacles([]);
    setGameOver(false);
    setPowerMode(false);
    obstacleIdRef.current = 0;
  }, []);

  const startGame = useCallback(() => {
    resetGame();
    setRunning(true);
    setShowLeaderboard(false);
  }, [resetGame]);

  const endGame = useCallback(() => {
    setRunning(false);
    setGameOver(true);
    const updatedLeaderboard = saveToLeaderboard(score);
    setLeaderboard(updatedLeaderboard);
    if (score > highScore) {
      setHighScore(score);
    }
  }, [score, highScore]);

  // Handle keyboard/touch input
  useEffect(() => {
    if (!running) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft" || e.key === "a") {
        setPlayerX((x) => Math.max(PLAYER_SIZE / 2, x - 8));
      } else if (e.key === "ArrowRight" || e.key === "d") {
        setPlayerX((x) => Math.min(GAME_WIDTH - PLAYER_SIZE / 2, x + 8));
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [running]);

  // Touch controls
  const handleTouch = useCallback(
    (e: React.TouchEvent | React.MouseEvent) => {
      if (!running || !gameRef.current) return;
      const rect = gameRef.current.getBoundingClientRect();
      const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
      const x = ((clientX - rect.left) / rect.width) * 100;
      setPlayerX(
        Math.max(PLAYER_SIZE / 2, Math.min(GAME_WIDTH - PLAYER_SIZE / 2, x))
      );
    },
    [running]
  );

  // Game loop
  useEffect(() => {
    if (!running) return;
    let lastSpawn = 0;
    const spawnInterval = 800;
    const gameLoop = (timestamp: number) => {
      // Spawn obstacles
      if (timestamp - lastSpawn > spawnInterval) {
        const type =
          Math.random() > 0.85
            ? "powerup"
            : Math.random() > 0.3
            ? "asteroid"
            : "star";
        setObstacles((prev) => [
          ...prev,
          {
            id: obstacleIdRef.current++,
            x: Math.random() * (GAME_WIDTH - OBSTACLE_SIZE * 2) + OBSTACLE_SIZE,
            y: -OBSTACLE_SIZE,
            type,
          },
        ]);
        lastSpawn = timestamp;
      }

      // Move obstacles & check collisions
      setObstacles((prev) => {
        const updated: Obstacle[] = [];
        for (const obs of prev) {
          const newY = obs.y + 2.5;

          // Check collision with player
          const playerY = GAME_HEIGHT - 12;
          const dx = Math.abs(obs.x - playerX);
          const dy = Math.abs(newY - playerY);
          const collides =
            dx < (PLAYER_SIZE + OBSTACLE_SIZE) / 2 &&
            dy < (PLAYER_SIZE + OBSTACLE_SIZE) / 2;
          if (collides) {
            if (obs.type === "asteroid" && !powerMode) {
              endGame();
              return prev;
            } else if (obs.type === "star") {
              setScore((s) => s + 10);
            } else if (obs.type === "powerup") {
              setPowerMode(true);
              setScore((s) => s + 25);
              setTimeout(() => setPowerMode(false), 3000);
            }
            continue; // Remove collected item
          }
          if (newY < GAME_HEIGHT + OBSTACLE_SIZE) {
            updated.push({
              ...obs,
              y: newY,
            });
          }
        }
        return updated;
      });
      setScore((s) => s + 1);
      frameRef.current = requestAnimationFrame(gameLoop);
    };
    frameRef.current = requestAnimationFrame(gameLoop);
    return () => cancelAnimationFrame(frameRef.current);
  }, [running, playerX, powerMode, endGame]);

  return (
    <section id="nebula-rush" className="mt-12">
      <div className="bg-card/70 backdrop-blur-sm border border-border rounded-2xl p-6">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <h2 className="text-xl font-semibold text-foreground flex items-center gap-2 font-mono">
              <Rocket className="text-primary" size={20} />
              Nebula Rush
            </h2>
            <p className="text-sm text-muted-foreground mt-1 font-mono">
              Dodge asteroids, collect stars. Use arrow keys or tap to move.
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-sm text-muted-foreground">
              Score: <span className="text-foreground font-medium">{score}</span>
            </div>
            <div className="text-sm text-muted-foreground">
              Best: <span className="text-primary font-medium">{highScore}</span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowLeaderboard(!showLeaderboard)}
              className="text-primary"
            >
              <Trophy size={16} />
            </Button>
            <Button
              variant={running ? "secondary" : "default"}
              size="sm"
              onClick={running ? endGame : startGame}
            >
              {running ? "Stop" : gameOver ? "Retry" : "Play"}
            </Button>
          </div>
        </div>

        {/* Leaderboard */}
        {showLeaderboard && (
          <div className="mt-4 p-4 bg-background/50 rounded-lg border border-border">
            <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
              <Trophy size={16} className="text-yellow-500" />
              Top 5 Scores
            </h3>
            {leaderboard.length === 0 ? (
              <p className="text-xs text-muted-foreground">No scores yet. Play to set a record!</p>
            ) : (
              <div className="space-y-2">
                {leaderboard.map((entry, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between text-sm"
                  >
                    <span className="text-muted-foreground">
                      #{index + 1}{" "}
                      <span
                        className={
                          index === 0
                            ? "text-yellow-500"
                            : index === 1
                            ? "text-gray-400"
                            : index === 2
                            ? "text-orange-500"
                            : "text-foreground"
                        }
                      >
                        {entry.score} pts
                      </span>
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {entry.date}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        <div
          ref={gameRef}
          className="relative mt-5 h-64 rounded-xl border border-border bg-gradient-to-b from-background/40 to-background/80 overflow-hidden cursor-pointer select-none"
          onMouseMove={handleTouch}
          onTouchMove={handleTouch}
        >
          {/* Stars background */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-white/30 rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animation: `pulse-glow ${2 + Math.random() * 2}s infinite`,
                }}
              />
            ))}
          </div>

          {/* Obstacles */}
          {obstacles.map((obs) => (
            <div
              key={obs.id}
              className={`absolute -translate-x-1/2 -translate-y-1/2 transition-none ${
                obs.type === "asteroid"
                  ? "text-red-400"
                  : obs.type === "star"
                  ? "text-yellow-400"
                  : "text-cyan-400"
              }`}
              style={{
                left: `${obs.x}%`,
                top: `${obs.y}%`,
              }}
            >
              {obs.type === "asteroid" ? (
                <div className="w-5 h-5 bg-gradient-to-br from-gray-500 to-gray-700 rounded-full shadow-lg" />
              ) : obs.type === "star" ? (
                <Star size={18} fill="currentColor" />
              ) : (
                <Zap size={18} fill="currentColor" />
              )}
            </div>
          ))}

          {/* Player */}
          <div
            className={`absolute -translate-x-1/2 transition-all duration-75 ${
              powerMode ? "drop-shadow-[0_0_10px_cyan]" : ""
            }`}
            style={{
              left: `${playerX}%`,
              bottom: "8%",
            }}
          >
            <Rocket
              size={28}
              className={`${powerMode ? "text-cyan-400" : "text-primary"} rotate-0`}
              fill="currentColor"
            />
          </div>

          {/* Game Over / Start overlay */}
          {!running && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/60 backdrop-blur-sm">
              {gameOver ? (
                <>
                  <p className="text-lg font-semibold text-foreground mb-1">
                    Game Over!
                  </p>
                  <p className="text-sm text-muted-foreground">Score: {score}</p>
                </>
              ) : (
                <p className="text-sm text-muted-foreground">
                  Press Play to start
                </p>
              )}
            </div>
          )}

          {powerMode && (
            <div className="absolute top-2 left-2 px-2 py-1 bg-cyan-500/20 border border-cyan-500/40 rounded text-xs text-cyan-400">
              ⚡ Shield Active
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
