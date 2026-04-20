import { useEffect, useRef, useState } from "react";

const GRID_SIZE = 15;
const CANVAS_SIZE = 300;

export default function Snake() {
  const canvasRef = useRef(null);

  const [snake, setSnake] = useState([
    { x: 5, y: 5 },
  ]);

  const [food, setFood] = useState({ x: 10, y: 10 });
  const [dir, setDir] = useState({ x: 1, y: 0 });

  const gameLoopRef = useRef(null);

  const randomFood = () => ({
    x: Math.floor(Math.random() * GRID_SIZE),
    y: Math.floor(Math.random() * GRID_SIZE),
  });

  const draw = (ctx) => {
    ctx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

    // comida
    ctx.fillStyle = "red";
    ctx.fillRect(
      food.x * (CANVAS_SIZE / GRID_SIZE),
      food.y * (CANVAS_SIZE / GRID_SIZE),
      CANVAS_SIZE / GRID_SIZE,
      CANVAS_SIZE / GRID_SIZE
    );

    // cobra
    ctx.fillStyle = "lime";
    snake.forEach((p) => {
      ctx.fillRect(
        p.x * (CANVAS_SIZE / GRID_SIZE),
        p.y * (CANVAS_SIZE / GRID_SIZE),
        CANVAS_SIZE / GRID_SIZE,
        CANVAS_SIZE / GRID_SIZE
      );
    });
  };

  const move = () => {
    setSnake((prev) => {
      const head = {
        x: prev[0].x + dir.x,
        y: prev[0].y + dir.y,
      };

      const newSnake = [head, ...prev];

      // comer
      if (head.x === food.x && head.y === food.y) {
        setFood(randomFood());
      } else {
        newSnake.pop();
      }

      // colisão simples (reset)
      if (
        head.x < 0 ||
        head.y < 0 ||
        head.x >= GRID_SIZE ||
        head.y >= GRID_SIZE
      ) {
        return [{ x: 5, y: 5 }];
      }

      return newSnake;
    });
  };

  useEffect(() => {
    const handleKey = (e) => {
      const map = {
        ArrowUp: { x: 0, y: -1 },
        ArrowDown: { x: 0, y: 1 },
        ArrowLeft: { x: -1, y: 0 },
        ArrowRight: { x: 1, y: 0 },
      };

      if (map[e.key]) setDir(map[e.key]);
    };

    window.addEventListener("keydown", handleKey);

    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    gameLoopRef.current = setInterval(() => {
      move();
      draw(ctx);
    }, 80);

    return () => clearInterval(gameLoopRef.current);
  });

  return (
    <div style={{ marginTop: 20 }}>
      <canvas
        ref={canvasRef}
        width={CANVAS_SIZE}
        height={CANVAS_SIZE}
        style={{
          border: "2px solid #333",
          borderRadius: "10px",
        }}
      />
      <p>Use as setas do teclado</p>
    </div>
  );
}