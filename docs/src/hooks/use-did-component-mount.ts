"use client";

import { useEffect, useState } from "react";

/**
 * Hook to check if a component has mounted
 * Useful for preventing hydration mismatches in SSR
 *
 * @returns boolean - true if component has mounted, false otherwise
 *
 * @example
 * ```tsx
 * function MyComponent() {
 *   const mounted = useDidComponentMount();
 *
 *   if (!mounted) {
 *     return <div>Loading...</div>;
 *   }
 *
 *   return <div>Content that depends on client-side</div>;
 * }
 * ```
 */
export function useDidComponentMount(): boolean {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return mounted;
}
