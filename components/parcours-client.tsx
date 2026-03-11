"use client"

import { useState } from "react"
import { GlassCard, GlassCardContent } from "@/components/ui/glass-card"
import { GlassButton } from "@/components/ui/glass-button"
import { ChevronDown, ChevronUp } from "lucide-react"

type Experience = {
    title: string
    company: string
    period: string
    type: string
    tasks: string[]
    side: "left" | "right"
}

const VISIBLE_COUNT = 3

export default function ParcoursClient({ experiences }: { experiences: Experience[] }) {
    const [showAll, setShowAll] = useState(false)
    const displayed = showAll ? experiences : experiences.slice(0, VISIBLE_COUNT)

    return (
        <section className="w-full max-w-4xl mx-auto px-2 sm:px-4">
            <p className="text-2xl sm:text-3xl font-light text-center m-4 sm:m-6 mb-6 sm:mb-10">Mon Parcours</p>

            <div
                className="relative"
                style={!showAll ? {
                    maskImage: "linear-gradient(to bottom, black 60%, transparent 100%)",
                    WebkitMaskImage: "linear-gradient(to bottom, black 60%, transparent 100%)"
                } : {}}
            >
                {/* Ligne centrale — cachée sur mobile */}
                <div
                    className="hidden sm:block absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px"
                    style={{
                        background: "linear-gradient(to bottom, rgba(220,38,38,0.9), rgba(220,38,38,0.4), rgba(255,255,255,0.1))"
                    }}
                />

                {/* Ligne à gauche sur mobile */}
                <div
                    className="sm:hidden absolute left-4 top-0 bottom-0 w-px"
                    style={{
                        background: "linear-gradient(to bottom, rgba(220,38,38,0.9), rgba(220,38,38,0.4), rgba(255,255,255,0.1))"
                    }}
                />

                <div className="flex flex-col gap-10 sm:gap-16">
                    {displayed.map((exp, index) => (
                        <div key={index} className="relative">

                            {/* Layout MOBILE : liste verticale avec ligne à gauche */}
                            <div className="sm:hidden flex items-start gap-4 pl-10">
                                {/* Point sur la timeline mobile */}
                                <div className="absolute left-2 top-2 z-10">
                                    <div className="w-4 h-4 rounded-full bg-red-600 shadow-[0_0_12px_rgba(220,38,38,0.8)] border-2 border-red-400" />
                                </div>

                                <div className="flex flex-col gap-2 w-full">
                                    <div>
                                        <span className="text-red-500 font-bold text-sm">{exp.period}</span>
                                        <span className="text-white/40 text-xs tracking-widest ml-3">{exp.type}</span>
                                    </div>
                                    <GlassCard className="bg-white/5 border-white/10 w-full">
                                        <GlassCardContent className="p-4">
                                            <h3 className="text-white font-bold text-sm mb-1">{exp.title}</h3>
                                            <p className="text-white/50 text-xs mb-3">{exp.company}</p>
                                            <ul className="space-y-1.5">
                                                {exp.tasks.map((task, i) => (
                                                    <li key={i} className="text-white/70 text-xs flex gap-2">
                                                        <span className="text-white/40 mt-0.5 shrink-0">•</span>
                                                        <span>{task}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </GlassCardContent>
                                    </GlassCard>
                                </div>
                            </div>

                            {/* Layout DESKTOP : alternance gauche/droite */}
                            <div className="hidden sm:flex items-center">
                                {/* Point sur la timeline desktop */}
                                <div className="absolute left-1/2 -translate-x-1/2 z-10">
                                    <div className="w-4 h-4 rounded-full bg-red-600 shadow-[0_0_12px_rgba(220,38,38,0.8)] border-2 border-red-400" />
                                </div>

                                {exp.side === "left" ? (
                                    <>
                                        <div className="w-[55%] pr-6">
                                            <GlassCard className="bg-white/5 border-white/10">
                                                <GlassCardContent className="p-5">
                                                    <h3 className="text-white font-bold text-base mb-1">{exp.title}</h3>
                                                    <p className="text-white/50 text-sm mb-3">{exp.company}</p>
                                                    <ul className="space-y-2">
                                                        {exp.tasks.map((task, i) => (
                                                            <li key={i} className="text-white/70 text-sm flex gap-2">
                                                                <span className="text-white/40 mt-0.5">•</span>
                                                                <span>{task}</span>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </GlassCardContent>
                                            </GlassCard>
                                        </div>
                                        <div className="w-[65%] pl-32 flex flex-col">
                                            <span className="text-red-500 font-bold text-sm">{exp.period}</span>
                                            <span className="text-white/40 text-xs tracking-widest mt-0.5">{exp.type}</span>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <div className="w-[55%] pr-6 flex flex-col items-end">
                                            <span className="text-red-500 font-bold text-sm">{exp.period}</span>
                                            <span className="text-white/40 text-xs tracking-widest mt-0.5">{exp.type}</span>
                                        </div>
                                        <div className="w-[65%] pl-32">
                                            <GlassCard className="bg-white/5 border-white/10">
                                                <GlassCardContent className="p-5">
                                                    <h3 className="text-white font-bold text-base mb-1">{exp.title}</h3>
                                                    <p className="text-white/50 text-sm mb-3">{exp.company}</p>
                                                    <ul className="space-y-2">
                                                        {exp.tasks.map((task, i) => (
                                                            <li key={i} className="text-white/70 text-sm flex gap-2">
                                                                <span className="text-white/40 mt-0.5">•</span>
                                                                <span>{task}</span>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </GlassCardContent>
                                            </GlassCard>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {experiences.length > VISIBLE_COUNT && (
                <div className="flex justify-center mt-8">
                    <GlassButton
                        variant="ghost"
                        onClick={() => setShowAll(!showAll)}
                        className="flex items-center gap-2"
                    >
                        {showAll ? (
                            <><ChevronUp size={16} /> Voir moins</>
                        ) : (
                            <><ChevronDown size={16} /> Voir tout le parcours ({experiences.length - VISIBLE_COUNT} de plus)</>
                        )}
                    </GlassButton>
                </div>
            )}
        </section>
    )
}
