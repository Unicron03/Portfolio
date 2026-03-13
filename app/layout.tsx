import { ThemeProvider } from "@/components/theme-provider"
import Contacts from "@/components/contacts";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { GlassSeparator } from "@/components/shadcn/glass-separator";
import { GlassNotificationProvider } from "@/components/shadcn/glass-notification"

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Enzo Vandepoele - Portfolio",
    description: "Enzo Vandepoele's Portfolio",
    icons: {
        icon: [
            { url: "/favicon.ico" },
            { url: "https://avatars.githubusercontent.com/u/110382392?v=4", type: "image/png" },
        ],
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <html lang="en" suppressHydrationWarning>
                <head />
                <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>

                    {/* ===== FOND ===== */}
                    <div className="bg-base"        aria-hidden="true" />
                    <div className="bg-blob bg-blob-1" aria-hidden="true" />
                    <div className="bg-blob bg-blob-2" aria-hidden="true" />
                    <div className="bg-blob bg-blob-3" aria-hidden="true" />
                    <div className="bg-blob bg-blob-4" aria-hidden="true" />
                    <div className="bg-grid"        aria-hidden="true" />
                    <div className="grain-overlay"  aria-hidden="true" />
                    {/* ===== FIN FOND ===== */}

                    <ThemeProvider attribute="class" defaultTheme="dark">
                        <GlassNotificationProvider>
                            {children}

                            <GlassSeparator />
                            
                            <footer className="mb-16 pb-24">
                                <Contacts />
                            </footer>
                        </GlassNotificationProvider>
                    </ThemeProvider>
                </body>
            </html>
        </>
    )
}
