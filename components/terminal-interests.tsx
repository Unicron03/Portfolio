"use client"

import { useEffect, useState } from "react"

const interests = ["Musique 🎵", "Jeux Vidéos 🎮", "Sports ⚽", "Développement 🖥️"]

const TYPING_SPEED = 80
const DELETING_SPEED = 50
const PAUSE_AFTER_TYPING = 1800
const PAUSE_AFTER_DELETING = 400

export default function TerminalInterests() {
    const [displayed, setDisplayed] = useState("")
    const [index, setIndex] = useState(0)
    const [phase, setPhase] = useState<"typing" | "deleting">("typing")

    useEffect(() => {
        const current = interests[index]

        if (phase === "typing") {
            if (displayed.length < current.length) {
                const t = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), TYPING_SPEED)
                return () => clearTimeout(t)
            } else {
                const t = setTimeout(() => setPhase("deleting"), PAUSE_AFTER_TYPING)
                return () => clearTimeout(t)
            }
        }

        if (phase === "deleting") {
            if (displayed.length > 0) {
                const t = setTimeout(() => setDisplayed(displayed.slice(0, -1)), DELETING_SPEED)
                return () => clearTimeout(t)
            } else {
                const t = setTimeout(() => {
                    setIndex((index + 1) % interests.length)
                    setPhase("typing")
                }, PAUSE_AFTER_DELETING)
                return () => clearTimeout(t)
            }
        }
    }, [displayed, phase, index])

    return (
        <div className="w-full rounded-xl overflow-hidden border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.4)]">
            {/* Barre de titre MacOS */}
            <div className="flex items-center gap-2 px-4 py-3 bg-white/8 border-b border-white/10">
                {/* Boutons traffic light */}
                <div className="flex items-center gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500/80 shadow-[0_0_6px_rgba(239,68,68,0.5)]" />
                    <div className="w-3 h-3 rounded-full bg-yellow-400/80 shadow-[0_0_6px_rgba(234,179,8,0.5)]" />
                    <div className="w-3 h-3 rounded-full bg-green-500/80 shadow-[0_0_6px_rgba(34,197,94,0.5)]" />
                </div>
                {/* Titre centré */}
                <span className="flex-1 text-center text-white/30 text-xs tracking-wide">
                    interests.sh
                </span>
            </div>

            {/* Corps du terminal */}
            <div className="bg-black/40 backdrop-blur-md px-4 py-3 font-mono text-sm">
                {/* Ligne de commande précédente */}
                <div className="flex items-center gap-2 text-white/30 text-xs mb-2">
                    <span className="text-green-400/60">~</span>
                    <span className="text-blue-400/60">portfolio</span>
                    <span className="text-white/20">$</span>
                    <span>get interests</span>
                </div>

                {/* Résultat animé */}
                <div className="flex items-center gap-2">
                    <span className="text-red-400/70 text-xs select-none">›</span>
                    <span className="text-white/90 tracking-wide">
                        {displayed}
                    </span>
                    <span className="inline-block w-[7px] h-[14px] bg-white/70 animate-pulse ml-0.5" />
                </div>
            </div>
        </div>
    )
}
