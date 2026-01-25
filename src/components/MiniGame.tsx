import { useEffect, useMemo, useState } from "react";
import catSprite from "@/assets/pixel-cat.png";
import { Button } from "@/components/ui/button";

type CatPos = { x: number; y: number };

const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v));

export default function MiniGame() {
  const [score, setScore] = useState(0);
  const [running, setRunning] = useState(false);
  const [pos, setPos] = useState<CatPos>({ x: 50, y: 50 });

  const bounds = useMemo(() => ({ min: 8, max: 92 }), []);

  useEffect(() => {
    if (!running) return;

    const id = window.setInterval(() => {
      setPos((p) => {
        const dx = (Math.random() * 24 - 12);
        const dy = (Math.random() * 24 - 12);
        return {
          x: clamp(p.x + dx, bounds.min, bounds.max),
          y: clamp(p.y + dy, bounds.min, bounds.max),
        };
      });
    }, 650);

    return () => window.clearInterval(id);
  }, [running, bounds.max, bounds.min]);

  return (
    <section className="mt-12">
      <div className="bg-card/70 backdrop-blur-sm border border-border rounded-2xl p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold text-foreground">Mini Game</h2>
            <p className="text-sm text-muted-foreground mt-1">
              Tap the floating cat to score points.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-sm text-muted-foreground">
              Score: <span className="text-foreground font-medium">{score}</span>
            </div>
            <Button
              variant={running ? "secondary" : "default"}
              size="sm"
              onClick={() => {
                setRunning((r) => !r);
                setScore(0);
              }}
            >
              {running ? "Stop" : "Start"}
            </Button>
          </div>
        </div>

        <div className="relative mt-5 h-56 rounded-xl border border-border bg-background/20 overflow-hidden">
          <button
            type="button"
            aria-label="Catch the cat"
            disabled={!running}
            onClick={() => {
              if (!running) return;
              setScore((s) => s + 1);
              setPos({ x: 8 + Math.random() * 84, y: 8 + Math.random() * 84 });
            }}
            className="absolute -translate-x-1/2 -translate-y-1/2 transition-transform duration-150 hover:scale-110 disabled:opacity-60 disabled:cursor-not-allowed"
            style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
          >
            <img
              src={catSprite}
              alt="Pixel cat"
              className="w-10 h-10 select-none"
              draggable={false}
              loading="lazy"
            />
          </button>

          {!running && (
            <div className="absolute inset-0 flex items-center justify-center text-sm text-muted-foreground">
              Press Start to play
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
