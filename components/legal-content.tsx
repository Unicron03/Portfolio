"use client"

import { FadeIn } from "@/components/fade-in"
import { GlassCard, GlassCardContent, GlassCardHeader, GlassCardTitle } from "@/components/ui/glass-card"
import React from "react"

interface LegalSection {
  title: string
  content: React.ReactNode
}

interface LegalContentProps {
  title: string
  lastUpdated?: string
  sections: LegalSection[]
}

export function LegalContent({ title, lastUpdated, sections }: LegalContentProps) {
  return (
    <div className="space-y-6">
      <FadeIn delay={0.2}>
        <GlassCard className="border border-white/10 bg-white/5 backdrop-blur-lg">
          <GlassCardHeader>
            <GlassCardTitle className="text-3xl md:text-4xl">{title}</GlassCardTitle>
            {lastUpdated && (
              <p className="text-sm text-gray-400 mt-2">
                Dernière mise à jour : {lastUpdated}
              </p>
            )}
          </GlassCardHeader>
        </GlassCard>
      </FadeIn>

      {sections.map((section, index) => (
        <FadeIn key={index} delay={0.2 + (index + 1) * 0.1}>
          <GlassCard className="border border-white/10 bg-white/5 backdrop-blur-lg hover:bg-white/10 transition-colors">
            <GlassCardHeader>
              <GlassCardTitle className="text-xl md:text-2xl">
                {section.title}
              </GlassCardTitle>
            </GlassCardHeader>
            <GlassCardContent className="text-gray-300 leading-relaxed">
              {typeof section.content === "string" ? (
                <p>{section.content}</p>
              ) : (
                section.content
              )}
            </GlassCardContent>
          </GlassCard>
        </FadeIn>
      ))}
    </div>
  )
}
