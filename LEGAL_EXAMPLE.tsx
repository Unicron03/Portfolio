// Fichier d'exemple : Comment créer une nouvelle page légale personnalisée

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
import { Home } from "lucide-react"
import type { Metadata } from "next"
import { LegalContent } from "@/components/legal-content"
import { LegalFooter } from "@/components/legal-footer"

// Exemple avec metadata personnalisée
export const metadata: Metadata = {
  title: "Ma page légale personnalisée | Enzo Vandepoele",
  description: "Description personnalisée",
}

// Exemple avec icône personnalisée
import { FileText } from "lucide-react"

export default function CustomLegalPage() {
  // Items pour la navigation (dock)
  const items = [
    { id: "home", icon: <Home />, label: "Home", href: "/" },
    { id: "custom", icon: <FileText />, label: "Ma page", href: "#", active: true },
  ]

  // Sections avec formatage avancé (JSX)
  const sections = [
    {
      title: "1. Première section",
      content: (
        <div className="space-y-3">
          <p>Texte simple en paragraphe.</p>
          <p className="text-blue-400">Texte coloré</p>
          <ul className="list-disc list-inside space-y-1 ml-2">
            <li>Point 1</li>
            <li>Point 2</li>
            <li>Point 3</li>
          </ul>
        </div>
      ),
    },
    {
      title: "2. Section avec tables",
      content: (
        <div className="space-y-3">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-b border-gray-500">
                <th className="text-left py-2">Colonne 1</th>
                <th className="text-left py-2">Colonne 2</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-700">
                <td className="py-2">Donnée 1</td>
                <td className="py-2">Donnée 2</td>
              </tr>
            </tbody>
          </table>
        </div>
      ),
    },
    {
      title: "3. Section avec liens",
      content: (
        <div className="space-y-3">
          <p>
            Voir aussi la{" "}
            <a href="/pages/privacy-policy" className="text-blue-400 hover:text-blue-300">
              politique de confidentialité
            </a>
            {" "}pour plus d'infos.
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
              <GlassBreadcrumbPage>Ma page personnalisée</GlassBreadcrumbPage>
            </GlassBreadcrumbItem>
          </GlassBreadcrumbList>
        </GlassBreadcrumb>
      </FadeIn>

      {/* Contenu principal */}
      <section className="mt-28 mb-20 flex-1">
        <LegalContent
          title="Ma page légale personnalisée"
          lastUpdated="24 mars 2026"
          sections={sections}
        />
      </section>

      {/* Footer légal */}
      <LegalFooter />

      {/* Dock fixe en bas */}
      <GlassDock items={items} className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40" />
    </main>
  )
}

/**
 * INSTRUCTIONS D'UTILISATION
 * 
 * 1. Créer un nouveau dossier : app/pages/ma-page/
 * 2. Copier le code ci-dessus dans app/pages/ma-page/page.tsx
 * 3. Personnaliser :
 *    - Titre dans metadata
 *    - Title et description
 *    - Items pour la navigation (dock)
 *    - Contenu des sections
 *    - lastUpdated avec votre date
 * 
 * 4. (Optionnel) Le footer légal est géré globalement dans le layout.
 *    Si vous voulez masquer le footer sur cette page, gérez la condition
 *    directement dans app/layout.tsx.
 * 
 * 5. (Optionnel) Ajouter le lien dans LegalFooter :
 *    <Link href="/pages/ma-page">
 *      Ma page
 *    </Link>
 */
