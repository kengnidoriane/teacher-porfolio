import * as fs from 'fs';

function parseMarkdown(mdContent) {
    const lines = mdContent.split('\n');
    const result = [];
    let currentParagraph = [];
    let inCodeBlock = false;
    let codeBlock = { type: 'code', language: '', content: [] };

    lines.forEach(line => {
        // Gestion des blocs de code
        if (line.startsWith('```')) {
            if (inCodeBlock) {
                result.push({
                    type: codeBlock.type,
                    language: codeBlock.language,
                    content: codeBlock.content.join('\n')
                });
                codeBlock = { type: 'code', language: '', content: [] };
                inCodeBlock = false;
            } else {
                inCodeBlock = true;
                codeBlock.language = line.replace(/```/, '').trim();
            }
            return;
        }

        if (inCodeBlock) {
            codeBlock.content.push(line);
            return;
        }

        // Détection des titres
        const headingMatch = line.match(/^(#+)\s(.*)/);
        if (headingMatch) {
            if (currentParagraph.length > 0) {
                result.push({ type: 'paragraph', content: currentParagraph.join(' ') });
                currentParagraph = [];
            }
            result.push({
                type: 'heading',
                level: headingMatch[1].length,
                content: headingMatch[2]
            });
            return;
        }

        // Détection des listes
        if (line.match(/^[-*]\s/)) {
            if (currentParagraph.length > 0) {
                result.push({ type: 'paragraph', content: currentParagraph.join(' ') });
                currentParagraph = [];
            }
            result.push({
                type: 'list-item',
                content: line.replace(/^[-*]\s/, '')
            });
            return;
        }

        // Gestion des paragraphes
        if (line.trim() === '') {
            if (currentParagraph.length > 0) {
                result.push({ type: 'paragraph', content: currentParagraph.join(' ') });
                currentParagraph = [];
            }
        } else {
            currentParagraph.push(line.trim());
        }
    });

    return result;
}

// Utilisation
const inputFile = process.argv[2];
const outputFile = process.argv[3];

if (!inputFile || !outputFile) {
    console.log('Usage: node markdownToJson.js <input.md> <output.json>');
    process.exit(1);
}

try {
    const mdContent = fs.readFileSync(inputFile, 'utf-8');
    const jsonData = parseMarkdown(mdContent);
    fs.writeFileSync(outputFile, JSON.stringify(jsonData, null, 2));
    console.log(`Conversion réussie vers ${outputFile}`);
} catch (err) {
    console.error('Erreur:', err.message);
}