import { Resend } from "resend"
import { NextResponse } from "next/server"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: Request) {
    const { nom, email, message } = await req.json()

    try {
        await resend.emails.send({
            from: "Portfolio <onboarding@resend.dev>",
            to: "enzo.vandepoele2@gmail.com",
            subject: `Nouveau message de ${nom}`,
            html: `
                <h2>Nouveau message depuis ton portfolio</h2>
                <p><strong>Nom :</strong> ${nom}</p>
                <p><strong>Email :</strong> ${email}</p>
                <p><strong>Message :</strong></p>
                <p>${message}</p>
            `,
        })

        return NextResponse.json({ success: true })
    } catch (error) {
        return NextResponse.json({ error: "Erreur lors de l'envoi" }, { status: 500 })
    }
}