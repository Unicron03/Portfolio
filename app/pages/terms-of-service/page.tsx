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
import { Home, FileText } from "lucide-react"
import type { Metadata } from "next"
import { LegalContent } from "@/components/legal-content"

export const metadata: Metadata = {
  title: "Conditions d'utilisation | Enzo Vandepoele",
  description: "Conditions d'utilisation du portfolio d'Enzo Vandepoele",
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "https://avatars.githubusercontent.com/u/110382392?v=4", type: "image/png" },
    ],
  },
}

export default function TermsOfServicePage() {
  const items = [
    { id: "home", icon: <Home />, label: "Home", href: "/" },
    { id: "terms", icon: <FileText />, label: "Conditions", href: "#", active: true },
  ]

  const sections = [
    {
      title: "1. Objet",
      content: (
        <div className="space-y-3">
          <p>
            Ces conditions d'utilisation définissent les règles d'accès et d'utilisation du site
            web portfolio d'Enzo Vandepoele. En accédant et en utilisant ce site, vous acceptez
            d'être lié par ces conditions.
          </p>
        </div>
      ),
    },
    {
      title: "2. Accès au site",
      content: (
        <div className="space-y-3">
          <p>
            <strong>Accès gratuit :</strong> Le site est accessible gratuitement à tous les
            utilisateurs d'Internet, 24 heures sur 24, 7 jours sur 7, sauf en cas de maintenance
            ou de problèmes techniques.
          </p>
          <p className="mt-3">
            <strong>Responsabilité de l'utilisateur :</strong> Vous êtes responsable du maintien de
            la confidentialité de vos identifiants et de votre compte, le cas échéant.
          </p>
          <p className="mt-3">
            <strong>Accès refusé :</strong> Nous nous réservons le droit de refuser l'accès au site
            à tout moment et pour toute raison, conformément à la loi applicable.
          </p>
        </div>
      ),
    },
    {
      title: "3. Utilisation licite",
      content: (
        <div className="space-y-3">
          <p>Vous acceptez d'utiliser ce site uniquement à des fins légales et de ne pas :</p>
          <ul className="list-disc list-inside space-y-1 ml-2">
            <li>
              Violer les lois applicables ou encourager les autres à le faire
            </li>
            <li>
              Engager dans le harcèlement, la menace, la diffamation ou l'abus
            </li>
            <li>
              Transmettre du contenu offensant, obscène, illégal ou nuisible
            </li>
            <li>
              Spam, phishing ou toute autre activité malveillante
            </li>
            <li>
              Accéder sans autorisation à des systèmes ou données
            </li>
            <li>
              Télécharger de logiciels malveillants ou de contenu nuisible
            </li>
            <li>
              Contourner les dispositifs de protection
            </li>
            <li>
              Exploiter les ressources du site de manière abusive
            </li>
          </ul>
        </div>
      ),
    },
    {
      title: "4. Contenu fourni par l'utilisateur",
      content: (
        <div className="space-y-3">
          <p>
            Tout contenu que vous soumettez (messages, commentaires, etc.) doit être légal, exact
            et original. Vous détenez les droits nécessaires pour partager ce contenu.
          </p>
          <p className="mt-3">
            En soumettant du contenu, vous nous accordez une licence perpétuelle, irrévocable et
            mondiale pour l'utiliser, le modifier et le distribuer.
          </p>
          <p className="mt-3">
            Nous nous réservons le droit de supprimer ou de modifier tout contenu qui viole ces
            conditions sans notification préalable.
          </p>
        </div>
      ),
    },
    {
      title: "5. Liens externes",
      content: (
        <div className="space-y-3">
          <p>
            Ce site peut contenir des liens vers d'autres sites web de tiers. Nous ne sommes pas
            responsables du contenu, de la précision ou des pratiques de confidentialité de ces
            sites externes.
          </p>
          <p className="mt-3">
            L'inclusion d'un lien ne constitue pas une approbation du site lié. Consultez les
            conditions d'utilisation et la politique de confidentialité des sites externes.
          </p>
        </div>
      ),
    },
    {
      title: "6. Propriété intellectuelle",
      content: (
        <div className="space-y-3">
          <p>
            Tout le contenu du site est protégé par les droits d'auteur et la propriété
            intellectuelle. Sauf indication contraire, tous les contenus sont la propriété
            exclusive d'Enzo Vandepoele.
          </p>
          <p className="mt-3">
            <strong>Utilisation autorisée :</strong> Vous pouvez afficher et imprimer le contenu
            uniquement pour usage personnel non-commercial.
          </p>
          <p className="mt-3">
            <strong>Restrictions :</strong> Vous ne pouvez pas reproduire, modifier, adapter,
            traduire, ou créer des travaux dérivés sans permission écrite préalable.
          </p>
        </div>
      ),
    },
    {
      title: "7. Limitation de responsabilité",
      content: (
        <div className="space-y-3">
          <p>
            <strong>Fourniture « en l'état » :</strong> Le site est fourni sans garantie d'aucune
            sorte, explicite ou implicite.
          </p>
          <p className="mt-3">
            <strong>Pas de garantie :</strong> Nous ne garantissons pas que le site sera :
          </p>
          <ul className="list-disc list-inside space-y-1 ml-2">
            <li>Ininterrompu ou sans erreur</li>
            <li>Libre de virus ou de logiciels malveillants</li>
            <li>Exact ou complet</li>
            <li>Approprié à vos besoins</li>
          </ul>

          <p className="mt-3">
            <strong>Exonération de responsabilité :</strong> Enzo Vandepoele n'est pas responsable
            des dommages directs, indirects, accessoires, spéciaux ou consécutifs résultant de :
          </p>
          <ul className="list-disc list-inside space-y-1 ml-2">
            <li>L'utilisation ou l'impossibilité d'utiliser le site</li>
            <li>L'interruption de service</li>
            <li>La perte de données</li>
            <li>Tout autre élément relatif au site</li>
          </ul>
        </div>
      ),
    },
    {
      title: "8. Indemnisation",
      content: (
        <div className="space-y-3">
          <p>
            Vous acceptez d'indemniser et de dégager de toute responsabilité Enzo Vandepoele,
            ainsi que ses administrateurs, agents et employés, contre :
          </p>
          <ul className="list-disc list-inside space-y-1 ml-2">
            <li>Les réclamations découlant de votre utilisation du site</li>
            <li>Votre violation de ces conditions</li>
            <li>Votre infraction à toute loi applicable</li>
            <li>Votre violation des droits d'un tiers</li>
          </ul>
        </div>
      ),
    },
    {
      title: "9. Modification du site",
      content: (
        <div className="space-y-3">
          <p>
            Nous nous réservons le droit de modifier, mettre à jour ou arrêter le site à tout
            moment, avec ou sans préavis.
          </p>
          <p className="mt-3">
            Nous ne serons pas responsables de toute modification, suspension ou cessation du site
            ou de ses services.
          </p>
        </div>
      ),
    },
    {
      title: "10. Suspension ou résiliation",
      content: (
        <div className="space-y-3">
          <p>
            Nous nous réservons le droit de suspendre ou de résilier votre accès au site à tout
            moment, avec ou sans préavis, si vous violez ces conditions ou la loi applicable.
          </p>
        </div>
      ),
    },
    {
      title: "11. Modification des conditions",
      content: (
        <div className="space-y-3">
          <p>
            Enzo Vandepoele se réserve le droit de modifier ces conditions d'utilisation à tout
            moment. Les modifications sont effectives dès leur publication sur le site.
          </p>
          <p className="mt-3">
            Votre utilisation continue du site après une modification constitue votre acceptation
            des conditions modifiées. Vérifiez régulièrement ces conditions.
          </p>
        </div>
      ),
    },
    {
      title: "12. Droit applicable et juridiction",
      content: (
        <div className="space-y-3">
          <p>
            Ces conditions d'utilisation sont régies par la loi française. Tout litige découlant
            de ou relatif à ces conditions sera soumis à la juridiction exclusive des tribunaux
            français.
          </p>
        </div>
      ),
    },
    {
      title: "13. Séparabilité",
      content: (
        <div className="space-y-3">
          <p>
            Si une disposition de ces conditions est jugée invalide ou non exécutoire, cette
            disposition sera supprimée et les dispositions restantes resteront en vigueur.
          </p>
        </div>
      ),
    },
    {
      title: "14. Accord intégral",
      content: (
        <div className="space-y-3">
          <p>
            Ces conditions d'utilisation, ainsi que notre politique de confidentialité et nos
            mentions légales, constituent l'accord intégral entre vous et Enzo Vandepoele
            concernant votre utilisation du site.
          </p>
          <p className="mt-3">
            Si vous n'acceptez pas ces conditions, veuillez ne pas utiliser le site.
          </p>
        </div>
      ),
    },
    {
      title: "15. Contact",
      content: (
        <div className="space-y-3">
          <p className="mb-3">
            Si vous avez des questions sur ces conditions d'utilisation, veuillez nous contacter :
          </p>
          <ul className="space-y-2">
            <li>
              <strong>E-mail :</strong>{" "}
              <a href="mailto:enzo.vandepoele3@gmail.com" className="text-blue-400 hover:text-blue-300">
                enzo.vandepoele3@gmail.com
              </a>
            </li>
            <li>
              <strong>Nom :</strong> Enzo Vandepoele
            </li>
            <li>
              <strong>Localisation :</strong> France
            </li>
          </ul>
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
              <GlassBreadcrumbPage>Conditions d'utilisation</GlassBreadcrumbPage>
            </GlassBreadcrumbItem>
          </GlassBreadcrumbList>
        </GlassBreadcrumb>
      </FadeIn>

      {/* Contenu principal */}
      <section className="mt-28 mb-20 flex-1">
        <LegalContent
          title="Conditions d'utilisation"
          lastUpdated="24 mars 2026"
          sections={sections}
        />
      </section>

      {/* Dock fixe en bas */}
      <GlassDock items={items} className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40" />
    </main>
  )
}
