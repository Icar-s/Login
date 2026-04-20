import { useEffect, useState } from "react";

export default function FloatingIcons() {
  const [icons, setIcons] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const id = Math.random();

      setIcons((prev) => [
        ...prev,
        {
          id,
          left: Math.random() * 100,
          duration: 8 + Math.random() * 10,
          size: 20 + Math.random() * 30,
          opacity: 0.1 + Math.random() * 0.3,
        },
      ]);

      // limpa pra não explodir memória
      setTimeout(() => {
        setIcons((prev) => prev.filter((i) => i.id !== id));
      }, 15000);
    }, 300);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg">
      {icons.map((icon) => (
        <img
          key={icon.id}
          src="/icon.ico"
          className="float-icon"
          style={{
            left: `${icon.left}%`,
            width: `${icon.size}px`,
            opacity: icon.opacity,
            animationDuration: `${icon.duration}s`,
          }}
        />
      ))}
    </div>
  );
}