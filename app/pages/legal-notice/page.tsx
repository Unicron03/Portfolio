import { FadeIn } from "@/components/fade-in"
import {
  GlassBreadcrumb,
  GlassBreadcrumbList,
  GlassBreadcrumbItem,
  GlassBreadcrumbLink,
  GlassBreadcrumbSeparator,
  GlassBreadcrumbPage,
} from "@/components/shadcn/glass-breadcrumb"
import { GlassDock } from "@/components/shadcn/glass-dock"
import { Home, Shield } from "lucide-react"
import type { Metadata } from "next"
import { LegalContent } from "@/components/legal-content"

export const metadata: Metadata = {
  title: "Mentions légales | Enzo Vandepoele",
  description: "Mentions légales du portfolio d'Enzo Vandepoele",
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "https://avatars.githubusercontent.com/u/110382392?v=4", type: "image/png" },
    ],
  },
}

export default function LegalNoticePage() {
  const items = [
    { id: "home", icon: <Home />, label: "Home", href: "/" },
    { id: "legal", icon: <Shield />, label: "Légal", href: "#", active: true },
  ]

  const sections = [
    {
      title: "1. Identification de l'éditeur",
      content: (
        <div className="space-y-3">
          <p>
            <strong>Nom :</strong> Enzo Vandepoele
          </p>
          <p>
            <strong>Statut :</strong> Développeur web indépendant / Étudiant
          </p>
          <p>
            <strong>Adresse e-mail :</strong>{" "}
            <a href="mailto:enzo.vandepoele3@gmail.com" className="text-blue-400 hover:text-blue-300">
              enzo.vandepoele3@gmail.com
            </a>
          </p>
          <p>
            <strong>Localisation :</strong> France
          </p>
        </div>
      ),
    },
    {
      title: "2. Hébergement du site",
      content: (
        <div className="space-y-3">
          <p>
            <strong>Hébergeur :</strong> Vercel
          </p>
          <p>
            <strong>Adresse :</strong> 340 S Lemon Ave, Walnut, CA 91789, USA
          </p>
          <p>
            <strong>Site web :</strong>{" "}
            <a href="https://vercel.com" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300">
              vercel.com
            </a>
          </p>
        </div>
      ),
    },
    {
      title: "3. Propriété intellectuelle",
      content: (
        <div className="space-y-3">
          <p>
            Tous les contenus présents sur ce site (textes, images, logos, vidéos, codes source) sont
            la propriété exclusive d'Enzo Vandepoele ou de ses partenaires.
          </p>
          <p>
            Toute reproduction, représentation, modification ou exploitation du contenu sans
            autorisation préalable écrite est strictement interdite, sauf disposition légale
            contraire.
          </p>
          <p>
            Les codes source des projets sont disponibles sous licence open source (consultez les
            dépôts GitHub respectifs pour les termes spécifiques).
          </p>
        </div>
      ),
    },
    {
      title: "4. Limitation de responsabilité",
      content: (
        <div className="space-y-3">
          <p>
            L'utilisateur utilise le site à ses propres risques. Enzo Vandepoele n'est pas
            responsable des dommages directs ou indirects résultant de l'utilisation du site ou
            de l'impossibilité d'y accéder.
          </p>
          <p>
            Les liens externes sont fournis à titre informatif. Enzo Vandepoele n'est pas
            responsable du contenu des sites externes.
          </p>
        </div>
      ),
    },
    {
      title: "5. Données personnelles",
      content: (
        <div className="space-y-3">
          <p>
            Pour toute question concernant le traitement de vos données personnelles, consultez la{" "}
            <a href="/pages/privacy-policy" className="text-blue-400 hover:text-blue-300">
              Politique de confidentialité
            </a>
            .
          </p>
        </div>
      ),
    },
    {
      title: "6. Cookies",
      content: (
        <div className="space-y-3">
          <p>
            Ce site utilise des cookies pour améliorer l'expérience utilisateur et l'analyse du
            trafic. En continuant à utiliser le site, vous acceptez l'utilisation de cookies,
            conformément à notre{" "}
            <a href="/pages/privacy-policy" className="text-blue-400 hover:text-blue-300">
              Politique de confidentialité
            </a>
            .
          </p>
        </div>
      ),
    },
    {
      title: "7. Modifications des mentions légales",
      content: (
        <div className="space-y-3">
          <p>
            Enzo Vandepoele se réserve le droit de modifier ces mentions légales à tout moment
            sans préavis. Les modifications entrez en vigueur dès leur publication sur le site.
          </p>
        </div>
      ),
    },
    {
      title: "8. Droit applicable",
      content: (
        <div className="space-y-3">
          <p>
            Ces mentions légales sont régies par la loi française. Tout litiges sera soumis à la
            juridiction des tribunaux français.
          </p>
        </div>
      ),
    },
  ]

  return (
    <main className="flex flex-col px-4 sm:px-8">
      {/* Breadcrumb fixe */}
      <FadeIn delay={0.1}>
        <GlassBreadcrumb className="fixed top-4 sm:top-6 left-1/2 -translate-x-1/2 z-50 w-11/12 sm:w-4/5">
          <GlassBreadcrumbList>
            <GlassBreadcrumbItem>
              <GlassBreadcrumbLink href="/">Home</GlassBreadcrumbLink>
            </GlassBreadcrumbItem>
            <GlassBreadcrumbSeparator />
            <GlassBreadcrumbItem>
              <GlassBreadcrumbPage>Mentions légales</GlassBreadcrumbPage>
            </GlassBreadcrumbItem>
          </GlassBreadcrumbList>
        </GlassBreadcrumb>
      </FadeIn>

      {/* Contenu principal */}
      <section className="mt-28 mb-20 flex-1">
        <LegalContent title="Mentions légales" lastUpdated="24 mars 2026" sections={sections} />
      </section>

      {/* Dock fixe en bas */}
      <GlassDock items={items} className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40" />
    </main>
  )
}
