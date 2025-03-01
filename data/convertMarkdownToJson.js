import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Lire le fichier Markdown
const mdFilePath = join(__dirname, 'data.md');
const jsonFilePath = join(__dirname, 'dataMd.json');

try {
  // Lire le contenu du fichier Markdown
  const mdContent = readFileSync(mdFilePath, 'utf8');
  
  // Séparer le contenu en sections
  const sections = mdContent.split(/^---$/m).filter(Boolean);
  
  // Créer un objet avec les contenus par page
  const pagesContent = {};
  
  sections.forEach(section => {
    const pageMatch = section.match(/page:\s*"([^"]+)"/);
    if (pageMatch) {
      const pageName = pageMatch[1];
      const content = section
        .replace(/^page:\s*"[^"]+"\s*/, '') // Enlever l'en-tête
        .trim();
      pagesContent[pageName] = { content };
    }
  });

  // Écrire le fichier JSON
  writeFileSync(jsonFilePath, JSON.stringify(pagesContent, null, 2));
  console.log('Conversion réussie ! Le fichier JSON a été créé.');
} catch (error) {
  console.error('Erreur lors de la conversion:', error);
}
