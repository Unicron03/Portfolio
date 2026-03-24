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
import { Home, Lock } from "lucide-react"
import type { Metadata } from "next"
import { LegalContent } from "@/components/legal-content"

export const metadata: Metadata = {
  title: "Politique de confidentialité | Enzo Vandepoele",
  description: "Politique de confidentialité du portfolio d'Enzo Vandepoele",
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "https://avatars.githubusercontent.com/u/110382392?v=4", type: "image/png" },
    ],
  },
}

export default function PrivacyPolicyPage() {
  const items = [
    { id: "home", icon: <Home />, label: "Home", href: "/" },
    { id: "privacy", icon: <Lock />, label: "Confidentialité", href: "#", active: true },
  ]

  const sections = [
    {
      title: "1. Introduction",
      content: (
        <div className="space-y-3">
          <p>
            Le respect de votre vie privée est important pour nous. Cette politique de
            confidentialité explique comment nous collectons, utilisons, et protégeons vos données
            personnelles lorsque vous visitez notre site web.
          </p>
        </div>
      ),
    },
    {
      title: "2. Données collectées",
      content: (
        <div className="space-y-3">
          <h4 className="font-semibold text-white">Données de contact (formulaire)</h4>
          <p>
            Si vous soumettez un formulaire de contact, nous collectons :
          </p>
          <ul className="list-disc list-inside space-y-1 ml-2">
            <li>Nom</li>
            <li>Adresse e-mail</li>
            <li>Message</li>
            <li>Toute autre information que vous nous fournissez volontairement</li>
          </ul>

          <h4 className="font-semibold text-white mt-4">Données de navigation</h4>
          <p>
            Nous collectons automatiquement certaines informations lors de votre visite :
          </p>
          <ul className="list-disc list-inside space-y-1 ml-2">
            <li>Adresse IP</li>
            <li>Type de navigateur et système d'exploitation</li>
            <li>Pages visitées et durée de visite</li>
            <li>Données de référence</li>
            <li>Informations relatives au ou appareil utilisé</li>
          </ul>
        </div>
      ),
    },
    {
      title: "3. Utilisation des données",
      content: (
        <div className="space-y-3">
          <p>Nous utilisons vos données pour :</p>
          <ul className="list-disc list-inside space-y-1 ml-2">
            <li>Répondre à vos demandes de contact</li>
            <li>Améliorer le contenu et la performance du site</li>
            <li>Analyser l'utilisation du site (Google Analytics)</li>
            <li>Prévenir la fraude et les abus</li>
            <li>Respecter nos obligations légales</li>
          </ul>
        </div>
      ),
    },
    {
      title: "4. Stockage et durée de conservation",
      content: (
        <div className="space-y-3">
          <p>
            <strong>Durée de conservation :</strong>
          </p>
          <ul className="list-disc list-inside space-y-1 ml-2">
            <li>Messages de contact : 1 an après réception</li>
            <li>Données analytiques : jusqu'à 26 mois (conformément à Google Analytics)</li>
            <li>Autres données : supprimées après utilisation sauf obligation légale</li>
          </ul>
          <p className="mt-3">
            Vous pouvez demander la suppression de vos données à tout moment en nous contactant.
          </p>
        </div>
      ),
    },
    {
      title: "5. Sécurité des données",
      content: (
        <div className="space-y-3">
          <p>
            Nous mettons en œuvre des mesures de sécurité appropriées pour protéger vos données
            personnelles contre l'accès, l'altération, la divulgation ou la destruction non
            autorisée.
          </p>
          <p className="mt-3">
            Cependant, aucune transmission via Internet n'est 100% sécurisée. Nous ne pouvons pas
            garantir la sécurité absolue.
          </p>
        </div>
      ),
    },
    {
      title: "6. Cookies et technologies similaires",
      content: (
        <div className="space-y-3">
          <h4 className="font-semibold text-white">Types de cookies utilisés</h4>
          <ul className="list-disc list-inside space-y-1 ml-2">
            <li>
              <strong>Essentiels :</strong> Nécessaires au fonctionnement du site
            </li>
            <li>
              <strong>Analytiques :</strong> Google Analytics pour comprendre votre utilisation
            </li>
            <li>
              <strong>Préférences :</strong> Sauvegarde de vos paramètres (thème)
            </li>
          </ul>

          <h4 className="font-semibold text-white mt-4">Gestion des cookies</h4>
          <p>
            Vous pouvez contrôler et/ou supprimer les cookies via les paramètres de votre
            navigateur. Consultez les paramètres de votre navigateur pour plus d'informations.
          </p>
        </div>
      ),
    },
    {
      title: "7. Services tiers",
      content: (
        <div className="space-y-3">
          <p>
            Notre site utilise les services tiers suivants qui peuvent collecter des données :
          </p>
          <ul className="list-disc list-inside space-y-1 ml-2">
            <li>
              <strong>Google Analytics :</strong> Analyse du trafic
            </li>
            <li>
              <strong>Vercel :</strong> Hébergement du site
            </li>
            <li>
              <strong>GitHub :</strong> Affichage des projets
            </li>
            <li>
              <strong>Resend :</strong> Envoi d'e-mails (formulaire contact)
            </li>
          </ul>

          <p className="mt-3">
            Ces services ont leurs propres politiques de confidentialité. Nous vous encourageons à
            les consulter.
          </p>
        </div>
      ),
    },
    {
      title: "8. Vos droits",
      content: (
        <div className="space-y-3">
          <p>
            Conformément à la RGPD et à la législation française, vous avez le droit de :
          </p>
          <ul className="list-disc list-inside space-y-1 ml-2">
            <li>Accéder à vos données personnelles</li>
            <li>Rectifier les données inexactes</li>
            <li>Demander l'effacement de vos données (droit à l'oubli)</li>
            <li>Obtenir une copie de vos données</li>
            <li>Vous opposer au traitement de vos données</li>
            <li>Limiter le traitement de vos données</li>
          </ul>

          <p className="mt-3">
            Pour exercer ces droits, contactez-nous à{" "}
            <a href="mailto:enzo.vandepoele3@gmail.com" className="text-blue-400 hover:text-blue-300">
              enzo.vandepoele3@gmail.com
            </a>
            .
          </p>
        </div>
      ),
    },
    {
      title: "9. Enfants",
      content: (
        <div className="space-y-3">
          <p>
            Ce site n'est pas destiné aux enfants de moins de 13 ans. Nous ne collectons pas
            sciemment de données personnelles de la part d'enfants de moins de 13 ans.
          </p>
          <p className="mt-3">
            Si nous découvrez que nous avons collecté des données d'un enfant de moins de 13 ans,
            veuillez nous contacter immédiatement pour suppression.
          </p>
        </div>
      ),
    },
    {
      title: "10. Modifications de cette politique",
      content: (
        <div className="space-y-3">
          <p>
            Nous pouvons mettre à jour cette politique de confidentialité de temps en temps. Nous
            vous notifierons de tout changement matériel en publiant la nouvelle politique sur
            cette page.
          </p>
          <p className="mt-3">
            Votre utilisation continue du site après la publication des modifications constitue
            votre acceptation de la politique mise à jour.
          </p>
        </div>
      ),
    },
    {
      title: "11. Contact",
      content: (
        <div className="space-y-3">
          <p className="mb-3">
            Si vous avez des questions sur cette politique de confidentialité ou sur nos pratiques
            concernant la protection des données, veuillez nous contacter :
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
              <GlassBreadcrumbPage>Politique de confidentialité</GlassBreadcrumbPage>
            </GlassBreadcrumbItem>
          </GlassBreadcrumbList>
        </GlassBreadcrumb>
      </FadeIn>

      {/* Contenu principal */}
      <section className="mt-28 mb-20 flex-1">
        <LegalContent
          title="Politique de confidentialité"
          lastUpdated="24 mars 2026"
          sections={sections}
        />
      </section>

      {/* Dock fixe en bas */}
      <GlassDock items={items} className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40" />
    </main>
  )
}
