"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { LuVolume2, LuVolumeX } from "react-icons/lu";

// A real, playable dino-runner easter egg — canvas-rendered pixel art in
// the same blocky style as PixelCloud/PixelCactus, but with an actual
// running dino, jump/duck physics, scrolling obstacles, and a
// pterodactyl that shows up once you've warmed up. Space/↑ or a tap
// jumps; ↓ (or holding the lower half on mobile) ducks. High score
// persists in localStorage. Every constant below is tunable if you
// want a different feel.

const useIsomorphicLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

// ---------- tunable feel ----------
const WORLD_H = 160;
const GROUND_Y = 136;
const DINO_X = 46;
const GRAVITY = 0.6;
const JUMP_V = -9.2;
const FASTFALL_ACCEL = 0.9;
const START_SPEED = 6;
const MAX_SPEED = 13;
const SPEED_ACCEL = 0.0022;
const SCORE_RATE = 0.05;
const BIRD_UNLOCK_SCORE = 120;
const BIRD_CHANCE = 0.3;

// ---------- sprite geometry (local px, origin = top-left of bounding box) ----------
const DINO_W = 44;
const DINO_H = 48;
const GROUND_TOP_STAND = GROUND_Y - DINO_H;

const DUCK_W = 68;
const DUCK_H = 26;
const GROUND_TOP_DUCK = GROUND_Y - DUCK_H;

const DINO_BODY: number[][] = [
  [28, 0, 16, 16], // head
  [40, 8, 8, 8], // snout
  [20, 12, 12, 8], // neck
  [8, 16, 24, 16], // torso
  [-4, 16, 12, 8], // tail base
  [-12, 20, 10, 4], // tail tip
  [24, 20, 6, 4], // little arm
];
const DINO_EYE: [number, number, number, number] = [36, 4, 4, 4];

const DINO_LEGS_A: number[][] = [
  [26, 32, 8, 16],
  [24, 44, 12, 4],
  [12, 32, 8, 10],
  [10, 38, 12, 4],
];
const DINO_LEGS_B: number[][] = [
  [26, 32, 8, 10],
  [24, 38, 12, 4],
  [12, 32, 8, 16],
  [10, 44, 12, 4],
];
const DINO_LEGS_JUMP: number[][] = [
  [12, 32, 8, 10],
  [10, 38, 12, 4],
  [26, 32, 8, 10],
  [24, 38, 12, 4],
];

const DUCK_BODY: number[][] = [
  [44, 0, 16, 10],
  [8, 6, 40, 12],
  [-8, 8, 16, 8],
];
const DUCK_EYE: [number, number, number, number] = [52, 2, 4, 4];
const DUCK_LEGS_A: number[][] = [
  [34, 18, 8, 8],
  [14, 18, 8, 6],
];
const DUCK_LEGS_B: number[][] = [
  [34, 18, 8, 6],
  [14, 18, 8, 8],
];

type CactusVariant = "small" | "tall" | "cluster";
const CACTUS_VARIANTS: Record<CactusVariant, { rects: number[][]; width: number; height: number }> = {
  small: {
    rects: [
      [6, 0, 8, 32],
      [-2, 10, 8, 4],
      [-2, 0, 4, 10],
    ],
    width: 16,
    height: 32,
  },
  tall: {
    rects: [
      [8, 0, 8, 40],
      [-2, 14, 10, 4],
      [-2, 4, 4, 14],
      [16, 10, 10, 4],
      [22, 0, 4, 14],
    ],
    width: 28,
    height: 40,
  },
  cluster: {
    rects: [
      [0, 6, 6, 26],
      [8, 0, 6, 32],
      [16, 8, 6, 24],
    ],
    width: 22,
    height: 32,
  },
};

const BIRD_W = 40;
const BIRD_H = 26;
const BIRD_LOW_Y = 78;
const BIRD_HIGH_Y = 48;
// A connected zigzag chevron (rather than a body with separate floating
// wing bars) so the two flap frames read as one creature, not three
// disconnected blocks.
const BIRD_UP: number[][] = [
  [16, 6, 8, 4],
  [8, 3, 8, 4],
  [2, 0, 6, 4],
  [24, 3, 8, 4],
  [32, 0, 6, 4],
  [36, 4, 6, 4],
];
const BIRD_DOWN: number[][] = [
  [16, 4, 8, 4],
  [8, 7, 8, 4],
  [2, 10, 6, 4],
  [24, 7, 8, 4],
  [32, 10, 6, 4],
  [36, 2, 6, 4],
];

const GROUND_PATTERN_W = 140;
const GROUND_TUFTS: { x: number; h: number }[] = [
  { x: 10, h: 8 },
  { x: 34, h: 5 },
  { x: 58, h: 10 },
  { x: 78, h: 4 },
  { x: 102, h: 7 },
  { x: 124, h: 5 },
];

const CLOUD_BIG: number[][] = [
  [6, 0, 12, 4],
  [0, 4, 24, 5],
];
const CLOUD_SMALL: number[][] = [
  [4, 0, 8, 3],
  [0, 3, 16, 4],
];
const CLOUD_PATTERN_W = 260;

type Pose = "standA" | "standB" | "jump" | "duckA" | "duckB" | "dead";
type Phase = "idle" | "playing" | "over";
type Obstacle =
  | { type: "cactus"; variant: CactusVariant; x: number; width: number; height: number }
  | { type: "bird"; x: number; width: number; height: number; topY: number };

interface DinoPhysics {
  y: number; // 0 = grounded, negative = airborne
  vy: number;
  onGround: boolean;
}

const HIGH_SCORE_KEY = "dino-game-high-score";
const MUTE_KEY = "dino-game-muted";

function readHighScore(): number {
  try {
    return Number(window.localStorage.getItem(HIGH_SCORE_KEY)) || 0;
  } catch {
    return 0;
  }
}
function writeHighScore(v: number) {
  try {
    window.localStorage.setItem(HIGH_SCORE_KEY, String(v));
  } catch {
    // private browsing etc. — non-critical
  }
}
function readMuted(): boolean {
  try {
    return window.localStorage.getItem(MUTE_KEY) === "1";
  } catch {
    return false;
  }
}
function writeMuted(v: boolean) {
  try {
    window.localStorage.setItem(MUTE_KEY, v ? "1" : "0");
  } catch {
    // ignore
  }
}

function readCssColor(name: string): string {
  const raw = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  return raw ? `rgb(${raw})` : "rgb(0,0,0)";
}

function drawRects(ctx: CanvasRenderingContext2D, rects: number[][], ox: number, oy: number) {
  for (const [x, y, w, h] of rects) {
    ctx.fillRect(Math.round(ox + x), Math.round(oy + y), w, h);
  }
}

function drawDino(ctx: CanvasRenderingContext2D, x: number, topY: number, pose: Pose) {
  const ducking = pose === "duckA" || pose === "duckB";
  drawRects(ctx, ducking ? DUCK_BODY : DINO_BODY, x, topY);

  const legs =
    pose === "standA"
      ? DINO_LEGS_A
      : pose === "standB"
      ? DINO_LEGS_B
      : pose === "jump"
      ? DINO_LEGS_JUMP
      : pose === "duckA"
      ? DUCK_LEGS_A
      : pose === "duckB"
      ? DUCK_LEGS_B
      : DINO_LEGS_A; // dead
  drawRects(ctx, legs, x, topY);

  const eye = ducking ? DUCK_EYE : DINO_EYE;
  const ex = Math.round(x + eye[0]);
  const ey = Math.round(topY + eye[1]);
  ctx.clearRect(ex, ey, eye[2], eye[3]);

  if (pose === "dead") {
    ctx.save();
    ctx.strokeStyle = ctx.fillStyle as string;
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(ex, ey);
    ctx.lineTo(ex + eye[2], ey + eye[3]);
    ctx.moveTo(ex + eye[2], ey);
    ctx.lineTo(ex, ey + eye[3]);
    ctx.stroke();
    ctx.restore();
  }
}

function drawCactus(ctx: CanvasRenderingContext2D, x: number, variant: CactusVariant) {
  const def = CACTUS_VARIANTS[variant];
  drawRects(ctx, def.rects, x, GROUND_Y - def.height);
}

function drawBird(ctx: CanvasRenderingContext2D, x: number, topY: number, flapUp: boolean) {
  drawRects(ctx, flapUp ? BIRD_UP : BIRD_DOWN, x, topY);
}

function drawGround(ctx: CanvasRenderingContext2D, worldW: number, offset: number) {
  ctx.fillRect(0, GROUND_Y, worldW, 3);
  const shift = offset % GROUND_PATTERN_W;
  const tiles = Math.ceil(worldW / GROUND_PATTERN_W) + 2;
  for (let i = -1; i < tiles; i++) {
    const baseX = i * GROUND_PATTERN_W - shift;
    for (const tuft of GROUND_TUFTS) {
      const tx = baseX + tuft.x;
      if (tx > -8 && tx < worldW + 8) {
        ctx.fillRect(Math.round(tx), GROUND_Y - tuft.h, 3, tuft.h);
      }
    }
  }
}

function drawClouds(ctx: CanvasRenderingContext2D, worldW: number, offset: number, color: string) {
  ctx.save();
  ctx.globalAlpha = 0.35;
  ctx.fillStyle = color;
  const shift = offset % CLOUD_PATTERN_W;
  const tiles = Math.ceil(worldW / CLOUD_PATTERN_W) + 2;
  for (let i = -1; i < tiles; i++) {
    const baseX = i * CLOUD_PATTERN_W - shift;
    drawRects(ctx, CLOUD_BIG, baseX, 14);
    drawRects(ctx, CLOUD_SMALL, baseX + 150, 34);
  }
  ctx.restore();
}

function aabbOverlap(
  ax: number,
  ay: number,
  aw: number,
  ah: number,
  bx: number,
  by: number,
  bw: number,
  bh: number
) {
  return ax < bx + bw && ax + aw > bx && ay < by + bh && ay + ah > by;
}

export default function DinoGame() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);

  const worldWRef = useRef(800);
  const rafRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number | null>(null);
  const reducedMotionRef = useRef(false);

  const phaseRef = useRef<Phase>("idle");
  const [phase, setPhase] = useState<Phase>("idle");

  const dinoRef = useRef<DinoPhysics>({ y: 0, vy: 0, onGround: true });
  const duckRef = useRef(false);
  const wasDuckingAtDeathRef = useRef(false);
  const runFrameRef = useRef(0);

  const obstaclesRef = useRef<Obstacle[]>([]);
  const groundOffsetRef = useRef(0);
  const ambientOffsetRef = useRef(0);
  const distanceToNextSpawnRef = useRef(280);
  const speedRef = useRef(START_SPEED);
  const scoreRef = useRef(0);
  const milestoneRef = useRef(0);

  const [scoreDisplay, setScoreDisplay] = useState(0);
  const highScoreRef = useRef(0);
  const [highScore, setHighScore] = useState(0);

  const mutedRef = useRef(false);
  const [muted, setMuted] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);

  const colorsRef = useRef({ ink: "rgb(10,10,10)" });

  useEffect(() => {
    highScoreRef.current = readHighScore();
    setHighScore(highScoreRef.current);
    mutedRef.current = readMuted();
    setMuted(mutedRef.current);
    reducedMotionRef.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const updateColors = () => {
      colorsRef.current = { ink: readCssColor("--ink") };
    };
    updateColors();
    const observer = new MutationObserver(updateColors);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  function beep(freq: number, duration: number, type: OscillatorType, vol: number) {
    if (mutedRef.current) return;
    const AC =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!AC) return;
    if (!audioCtxRef.current) audioCtxRef.current = new AC();
    const ctx = audioCtxRef.current;
    if (ctx.state === "suspended") void ctx.resume();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = type;
    osc.frequency.value = freq;
    gain.gain.value = vol;
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + duration);
  }

  function toggleMuted() {
    mutedRef.current = !mutedRef.current;
    setMuted(mutedRef.current);
    writeMuted(mutedRef.current);
  }

  function randomSpawnGap(speed: number) {
    return 260 + speed * 14 + Math.random() * 180;
  }

  function spawnObstacle() {
    const worldW = worldWRef.current;
    const wantsBird = scoreRef.current >= BIRD_UNLOCK_SCORE && Math.random() < BIRD_CHANCE;
    if (wantsBird) {
      const topY = Math.random() < 0.5 ? BIRD_LOW_Y : BIRD_HIGH_Y;
      obstaclesRef.current.push({ type: "bird", x: worldW + 20, width: BIRD_W, height: BIRD_H, topY });
    } else {
      const variants: CactusVariant[] = ["small", "tall", "cluster"];
      const variant = variants[Math.floor(Math.random() * variants.length)];
      const def = CACTUS_VARIANTS[variant];
      obstaclesRef.current.push({
        type: "cactus",
        variant,
        x: worldW + 20,
        width: def.width,
        height: def.height,
      });
    }
  }

  function startGame() {
    dinoRef.current = { y: 0, vy: 0, onGround: true };
    duckRef.current = false;
    obstaclesRef.current = [];
    groundOffsetRef.current = 0;
    speedRef.current = START_SPEED;
    scoreRef.current = 0;
    milestoneRef.current = 0;
    distanceToNextSpawnRef.current = randomSpawnGap(START_SPEED);
    setScoreDisplay(0);
    phaseRef.current = "playing";
    setPhase("playing");
  }

  function endGame() {
    wasDuckingAtDeathRef.current = duckRef.current;
    phaseRef.current = "over";
    setPhase("over");
    const final = Math.floor(scoreRef.current);
    if (final > highScoreRef.current) {
      highScoreRef.current = final;
      setHighScore(final);
      writeHighScore(final);
    }
    beep(180, 0.3, "sawtooth", 0.05);
  }

  function tryJump() {
    if (phaseRef.current !== "playing") return;
    const dino = dinoRef.current;
    if (dino.onGround) {
      dino.vy = JUMP_V;
      dino.onGround = false;
      duckRef.current = false;
      beep(720, 0.07, "square", 0.035);
    }
  }

  function handleActivate() {
    if (phaseRef.current === "idle" || phaseRef.current === "over") {
      startGame();
    } else {
      tryJump();
    }
  }

  function handlePointerDown(e: React.PointerEvent<HTMLCanvasElement>) {
    const canvas = canvasRef.current;
    canvas?.focus();
    if (phaseRef.current === "playing" && canvas) {
      const rect = canvas.getBoundingClientRect();
      const relY = e.clientY - rect.top;
      if (relY > rect.height * 0.55) {
        duckRef.current = true;
        return;
      }
    }
    handleActivate();
  }
  function handlePointerUp() {
    duckRef.current = false;
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLCanvasElement>) {
    if (e.code === "Space" || e.code === "ArrowUp") {
      e.preventDefault();
      handleActivate();
    } else if (e.code === "ArrowDown") {
      e.preventDefault();
      if (phaseRef.current === "playing" && dinoRef.current.onGround) duckRef.current = true;
    }
  }
  function handleKeyUp(e: React.KeyboardEvent<HTMLCanvasElement>) {
    if (e.code === "ArrowDown") duckRef.current = false;
  }

  // Set up canvas + main loop once; everything mutable after that lives in refs.
  useIsomorphicLayoutEffect(() => {
    const wrapper = wrapperRef.current;
    const canvas = canvasRef.current;
    if (!wrapper || !canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctxRef.current = ctx;

    const resize = () => {
      const w = Math.round(wrapper.clientWidth);
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      worldWRef.current = w;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(WORLD_H * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${WORLD_H}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(wrapper);

    function update(dt: number) {
      if (!reducedMotionRef.current && phaseRef.current !== "over") {
        ambientOffsetRef.current += 0.4 * dt;
      }
      if (phaseRef.current !== "playing") return;

      const dino = dinoRef.current;
      dino.vy += GRAVITY * dt;
      if (duckRef.current && !dino.onGround) dino.vy += FASTFALL_ACCEL * dt;
      dino.y += dino.vy * dt;
      if (dino.y >= 0) {
        dino.y = 0;
        dino.vy = 0;
        dino.onGround = true;
      } else {
        dino.onGround = false;
      }

      runFrameRef.current += dt;

      speedRef.current = Math.min(MAX_SPEED, speedRef.current + SPEED_ACCEL * dt);
      const speed = speedRef.current;
      groundOffsetRef.current += speed * dt;
      scoreRef.current += speed * dt * SCORE_RATE;

      const scoreFloor = Math.floor(scoreRef.current);
      setScoreDisplay((prev) => (prev !== scoreFloor ? scoreFloor : prev));

      if (Math.floor(scoreRef.current / 100) > milestoneRef.current) {
        milestoneRef.current = Math.floor(scoreRef.current / 100);
        beep(880, 0.12, "square", 0.045);
      }

      distanceToNextSpawnRef.current -= speed * dt;
      if (distanceToNextSpawnRef.current <= 0) {
        spawnObstacle();
        distanceToNextSpawnRef.current = randomSpawnGap(speed);
      }

      obstaclesRef.current = obstaclesRef.current.filter((o) => {
        o.x -= speed * dt;
        return o.x + o.width > -10;
      });

      const ducking = duckRef.current && dino.onGround;
      const dinoW = ducking ? DUCK_W : DINO_W;
      const dinoH = ducking ? DUCK_H : DINO_H;
      const dinoTop = (ducking ? GROUND_TOP_DUCK : GROUND_TOP_STAND) + dino.y;
      const pad = 6;
      for (const o of obstaclesRef.current) {
        const oTop = o.type === "cactus" ? GROUND_Y - o.height : o.topY;
        const hit = aabbOverlap(
          DINO_X + pad,
          dinoTop + pad,
          dinoW - pad * 2,
          dinoH - pad * 2,
          o.x + pad,
          oTop + pad,
          o.width - pad * 2,
          o.height - pad * 2
        );
        if (hit) {
          endGame();
          break;
        }
      }
    }

    function render() {
      const ctx2 = ctxRef.current;
      if (!ctx2) return;
      const worldW = worldWRef.current;
      ctx2.clearRect(0, 0, worldW, WORLD_H);

      drawClouds(ctx2, worldW, ambientOffsetRef.current, colorsRef.current.ink);

      ctx2.fillStyle = colorsRef.current.ink;
      drawGround(ctx2, worldW, groundOffsetRef.current);

      for (const o of obstaclesRef.current) {
        if (o.type === "cactus") {
          drawCactus(ctx2, o.x, o.variant);
        } else {
          const flapUp = Math.floor(runFrameRef.current / 8) % 2 === 0;
          drawBird(ctx2, o.x, o.topY, flapUp);
        }
      }

      const dino = dinoRef.current;
      const runToggle = Math.floor(runFrameRef.current / 8) % 2 === 0;
      let pose: Pose;
      let topY: number;

      if (phaseRef.current === "idle") {
        pose = "standA";
        const bob = reducedMotionRef.current ? 0 : Math.sin(ambientOffsetRef.current / 14) * 2;
        topY = GROUND_TOP_STAND + bob;
      } else if (phaseRef.current === "over") {
        pose = "dead";
        topY = (wasDuckingAtDeathRef.current ? GROUND_TOP_DUCK : GROUND_TOP_STAND) + dino.y;
      } else if (!dino.onGround) {
        pose = "jump";
        topY = GROUND_TOP_STAND + dino.y;
      } else if (duckRef.current) {
        pose = runToggle ? "duckA" : "duckB";
        topY = GROUND_TOP_DUCK;
      } else {
        pose = runToggle ? "standA" : "standB";
        topY = GROUND_TOP_STAND;
      }

      drawDino(ctx2, DINO_X, topY, pose);
    }

    function loop(now: number) {
      const last = lastTimeRef.current ?? now;
      let dt = (now - last) / (1000 / 60);
      dt = Math.min(dt, 3);
      lastTimeRef.current = now;
      update(dt);
      render();
      rafRef.current = requestAnimationFrame(loop);
    }
    rafRef.current = requestAnimationFrame(loop);

    return () => {
      ro.disconnect();
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      ref={wrapperRef}
      className="relative w-full select-none overflow-hidden"
      style={{ height: WORLD_H }}
    >
      <canvas
        ref={canvasRef}
        tabIndex={0}
        aria-label="Dino runner mini-game. Press space or the up arrow to jump, down arrow to duck, or tap the screen to play."
        className="block touch-none cursor-pointer outline-none"
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
        onKeyDown={handleKeyDown}
        onKeyUp={handleKeyUp}
      />

      <button
        type="button"
        onClick={toggleMuted}
        aria-label={muted ? "Unmute game sounds" : "Mute game sounds"}
        className="absolute left-2 top-2 text-ink-soft/50 transition-colors hover:text-accent"
      >
        {muted ? <LuVolumeX size={14} /> : <LuVolume2 size={14} />}
      </button>

      <div className="pointer-events-none absolute right-2 top-2 select-none font-mono text-[10px] tracking-wider text-accent sm:text-xs">
        {phase !== "idle" && <span>{String(scoreDisplay).padStart(5, "0")}</span>}
        {highScore > 0 && (
          <span className="ml-2 text-ink-soft/60">HI {String(highScore).padStart(5, "0")}</span>
        )}
      </div>

      {phase !== "playing" && (
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-1 text-center">
          {phase === "over" ? (
            <>
              <p className="font-mono text-xs font-semibold uppercase tracking-widest text-ink">
                Game Over
              </p>
              <p className="font-mono text-[10px] text-ink-soft/70">
                score {Math.floor(scoreRef.current)} &middot; space or tap to retry
              </p>
            </>
          ) : (
            <p className="font-mono text-[10px] text-ink-soft/60 sm:text-xs">
              tap or press space to play &middot; hold ↓ to duck
            </p>
          )}
        </div>
      )}
    </div>
  );
}