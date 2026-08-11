import React from 'react';

interface Props {
  position: { x: number; y: number } | null;
}

export const MagicHoldAnimation: React.FC<Props> = ({ position }) => {
  const containerRef = React.useRef<HTMLDivElement>(null);

  React.useLayoutEffect(() => {
    if (!containerRef.current || !position) return;
    containerRef.current.style.setProperty('--hold-left', `${position.x}px`);
    containerRef.current.style.setProperty('--hold-top', `${position.y}px`);
  }, [position]);

  if (!position) return null;

  const delayClasses = [
    '[animation-delay:0s]',
    '[animation-delay:0.4s]',
    '[animation-delay:0.8s]',
  ];

  return (
    <div
      ref={containerRef}
      className="pointer-events-none absolute left-[var(--hold-left)] top-[var(--hold-top)] h-0 w-0"
    >
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className={`pulse-ring -ml-5 -mt-5 h-10 w-10 ${delayClasses[i]}`}
        />
      ))}
    </div>
  );
};
