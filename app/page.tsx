"use client";

import { useState, useEffect } from 'react';
import { useSwipeable } from 'react-swipeable';
import { useRouter } from 'next/navigation';

const colors = [
  'red', 'blue', 'green', 'yellow', 'purple',
  'orange', 'pink', 'cyan', 'magenta', 'lime'
];

export default function Home() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const router = useRouter();

  useEffect(() => {
    router.push(`/${colors[currentIndex]}`);
  }, [currentIndex, router]);

  const handlers = useSwipeable({
    onSwiping: (eventData) => {
      if (eventData.dir === 'Up' || eventData.dir === 'Down') {
        setIsTransitioning(true);
      }
    },
    onSwipedUp: () => {
      if (currentIndex < colors.length - 1) {
        setCurrentIndex(prevIndex => prevIndex + 1);
      }
    },
    onSwipedDown: () => {
      if (currentIndex > 0) {
        setCurrentIndex(prevIndex => prevIndex - 1);
      }
    },
    onSwiped: () => {
      setIsTransitioning(false);
    },
    trackMouse: true,
    preventDefaultTouchmoveEvent: true,
  });

  return (
    <div {...handlers} className="h-screen w-screen overflow-hidden">
      {colors.map((color, index) => (
        <div
          key={color}
          className={`absolute inset-0 flex items-center justify-center text-4xl font-bold text-white transition-transform duration-300 ease-in-out ${
            index === currentIndex ? 'z-10' : 'z-0'
          }`}
          style={{
            backgroundColor: color,
            transform: `translateY(${(index - currentIndex) * 100}%)`,
          }}
        >
          {color.charAt(0).toUpperCase() + color.slice(1)}
        </div>
      ))}
      {isTransitioning && (
        <div className="absolute inset-0 bg-black bg-opacity-50 z-20 flex items-center justify-center text-white text-2xl">
          Release to change page
        </div>
      )}
    </div>
  );
}