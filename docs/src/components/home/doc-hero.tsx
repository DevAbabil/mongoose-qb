"use client";

import { Badge } from "@/components/ui/badge";
import { HERO_DATA } from "@/data/hero";
import { Sparkles, ArrowDown } from "lucide-react";
import Image from "next/image";

const DocHero = () => {
  return (
    <div className="relative flex min-h-[calc(100vh-4rem)] items-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-linear-to-br from-green-500/10 via-transparent to-blue-500/10" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(34,197,94,0.1),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(59,130,246,0.1),transparent_50%)]" />

      <div className="container-wide relative w-full space-y-12 py-20">
        <div className="space-y-8 text-center">
          <Badge
            variant="outline"
            className="mx-auto w-fit border-success/20 bg-success/10 text-success-foreground dark:border-success/30 dark:text-success"
          >
            <Sparkles className="mr-1 h-3 w-3" />
            {HERO_DATA.badge}
          </Badge>

          <h1 className="bg-linear-to-br from-foreground to-foreground/70 bg-clip-text text-5xl font-bold tracking-tight text-transparent md:text-6xl lg:text-7xl">
            {HERO_DATA.title}
          </h1>

          <p className="mx-auto max-w-2xl text-xl text-muted-foreground md:text-2xl">
            {HERO_DATA.tagline}
          </p>

          <p className="mx-auto max-w-3xl text-lg text-foreground/70">{HERO_DATA.description}</p>

          <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
            <Image
              src="https://img.shields.io/npm/v/mongoose-qb?style=flat&logo=npm&color=4f46e5"
              alt="npm version"
              width={0}
              height={0}
              className="h-5 w-auto"
              unoptimized
            />
            <Image
              src="https://img.shields.io/npm/dt/mongoose-qb?style=flat&logo=npm&color=4f46e5"
              alt="npm downloads"
              width={0}
              height={0}
              className="h-5 w-auto"
              unoptimized
            />
            <Image
              src="https://img.shields.io/github/stars/DevAbabil/mongoose-qb?style=flat&logo=github&color=4f46e5"
              alt="GitHub stars"
              width={0}
              height={0}
              className="h-5 w-auto"
              unoptimized
            />
            <Image
              src="https://img.shields.io/github/license/DevAbabil/mongoose-qb?style=flat&color=4f46e5"
              alt="License"
              width={0}
              height={0}
              className="h-5 w-auto"
              unoptimized
            />
          </div>

          <div className="flex justify-center gap-4 pt-4">
            <a
              href="#installation"
              className="inline-flex items-center gap-2 rounded-lg bg-green-600 px-6 py-3 font-semibold text-white shadow-lg shadow-green-600/30 transition-all hover:bg-green-700 hover:shadow-xl hover:shadow-green-600/40"
            >
              Get Started
              <ArrowDown className="h-4 w-4" />
            </a>
            <a
              href="#features"
              className="inline-flex items-center gap-2 rounded-lg border border-border bg-background/50 px-6 py-3 font-semibold backdrop-blur transition-all hover:bg-muted/50"
            >
              Learn More
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
export default DocHero;
