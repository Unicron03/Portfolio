# 🔒 Système de Mentions Légales - Guide Rapide

## ✅ Qu'est-ce qui a été mis en place ?

### 📄 Trois pages légales complètes et conformes

1. **Mentions Légales** (`/pages/legal-notice`)
   - Identification de l'éditeur
   - Infos hébergement
   - Propriété intellectuelle
   - Limitations de responsabilité

2. **Politique de Confidentialité RGPD** (`/pages/privacy-policy`)
   - Données collectées & utilisation
   - Services tiers
   - Droits des utilisateurs
   - Gestion des cookies

3. **Conditions d'Utilisation** (`/pages/terms-of-service`)
   - Modalités d'accès
   - Utilisation licite
   - Propriété intellectuelle
   - Indemnisation

### 🛠 Composants créés

```typescript
// Affichage du contenu légal avec formatage cohérent
<LegalContent title="..." lastUpdated="..." sections={[...]} />

// Footer avec liens vers les pages légales
<LegalFooter />

// Wrapper client-side pour éviter duplication
<ConditionalLegalFooter />
```

### 🎨 Design & UX

- ✅ Cohérent avec le style glass morphism du portfolio
- ✅ Breadcrumb fixe + Dock fixe
- ✅ Animations fade-in
- ✅ Responsive mobile-first
- ✅ Accessibilité WCAG

---

## 🚀 Utilisation

### Accéder aux pages légales

```
Depuis votre navigateur :
- http://localhost:3000/pages/legal-notice
- http://localhost:3000/pages/privacy-policy
- http://localhost:3000/pages/terms-of-service
```

### Ajouter les liens dans votre navigation

Les liens sont déjà ajoutés automatiquement via le footer global ! Visible sur toutes les pages sauf les pages légales elles-mêmes (pour éviter duplication).

### Importer et utiliser les composants

```tsx
import { LegalContent } from "@/components/legal-content"
import { LegalFooter } from "@/components/legal-footer"

export default function MyLegalPage() {
  return (
    <>
      <LegalContent 
        title="Mon page légale"
        sections={[
          {
            title: "Section 1",
            content: "Contenu texte ou JSX"
          }
        ]}
      />
      <LegalFooter />
    </>
  )
}
```

---

## ⚙️ Configuration

### Mettre à jour les infos de contact

Fichier : `config/legal.json`

```json
{
  "legal": {
    "contact": {
      "email": "enzo.vandepoele3@gmail.com",
      "name": "Enzo Vandepoele",
      "location": "France"
    }
  }
}
```

### Ajouter/modifier les serices tiers

Fichier : `config/legal.json` → `thirdPartyServices`

```json
{
  "name": "Mon Service",
  "purpose": "Description",
  "privacyUrl": "https://..."
}
```

---

## 📋 Conformité

✅ **RGPD** - Politique de confidentialité complète  
✅ **Droit français** - Mentions légales et conditions  
✅ **Cookies** - Politique de cookies intégrée  
✅ **Services tiers** - Transparence totale  
✅ **Accessibilité** - Design inclusif  

---

## 📚 Documentation

Pour une documentation complète, voir : [`LEGAL_SYSTEM.md`](./LEGAL_SYSTEM.md)

---

## 🛡️ Contenu inclus

### Mentions Légales couvrent
- Identification complète (nom, email, localisation)
- Hébergement (Vercel)
- Droits d'auteur
- Limitation de responsabilité
- Droit applicable (Loi française)

### Politique de confidentialité couvre
- Données collectées (formulaire + navigation)
- Durée de conservation (1 an pour messages, 26 mois pour analytics)
- Sécurité des données
- **Cookies** (essentiels, analytiques, préférences)
- **Services tiers** :
  - Google Analytics
  - Vercel
  - GitHub
  - Resend (emails)
- Droits RGPD (accès, rectification, suppression, etc.)
- Contact pour exercer les droits

### Conditions d'utilisation couvrent
- Accès gratuit 24/7
- Utilisation licite uniquement
- Contenu utilisateur
- Droits intellectuels
- Exonération de responsabilité
- Indemnisation
- Modifications & résiliation
- Droit français

---

## 🔧 Maintenance future

### Mettre à jour une date de modification

```tsx
export const metadata = {
  title: "...",
  // ...
}

export default function Page() {
  const sections = [...]
  
  return (
    <LegalContent 
      title=""
      lastUpdated="VOTRE DATE ICI"
      sections={sections}
    />
  )
}
```

### Ajouter une nouvelle section

```tsx
const sections = [
  // Sections existantes...
  {
    title: "Ma nouvelle section",
    content: "Mon contenu" // ou du JSX complet
  }
]
```

### Modifier les liens du footer

Fichier : `components/legal-footer.tsx`

```tsx
<Link href="/pages/ma-nouvelle-page">
  Mon nouveau lien
</Link>
```

---

## 🤔 FAQ

**Q: Pourquoi il n'y a pas de footer légal sur les pages légales ?**  
R: Grâce à `ConditionalLegalFooter`, pour éviter la duplication. Les pages légales ont leur propre footer.

**Q: Comment ajouter une 4ème page légale ?**  
R: 1) Créer `app/pages/ma-page/page.tsx`  
2) Utiliser le template `LegalContent`  
3) Ajouter la route à `ConditionalLegalFooter`

**Q: Est-ce RGPD compliant ?**  
R: Oui ! Politique de confidentialité complète, gestion des cookies, droits utilisateur et données transparentes.

---

## 📞 Contact et support

Email : `enzo.vandepoele3@gmail.com`  
Documentation : Voir `LEGAL_SYSTEM.md`

---

**Créé le : 24 mars 2026**  
**Version : 1.0.0**
