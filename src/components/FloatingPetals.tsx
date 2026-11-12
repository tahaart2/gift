import { useEffect, useState } from 'react';

interface Petal {
  id: number;
  left: number;
  size: number;
  duration: number;
  delay: number;
  rotate: number;
  color: string;
}

export function FloatingPetals() {
  const [petals, setPetals] = useState<Petal[]>([]);

  useEffect(() => {
    // Generate gentle petals
    const petalColors = ['#F8DCE8', '#F2C2D4', '#E9E2FF', '#FFCCD5'];
    const generated: Petal[] = Array.from({ length: 14 }).map((_, i) => ({
      id: i,
      left: Math.random() * 95,
      size: 14 + Math.random() * 14,
      duration: 10 + Math.random() * 12,
      delay: Math.random() * 8,
      rotate: Math.random() * 360,
      color: petalColors[i % petalColors.length],
    }));
    setPetals(generated);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
      {petals.map((petal) => (
        <svg
          key={petal.id}
          className="petal-particle"
          style={{
            left: `${petal.left}%`,
            width: `${petal.size}px`,
            height: `${petal.size * 1.3}px`,
            animationDuration: `${petal.duration}s`,
            animationDelay: `${petal.delay}s`,
            color: petal.color,
          }}
          viewBox="0 0 24 32"
          fill="currentColor"
        >
          <path d="M12 0C6 8 0 16 0 24C0 28.4 5.4 32 12 32C18.6 32 24 28.4 24 24C24 16 18 8 12 0Z" opacity="0.65" />
        </svg>
      ))}
    </div>
  );
}
