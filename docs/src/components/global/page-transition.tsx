"use client";

import { useEffect, useState } from "react";

export const PageTransition = ({ children }: { children: React.ReactNode }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={`transition-opacity duration-500 ${
        isLoading ? "opacity-0" : "opacity-100"
      }`}
    >
      {children}
    </div>
  );
};
