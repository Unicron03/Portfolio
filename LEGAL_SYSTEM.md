# Système de Mentions Légales - Documentation

## Vue d'ensemble
Le système de mentions légales du portfolio est composé de trois pages principales conformes à la législation française RGPD et aux exigences légales pour les sites web.

## Structure des fichiers

### Pages légales
```
app/pages/
├── legal-notice/
│   └── page.tsx              # Mentions légales
├── privacy-policy/
│   └── page.tsx              # Politique de confidentialité
└── terms-of-service/
    └── page.tsx              # Conditions d'utilisation
```

### Composants
```
components/
├── legal-content.tsx          # Composant réutilisable pour afficher le contenu légal
├── legal-footer.tsx           # Footer avec liens vers les pages légales
└── conditional-legal-footer.tsx # Wrapper client-side pour éviter la duplication
```

## Routes

- **Mentions légales** : `/pages/legal-notice`
- **Politique de confidentialité** : `/pages/privacy-policy`
- **Conditions d'utilisation** : `/pages/terms-of-service`

## Composants disponibles

### LegalContent
Composant réutilisable pour afficher une page légale avec formatage cohérent.

**Props**:
- `title` (string) : Titre de la page
- `lastUpdated` (string, optional) : Date de dernière mise à jour
- `sections` (LegalSection[]) : Array de sections avec `title` et `content`

**Exemple**:
```tsx
<LegalContent 
  title="Mentions légales" 
  lastUpdated="24 mars 2026"
  sections={[
    {
      title: "1. Identification",
      content: "..."
    }
  ]}
/>
```

### LegalFooter
Affiche un footer contenant les liens vers les trois pages légales principales.

**Utilisation** : Inclus automatiquement dans le layout global via `ConditionalLegalFooter`

### ConditionalLegalFooter
Wrapper client-side qui affiche `LegalFooter` uniquement sur les pages non-légales.

**Logique** : 
- Vérifie la route actuelle avec `usePathname()`
- N'affiche rien sur `/pages/legal-notice`, `/pages/privacy-policy`, `/pages/terms-of-service`
- Affiche le footer légal sur toutes les autres pages

## Contenu des pages

### 1. Mentions Légales
Contient :
- Identification de l'éditeur (Enzo Vandepoele)
- Infos hébergement (Vercel)
- Propriété intellectuelle
- Limitation de responsabilité
- Données personnelles & cookies
- Droit applicable (Loi française)

### 2. Politique de Confidentialité (RGPD)
Contient :
- Données collectées (contact, navigation)
- Utilisation des données
- Stockage et conservation
- Sécurité
- Cookies
- Services tiers (Google Analytics, Vercel, GitHub, Resend)
- Droits des utilisateurs
- Contact

### 3. Conditions d'Utilisation
Contient :
- Accès au site
- Utilisation licite
- Contenu utilisateur
- Propriété intellectuelle
- Limitation de responsabilité
- Indemnisation
- Modifications
- Droit applicable

## Design & UX

- **Style** : Cohérent avec le reste du portfolio (glass morphism design)
- **Breadcrumb** : Navigation fixe en haut
- **Dock** : Navigation fixe en bas
- **Animations** : Fade-in progressive des sections
- **Responsive** : Mobile-friendly avec Tailwind CSS

## Maintenance

### Mettre à jour les dates
Mise à jour la propriété `lastUpdated` dans chaque page.tsx

### Modification du contenu légal
1. Ouvrir la page concernée
2. Modifier le tableau `sections`
3. Les sections s'affichent automatiquement via `LegalContent`

### Ajouter une nouvelle page légale
1. Créer le répertoire : `app/pages/new-page/`
2. Créer `page.tsx` en suivant le pattern existant
3. Ajouter la route à `ConditionalLegalFooter` si pertinent
4. Ajouter le lien dans `LegalFooter` si accessible publiquement

## Conformité

✅ RGPD
✅ Loi française sur la protection des données
✅ Exigences de mentionslégales pour sites web
✅ Conditions d'utilisation
✅ Politique de confidentialité

## Intégration

Les pages légales sont :
- **Accessibles** : Via le footer de toutes les pages non-légales
- **Optimisées SEO** : Metadata configurée pour chaque page
- **Performance** : Utilisent lazy loading avec Tailwind & Framer Motion
- **Accessibilité** : Sémantique HTML correcte, contraste WCAG

## Notes techniques

- Toutes les pages légales utilisent `"use client"` pour les composants avec interaction
- Les pages themselves sont SSR (Server-Side Rendered)
- Les liens externes s'ouvrent dans de nouveaux onglets (`target="_blank"`)
- Email de contact : `enzo.vandepoele3@gmail.com`
- Format de date : Jour mois année (ex: "24 mars 2026")
