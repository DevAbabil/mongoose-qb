"use client";

import { useEffect, useState } from "react";
import { Star } from "lucide-react";
import { useDidComponentMount } from "@/hooks/use-did-component-mount";

const GitHubStars = () => {
  const mounted = useDidComponentMount();
  const [stars, setStars] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!mounted) return;

    fetch("https://api.github.com/repos/devababil/mongoose-qb")
      .then((res) => res.json())
      .then((data) => {
        setStars(data.stargazers_count || 0);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, [mounted]);

  if (!mounted || loading) {
    return (
      <div className="flex items-center gap-2 rounded-lg border border-border bg-muted/50 px-3 py-1.5 text-sm">
        <Star className="h-3.5 w-3.5 animate-pulse" />
        <span className="font-medium">---</span>
      </div>
    );
  }

  if (!stars) return null;

  return (
    <a
      href="https://github.com/DevAbabil/mongoose-qb/stargazers"
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-center gap-2 rounded-lg border border-border bg-muted/50 px-3 py-1.5 text-sm transition-all hover:border-green-500/50 hover:bg-green-500/10"
    >
      <Star className="h-3.5 w-3.5 fill-yellow-500 text-yellow-500 transition-transform group-hover:scale-110" />
      <span className="font-medium">{stars.toLocaleString()}</span>
    </a>
  );
};

export default GitHubStars;
