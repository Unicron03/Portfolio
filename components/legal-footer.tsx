import Link from "next/link"
import { GlassSeparator } from "@/components/shadcn/glass-separator"

export function LegalFooter() {
  return (
    <footer className="mt-16 border-t border-white/10">
      <GlassSeparator className="bg-white/10" />
      <div className="px-4 sm:px-8 py-8">
        <div className="flex flex-wrap gap-6 justify-center md:justify-start">
          <Link
            href="/pages/legal-notice"
            className="text-sm text-gray-400 hover:text-white transition-colors"
          >
            Mentions légales
          </Link>
          <span className="text-gray-600">•</span>
          <Link
            href="/pages/privacy-policy"
            className="text-sm text-gray-400 hover:text-white transition-colors"
          >
            Politique de confidentialité
          </Link>
          <span className="text-gray-600">•</span>
          <Link
            href="/pages/terms-of-service"
            className="text-sm text-gray-400 hover:text-white transition-colors"
          >
            Conditions d'utilisation
          </Link>
        </div>
        <p className="text-xs text-gray-500 mt-4">
          © 2026 Enzo Vandepoele. Tous droits réservés.
        </p>
      </div>
    </footer>
  )
}
