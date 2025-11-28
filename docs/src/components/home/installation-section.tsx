"use client";

import { useState, useEffect } from "react";
import { Download, Terminal, Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useDidComponentMount } from "@/hooks/use-did-component-mount";
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard";

type PackageManager = "npm" | "pnpm" | "yarn" | "bun";

const INSTALL_COMMANDS: Record<PackageManager, string> = {
  npm: "npm install mongoose-qb",
  pnpm: "pnpm add mongoose-qb",
  yarn: "yarn add mongoose-qb",
  bun: "bun add mongoose-qb",
};

const STORAGE_KEY = "preferred-package-manager";

const InstallationSection = () => {
  const mounted = useDidComponentMount();
  const { isCopied, copy } = useCopyToClipboard();
  const [selected, setSelected] = useState<PackageManager>("npm");

  useEffect(() => {
    if (!mounted) return;
    const saved = localStorage.getItem(STORAGE_KEY) as PackageManager | null;
    if (saved && INSTALL_COMMANDS[saved]) {
      setSelected(saved);
    }
  }, [mounted]);

  const handleSelect = (manager: PackageManager) => {
    setSelected(manager);
    localStorage.setItem(STORAGE_KEY, manager);
  };

  const handleCopy = () => {
    copy(INSTALL_COMMANDS[selected]);
  };

  if (!mounted) {
    return <div className="py-16" />;
  }

  return (
    <section id="installation" className="lg:scroll-mt-24 py-22 md:py-50">
      <div className="container-wide">
        <div className="mx-auto max-w-4xl">
          <div className="group relative overflow-hidden rounded-2xl border border-green-500/20 bg-linear-to-br from-green-500/5 via-background to-blue-500/5 p-8 shadow-xl shadow-green-500/10 transition-all hover:shadow-2xl hover:shadow-green-500/20">
            {/* Decorative gradient orbs */}
            <div className="absolute -right-20 -top-20 h-60 w-60 rounded-full bg-green-500/10 blur-3xl transition-all group-hover:bg-green-500/20" />
            <div className="absolute -bottom-20 -left-20 h-60 w-60 rounded-full bg-blue-500/10 blur-3xl transition-all group-hover:bg-blue-500/20" />

            <div className="relative space-y-8">
              {/* Header */}
              <div className="text-center space-y-4">
                <div className="inline-flex items-center gap-2 rounded-full bg-green-500/10 px-4 py-2 text-sm font-medium text-green-700 dark:text-green-400">
                  <Download className="h-4 w-4" />
                  Quick Start
                </div>
                <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
                  Get Started in Seconds
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Choose your preferred package manager and install mongoose-qb
                </p>
              </div>

              {/* Package Manager Selector */}
              <div className="space-y-4">
                <div className="flex items-center justify-center gap-2 text-sm font-semibold text-muted-foreground">
                  <Terminal className="h-4 w-4" />
                  <span>Choose Your Package Manager</span>
                </div>
                <div className="flex justify-center">
                  <div className="flex flex-wrap gap-2">
                    {(Object.keys(INSTALL_COMMANDS) as PackageManager[]).map(
                      (manager) => (
                        <Button
                          key={manager}
                          variant={selected === manager ? "default" : "outline"}
                          size="sm"
                          onClick={() => handleSelect(manager)}
                          className="capitalize"
                        >
                          {manager}
                        </Button>
                      )
                    )}
                  </div>
                </div>
              </div>

              {/* Installation Command Card */}
              <div className="space-y-3">
                <p className="text-center text-sm font-semibold text-muted-foreground">
                  Installation Command
                </p>
                <div className="relative overflow-hidden rounded-xl border border-green-500/30 bg-linear-to-br from-slate-900 to-slate-800 p-1 shadow-lg dark:from-slate-950 dark:to-slate-900">
                  <div className="absolute inset-0 bg-linear-to-r from-green-500/10 via-transparent to-blue-500/10" />
                  <div className="relative flex items-center gap-3 rounded-lg bg-slate-900/90 px-6 py-5 backdrop-blur dark:bg-slate-950/90">
                    <div className="flex h-8 w-8 items-center justify-center rounded-md bg-green-500/20">
                      <span className="text-xs font-bold text-green-400">
                        $
                      </span>
                    </div>
                    <code className="flex-1 font-mono text-sm text-green-400">
                      {INSTALL_COMMANDS[selected]}
                    </code>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleCopy}
                      aria-label={`Copy ${selected} install command`}
                      className="h-7 w-7 p-0"
                    >
                      {isCopied ? (
                        <Check className="h-3.5 w-3.5 text-green-600" />
                      ) : (
                        <Copy className="h-3.5 w-3.5" />
                      )}
                    </Button>
                  </div>
                </div>
              </div>

              {/* Additional Info */}
              <div className="flex items-center justify-center gap-6 pt-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-green-500" />
                  <span>TypeScript Ready</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-blue-500" />
                  <span>Zero Config</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-purple-500" />
                  <span>MIT License</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InstallationSection;
