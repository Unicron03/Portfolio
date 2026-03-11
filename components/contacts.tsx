"use client"

import { useState } from "react"
import { Label } from "./ui/label"
import { GlassCard, GlassCardContent } from "./ui/glass-card"
import { GlassInput } from "./ui/glass-input"
import { Mail, Linkedin, ArrowRight, MessageCircleMore, CodeXml, IdCard } from "lucide-react"
import { GlassTextarea } from "./shadcn/glass-textarea"
import { GlassButton } from "./ui/glass-button"
import Link from "next/link"
import { useNotification } from "@/components/shadcn/glass-notification"

export default function Contacts() {
    const [nom, setNom] = useState("")
    const [email, setEmail] = useState("")
    const [message, setMessage] = useState("")
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")

    const { addNotification } = useNotification()

    async function handleSubmit() {
        setStatus("loading")
        const res = await fetch("/api/contact", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ nom, email, message }),
        })
        if (res.ok) {
            setStatus("success")
            addNotification({ type: "success", title: "Message envoyé !", description: "Je vous remercie. Je le traiterai dans les meilleurs délais." })
        } else {
            setStatus("error")
            addNotification({ type: "error", title: "Erreur lors de l'envoi.", description: "Une erreur s'est produite. Veuillez réessayer." })
        }
    }

    return (
        <main className="px-4 sm:px-8">
            <p className="text-2xl sm:text-3xl font-light text-center m-4 sm:m-6 mb-6 sm:mb-10">Contactez-moi</p>

            <div className="w-full flex flex-col lg:flex-row justify-center gap-6 sm:gap-8">
                {/* Formulaire */}
                <div className="w-full lg:max-w-md flex flex-col">
                    <GlassCard className="flex-1">
                        <GlassCardContent className="flex flex-col gap-4 pt-4 h-full">
                            <Label>Nom *</Label>
                            <GlassInput placeholder="Votre nom" value={nom} onChange={e => setNom(e.target.value)} />
                            <Label>Email *</Label>
                            <GlassInput placeholder="votre@email.com" value={email} onChange={e => setEmail(e.target.value)} />
                            <Label>Message *</Label>
                            <GlassTextarea
                                placeholder="Votre message"
                                className="flex-1 h-full min-h-32 resize-y"
                                value={message}
                                onChange={e => setMessage(e.target.value)}
                            />
                            <GlassButton
                                className="w-full"
                                variant="destructive"
                                onClick={handleSubmit}
                                disabled={status === "loading" || !nom || !email || !message}
                            >
                                {status === "loading" ? "Envoi..." : "Envoyer"}
                            </GlassButton>
                        </GlassCardContent>
                    </GlassCard>
                </div>

                {/* Contacts + CV */}
                <div className="flex flex-col gap-4 w-full lg:w-auto">
                    <div className="grid grid-cols-2 gap-4">
                        <Link href="mailto:enzo.vandepoele2@gmail.com">
                            <GlassCard className="w-full cursor-pointer hover:scale-105 transition-transform">
                                <GlassCardContent className="flex flex-col justify-center items-center gap-2 p-0 m-3 sm:m-4">
                                    <div className="p-2 rounded-lg bg-red-500/15 shadow-[0_0_12px_rgba(239,68,68,0.4)]">
                                        <Mail size={20} className="text-red-400 drop-shadow-[0_0_6px_rgba(239,68,68,0.8)]" />
                                    </div>
                                    <p className="uppercase font-extralight text-gray-300 text-xs sm:text-sm">Email</p>
                                    <p className="text-xs sm:text-sm text-center break-all">enzo.vandepoele2@gmail.com</p>
                                </GlassCardContent>
                            </GlassCard>
                        </Link>

                        <Link href="https://www.linkedin.com/in/enzo-vandepoele-3224ab2b2/" target="_blank">
                            <GlassCard className="w-full cursor-pointer hover:scale-105 transition-transform">
                                <GlassCardContent className="flex flex-col justify-center items-center gap-2 p-0 m-3 sm:m-4">
                                    <div className="p-2 rounded-lg bg-blue-500/15 shadow-[0_0_12px_rgba(59,130,246,0.4)]">
                                        <Linkedin size={20} className="text-blue-400 drop-shadow-[0_0_6px_rgba(59,130,246,0.8)]" />
                                    </div>
                                    <p className="uppercase font-extralight text-gray-300 text-xs sm:text-sm">Linkedin</p>
                                    <p className="text-xs sm:text-sm">Enzo Vandepoele</p>
                                </GlassCardContent>
                            </GlassCard>
                        </Link>

                        <Link href="https://discord.com/users/unicron0603" target="_blank">
                            <GlassCard className="w-full cursor-pointer hover:scale-105 transition-transform">
                                <GlassCardContent className="flex flex-col justify-center items-center gap-2 p-0 m-3 sm:m-4">
                                    <div className="p-2 rounded-lg bg-purple-500/15 shadow-[0_0_12px_rgba(168,85,247,0.4)]">
                                        <MessageCircleMore size={20} className="text-purple-400 drop-shadow-[0_0_6px_rgba(168,85,247,0.8)]" />
                                    </div>
                                    <p className="uppercase font-extralight text-gray-300 text-xs sm:text-sm">Discord</p>
                                    <p className="text-xs sm:text-sm">unicron0603</p>
                                </GlassCardContent>
                            </GlassCard>
                        </Link>

                        <Link href="https://github.com/Unicron03" target="_blank">
                            <GlassCard className="w-full cursor-pointer hover:scale-105 transition-transform">
                                <GlassCardContent className="flex flex-col justify-center items-center gap-2 p-0 m-3 sm:m-4">
                                    <div className="p-2 rounded-lg bg-white/8 shadow-[0_0_12px_rgba(255,255,255,0.15)]">
                                        <CodeXml size={20} className="text-white/80 drop-shadow-[0_0_6px_rgba(255,255,255,0.6)]" />
                                    </div>
                                    <p className="uppercase font-extralight text-gray-300 text-xs sm:text-sm">GitHub</p>
                                    <p className="text-xs sm:text-sm">Unicron03</p>
                                </GlassCardContent>
                            </GlassCard>
                        </Link>
                    </div>

                    <Link href="/CV_Enzo VANDEPOELE.pdf" target="_blank" download="CV_Enzo VANDEPOELE.pdf">
                        <GlassCard className="w-full cursor-pointer hover:scale-105 transition-transform">
                            <GlassCardContent className="flex flex-row justify-between items-center gap-2 p-0 m-3 sm:m-4">
                                <div className="flex items-center gap-3 sm:gap-4">
                                    <div className="p-2 rounded-full bg-lime-500/15 shadow-[0_0_14px_rgba(132,204,22,0.45)]">
                                        <IdCard size={24} className="text-lime-400 drop-shadow-[0_0_6px_rgba(132,204,22,0.9)]" />
                                    </div>
                                    <div>
                                        <p className="text-base sm:text-xl font-bold">Télécharger mon CV</p>
                                        <p className="text-gray-400 text-xs sm:text-sm">Curriculum Vitæ</p>
                                    </div>
                                </div>
                                <ArrowRight size={24} className="text-white/40 shrink-0" />
                            </GlassCardContent>
                        </GlassCard>
                    </Link>
                </div>
            </div>
        </main>
    )
}
