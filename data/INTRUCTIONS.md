# Guide d'utilisation - Système de contenu Markdown

## 📝 Vue d'ensemble

Le site utilise un système de gestion de contenu basé sur Markdown avec :
- Un fichier central `data.md` pour tout le contenu
- Conversion automatique en JSON
- Affichage via le composant MainSection

## 🚀 Ajout/Modification de contenu

### 1. Structure du fichier data.md
```markdown
---
page: "nom-de-la-page"
---
# Titre Principal
Contenu de la page...

---
page: "autre-page"
---
# Autre Page
Contenu...
```

### 2. Création d'une page
1. Ajouter la section dans `data.md`
2. Créer le fichier dans `app/(rootfolder)/nom-de-la-page/page.tsx`:
```typescript
import { MainSection, SectionHeader } from "@/components/global"

const NouvellePage = () => {
  return (
    <>
      <SectionHeader title="Titre de la page" />
      <MainSection />
    </>
  )
}

export default NouvellePage
```

### 3. Mise à jour du contenu
```bash
# Après modification de data.md
npm run convert-md
```

## 📚 Syntaxe Markdown

### Éléments de base
- `# Titre` : Titre principal
- `## Sous-titre` : Sous-titre
- `**Texte**` : Gras
- `*Texte*` : Italique
- `- Item` : Liste à puces
- `1. Item` : Liste numérotée

### Éléments avancés
- `[Lien](url)` : Lien
- `![Alt](url)` : Image
- ``` `code` ``` : Code inline
- `> citation` : Citation

### Tables
```markdown
| Colonne 1 | Colonne 2 |
|-----------|-----------|
| Cellule 1 | Cellule 2 |
```

## ⚠️ Points importants

### Règles à suivre
1. Le nom de page doit correspondre à l'URL
2. Chaque section commence par `---`
3. Format obligatoire : `page: "nom-de-la-page"`
4. Exécuter `convert-md` après modification

### Structure des dossiers
```
data/
  ├── data.md          # Contenu Markdown
  └── dataMd.json      # JSON généré
app/
  └── (rootfolder)/
      └── nom-de-page/
          └── page.tsx # Composant Page
```

## 🔍 Dépannage

### Si le contenu ne s'affiche pas
1. Vérifier le nom de la page dans data.md
2. Confirmer la génération du JSON
3. Redémarrer le serveur

### Commandes utiles
```bash
npm run convert-md  # Convertir MD → JSON
npm run dev        # Serveur développement
npm run build      # Build production
```

## 📞 Support

### Ressources
- Documentation : Ce guide
- Issues : GitHub
- Questions : Équipe technique

### Bonnes pratiques
- Tester localement
- Vérifier la syntaxe
- Maintenir la cohérence
- Sauvegarder régulièrement