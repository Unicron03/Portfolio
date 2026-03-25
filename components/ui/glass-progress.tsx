"use client"

import * as React from "react"
import * as ProgressPrimitive from "@radix-ui/react-progress"
import { cn } from "@/lib/utils"

const progressColors = {
  cyan:    { gradient: "from-cyan-300 via-cyan-400 to-cyan-500",           glow: "from-cyan-400/40 via-cyan-500/40 to-cyan-600/40",           shadow: "shadow-[0_0_16px_rgba(34,211,238,0.8)]" },
  lime:    { gradient: "from-lime-300 via-lime-400 to-green-400",          glow: "from-lime-400/40 via-lime-500/40 to-green-500/40",          shadow: "shadow-[0_0_16px_rgba(163,230,53,0.8)]" },
  pink:    { gradient: "from-fuchsia-400 via-pink-400 to-rose-400",        glow: "from-fuchsia-500/40 via-pink-500/40 to-rose-500/40",        shadow: "shadow-[0_0_16px_rgba(232,121,249,0.8)]" },
  orange:  { gradient: "from-orange-300 via-amber-400 to-yellow-300",      glow: "from-orange-400/40 via-amber-500/40 to-yellow-400/40",      shadow: "shadow-[0_0_16px_rgba(251,146,60,0.8)]" },
  purple:  { gradient: "from-violet-400 via-purple-400 to-fuchsia-300",    glow: "from-violet-500/40 via-purple-500/40 to-fuchsia-400/40",    shadow: "shadow-[0_0_16px_rgba(167,139,250,0.8)]" },
  blue:    { gradient: "from-blue-300 via-indigo-400 to-cyan-300",         glow: "from-blue-400/40 via-indigo-500/40 to-cyan-400/40",         shadow: "shadow-[0_0_16px_rgba(99,102,241,0.8)]" },
  red:     { gradient: "from-red-400 via-rose-300 to-orange-300",          glow: "from-red-500/40 via-rose-400/40 to-orange-400/40",          shadow: "shadow-[0_0_16px_rgba(248,113,113,0.8)]" },
} as const

type ProgressColor = keyof typeof progressColors

interface GlassProgressProps extends React.ComponentProps<typeof ProgressPrimitive.Root> {
  color?: ProgressColor
}

function GlassProgress({ className, value, color = "blue", ...props }: GlassProgressProps) {
  const { gradient, glow, shadow } = progressColors[color]

  return (
    <div className="relative">
      <div className={cn("absolute -inset-1 rounded-full bg-linear-to-r blur-md opacity-50", glow)} />
      <ProgressPrimitive.Root
        className={cn(
          "relative h-3 w-full overflow-hidden rounded-full",
          "bg-white/10 backdrop-blur-xl border border-white/20",
          className,
        )}
        {...props}
      >
        <ProgressPrimitive.Indicator
          className={cn(
            "h-full transition-all duration-500 ease-out rounded-full",
            "bg-linear-to-r",
            gradient,
            shadow,
          )}
          style={{ width: `${value || 0}%` }}
        />
      </ProgressPrimitive.Root>
    </div>
  )
}

export { GlassProgress, type ProgressColor }